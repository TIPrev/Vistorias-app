// ============================================================
// ELEMENTOS DO DOM
// ============================================================

// Onboarding
const onboardingWelcome  = document.querySelector("#onboarding-welcome");
const onboardingName     = document.querySelector("#onboarding-name");
const startBtn           = document.querySelector("#onboarding-start-btn");
const continueBtn        = document.querySelector("#onboarding-continue-btn");
const nameInput          = document.querySelector("#onboarding-name-input");
const onboardingBackBtn  = document.querySelector("#onboarding-back-btn");

// Splash
const splashEnterBtn = document.querySelector("#splash-enter-btn");
const splashScreen   = document.querySelector("#splash-screen");

// App shell
const appShell      = document.querySelector(".app-shell");
const headerTitle   = document.querySelector("#header-title");
const profileButton = document.querySelector("#profile-button");
const fabBtn        = document.querySelector("#fab-btn");

// Telas
const telaEls = {
  home:          document.querySelector("#tela-home"),
  novaVistoria:  document.querySelector("#tela-nova-vistoria"),
  agenda:        document.querySelector("#tela-agenda"),
  resumo:        document.querySelector("#tela-resumo"),
  config:        document.querySelector("#tela-config"),
};

// Bottom nav buttons
const navBtns = document.querySelectorAll(".nav-btn");

// Alertas
const alertasContainer = document.querySelector("#alertas-container");

// Tela: Nova Vistoria
const vistoriaForm          = document.querySelector("#vistoria-form");
const vistoriaDataInput     = document.querySelector("#vistoria-data");
const vistoriaHoraInput     = document.querySelector("#vistoria-hora");
const vistoriaMetragemInput = document.querySelector("#vistoria-metragem");
const vistoriaMobiliaInput  = document.querySelector("#vistoria-mobilia");
const vistoriaQualidadeInput= document.querySelector("#vistoria-qualidade");
const vistoriaValorPreview  = document.querySelector("#vistoria-valor-preview");
const vistoriaCalcularBtn   = document.querySelector("#vistoria-calcular-btn");
const vistoriaSalvarBtn     = document.querySelector("#vistoria-salvar-btn");

// Tela: Agenda
const agendaForm         = document.querySelector("#agenda-form");
const agendaDataInput    = document.querySelector("#agenda-data");
const agendaHoraInput    = document.querySelector("#agenda-hora");
const agendaEnderecoInput= document.querySelector("#agenda-endereco");
const agendaObsInput     = document.querySelector("#agenda-obs");

const agendaListas = {
  hoje:   document.querySelector("#agenda-lista-hoje"),
  amanha: document.querySelector("#agenda-lista-amanha"),
  semana: document.querySelector("#agenda-lista-semana"),
  futuras:document.querySelector("#agenda-lista-futuras"),
};
const agendaVazia = {
  hoje:   document.querySelector("#agenda-vazia-hoje"),
  amanha: document.querySelector("#agenda-vazia-amanha"),
  semana: document.querySelector("#agenda-vazia-semana"),
  futuras:document.querySelector("#agenda-vazia-futuras"),
};
const agendaBadges = {
  hoje:   document.querySelector("#agenda-badge-hoje"),
  amanha: document.querySelector("#agenda-badge-amanha"),
  semana: document.querySelector("#agenda-badge-semana"),
  futuras:document.querySelector("#agenda-badge-futuras"),
};

// Tela: Resumo
const historicoLista      = document.querySelector("#historico-lista");
const historicoVazio      = document.querySelector("#historico-vazio");
const dashboardHojeValor  = document.querySelector("#dashboard-hoje-valor");
const dashboardHojeQtd    = document.querySelector("#dashboard-hoje-qtd");
const dashboardSemanaValor= document.querySelector("#dashboard-semana-valor");
const dashboardSemanaQtd  = document.querySelector("#dashboard-semana-qtd");
const dashboardMesValor   = document.querySelector("#dashboard-mes-valor");
const dashboardMesQtd     = document.querySelector("#dashboard-mes-qtd");
const dashboardAnoValor   = document.querySelector("#dashboard-ano-valor");
const dashboardAnoQtd     = document.querySelector("#dashboard-ano-qtd");
const ganhoEntradasValor  = document.querySelector("#ganho-entradas-valor");
const ganhoEntradasQtd    = document.querySelector("#ganho-entradas-qtd");
const ganhoSaidasValor    = document.querySelector("#ganho-saidas-valor");
const ganhoSaidasQtd      = document.querySelector("#ganho-saidas-qtd");
const rankingMaiorValor   = document.querySelector("#ranking-maior-valor");
const rankingMenorValor   = document.querySelector("#ranking-menor-valor");
const rankingMediaValor   = document.querySelector("#ranking-media-valor");
const melhorDiaNome       = document.querySelector("#melhor-dia-nome");
const melhorDiaValor      = document.querySelector("#melhor-dia-valor");

// Config
const configMetaDiaria  = document.querySelector("#config-meta-diaria");
const configMetaMensal  = document.querySelector("#config-meta-mensal");
const configCombustivel = document.querySelector("#config-combustivel");
const configPedagio     = document.querySelector("#config-pedagio");
const configNome        = document.querySelector("#config-nome");
const configTema        = document.querySelector("#config-tema");
const configSaveBtn     = document.querySelector("#config-save-btn");


// ============================================================
// UTILITÁRIOS
// ============================================================

const TITULOS_TELA = {
  home:         "Vistoria App",
  novaVistoria: "Nova Vistoria",
  agenda:       "Agenda",
  resumo:       "Resumo",
  config:       "Configurações",
};

const DIAS_SEMANA = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
const MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

function formatarData(dataISO) {
  if (!dataISO) return "—";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarDataCurta(dataISO) {
  if (!dataISO) return "—";
  const [, mes, dia] = dataISO.split("-");
  return `${dia} ${MESES[Number(mes) - 1]}`;
}

function dataParaISO(data) {
  const d = new Date(data);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function hojeISO()   { return dataParaISO(new Date()); }
function amanhaISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return dataParaISO(d);
}

function horaAtual() {
  const h = new Date();
  return `${String(h.getHours()).padStart(2,'0')}:${String(h.getMinutes()).padStart(2,'0')}`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

function getDataFormatada() {
  const d = new Date();
  return `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
}


// ============================================================
// TOAST
// ============================================================

function mostrarToast(msg, tipo = "success") {
  const el = document.createElement("div");
  el.className = `toast${tipo === "error" ? " toast-error" : ""}`;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add("show"));
  });
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 2600);
}


// ============================================================
// TEMA
// ============================================================

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema === "dark" ? "dark" : "light");
  const metaTheme = document.querySelector("meta[name='theme-color']");
  if (metaTheme) metaTheme.content = tema === "dark" ? "#0F2040" : "#2563eb";
}


// ============================================================
// NAVEGAÇÃO
// ============================================================

let telaAtiva = "home";

function trocarTela(nomeTela) {
  if (!telaEls[nomeTela]) return;

  telaAtiva = nomeTela;

  Object.keys(telaEls).forEach(n => {
    telaEls[n].classList.toggle("hidden", n !== nomeTela);
  });

  navBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tela === nomeTela);
  });

  fabBtn.classList.toggle("hidden", nomeTela === "novaVistoria");
  headerTitle.textContent = TITULOS_TELA[nomeTela] || "Vistoria App";

  document.querySelector(".screens-container").scrollTop = 0;

  if (nomeTela === "home")    renderizarHome();
  if (nomeTela === "agenda")  renderizarAgenda();
  if (nomeTela === "resumo")  renderizarResumo();
  if (nomeTela === "config")  renderizarConfig();
}


// ============================================================
// ONBOARDING + PERFIL
// ============================================================

function startApp(nome) {
  onboardingWelcome.classList.add("hidden");
  onboardingName.classList.add("hidden");
  splashScreen.style.display = "none";
  appShell.classList.remove("hidden");

  aplicarTema(appConfig.tema);
  trocarTela("home");
}

function handleOnboarding() {
  const nome = localStorage.getItem("vistoriaUserName");

  splashScreen.classList.add("fade-out");
  setTimeout(() => { splashScreen.style.display = "none"; }, 500);

  if (nome) {
    startApp(nome);
  } else {
    onboardingWelcome.classList.remove("hidden");
  }
}

function changeUserName() {
  const atual = localStorage.getItem("vistoriaUserName") || "";
  const novo = prompt("Qual é o seu nome?", atual);
  if (novo && novo.trim()) {
    localStorage.setItem("vistoriaUserName", novo.trim());
    Object.assign(appConfig, salvarConfigDados({ nome: novo.trim() }));
    mostrarToast("Nome atualizado!");
    if (telaAtiva === "home") renderizarHome();
  }
}


// ============================================================
// TELA HOME
// ============================================================

function getProximaVistoria() {
  const hoje = hojeISO();
  const agora = horaAtual();
  return listarAgendamentos()
    .filter(a => a.data > hoje || (a.data === hoje && a.hora >= agora))
    .sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora))[0] || null;
}

function renderizarHome() {
  const nome = localStorage.getItem("vistoriaUserName") || "";
  const primeiroNome = nome.split(" ")[0];

  // Saudação
  document.querySelector("#greeting-period").textContent = getGreeting();
  document.querySelector("#greeting-name").textContent = primeiroNome ? `${primeiroNome}! 👋` : "Bem-vindo! 👋";
  document.querySelector("#greeting-date").innerHTML = getDataFormatada().replace(", ", ",<br>");

  // Card hoje
  const vistorias = listarVistorias();
  const hoje = hojeISO();
  const deHoje = vistorias.filter(v => v.dataAgendada === hoje);
  const totalHoje = deHoje.reduce((s, v) => s + v.valor, 0);
  const metaDiaria = appConfig.metaDiaria || 200;

  document.querySelector("#today-total").textContent = formatarMoeda(totalHoje);
  document.querySelector("#today-count").textContent =
    `${deHoje.length} vistoria${deHoje.length !== 1 ? "s" : ""} realizada${deHoje.length !== 1 ? "s" : ""}`;

  const pct = Math.min(100, Math.round((totalHoje / metaDiaria) * 100));
  document.querySelector("#today-progress-fill").style.width = `${pct}%`;
  document.querySelector("#today-progress-pct").textContent = `${pct}%`;
  document.querySelector("#today-meta-label").textContent = `Meta: ${formatarMoeda(metaDiaria)}`;

  const d = new Date();
  document.querySelector("#today-date-badge").textContent =
    `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;

  // Próxima vistoria
  const proxima = getProximaVistoria();
  const nextCard = document.querySelector("#home-next-card");
  if (proxima) {
    nextCard.innerHTML = `
      <div class="next-card-content">
        <span class="next-tipo ${proxima.tipo}">${proxima.tipo.charAt(0).toUpperCase() + proxima.tipo.slice(1)}</span>
        <div class="next-time">${proxima.hora} &mdash; ${formatarDataCurta(proxima.data)}</div>
        <div class="next-address">📍 ${proxima.endereco}</div>
        ${proxima.obs ? `<div class="next-address">📝 ${proxima.obs}</div>` : ""}
      </div>
    `;
  } else {
    nextCard.innerHTML = `
      <div class="next-card-empty">
        <p>Nenhuma vistoria agendada.</p>
        <button class="link-btn" onclick="trocarTela('agenda')">+ Agendar</button>
      </div>
    `;
  }

  // Últimas vistorias (3)
  const lista = document.querySelector("#home-recent-list");
  const vazio = document.querySelector("#home-recent-empty");
  lista.innerHTML = "";
  const recentes = [...vistorias].sort((a,b) => b.dataAgendada.localeCompare(a.dataAgendada)).slice(0,3);
  if (recentes.length === 0) {
    vazio.classList.remove("hidden");
  } else {
    vazio.classList.add("hidden");
    recentes.forEach(v => {
      const li = document.createElement("li");
      li.className = "recent-card";
      li.innerHTML = `
        <div class="recent-card-icon ${v.tipo}">${v.tipo === "entrada" ? "ENT" : "SAÍ"}</div>
        <div class="recent-card-info">
          <strong>${v.metragem}m² · ${v.tipo.charAt(0).toUpperCase() + v.tipo.slice(1)}</strong>
          <small>${formatarData(v.dataAgendada)}${v.hora ? " · " + v.hora : ""}</small>
        </div>
        <span class="recent-card-valor">${formatarMoeda(v.valor)}</span>
      `;
      lista.appendChild(li);
    });
  }

  // Alertas (dentro do home)
  renderizarAlertas();
}


// ============================================================
// TELA: NOVA VISTORIA
// ============================================================

function calcularEExibirValor() {
  const metragem = Number(vistoriaMetragemInput.value);
  if (!metragem) { vistoriaValorPreview.textContent = formatarMoeda(0); return; }
  try {
    const tipo     = document.querySelector("input[name='vistoria-tipo']:checked").value;
    const mobilia  = vistoriaMobiliaInput.checked;
    const qualidade= vistoriaQualidadeInput.checked;
    const valor    = calcularVistoria(metragem, tipo, mobilia, qualidade);
    vistoriaValorPreview.textContent = formatarMoeda(valor);
  } catch (err) {
    mostrarToast(err.message, "error");
    vistoriaValorPreview.textContent = formatarMoeda(0);
  }
}

function salvarVistoria() {
  const data     = vistoriaDataInput.value;
  const hora     = vistoriaHoraInput.value;
  const metragem = Number(vistoriaMetragemInput.value);
  if (!data || !metragem) {
    mostrarToast("Preencha a data e a metragem.", "error");
    return;
  }
  try {
    const tipo     = document.querySelector("input[name='vistoria-tipo']:checked").value;
    const mobilia  = vistoriaMobiliaInput.checked;
    const qualidade= vistoriaQualidadeInput.checked;
    const valor    = calcularVistoria(metragem, tipo, mobilia, qualidade);

    adicionarVistoria({ dataAgendada: data, hora, metragem, tipo, mobilia, qualidade, valor });

    mostrarToast("Vistoria salva com sucesso! ✓");
    vistoriaForm.reset();
    vistoriaDataInput.value = hojeISO();
    vistoriaHoraInput.value = horaAtual();
    vistoriaValorPreview.textContent = formatarMoeda(0);
  } catch (err) {
    mostrarToast("Erro: " + err.message, "error");
  }
}


// ============================================================
// TELA: AGENDA
// ============================================================

function renderizarAgenda() {
  const todos = listarAgendamentos();
  const hoje  = hojeISO();
  const amanha= amanhaISO();
  const em7   = new Date(); em7.setDate(em7.getDate() + 7);

  const grupos = { hoje: [], amanha: [], semana: [], futuras: [] };

  todos.forEach(ag => {
    const dataAg = new Date(ag.data + "T00:00:00");
    if      (ag.data === hoje)   grupos.hoje.push(ag);
    else if (ag.data === amanha) grupos.amanha.push(ag);
    else if (dataAg <= em7)      grupos.semana.push(ag);
    else                         grupos.futuras.push(ag);
  });

  Object.keys(grupos).forEach(key => {
    const lista = grupos[key].sort((a,b) =>
      (a.data + a.hora).localeCompare(b.data + b.hora));
    const listaEl  = agendaListas[key];
    const vazioEl  = agendaVazia[key];
    const badgeEl  = agendaBadges[key];

    listaEl.innerHTML = "";
    lista.forEach(ag => {
      const li = document.createElement("li");
      li.className = "agenda-card";
      li.innerHTML = `
        <button class="remove-btn" data-id="${ag.id}" aria-label="Excluir">&times;</button>
        <span class="agenda-card-tipo ${ag.tipo}">${ag.tipo.charAt(0).toUpperCase() + ag.tipo.slice(1)}</span>
        <div class="agenda-card-header">
          <span class="agenda-card-time">${ag.hora}</span>
          <span class="agenda-card-date">${formatarData(ag.data)}</span>
        </div>
        <div class="agenda-card-address">📍 ${ag.endereco}</div>
        ${ag.obs ? `<div class="agenda-card-obs">📝 ${ag.obs}</div>` : ""}
      `;
      listaEl.appendChild(li);
    });

    const temItens = lista.length > 0;
    listaEl.classList.toggle("hidden", !temItens);
    vazioEl.classList.toggle("hidden", temItens);
    badgeEl.textContent = lista.length;
    badgeEl.classList.toggle("hidden", !temItens);
  });
}

function adicionarAgendamentoPeloFormulario(event) {
  event.preventDefault();
  const data     = agendaDataInput.value;
  const hora     = agendaHoraInput.value;
  const endereco = agendaEnderecoInput.value.trim();
  const obs      = agendaObsInput.value.trim();
  const tipo     = document.querySelector('input[name="agenda-tipo"]:checked').value;

  if (!data || !hora || !endereco) {
    mostrarToast("Preencha data, hora e endereço.", "error");
    return;
  }
  adicionarAgendamento({ data, hora, endereco, obs, tipo });
  agendaForm.reset();
  agendaDataInput.value = hojeISO();
  mostrarToast("Agendamento criado! 📅");
  renderizarAgenda();
}

function removerAgendamentoPelaLista(event) {
  const btn = event.target.closest(".remove-btn");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (confirm("Excluir este agendamento?")) {
    removerAgendamento(id);
    renderizarAgenda();
  }
}


// ============================================================
// TELA: RESUMO
// ============================================================

const ehHojeFiltro     = d => new Date().toDateString() === new Date(d).toDateString();
const getStartOfWeek   = d => { const dt = new Date(d); const day = dt.getDay(); const diff = dt.getDate() - day + (day === 0 ? -6 : 1); return new Date(dt.setDate(diff)); };
const ehNestaSemana    = d => new Date(d) >= getStartOfWeek(new Date());
const ehNesteMes       = d => new Date().getMonth() === new Date(d).getMonth() && new Date().getFullYear() === new Date(d).getFullYear();
const ehNesteAno       = d => new Date().getFullYear() === new Date(d).getFullYear();

function calcularMetricas(lista, filtro) {
  const filtradas = lista.filter(v => v.dataAgendada && filtro(v.dataAgendada + "T00:00:00"));
  return { valor: filtradas.reduce((s,v) => s + v.valor, 0), qtd: filtradas.length };
}

function setProgressBar(fillId, pctId, valor, meta) {
  const pct = Math.min(100, Math.round((valor / (meta || 1)) * 100));
  document.querySelector(`#${fillId}`).style.width = `${pct}%`;
  document.querySelector(`#${pctId}`).textContent = `${pct}%`;
}

function renderizarResumo() {
  const vistorias = listarVistorias();
  const metaDiaria = appConfig.metaDiaria || 200;
  const metaMensal = appConfig.metaMensal || 4000;

  historicoVazio.classList.toggle("hidden", vistorias.length > 0);
  historicoLista.innerHTML = "";

  if (vistorias.length === 0) {
    const zero = formatarMoeda(0);
    [dashboardHojeValor, dashboardSemanaValor, dashboardMesValor, dashboardAnoValor,
     ganhoEntradasValor, ganhoSaidasValor, rankingMaiorValor, rankingMenorValor,
     rankingMediaValor, melhorDiaValor].forEach(el => el.textContent = zero);
    [dashboardHojeQtd, dashboardSemanaQtd, dashboardMesQtd, dashboardAnoQtd,
     ganhoEntradasQtd, ganhoSaidasQtd].forEach(el => el.textContent = "0 vistorias");
    melhorDiaNome.textContent = "N/A";

    setProgressBar("meta-diaria-fill", "meta-diaria-pct", 0, metaDiaria);
    setProgressBar("meta-mensal-fill", "meta-mensal-pct", 0, metaMensal);
    document.querySelector("#meta-diaria-atual").textContent = zero;
    document.querySelector("#meta-diaria-total").textContent = `Meta: ${formatarMoeda(metaDiaria)}`;
    document.querySelector("#meta-mensal-atual").textContent = zero;
    document.querySelector("#meta-mensal-total").textContent = `Meta: ${formatarMoeda(metaMensal)}`;
    return;
  }

  // Histórico
  [...vistorias].sort((a,b) => b.dataAgendada.localeCompare(a.dataAgendada)).forEach(v => {
    const li = document.createElement("li");
    li.className = "historic-card";
    const mobLabel = v.mobilia ? " · Mobília" : "";
    const qualLabel= v.qualidade ? " · Qualidade" : "";
    li.innerHTML = `
      <div class="hc-icon ${v.tipo}">${v.tipo === "entrada" ? "ENT" : "SAÍ"}</div>
      <div class="hc-details">
        <strong>${v.metragem}m²${mobLabel}${qualLabel}</strong>
        <small>${formatarData(v.dataAgendada)}${v.hora ? " · " + v.hora : ""}</small>
      </div>
      <div class="hc-right">
        <span class="hc-valor">${formatarMoeda(v.valor)}</span>
        <button class="remove-btn" data-id="${v.id}" aria-label="Excluir">&times;</button>
      </div>
    `;
    historicoLista.appendChild(li);
  });

  // Dashboard
  const hoje   = calcularMetricas(vistorias, ehHojeFiltro);
  const semana = calcularMetricas(vistorias, ehNestaSemana);
  const mes    = calcularMetricas(vistorias, ehNesteMes);
  const ano    = calcularMetricas(vistorias, ehNesteAno);

  dashboardHojeValor.textContent   = formatarMoeda(hoje.valor);
  dashboardHojeQtd.textContent     = `${hoje.qtd} vistoria${hoje.qtd !== 1 ? "s" : ""}`;
  dashboardSemanaValor.textContent  = formatarMoeda(semana.valor);
  dashboardSemanaQtd.textContent   = `${semana.qtd} vistoria${semana.qtd !== 1 ? "s" : ""}`;
  dashboardMesValor.textContent    = formatarMoeda(mes.valor);
  dashboardMesQtd.textContent      = `${mes.qtd} vistoria${mes.qtd !== 1 ? "s" : ""}`;
  dashboardAnoValor.textContent    = formatarMoeda(ano.valor);
  dashboardAnoQtd.textContent      = `${ano.qtd} vistoria${ano.qtd !== 1 ? "s" : ""}`;

  // Metas com progresso
  setProgressBar("meta-diaria-fill", "meta-diaria-pct", hoje.valor, metaDiaria);
  setProgressBar("meta-mensal-fill", "meta-mensal-pct", mes.valor,  metaMensal);
  document.querySelector("#meta-diaria-atual").textContent = formatarMoeda(hoje.valor);
  document.querySelector("#meta-diaria-total").textContent = `Meta: ${formatarMoeda(metaDiaria)}`;
  document.querySelector("#meta-mensal-atual").textContent = formatarMoeda(mes.valor);
  document.querySelector("#meta-mensal-total").textContent = `Meta: ${formatarMoeda(metaMensal)}`;

  // Métricas
  const entradas = vistorias.filter(v => v.tipo === "entrada");
  const saidas   = vistorias.filter(v => v.tipo === "saida");
  ganhoEntradasValor.textContent = formatarMoeda(entradas.reduce((s,v) => s+v.valor, 0));
  ganhoEntradasQtd.textContent   = `${entradas.length} vistorias`;
  ganhoSaidasValor.textContent   = formatarMoeda(saidas.reduce((s,v) => s+v.valor, 0));
  ganhoSaidasQtd.textContent     = `${saidas.length} vistorias`;

  const valores = vistorias.map(v => v.valor);
  rankingMaiorValor.textContent  = formatarMoeda(Math.max(...valores));
  rankingMenorValor.textContent  = formatarMoeda(Math.min(...valores));
  rankingMediaValor.textContent  = formatarMoeda(valores.reduce((s,v) => s+v, 0) / valores.length);

  const ganhosPorDia = vistorias.reduce((acc, v) => {
    const dia = new Date(v.dataAgendada + "T00:00:00").getDay();
    acc[dia] = (acc[dia] || 0) + v.valor;
    return acc;
  }, {});
  const [diaIdx, diaVal] = Object.entries(ganhosPorDia)
    .reduce((m, [d,v]) => v > m[1] ? [d,v] : m, [-1, -Infinity]);
  melhorDiaNome.textContent = diaIdx > -1 ? DIAS_SEMANA[diaIdx] : "N/A";
  melhorDiaValor.textContent = formatarMoeda(diaVal > 0 ? diaVal : 0);
}

function removerVistoriaDoHistorico(event) {
  const btn = event.target.closest(".remove-btn");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (confirm("Excluir esta vistoria?")) {
    removerVistoria(id);
    renderizarResumo();
  }
}


// ============================================================
// ALERTAS
// ============================================================

function renderizarAlertas() {
  if (!alertasContainer) return;
  alertasContainer.innerHTML = "";
  const vistorias    = listarVistorias();
  const agendamentos = listarAgendamentos();
  const hoje         = hojeISO();
  const metaDiaria   = appConfig.metaDiaria || 200;

  const deHoje     = vistorias.filter(v => v.dataAgendada === hoje);
  const agHoje     = agendamentos.filter(a => a.data === hoje);
  const totalHoje  = deHoje.reduce((s, v) => s + v.valor, 0);

  if (agHoje.length > 0) {
    criarAlerta("info", `${agHoje.length} vistoria${agHoje.length > 1 ? "s" : ""} agendada${agHoje.length > 1 ? "s" : ""} para hoje`);
  }
  if (deHoje.length > 0 && totalHoje >= metaDiaria) {
    criarAlerta("success", `Meta diária atingida! ${formatarMoeda(totalHoje)}`);
  } else if (deHoje.length === 0 && agHoje.length === 0) {
    criarAlerta("warning", "Nenhuma vistoria registrada hoje");
  }
}

function criarAlerta(tipo, texto) {
  const el = document.createElement("div");
  el.className = `alerta ${tipo}`;
  el.textContent = texto;
  alertasContainer.appendChild(el);
}


// ============================================================
// TELA: CONFIGURAÇÕES
// ============================================================

function renderizarConfig() {
  configMetaDiaria.value  = appConfig.metaDiaria  ?? 200;
  configMetaMensal.value  = appConfig.metaMensal  ?? 4000;
  configCombustivel.value = appConfig.combustivel ?? 0;
  configPedagio.value     = appConfig.pedagio     ?? 0;
  configNome.value        = localStorage.getItem("vistoriaUserName") || appConfig.nome || "";
  configTema.checked      = appConfig.tema === "dark";
}

function salvarConfig() {
  const novoNome = configNome.value.trim();
  const novaConfig = {
    metaDiaria:  Number(configMetaDiaria.value)  || 200,
    metaMensal:  Number(configMetaMensal.value)  || 4000,
    combustivel: Number(configCombustivel.value) || 0,
    pedagio:     Number(configPedagio.value)     || 0,
    nome:        novoNome,
    tema:        configTema.checked ? "dark" : "light",
  };
  Object.assign(appConfig, salvarConfigDados(novaConfig));
  if (novoNome) localStorage.setItem("vistoriaUserName", novoNome);
  aplicarTema(appConfig.tema);
  mostrarToast("Configurações salvas! ✓");
}


// ============================================================
// INICIALIZAÇÃO
// ============================================================

function inicializar() {
  // PWA service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }

  // Splash → Onboarding → App
  splashEnterBtn.addEventListener("click", handleOnboarding);

  startBtn.addEventListener("click", () => {
    onboardingWelcome.classList.add("hidden");
    onboardingName.classList.remove("hidden");
    nameInput.focus();
  });

  continueBtn.addEventListener("click", () => {
    const nome = nameInput.value.trim();
    if (!nome) { mostrarToast("Digite seu nome para continuar.", "error"); return; }
    localStorage.setItem("vistoriaUserName", nome);
    Object.assign(appConfig, salvarConfigDados({ nome }));
    startApp(nome);
  });

  nameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") continueBtn.click();
  });

  onboardingBackBtn.addEventListener("click", () => {
    onboardingName.classList.add("hidden");
    onboardingWelcome.classList.remove("hidden");
  });

  // Perfil
  profileButton.addEventListener("click", changeUserName);

  // Bottom nav
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => trocarTela(btn.dataset.tela));
  });

  // FAB
  fabBtn.addEventListener("click", () => trocarTela("novaVistoria"));

  // Action cards no home (delegação)
  document.querySelector("#tela-home").addEventListener("click", e => {
    const card = e.target.closest("[data-tela]");
    if (card) trocarTela(card.dataset.tela);
  });

  // Nova Vistoria
  vistoriaDataInput.value = hojeISO();
  vistoriaHoraInput.value = horaAtual();
  vistoriaCalcularBtn.addEventListener("click", calcularEExibirValor);
  vistoriaSalvarBtn.addEventListener("click", salvarVistoria);

  // Calcular em tempo real
  [vistoriaMetragemInput, vistoriaMobiliaInput, vistoriaQualidadeInput].forEach(el => {
    el.addEventListener("input", calcularEExibirValor);
  });
  document.querySelectorAll("input[name='vistoria-tipo']").forEach(r => {
    r.addEventListener("change", calcularEExibirValor);
  });

  // Agenda
  agendaDataInput.value = hojeISO();
  agendaForm.addEventListener("submit", adicionarAgendamentoPeloFormulario);
  document.querySelector("#agenda-grupos").addEventListener("click", removerAgendamentoPelaLista);

  // Resumo
  historicoLista.addEventListener("click", removerVistoriaDoHistorico);

  // Config
  configSaveBtn.addEventListener("click", salvarConfig);
  configTema.addEventListener("change", () => aplicarTema(configTema.checked ? "dark" : "light"));
}

inicializar();
