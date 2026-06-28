const CHAVE_VISTORIAS = "vistorias.lista";
const CHAVE_AGENDA = "vistorias.agenda";

function lerListaLocal(chave) {
  try {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch (_) {
    return [];
  }
}

const vistorias = lerListaLocal(CHAVE_VISTORIAS);
const agendamentos = lerListaLocal(CHAVE_AGENDA);
let proximoVistoriaId = calcularProximoId(vistorias);
let proximoAgendaId = calcularProximoId(agendamentos);
let usuarioLocalAtual = null;

function persistirLocal() {
  localStorage.setItem(CHAVE_VISTORIAS, JSON.stringify(vistorias));
  localStorage.setItem(CHAVE_AGENDA, JSON.stringify(agendamentos));
}

function mapearVistoriaOnline(row) {
  return {
    id: row.id, onlineId: row.id, legacyId: row.legacy_id, usuarioLocalId: row.usuario_id,
    dataAgendada: row.data_agendada, hora: row.hora || "", metragem: Number(row.metragem), tipo: row.tipo,
    mobilia: row.mobilia, qualidade: row.qualidade, valor: Number(row.valor),
    backend: "firebase", pendenteSync: false
  };
}

function mapearAgendaOnline(row) {
  return {
    id: row.id, onlineId: row.id, legacyId: row.legacy_id, publicToken: row.public_token, usuarioLocalId: row.usuario_id,
    data: row.data_vistoria, hora: String(row.hora_vistoria || "").slice(0, 5),
    unidadeCliente: row.unidade_cliente, responsavel: row.responsavel,
    telefoneWhatsapp: row.telefone_whatsapp, endereco: row.endereco,
    obs: row.observacao || "", statusConfirmacao: row.status_confirmacao,
    enviadoEm: row.enviado_em, confirmadoEm: row.confirmado_em,
    reagendamentoSolicitadoEm: row.reagendamento_solicitado_em,
    criadoEm: row.criado_em, backend: "firebase", pendenteSync: false
  };
}

async function carregarDadosOnline() {
  // Guarda itens ainda não enviados antes de atualizar o cache com o banco.
  const locaisV = vistorias.filter(item => (!item.onlineId || item.pendenteSync) && item.usuarioLocalId === usuarioLocalAtual);
  const locaisA = agendamentos.filter(item => (!item.onlineId || item.pendenteSync) && item.usuarioLocalId === usuarioLocalAtual);
  const pendentesOutrosV = vistorias.filter(item => (!item.onlineId || item.pendenteSync) && item.usuarioLocalId !== usuarioLocalAtual);
  const pendentesOutrosA = agendamentos.filter(item => (!item.onlineId || item.pendenteSync) && item.usuarioLocalId !== usuarioLocalAtual);
  const dados = await onlineBackend.loadAll();
  const onlineV = dados.vistorias.map(mapearVistoriaOnline);
  const onlineA = dados.agendamentos.map(mapearAgendaOnline);
  const legacyV = new Set(onlineV.map(item => String(item.legacyId)).filter(id => id !== "null"));
  const legacyA = new Set(onlineA.map(item => String(item.legacyId)).filter(id => id !== "null"));
  const pendentesV = new Set(locaisV.map(item => String(item.onlineId)).filter(Boolean));
  const pendentesA = new Set(locaisA.map(item => String(item.onlineId)).filter(Boolean));
  vistorias.splice(0, vistorias.length, ...onlineV.filter(item => !pendentesV.has(String(item.onlineId))), ...locaisV.filter(item => item.onlineId || !legacyV.has(String(item.id))), ...pendentesOutrosV);
  agendamentos.splice(0, agendamentos.length, ...onlineA.filter(item => !pendentesA.has(String(item.onlineId))), ...locaisA.filter(item => item.onlineId || !legacyA.has(String(item.id))), ...pendentesOutrosA);
  persistirLocal();
}

async function adicionarVistoria(vistoria) {
  if (onlineBackend.configured) {
    const item = { id: proximoVistoriaId++, ...vistoria, usuarioLocalId: usuarioLocalAtual, backend: "firebase", pendenteSync: true };
    vistorias.push(item); persistirLocal();
    try {
      const row = await onlineBackend.saveInspection({ ...item, legacyId: item.id });
      Object.assign(item, mapearVistoriaOnline(row)); persistirLocal(); return item;
    } catch (erro) {
      throw new Error(`Vistoria salva neste aparelho, mas ainda não sincronizada. ${erro.message}`);
    }
  }
  const item = { id: proximoVistoriaId++, ...vistoria, usuarioLocalId: usuarioLocalAtual, backend: "firebase" };
  vistorias.push(item); persistirLocal(); return item;
}

async function removerVistoria(id) {
  const item = vistorias.find(v => String(v.id) === String(id));
  if (item?.onlineId) await onlineBackend.deleteInspection(item.onlineId);
  const indice = vistorias.indexOf(item);
  if (indice >= 0) vistorias.splice(indice, 1);
  persistirLocal();
}

async function adicionarAgendamento(agendamento) {
  if (onlineBackend.configured) {
    const item = { id: proximoAgendaId++, criadoEm: new Date().toISOString(), ...agendamento, usuarioLocalId: usuarioLocalAtual, backend: "firebase", pendenteSync: true };
    agendamentos.push(item); persistirLocal();
    try {
      const row = await onlineBackend.saveAppointment({ ...item, legacyId: item.id });
      Object.assign(item, mapearAgendaOnline(row)); persistirLocal(); return item;
    } catch (erro) {
      throw new Error(`Agendamento salvo neste aparelho, mas ainda não sincronizado. ${erro.message}`);
    }
  }
  const item = { id: proximoAgendaId++, criadoEm: new Date().toISOString(), ...agendamento, usuarioLocalId: usuarioLocalAtual, backend: "firebase" };
  agendamentos.push(item); persistirLocal(); return item;
}

async function atualizarAgendamento(id, alteracoes) {
  const item = agendamentos.find(a => String(a.id) === String(id));
  if (!item) throw new Error("Agendamento não encontrado.");
  const atualizado = { ...item, ...alteracoes, pendenteSync: true };
  Object.assign(item, atualizado); persistirLocal();
  if (onlineBackend.configured) {
    try {
      const row = await onlineBackend.saveAppointment(atualizado);
      Object.assign(item, mapearAgendaOnline(row));
    } catch (erro) {
      Object.assign(item, atualizado);
      throw new Error(`Alteração preservada neste aparelho, mas ainda não sincronizada. ${erro.message}`);
    }
  }
  persistirLocal(); return item;
}

async function removerAgendamento(id) {
  const item = agendamentos.find(a => String(a.id) === String(id));
  if (item?.onlineId) await onlineBackend.deleteAppointment(item.onlineId);
  const indice = agendamentos.indexOf(item);
  if (indice >= 0) agendamentos.splice(indice, 1);
  persistirLocal();
}

async function importarDadosLocais() {
  if (!onlineBackend.configured) throw new Error("Configure o Firebase antes de importar.");
  const locaisV = lerListaLocal(CHAVE_VISTORIAS).filter(v => (!v.onlineId || v.pendenteSync) && v.usuarioLocalId === usuarioLocalAtual);
  const locaisA = lerListaLocal(CHAVE_AGENDA).filter(a => (!a.onlineId || a.pendenteSync) && a.usuarioLocalId === usuarioLocalAtual);
  for (const v of locaisV) {
    const row = await onlineBackend.saveInspection({ ...v, legacyId: v.legacyId || (v.onlineId ? null : v.id) });
    const original = vistorias.find(item => String(item.id) === String(v.id));
    if (original) Object.assign(original, mapearVistoriaOnline(row), { pendenteSync: false });
  }
  for (const a of locaisA) {
    const row = await onlineBackend.saveAppointment({
      ...a, legacyId: a.legacyId || (a.onlineId ? null : a.id), unidadeCliente: a.unidadeCliente || "Importado do aparelho",
      responsavel: a.responsavel || "Não informado", telefoneWhatsapp: a.telefoneWhatsapp || "5511000000000",
      obs: ["Importado do formato antigo; revise responsável e WhatsApp.", a.obs].filter(Boolean).join(" "),
      statusConfirmacao: a.statusConfirmacao || "Aguardando envio"
    });
    const original = agendamentos.find(item => String(item.id) === String(a.id));
    if (original) Object.assign(original, mapearAgendaOnline(row), { pendenteSync: false });
  }
  persistirLocal();
  await carregarDadosOnline();
  return { vistorias: locaisV.length, agendamentos: locaisA.length };
}

function definirUsuarioLocal(usuarioId) {
  usuarioLocalAtual = usuarioId;
  const chaveMigracaoFirebase = "vistorias.firebase.migracao.v1";
  if (!localStorage.getItem(chaveMigracaoFirebase)) {
    // Cache produzido antes do Firebase (local puro ou backend anterior) é preservado e
    // passa a pertencer ao primeiro usuário Firebase que entrar neste aparelho.
    [...vistorias, ...agendamentos].forEach(item => {
      if (item.backend !== "firebase") {
        item.usuarioLocalId = usuarioId;
        item.legacyId = item.legacyId || item.id;
        delete item.onlineId;
        item.pendenteSync = true;
        item.backend = "firebase";
      }
    });
    localStorage.setItem(chaveMigracaoFirebase, "1");
  }
  // Dados da versão antiga, ainda sem dono, pertencem ao primeiro usuário que entrar neste aparelho.
  [...vistorias, ...agendamentos].forEach(item => {
    if (!item.usuarioLocalId && !item.onlineId) item.usuarioLocalId = usuarioId;
  });
  persistirLocal();
}
function listarVistorias() { return vistorias.filter(item => item.usuarioLocalId === usuarioLocalAtual); }
function listarAgendamentos() { return agendamentos.filter(item => item.usuarioLocalId === usuarioLocalAtual); }
function possuiDadosLocaisPendentes() {
  return listarVistorias().some(v => !v.onlineId || v.pendenteSync) || listarAgendamentos().some(a => !a.onlineId || a.pendenteSync);
}
function calcularProximoId(lista) {
  return lista.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}
function calcularTotalAcumulado() {
  return vistorias.reduce((total, vistoria) => total + Number(vistoria.valor || 0), 0);
}


// --- CONFIGURAÇÕES ---
const CHAVE_CONFIG = "vistorias.config";

const CONFIG_PADRAO = {
  metaDiaria: 200,
  metaMensal: 4000,
  combustivel: 0,
  pedagio: 0,
  nome: "",
  tema: "light",
  whatsapp: "",
};

function carregarConfig() {
  try {
    const dados = localStorage.getItem(CHAVE_CONFIG);
    return dados ? { ...CONFIG_PADRAO, ...JSON.parse(dados) } : { ...CONFIG_PADRAO };
  } catch {
    return { ...CONFIG_PADRAO };
  }
}

function salvarConfigDados(novaConfig) {
  const configFinal = { ...carregarConfig(), ...novaConfig };
  localStorage.setItem(CHAVE_CONFIG, JSON.stringify(configFinal));
  return configFinal;
}

const appConfig = carregarConfig();
