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

// Autenticação e sincronização
const loginScreen    = document.querySelector("#login-screen");
const loginForm      = document.querySelector("#login-form");
const loginEmail     = document.querySelector("#login-email");
const loginSenha     = document.querySelector("#login-senha");
const loginErro      = document.querySelector("#login-erro");
const loginSubmit    = document.querySelector("#login-submit");
const logoutButton   = document.querySelector("#logout-button");
const syncButton     = document.querySelector("#sync-button");
const syncDataButton = document.querySelector("#sync-data-button");
const syncStatus     = document.querySelector("#sync-status");

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
const vistoriaIdInput       = document.querySelector("#vistoria-id");
const vistoriaAgendamentoIdInput = document.querySelector("#vistoria-agendamento-id");
const vistoriaOrigem        = document.querySelector("#vistoria-origem");
const vistoriaDataInput     = document.querySelector("#vistoria-data");
const vistoriaHoraInput     = document.querySelector("#vistoria-hora");
const vistoriaMetragemInput = document.querySelector("#vistoria-metragem");
const vistoriaMobiliaInput  = document.querySelector("#vistoria-mobilia");
const vistoriaQualidadeInput= document.querySelector("#vistoria-qualidade");
const vistoriaValorPreview  = document.querySelector("#vistoria-valor-preview");
const vistoriaCalcularBtn   = document.querySelector("#vistoria-calcular-btn");
const vistoriaSalvarBtn     = document.querySelector("#vistoria-salvar-btn");
const vistoriaClienteNomeInput = document.querySelector("#vistoria-cliente-nome");
const vistoriaClienteTelefoneInput = document.querySelector("#vistoria-cliente-telefone");
const vistoriaImovelTipoInput = document.querySelector("#vistoria-imovel-tipo");
const vistoriaImovelIdentificacaoInput = document.querySelector("#vistoria-imovel-identificacao");
const vistoriaCepInput = document.querySelector("#vistoria-cep");
const vistoriaRuaInput = document.querySelector("#vistoria-rua");
const vistoriaNumeroInput = document.querySelector("#vistoria-numero");
const vistoriaComplementoInput = document.querySelector("#vistoria-complemento");
const vistoriaBairroInput = document.querySelector("#vistoria-bairro");
const vistoriaCidadeInput = document.querySelector("#vistoria-cidade");
const vistoriaUfInput = document.querySelector("#vistoria-uf");
const vistoriaEnderecoCompletoInput = document.querySelector("#vistoria-endereco-completo");
const vistoriaNomeResponsavelAceiteInput = document.querySelector("#vistoria-nome-responsavel-aceite");
const vistoriaDocumentoResponsavelInput = document.querySelector("#vistoria-documento-responsavel");
const vistoriaObservacaoAceiteInput = document.querySelector("#vistoria-observacao-aceite");
const vistoriaAceiteConfirmadoInput = document.querySelector("#vistoria-aceite-confirmado");

// Tela: Agenda
const agendaForm         = document.querySelector("#agenda-form");
const agendaIdInput      = document.querySelector("#agenda-id");
const agendaDataInput    = document.querySelector("#agenda-data");
const agendaHoraInput    = document.querySelector("#agenda-hora");
const agendaImovelCodigoInput = document.querySelector("#agenda-imovel-codigo");
const agendaClienteNomeInput = document.querySelector("#agenda-cliente-nome");
const agendaClienteTelefoneInput = document.querySelector("#agenda-cliente-telefone");
const agendaImovelTipoInput = document.querySelector("#agenda-imovel-tipo");
const agendaImovelIdentificacaoInput = document.querySelector("#agenda-imovel-identificacao");
const agendaCepInput = document.querySelector("#agenda-cep");
const agendaCepStatus = document.querySelector("#agenda-cep-status");
const agendaRuaInput = document.querySelector("#agenda-rua");
const agendaNumeroInput = document.querySelector("#agenda-numero");
const agendaComplementoInput = document.querySelector("#agenda-complemento");
const agendaBairroInput = document.querySelector("#agenda-bairro");
const agendaCidadeInput = document.querySelector("#agenda-cidade");
const agendaUfInput = document.querySelector("#agenda-uf");
const agendaEnderecoCompletoInput = document.querySelector("#agenda-endereco-completo");
const agendaObsInput     = document.querySelector("#agenda-obs");
const agendaStatusInput  = document.querySelector("#agenda-status");
const agendaLista        = document.querySelector("#agenda-lista");
const agendaVazia        = document.querySelector("#agenda-vazia");
const agendaFiltroStatus = document.querySelector("#agenda-filtro-status");
let filtroPeriodo = "hoje";

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
const configWhatsapp    = document.querySelector("#config-whatsapp");
const configTema        = document.querySelector("#config-tema");
const configSaveBtn     = document.querySelector("#config-save-btn");
const exportBtn         = document.querySelector("#export-btn");
const importInput       = document.querySelector("#import-input");


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
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

function getDataFormatada() {
  const d = new Date();
  return `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

function primeiroNomeUsuario(nome, email = "") {
  const base = String(nome || "").trim() || String(email).split("@")[0];
  const primeiro = base.split(/[\s._-]+/).find(Boolean) || "Usuário";
  return primeiro.charAt(0).toUpperCase() + primeiro.slice(1).toLowerCase();
}

function clienteDoAgendamento(ag) {
  return String(ag?.clienteNome || ag?.responsavel || "").trim();
}

function imovelDoAgendamento(ag) {
  return String(ag?.imovelIdentificacao || ag?.unidadeCliente || ag?.imovelTipo || "").trim();
}

function montarEnderecoCompleto(dados) {
  const ruaNumero = [dados.rua, dados.numero].filter(Boolean).join(", ");
  const cidadeUf = [dados.cidade, dados.uf].filter(Boolean).join(" - ");
  return [ruaNumero, dados.complemento, dados.bairro, cidadeUf].map(v => String(v || "").trim()).filter(Boolean).join(", ");
}

function enderecoDoAgendamento(ag) {
  return String(ag?.enderecoCompleto || montarEnderecoCompleto(ag || {}) || ag?.endereco || "").trim();
}

function enderecoResumidoDoAgendamento(ag) {
  const ruaNumero = [ag?.rua, ag?.numero].filter(Boolean).join(", ");
  return [ruaNumero, ag?.bairro].filter(Boolean).join(" · ") || enderecoDoAgendamento(ag);
}

function atualizarEnderecoCompletoFormulario() {
  agendaEnderecoCompletoInput.value = montarEnderecoCompleto({
    rua: agendaRuaInput.value, numero: agendaNumeroInput.value,
    complemento: agendaComplementoInput.value, bairro: agendaBairroInput.value,
    cidade: agendaCidadeInput.value, uf: agendaUfInput.value.toUpperCase()
  });
}

let consultaCepController = null;
let ultimoCepConsultado = "";

async function consultarCep() {
  const digitos = agendaCepInput.value.replace(/\D/g, "").slice(0, 8);
  agendaCepInput.value = digitos.length > 5 ? digitos.slice(0, 5) + "-" + digitos.slice(5) : digitos;
  if (digitos.length !== 8) {
    ultimoCepConsultado = "";
    agendaCepStatus.textContent = "";
    if (consultaCepController) consultaCepController.abort();
    return;
  }
  if (digitos === ultimoCepConsultado) return;
  if (consultaCepController) consultaCepController.abort();
  consultaCepController = new AbortController();
  agendaCepStatus.className = "field-hint loading";
  agendaCepStatus.textContent = "Buscando endereço...";

  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + digitos + "/json/", {
      signal: consultaCepController.signal
    });
    if (!resposta.ok) throw new Error("ViaCEP respondeu HTTP " + resposta.status);
    const endereco = await resposta.json();
    if (endereco.erro) throw new Error("CEP não encontrado.");
    agendaRuaInput.value = endereco.logradouro || "";
    agendaBairroInput.value = endereco.bairro || "";
    agendaCidadeInput.value = endereco.localidade || "";
    agendaUfInput.value = String(endereco.uf || "").toUpperCase();
    atualizarEnderecoCompletoFormulario();
    ultimoCepConsultado = digitos;
    agendaCepStatus.className = "field-hint success";
    agendaCepStatus.textContent = "Endereço encontrado. Preencha número e complemento.";
  } catch (erro) {
    if (erro.name === "AbortError") return;
    ultimoCepConsultado = "";
    agendaCepStatus.className = "field-hint error";
    agendaCepStatus.textContent = erro.message || "Não foi possível consultar o CEP.";
  }
}

function textoSeguro(valor) {
  const div = document.createElement("div");
  div.textContent = valor == null ? "" : String(valor);
  return div.innerHTML;
}

function definirSync(estado, mensagem) {
  syncStatus.className = `sync-status ${estado}`;
  syncStatus.textContent = `● ${mensagem}`;
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

function trocarTela(nomeTela, preservarFormularioVistoria = false) {
  if (!telaEls[nomeTela]) return;

  if (nomeTela === "novaVistoria" && !preservarFormularioVistoria) limparFormularioVistoria();

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

async function startApp(session) {
  onboardingWelcome.classList.add("hidden");
  onboardingName.classList.add("hidden");
  splashScreen.style.display = "none";
  loginScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
  definirUsuarioLocal(session.user.uid || session.user.id);
  let nome = session.user.email.split("@")[0];
  try {
    const perfil = await onlineBackend.ensureProfile(session);
    nome = primeiroNomeUsuario(perfil.nome, session.user.email);
    salvarNomeUsuarioLocal(nome);
    await carregarDadosOnline();
    definirSync(possuiDadosLocaisPendentes() ? "local" : "synced", possuiDadosLocaisPendentes() ? "Dados locais pendentes" : "Sincronizado");
  } catch (erro) {
    definirSync("error", "Erro na sincronização");
    console.error(erro);
  }
  aplicarTema(appConfig.tema);
  trocarTela("home");
}

async function handleOnboarding() {
  splashScreen.classList.add("fade-out");
  if (!onlineBackend.configured) {
    setTimeout(() => {
      splashScreen.style.display = "none";
      loginScreen.classList.remove("hidden");
      document.querySelector("#login-config-aviso").classList.remove("hidden");
    }, 300);
    return;
  }
  try {
    const session = await onlineBackend.currentSession();
    if (session) await startApp(session);
    else {
      splashScreen.style.display = "none";
      loginScreen.classList.remove("hidden");
      loginEmail.focus();
    }
  } catch (erro) {
    splashScreen.style.display = "none";
    loginScreen.classList.remove("hidden");
    loginErro.textContent = erro.message;
    loginErro.classList.remove("hidden");
  }
}

async function autenticar(event) {
  event.preventDefault();
  loginErro.classList.add("hidden");
  loginSubmit.disabled = true;
  loginSubmit.textContent = "Entrando...";
  try {
    const firebaseConfig = window.APP_CONFIG?.firebase;
    if (!firebaseConfig) {
      throw Object.assign(new Error("window.APP_CONFIG.firebase não foi encontrado. Verifique se config.js foi carregado antes de firebase.js."), {
        code: "app/config-ausente"
      });
    }
    if (firebaseConfig.projectId !== "vistorias-app-a73c9") {
      throw Object.assign(new Error(`projectId inesperado: ${firebaseConfig.projectId || "vazio"}`), {
        code: "app/project-id-incorreto"
      });
    }
    if (firebaseConfig.authDomain !== "vistorias-app-a73c9.firebaseapp.com") {
      throw Object.assign(new Error(`authDomain inesperado: ${firebaseConfig.authDomain || "vazio"}`), {
        code: "app/auth-domain-incorreto"
      });
    }

    console.info("[Firebase Auth] Configuração carregada", {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      configured: onlineBackend.configured
    });

    const identificador = loginEmail.value.trim().toLowerCase();
    const email = identificador.includes("@") ? identificador : `${identificador}@vistoria.local`;
    const session = await onlineBackend.login(email, loginSenha.value);
    loginSenha.value = "";
    await startApp(session);
  } catch (error) {
    console.error(error);
    const firebaseConfig = window.APP_CONFIG?.firebase;
    const code = error?.code || "sem-codigo";
    const message = error?.message || String(error);
    const diagnosticos = {
      "auth/invalid-credential": "A credencial não foi aceita pelo Firebase.",
      "auth/unauthorized-domain": "Este domínio não está autorizado no Firebase Authentication.",
      "auth/network-request-failed": "Falha de rede ao acessar o Firebase.",
      "auth/too-many-requests": "Muitas tentativas; o Firebase bloqueou temporariamente o acesso.",
      "app/config-ausente": "O arquivo config.js não foi carregado corretamente.",
      "app/project-id-incorreto": "O app está apontando para outro projeto Firebase.",
      "app/auth-domain-incorreto": "O authDomain configurado não corresponde ao projeto esperado."
    };
    loginErro.style.whiteSpace = "pre-line";
    loginErro.textContent = `${diagnosticos[code] || "O Firebase retornou um erro de autenticação."}\nCódigo: ${code}\nMensagem: ${message}\nprojectId: ${firebaseConfig?.projectId || "ausente"}\nauthDomain: ${firebaseConfig?.authDomain || "ausente"}`;
    loginErro.classList.remove("hidden");
  } finally {
    loginSubmit.disabled = false;
    loginSubmit.textContent = "Entrar";
  }
}

async function sincronizarAparelho() {
  if (!onlineBackend.configured) return mostrarToast("Configure o Firebase em config.js.", "error");
  if (!confirm("Enviar os dados locais deste aparelho para sua conta? Nada será apagado.")) return;
  definirSync("local", "Sincronizando...");
  syncDataButton.disabled = true;
  try {
    const total = await importarDadosLocais();
    definirSync("synced", "Sincronizado");
    renderizarHome(); renderizarAgenda(); renderizarResumo();
    mostrarToast(`${total.vistorias} vistoria(s) e ${total.agendamentos} agendamento(s) sincronizados.`);
  } catch (erro) {
    definirSync("error", "Erro na sincronização");
    mostrarToast("Nada foi apagado: " + erro.message, "error");
  } finally {
    syncDataButton.disabled = false;
  }
}

function changeUserName() {
  const atual = obterNomeUsuarioLocal();
  const novo = prompt("Qual é o seu nome?", atual);
  if (novo && novo.trim()) {
    salvarNomeUsuarioLocal(novo.trim());
    Object.assign(appConfig, carregarConfig());
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
  const nome = obterNomeUsuarioLocal();
  const primeiroNome = primeiroNomeUsuario(nome);
  const hora = new Date().getHours();
  const periodo = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  // Saudação
  document.querySelector("#greeting-period").textContent = periodo;
  document.querySelector("#greeting-name").textContent = `Olá, ${primeiroNome}`;
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
        <span class="next-tipo entrada">${textoSeguro(proxima.statusConfirmacao || "Agendado")}</span>
        <div class="next-time">${proxima.hora} &mdash; ${formatarDataCurta(proxima.data)}</div>
        <div class="next-address"><strong>${textoSeguro(clienteDoAgendamento(proxima))}</strong></div>
        <div class="next-address">📍 ${textoSeguro(enderecoResumidoDoAgendamento(proxima))}</div>
        ${proxima.obs ? `<div class="next-address">📝 ${textoSeguro(proxima.obs)}</div>` : ""}
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

const ACEITE_TEXTO_PADRAO = "Declaro que acompanhei a vistoria e estou ciente das informações registradas.";
const agendamentosIniciando = new Set();

function limparFormularioVistoria() {
  vistoriaForm.reset();
  vistoriaIdInput.value = "";
  vistoriaAgendamentoIdInput.value = "";
  vistoriaOrigem.classList.add("hidden");
  vistoriaDataInput.value = hojeISO();
  vistoriaHoraInput.value = horaAtual();
  vistoriaValorPreview.textContent = formatarMoeda(0);
  vistoriaSalvarBtn.textContent = "Finalizar vistoria";
}

function abrirVistoriaNoFormulario(vistoria) {
  limparFormularioVistoria();
  vistoriaIdInput.value = vistoria.id || "";
  vistoriaAgendamentoIdInput.value = vistoria.agendamentoId || "";
  vistoriaDataInput.value = vistoria.dataAgendada || hojeISO();
  vistoriaHoraInput.value = vistoria.hora || horaAtual();
  vistoriaMetragemInput.value = Number(vistoria.metragem) > 0 ? vistoria.metragem : "";
  vistoriaMobiliaInput.checked = Boolean(vistoria.mobilia);
  vistoriaQualidadeInput.checked = Boolean(vistoria.qualidade);
  document.querySelectorAll("input[name='vistoria-tipo']").forEach(input => {
    input.checked = input.value === (vistoria.tipo || "entrada");
  });

  const camposOrigem = [
    [vistoriaClienteNomeInput, vistoria.clienteNome], [vistoriaClienteTelefoneInput, vistoria.clienteTelefone],
    [vistoriaImovelTipoInput, vistoria.imovelTipo], [vistoriaImovelIdentificacaoInput, vistoria.imovelIdentificacao],
    [vistoriaCepInput, vistoria.cep], [vistoriaRuaInput, vistoria.rua], [vistoriaNumeroInput, vistoria.numero],
    [vistoriaComplementoInput, vistoria.complemento], [vistoriaBairroInput, vistoria.bairro],
    [vistoriaCidadeInput, vistoria.cidade], [vistoriaUfInput, vistoria.uf],
    [vistoriaEnderecoCompletoInput, vistoria.enderecoCompleto]
  ];
  camposOrigem.forEach(([input, valor]) => { input.value = valor || ""; });
  vistoriaOrigem.classList.toggle("hidden", !vistoria.agendamentoId);

  const acompanhou = vistoria.clienteAcompanhou || "Não";
  document.querySelectorAll("input[name='cliente-acompanhou']").forEach(input => {
    input.checked = input.value === acompanhou;
  });
  vistoriaNomeResponsavelAceiteInput.value = vistoria.nomeResponsavelAceite || vistoria.clienteNome || "";
  vistoriaDocumentoResponsavelInput.value = vistoria.documentoResponsavel || "";
  vistoriaObservacaoAceiteInput.value = vistoria.observacaoAceite || "";
  vistoriaAceiteConfirmadoInput.checked = Boolean(vistoria.aceiteConfirmado);
  vistoriaSalvarBtn.textContent = vistoria.rascunho ? "Finalizar vistoria" : "Salvar alterações";
  calcularEExibirValor();
  trocarTela("novaVistoria", true);
}

function dadosVistoriaDoAgendamento(agendamento) {
  return {
    agendamentoId: agendamento.onlineId || agendamento.id,
    dataAgendada: agendamento.data || hojeISO(), hora: agendamento.hora || horaAtual(),
    clienteNome: agendamento.clienteNome || agendamento.responsavel || "",
    clienteTelefone: agendamento.clienteTelefone || agendamento.telefoneWhatsapp || "",
    imovelTipo: agendamento.imovelTipo || "",
    imovelIdentificacao: agendamento.imovelIdentificacao || agendamento.unidadeCliente || "",
    cep: agendamento.cep || "", rua: agendamento.rua || "", numero: agendamento.numero || "",
    complemento: agendamento.complemento || "", bairro: agendamento.bairro || "",
    cidade: agendamento.cidade || "", uf: agendamento.uf || "",
    enderecoCompleto: agendamento.enderecoCompleto || agendamento.endereco || "",
    metragem: 0, tipo: agendamento.tipo || "entrada", mobilia: false, qualidade: false, valor: 0,
    clienteAcompanhou: "Não", nomeResponsavelAceite: agendamento.clienteNome || agendamento.responsavel || "",
    documentoResponsavel: "", observacaoAceite: "", aceiteTexto: ACEITE_TEXTO_PADRAO,
    aceiteConfirmado: false, rascunho: true
  };
}

async function iniciarVistoriaDoAgendamento(agendamento) {
  const chave = String(agendamento.onlineId || agendamento.id);
  if (agendamentosIniciando.has(chave)) return;
  agendamentosIniciando.add(chave);
  try {
    let vistoria = buscarVistoriaPorAgendamento(agendamento);
    if (!vistoria) {
      try {
        vistoria = await adicionarVistoria(dadosVistoriaDoAgendamento(agendamento));
      } catch (erro) {
        vistoria = buscarVistoriaPorAgendamento(agendamento);
        if (!vistoria) throw erro;
        definirSync("error", "Pendente de sincronização");
        mostrarToast(erro.message, "error");
      }
    }
    if (agendamento.statusConfirmacao !== "Vistoria iniciada") {
      try {
        await atualizarAgendamento(agendamento.id, { statusConfirmacao: "Vistoria iniciada" });
      } catch (erro) {
        definirSync("error", "Pendente de sincronização");
        mostrarToast(erro.message, "error");
      }
    }
    abrirVistoriaNoFormulario(vistoria);
  } finally {
    agendamentosIniciando.delete(chave);
  }
}

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

async function salvarVistoria() {
  const data     = vistoriaDataInput.value;
  const hora     = vistoriaHoraInput.value;
  const metragem = Number(vistoriaMetragemInput.value);
  if (!data || !metragem) {
    mostrarToast("Preencha a data e a metragem.", "error");
    return;
  }
  if (!vistoriaNomeResponsavelAceiteInput.value.trim()) {
    mostrarToast("Informe o nome do responsável pelo aceite.", "error");
    vistoriaNomeResponsavelAceiteInput.focus();
    return;
  }
  if (!vistoriaAceiteConfirmadoInput.checked) {
    mostrarToast("Confirme o aceite do cliente para finalizar.", "error");
    vistoriaAceiteConfirmadoInput.focus();
    return;
  }
  try {
    const tipo     = document.querySelector("input[name='vistoria-tipo']:checked").value;
    const mobilia  = vistoriaMobiliaInput.checked;
    const qualidade= vistoriaQualidadeInput.checked;
    const valor    = calcularVistoria(metragem, tipo, mobilia, qualidade);

    const dados = {
      dataAgendada: data, hora, metragem, tipo, mobilia, qualidade, valor,
      agendamentoId: vistoriaAgendamentoIdInput.value || "",
      clienteNome: vistoriaClienteNomeInput.value || "",
      clienteTelefone: vistoriaClienteTelefoneInput.value || "",
      imovelTipo: vistoriaImovelTipoInput.value || "",
      imovelIdentificacao: vistoriaImovelIdentificacaoInput.value || "",
      cep: vistoriaCepInput.value || "", rua: vistoriaRuaInput.value || "",
      numero: vistoriaNumeroInput.value || "", complemento: vistoriaComplementoInput.value || "",
      bairro: vistoriaBairroInput.value || "", cidade: vistoriaCidadeInput.value || "",
      uf: vistoriaUfInput.value || "", enderecoCompleto: vistoriaEnderecoCompletoInput.value || "",
      clienteAcompanhou: document.querySelector("input[name='cliente-acompanhou']:checked")?.value || "Não",
      nomeResponsavelAceite: vistoriaNomeResponsavelAceiteInput.value.trim(),
      documentoResponsavel: vistoriaDocumentoResponsavelInput.value.trim(),
      observacaoAceite: vistoriaObservacaoAceiteInput.value.trim(),
      aceiteTexto: ACEITE_TEXTO_PADRAO, aceiteConfirmado: true, rascunho: false
    };
    if (vistoriaIdInput.value) await atualizarVistoria(vistoriaIdInput.value, dados);
    else await adicionarVistoria(dados);

    mostrarToast("Vistoria salva com sucesso! ✓");
    definirSync("synced", "Sincronizado");
    limparFormularioVistoria();
  } catch (err) {
    definirSync("error", "Erro na sincronização");
    renderizarHome();
    mostrarToast("Erro: " + err.message, "error");
  }
}


// ============================================================
// TELA: AGENDA
// ============================================================

function renderizarAgenda() {
  const status = agendaFiltroStatus.value;
  const lista = listarAgendamentos().filter(ag => {
    const periodoOk = filtroPeriodo === "todos"
      || (filtroPeriodo === "hoje" && ag.data === hojeISO())
      || (filtroPeriodo === "amanha" && ag.data === amanhaISO());
    return periodoOk && (!status || ag.statusConfirmacao === status);
  }).sort((a,b) => `${a.data}T${a.hora}`.localeCompare(`${b.data}T${b.hora}`));

  agendaLista.innerHTML = "";
  agendaVazia.classList.toggle("hidden", lista.length > 0);
  lista.forEach(ag => {
    const vistoriaVinculada = buscarVistoriaPorAgendamento(ag);
    const li = document.createElement("li");
    li.className = "agenda-card";
    li.dataset.id = ag.id;
    const codBadge = ag.imovelCodigo ? ` · Cód: ${textoSeguro(ag.imovelCodigo)}` : "";
    const tipoLabel = ag.tipo === "saida" ? "Saída" : "Entrada";
    li.innerHTML = `
      <div class="agenda-card-header">
        <div><small>${textoSeguro(imovelDoAgendamento(ag))}${codBadge} · Vistoria de ${tipoLabel}</small><strong>${textoSeguro(clienteDoAgendamento(ag))}</strong></div>
        <span class="status-badge">${textoSeguro(ag.statusConfirmacao)}</span>
      </div>
      <div class="agenda-card-time">${textoSeguro(ag.hora)} · ${formatarData(ag.data)}</div>
      <div class="agenda-card-address">📍 ${textoSeguro(enderecoDoAgendamento(ag))}</div>
      <div class="agenda-card-address">WhatsApp: ${textoSeguro(ag.clienteTelefone || ag.telefoneWhatsapp)}</div>
      ${ag.obs ? `<div class="agenda-card-obs">📝 ${textoSeguro(ag.obs)}</div>` : ""}
      <label class="inline-status">Status <select data-action="status">${["Aguardando envio","Mensagem enviada","Confirmado","Vistoria iniciada","Reagendar","Cancelado","Finalizado"].map(s => `<option${s === ag.statusConfirmacao ? " selected" : ""}>${s}</option>`).join("")}</select></label>
      <div class="card-actions"><button type="button" data-action="iniciar">${vistoriaVinculada ? "Abrir vistoria" : "Iniciar vistoria"}</button><button type="button" data-action="whatsapp">Enviar WhatsApp</button><button type="button" data-action="enviado">Marcar enviado</button><button type="button" data-action="editar">Editar</button><button type="button" class="danger-link" data-action="excluir">Excluir</button></div>`;
    agendaLista.appendChild(li);
  });
}

function abrirFormularioAgenda(ag = null) {
  agendaForm.classList.remove("hidden");
  ultimoCepConsultado = "";
  if (consultaCepController) consultaCepController.abort();
  agendaIdInput.value = ag?.id || "";
  agendaDataInput.value = ag?.data || hojeISO(); agendaHoraInput.value = ag?.hora || horaAtual();
  agendaImovelCodigoInput.value = ag?.imovelCodigo || "";
  document.querySelectorAll("input[name='agenda-tipo']").forEach(input => {
    input.checked = input.value === (ag?.tipo || "entrada");
  });
  agendaClienteNomeInput.value = ag?.clienteNome || ag?.responsavel || "";
  agendaClienteTelefoneInput.value = ag?.clienteTelefone || ag?.telefoneWhatsapp || "";
  agendaImovelTipoInput.value = ag?.imovelTipo || "";
  agendaImovelIdentificacaoInput.value = ag?.imovelIdentificacao || ag?.unidadeCliente || "";
  agendaCepInput.value = ag?.cep || ""; agendaRuaInput.value = ag?.rua || "";
  agendaNumeroInput.value = ag?.numero || ""; agendaComplementoInput.value = ag?.complemento || "";
  agendaBairroInput.value = ag?.bairro || ""; agendaCidadeInput.value = ag?.cidade || "";
  agendaUfInput.value = ag?.uf || ""; agendaEnderecoCompletoInput.value = enderecoDoAgendamento(ag);
  agendaCepStatus.textContent = "";
  agendaCepStatus.className = "field-hint";
  agendaObsInput.value = ag?.obs || ""; agendaStatusInput.value = ag?.statusConfirmacao || "Aguardando envio";
}
function fecharFormularioAgenda() { agendaForm.reset(); agendaIdInput.value = ""; agendaForm.classList.add("hidden"); }
function normalizarTelefone(valor) {
  const digitos = String(valor || "").replace(/\D/g, "");
  return digitos.startsWith("55") ? digitos : `55${digitos}`;
}
function telefoneValido(valor) { return /^55\d{10,11}$/.test(normalizarTelefone(valor)); }
function limparTextoCampo(val) {
  if (val === null || val === undefined) return "";
  const s = String(val).trim();
  if (s === "null" || s === "undefined") return "";
  return s;
}

function obterEnderecoCompleto(ag) {
  let endCompleto = limparTextoCampo(ag?.enderecoCompleto || ag?.endereco);
  if (endCompleto) return endCompleto;
  
  const rua = limparTextoCampo(ag?.rua);
  const numero = limparTextoCampo(ag?.numero);
  const complemento = limparTextoCampo(ag?.complemento);
  const bairro = limparTextoCampo(ag?.bairro);
  const cidade = limparTextoCampo(ag?.cidade);
  const uf = limparTextoCampo(ag?.uf);
  
  const ruaNumero = [rua, numero].filter(Boolean).join(", ");
  const cidadeUf = [cidade, uf].filter(Boolean).join(" - ");
  return [ruaNumero, complemento, bairro, cidadeUf].filter(Boolean).join(", ");
}

function linkWhatsAppAgendamento(ag) {
  const telefone = ag.clienteTelefone || ag.telefoneWhatsapp || "";
  if (!telefoneValido(telefone)) throw new Error("Use 55 + DDD + número.");
  
  const nome_vistoriadora = (obterNomeUsuarioLocal() || appConfig.nome || "").trim() || "Marcela";
  const nome_cliente = (ag.clienteNome || ag.responsavel || "").trim();
  const endereco_completo = obterEnderecoCompleto(ag);
  const data_vistoria = limparTextoCampo(ag.data ? formatarData(ag.data) : "");
  const hora_vistoria = limparTextoCampo(ag.hora);
  
  const codIntro = ag.imovelCodigo ? ` (cód: ${ag.imovelCodigo})` : "";
  const codDetail = ag.imovelCodigo ? `\nCódigo do Imóvel: ${ag.imovelCodigo}` : "";
  const tipoVistoria = ag.tipo === "saida" ? "saída" : "entrada";
  
  const saudacao = nome_cliente ? `Olá, ${nome_cliente}! Sou ${nome_vistoriadora}` : `Olá, sou ${nome_vistoriadora}`;
  const mensagem = `${saudacao}, vistoriadora credenciada do QuintoAndar e serei responsável pela vistoria de ${tipoVistoria} no seu imóvel${codIntro}.

Gostaria de fazer algumas confirmações antes de comparecer até o imóvel localizado em:

${endereco_completo}

Data da vistoria: ${data_vistoria}
Horário: ${hora_vistoria}${codDetail}

Por gentileza, poderia me confirmar as informações abaixo?

• O imóvel já está desocupado, sem moradores?
• O imóvel está em reforma?
• Poderia confirmar o local das chaves conforme consta no app?
• O imóvel possui abastecimento de água, luz e/ou gás para realizar o teste dos itens?

Peço gentilmente que, ao concordar com a vistoria, notifique o condomínio sobre a visita nesta data para que não haja impedimento na entrada.

Fico no aguardo das confirmações para darmos início aos próximos passos.

Muito obrigada.`;

  return `https://wa.me/${normalizarTelefone(telefone)}?text=${encodeURIComponent(mensagem)}`;
}

async function adicionarAgendamentoPeloFormulario(event) {
  event.preventDefault();
  const telefone = normalizarTelefone(agendaClienteTelefoneInput.value);
  if (!telefoneValido(telefone)) return mostrarToast("Telefone inválido. Use 55 + DDD + número.", "error");
  const enderecoCompleto = agendaEnderecoCompletoInput.value.trim() || montarEnderecoCompleto({
    rua: agendaRuaInput.value, numero: agendaNumeroInput.value, complemento: agendaComplementoInput.value,
    bairro: agendaBairroInput.value, cidade: agendaCidadeInput.value, uf: agendaUfInput.value.toUpperCase()
  });
  const agendaTipo = document.querySelector("input[name='agenda-tipo']:checked")?.value || "entrada";
  const dados = { data: agendaDataInput.value, hora: agendaHoraInput.value,
    imovelCodigo: agendaImovelCodigoInput.value.trim(),
    tipo: agendaTipo,
    clienteNome: agendaClienteNomeInput.value.trim(), clienteTelefone: telefone,
    imovelTipo: agendaImovelTipoInput.value.trim(), imovelIdentificacao: agendaImovelIdentificacaoInput.value.trim(),
    cep: agendaCepInput.value.trim(), rua: agendaRuaInput.value.trim(), numero: agendaNumeroInput.value.trim(),
    complemento: agendaComplementoInput.value.trim(), bairro: agendaBairroInput.value.trim(),
    cidade: agendaCidadeInput.value.trim(), uf: agendaUfInput.value.trim().toUpperCase(), enderecoCompleto,
    unidadeCliente: agendaImovelIdentificacaoInput.value.trim(), responsavel: agendaClienteNomeInput.value.trim(),
    telefoneWhatsapp: telefone, endereco: enderecoCompleto, obs: agendaObsInput.value.trim(),
    statusConfirmacao: agendaStatusInput.value };
  try {
    if (agendaIdInput.value) await atualizarAgendamento(agendaIdInput.value, dados);
    else await adicionarAgendamento(dados);
    fecharFormularioAgenda(); definirSync("synced", "Sincronizado"); renderizarAgenda(); renderizarHome();
    mostrarToast("Agendamento salvo! 📅");
  } catch (erro) { definirSync("error", "Erro na sincronização"); renderizarAgenda(); mostrarToast(erro.message, "error"); }
}

async function acaoAgenda(event) {
  const alvo = event.target.closest("[data-action]"); if (!alvo) return;
  if (alvo.dataset.action === "status" && event.type !== "change") return;
  const card = alvo.closest(".agenda-card");
  let ag = listarAgendamentos().find(a => String(a.id) === String(card.dataset.id));
  if (!ag) return;
  let popupWhatsapp = null;
  try {
    if (alvo.dataset.action === "iniciar") await iniciarVistoriaDoAgendamento(ag);
    if (alvo.dataset.action === "whatsapp") {
      popupWhatsapp = window.open("about:blank", "_blank");
      const url = linkWhatsAppAgendamento(ag);
      if (popupWhatsapp) popupWhatsapp.location.href = url;
      else window.location.href = url;
      ag = await atualizarAgendamento(ag.id, {
        statusConfirmacao: "Mensagem enviada",
        enviadoEm: new Date().toISOString()
      });
      definirSync("synced", "Sincronizado");
    }
    if (alvo.dataset.action === "enviado") await atualizarAgendamento(ag.id, { statusConfirmacao: "Mensagem enviada", enviadoEm: new Date().toISOString() });
    if (alvo.dataset.action === "editar") abrirFormularioAgenda(ag);
    if (alvo.dataset.action === "status") await atualizarAgendamento(ag.id, { statusConfirmacao: alvo.value });
    if (alvo.dataset.action === "excluir" && confirm("Excluir este agendamento?")) await removerAgendamento(ag.id);
    renderizarAgenda(); renderizarHome();
  } catch (erro) {
    if (popupWhatsapp && !popupWhatsapp.closed) popupWhatsapp.close();
    definirSync("error", "Erro na sincronização"); renderizarAgenda(); mostrarToast(erro.message, "error");
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

async function removerVistoriaDoHistorico(event) {
  const btn = event.target.closest(".remove-btn");
  if (!btn) return;
  const id = btn.dataset.id;
  if (confirm("Excluir esta vistoria?")) {
    try { await removerVistoria(id); renderizarResumo(); renderizarHome(); }
    catch (erro) { mostrarToast(erro.message, "error"); }
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
  configNome.value        = obterNomeUsuarioLocal() || appConfig.nome || "";
  configWhatsapp.value    = appConfig.whatsapp    || "";
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
    whatsapp:    configWhatsapp.value.replace(/\D/g, ""),
    tema:        configTema.checked ? "dark" : "light",
  };
  Object.assign(appConfig, salvarConfigDados(novaConfig));
  if (novoNome) salvarNomeUsuarioLocal(novoNome);
  aplicarTema(appConfig.tema);
  mostrarToast("Configurações salvas! ✓");
}


// ============================================================
// WHATSAPP
// ============================================================

function gerarRelatorioHoje() {
  const hoje      = hojeISO();
  const vistorias = listarVistorias().filter(v => v.dataAgendada === hoje);
  const total     = vistorias.reduce((s, v) => s + v.valor, 0);
  const nome      = obterNomeUsuarioLocal();
  const meta      = appConfig.metaDiaria || 200;
  const pct       = Math.round((total / meta) * 100);

  const d = new Date();
  const dataStr = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;

  let txt = `🏠 *Relatório de Vistorias*\n`;
  if (nome) txt += `👤 ${nome}\n`;
  txt += `📅 ${dataStr}\n\n`;

  if (vistorias.length === 0) {
    txt += `Nenhuma vistoria registrada hoje.\n`;
  } else {
    txt += `*${vistorias.length} vistoria${vistorias.length > 1 ? "s" : ""} hoje:*\n`;
    vistorias.forEach((v, i) => {
      const hora   = v.hora ? ` · ${v.hora}` : "";
      const extras = [v.mobilia && "Mobília", v.qualidade && "Qualidade"].filter(Boolean).join(", ");
      txt += `${i+1}. ${v.metragem}m² · ${v.tipo === "entrada" ? "Entrada" : "Saída"}${hora}${extras ? ` · ${extras}` : ""} → *${formatarMoeda(v.valor)}*\n`;
    });
    txt += `\n💰 *Total: ${formatarMoeda(total)}*\n`;
    txt += `🎯 Meta diária: ${pct}% atingida`;
    if (pct >= 100) txt += ` ✅`;
  }
  return txt;
}

function gerarRelatorioCompleto() {
  const vistorias = listarVistorias();
  const hoje      = hojeISO();
  const nome      = obterNomeUsuarioLocal();

  const deHoje  = calcularMetricas(vistorias, ehHojeFiltro);
  const doMes   = calcularMetricas(vistorias, ehNesteMes);
  const doAno   = calcularMetricas(vistorias, ehNesteAno);

  let txt = `📊 *Resumo — Vistoria App*\n`;
  if (nome) txt += `👤 ${nome}\n\n`;

  txt += `*Hoje:* ${formatarMoeda(deHoje.valor)} (${deHoje.qtd} vistorias)\n`;
  txt += `*Mês:* ${formatarMoeda(doMes.valor)} (${doMes.qtd} vistorias)\n`;
  txt += `*Ano:* ${formatarMoeda(doAno.valor)} (${doAno.qtd} vistorias)\n`;

  const meta = appConfig.metaMensal || 4000;
  const pct  = Math.round((doMes.valor / meta) * 100);
  txt += `\n🎯 Meta mensal: ${pct}% (${formatarMoeda(doMes.valor)} / ${formatarMoeda(meta)})`;
  return txt;
}

function enviarWhatsApp(texto) {
  const numero = (appConfig.whatsapp || "").replace(/\D/g, "");
  if (!numero) {
    mostrarToast("Cadastre um número de WhatsApp nas configurações.", "error");
    trocarTela("config");
    return;
  }
  const url = `https://wa.me/55${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}


// ============================================================
// BACKUP / RESTORE
// ============================================================

function exportarDados() {
  const dados = {
    versao: "2",
    exportadoEm: new Date().toISOString(),
    vistorias:    listarVistoriasComRascunhos(),
    agendamentos: listarAgendamentos(),
    config:       { ...appConfig },
    userName:     obterNomeUsuarioLocal(),
  };
  const json  = JSON.stringify(dados, null, 2);
  const blob  = new Blob([json], { type: "application/json" });
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement("a");
  const data  = new Date();
  a.href      = url;
  a.download  = `vistoria-backup-${data.getFullYear()}${String(data.getMonth()+1).padStart(2,"0")}${String(data.getDate()).padStart(2,"0")}.json`;
  a.click();
  URL.revokeObjectURL(url);
  mostrarToast("Backup exportado! ✓");
}

function importarDados(arquivo) {
  if (!arquivo) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const dados = JSON.parse(e.target.result);
      if (!dados.vistorias || !Array.isArray(dados.vistorias)) throw new Error("Arquivo inválido");

      if (!confirm(`Importar ${dados.vistorias.length} vistorias e ${(dados.agendamentos || []).length} agendamentos?\n\nOs dados atuais serão SUBSTITUÍDOS.`)) return;

      localStorage.setItem(CHAVE_VISTORIAS, JSON.stringify(dados.vistorias));
      localStorage.setItem(CHAVE_AGENDA,    JSON.stringify(dados.agendamentos || []));
      if (dados.userName) salvarNomeUsuarioLocal(dados.userName);
      if (dados.config)   localStorage.setItem(CHAVE_CONFIG, JSON.stringify(dados.config));

      mostrarToast("Backup importado com sucesso! Recarregando...");
      setTimeout(() => location.reload(), 1500);
    } catch {
      mostrarToast("Arquivo de backup inválido.", "error");
    }
  };
  reader.readAsText(arquivo);
}


// ============================================================
// INICIALIZAÇÃO
// ============================================================

async function inicializar() {
  // Splash → Login → App
  splashEnterBtn.addEventListener("click", handleOnboarding);
  loginForm.addEventListener("submit", autenticar);
  logoutButton.addEventListener("click", async () => {
    try { await onlineBackend.logout(); appShell.classList.add("hidden"); loginScreen.classList.remove("hidden"); }
    catch (erro) { mostrarToast(erro.message, "error"); }
  });
  syncButton.addEventListener("click", sincronizarAparelho);
  syncDataButton.addEventListener("click", sincronizarAparelho);

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
  document.querySelector("#novo-agendamento-btn").addEventListener("click", () => abrirFormularioAgenda());
  document.querySelector("#cancelar-agendamento-btn").addEventListener("click", fecharFormularioAgenda);
  agendaLista.addEventListener("click", acaoAgenda);
  agendaLista.addEventListener("change", acaoAgenda);
  document.querySelector(".filter-bar").addEventListener("click", e => {
    const btn = e.target.closest("[data-periodo]"); if (!btn) return;
    filtroPeriodo = btn.dataset.periodo;
    document.querySelectorAll("[data-periodo]").forEach(el => el.classList.toggle("active", el === btn));
    renderizarAgenda();
  });
  agendaFiltroStatus.addEventListener("change", renderizarAgenda);
  agendaCepInput.addEventListener("input", consultarCep);
  [agendaRuaInput, agendaNumeroInput, agendaComplementoInput, agendaBairroInput, agendaCidadeInput, agendaUfInput]
    .forEach(input => input.addEventListener("input", atualizarEnderecoCompletoFormulario));

  // Resumo
  historicoLista.addEventListener("click", removerVistoriaDoHistorico);

  // Config
  configSaveBtn.addEventListener("click", salvarConfig);
  configTema.addEventListener("change", () => aplicarTema(configTema.checked ? "dark" : "light"));

  // WhatsApp
  document.querySelector("#resumo-whatsapp-btn").addEventListener("click", () => enviarWhatsApp(gerarRelatorioCompleto()));

  // Backup
  exportBtn.addEventListener("click", exportarDados);
  importInput.addEventListener("change", e => {
    importarDados(e.target.files[0]);
    e.target.value = "";
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js?v=13").catch(() => {});
}

inicializar();
