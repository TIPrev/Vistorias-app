(function () {
  const config = window.APP_CONFIG || {};
  const firebaseConfig = config.firebase || {};
  const configured = Boolean(
    firebaseConfig.apiKey && firebaseConfig.authDomain &&
    firebaseConfig.projectId && firebaseConfig.appId
  );
  let sdk = null;

  const ready = configured ? (async () => {
    const appSdk = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js");
    const authSdk = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js");
    const dbSdk = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js");
    const app = appSdk.initializeApp(firebaseConfig);
    const auth = authSdk.getAuth(app);
    await authSdk.setPersistence(auth, authSdk.browserLocalPersistence);
    sdk = { authSdk, dbSdk, auth, db: dbSdk.getFirestore(app) };
    return sdk;
  })() : Promise.resolve(null);

  async function requireSdk() {
    const loaded = await ready;
    if (!loaded) throw new Error("Firebase ainda não foi configurado em config.js.");
    return loaded;
  }

  async function getUser() {
    const { auth, authSdk } = await requireSdk();
    if (auth.currentUser) return auth.currentUser;
    return new Promise(resolve => {
      const unsubscribe = authSdk.onAuthStateChanged(auth, user => {
        unsubscribe(); resolve(user);
      });
    });
  }

  async function currentSession() {
    const user = await getUser();
    return user ? { user } : null;
  }

  async function login(email, password) {
    const { auth, authSdk } = await requireSdk();
    const credential = await authSdk.signInWithEmailAndPassword(auth, email, password);
    return { user: credential.user };
  }

  async function logout() {
    const { auth, authSdk } = await requireSdk();
    await authSdk.signOut(auth);
  }

  async function ensureProfile(session) {
    const { db, dbSdk } = await requireSdk();
    const user = session.user;
    const ref = dbSdk.doc(db, "usuarios", user.uid);
    const snap = await dbSdk.getDoc(ref);
    const nome = snap.exists() ? snap.data().nome : (user.displayName || user.email.split("@")[0]);
    await dbSdk.setDoc(ref, {
      userId: user.uid, email: user.email, nome,
      atualizadoEm: dbSdk.serverTimestamp()
    }, { merge: true });
    return { nome, email: user.email };
  }

  function iso(value) {
    return value && typeof value.toDate === "function" ? value.toDate().toISOString() : (value || null);
  }

  function timestamp(dbSdk, value) {
    if (!value) return null;
    if (typeof value.toDate === "function") return value;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : dbSdk.Timestamp.fromDate(date);
  }

  function inspectionRow(id, data) {
    return {
      id, usuario_id: data.userId, legacy_id: data.legacyId ?? null,
      data_agendada: data.dataAgendada, hora: data.hora || "", metragem: data.metragem, tipo: data.tipo,
      mobilia: data.mobilia, qualidade: data.qualidade, valor: data.valor
    };
  }

  function appointmentRow(id, data, confirmation) {
    const publicStatus = confirmation?.status;
    return {
      id, usuario_id: data.userId, legacy_id: data.legacyId ?? null,
      public_token: data.publicToken, data_vistoria: data.dataVistoria,
      hora_vistoria: data.horaVistoria, unidade_cliente: data.unidadeCliente,
      responsavel: data.responsavel, telefone_whatsapp: data.telefoneWhatsapp,
      endereco: data.endereco, observacao: data.observacao || "",
      status_confirmacao: publicStatus || data.statusConfirmacao,
      enviado_em: iso(data.enviadoEm),
      confirmado_em: iso(confirmation?.confirmedAt || data.confirmadoEm),
      reagendamento_solicitado_em: iso(confirmation?.rescheduleRequestedAt || data.reagendamentoSolicitadoEm),
      criado_em: iso(data.criadoEm)
    };
  }

  async function loadAll() {
    const { db, dbSdk } = await requireSdk();
    const user = await getUser();
    if (!user) throw new Error("Sessão expirada. Entre novamente.");
    const owned = collectionName => dbSdk.query(
      dbSdk.collection(db, collectionName), dbSdk.where("userId", "==", user.uid)
    );
    const [vistoriasSnap, agendaSnap, confirmationsSnap] = await Promise.all([
      dbSdk.getDocs(owned("vistorias")),
      dbSdk.getDocs(owned("agendamentos")),
      dbSdk.getDocs(owned("confirmacoesPublicas"))
    ]);
    const confirmations = new Map();
    confirmationsSnap.forEach(docSnap => confirmations.set(docSnap.id, docSnap.data()));
    return {
      vistorias: vistoriasSnap.docs.map(snap => inspectionRow(snap.id, snap.data())),
      agendamentos: agendaSnap.docs.map(snap => appointmentRow(
        snap.id, snap.data(), confirmations.get(snap.data().publicToken)
      ))
    };
  }

  function legacyDocId(prefix, uid, legacyId) {
    return `${prefix}_${uid}_${String(legacyId).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  }

  async function saveInspection(item) {
    const { db, dbSdk } = await requireSdk();
    const user = await getUser();
    if (!user) throw new Error("Sessão expirada. Entre novamente.");
    const data = {
      userId: user.uid, dataAgendada: item.dataAgendada, hora: item.hora || "", metragem: Number(item.metragem),
      tipo: item.tipo, mobilia: Boolean(item.mobilia), qualidade: Boolean(item.qualidade),
      valor: Number(item.valor), legacyId: item.legacyId ?? null,
      atualizadoEm: dbSdk.serverTimestamp()
    };
    let ref;
    if (item.onlineId) ref = dbSdk.doc(db, "vistorias", item.onlineId);
    else if (item.legacyId != null) ref = dbSdk.doc(db, "vistorias", legacyDocId("legacy", user.uid, item.legacyId));
    else ref = dbSdk.doc(dbSdk.collection(db, "vistorias"));
    await dbSdk.setDoc(ref, {
      ...data,
      criadoEm: timestamp(dbSdk, item.criadoEm || new Date().toISOString())
    }, { merge: true });
    return inspectionRow(ref.id, data);
  }

  async function deleteInspection(id) {
    const { db, dbSdk } = await requireSdk();
    await dbSdk.deleteDoc(dbSdk.doc(db, "vistorias", id));
  }

  function randomToken() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    const h = [...bytes].map(v => v.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
  }

  async function saveAppointment(item) {
    const { db, dbSdk } = await requireSdk();
    const user = await getUser();
    if (!user) throw new Error("Sessão expirada. Entre novamente.");
    let ref;
    if (item.onlineId) ref = dbSdk.doc(db, "agendamentos", item.onlineId);
    else if (item.legacyId != null) ref = dbSdk.doc(db, "agendamentos", legacyDocId("legacy", user.uid, item.legacyId));
    else ref = dbSdk.doc(dbSdk.collection(db, "agendamentos"));
    let token = item.publicToken;
    if (!token && item.onlineId) {
      const current = await dbSdk.getDoc(ref);
      token = current.exists() ? current.data().publicToken : null;
    }
    token ||= randomToken();
    const criadoIso = item.criadoEm || new Date().toISOString();
    const data = {
      userId: user.uid, publicToken: token, dataVistoria: item.data,
      horaVistoria: item.hora, unidadeCliente: item.unidadeCliente,
      responsavel: item.responsavel, telefoneWhatsapp: item.telefoneWhatsapp,
      endereco: item.endereco, observacao: item.obs || "",
      statusConfirmacao: item.statusConfirmacao || "Aguardando envio",
      enviadoEm: timestamp(dbSdk, item.enviadoEm), confirmadoEm: timestamp(dbSdk, item.confirmadoEm),
      reagendamentoSolicitadoEm: timestamp(dbSdk, item.reagendamentoSolicitadoEm),
      legacyId: item.legacyId ?? null, atualizadoEm: dbSdk.serverTimestamp(),
      criadoEm: timestamp(dbSdk, criadoIso)
    };
    const publicRef = dbSdk.doc(db, "confirmacoesPublicas", token);
    const batch = dbSdk.writeBatch(db);
    batch.set(ref, data, { merge: true });
    batch.set(publicRef, {
      userId: user.uid, agendamentoId: ref.id, status: data.statusConfirmacao,
      confirmedAt: timestamp(dbSdk, item.confirmadoEm),
      rescheduleRequestedAt: timestamp(dbSdk, item.reagendamentoSolicitadoEm),
      createdAt: dbSdk.serverTimestamp()
    }, { merge: true });
    await batch.commit();
    return appointmentRow(ref.id, data, null);
  }

  async function deleteAppointment(id) {
    const { db, dbSdk } = await requireSdk();
    const ref = dbSdk.doc(db, "agendamentos", id);
    const snap = await dbSdk.getDoc(ref);
    const batch = dbSdk.writeBatch(db);
    batch.delete(ref);
    if (snap.exists() && snap.data().publicToken) {
      batch.delete(dbSdk.doc(db, "confirmacoesPublicas", snap.data().publicToken));
    }
    await batch.commit();
  }

  async function publicAction(token, action) {
    const { db, dbSdk } = await requireSdk();
    const ref = dbSdk.doc(db, "confirmacoesPublicas", token);
    return dbSdk.runTransaction(db, async transaction => {
      const snap = await transaction.get(ref);
      if (!snap.exists() || ["Cancelado", "Finalizado"].includes(snap.data().status)) return { ok: false };
      if (snap.data().status === action) return { ok: true, status: action };
      const update = { status: action };
      if (action === "Confirmado") update.confirmedAt = dbSdk.serverTimestamp();
      if (action === "Reagendar") update.rescheduleRequestedAt = dbSdk.serverTimestamp();
      transaction.update(ref, update);
      return { ok: true, status: action };
    });
  }

  function siteUrl() {
    return (config.siteUrl || window.location.origin).replace(/\/$/, "");
  }

  window.onlineBackend = {
    configured, ready, currentSession, login, logout, ensureProfile, loadAll,
    saveInspection, deleteInspection, saveAppointment, deleteAppointment,
    publicAction, siteUrl
  };
})();
