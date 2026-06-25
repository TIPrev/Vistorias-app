// --- ARMAZENAMENTO DE VISTORIAS SALVAS ---
const CHAVE_VISTORIAS = "vistorias.lista";

function carregarVistorias() {
  const dados = localStorage.getItem(CHAVE_VISTORIAS);
  return dados ? JSON.parse(dados) : [];
}

function salvarVistorias() {
  localStorage.setItem(CHAVE_VISTORIAS, JSON.stringify(vistorias));
}

const vistorias = carregarVistorias();
let proximoVistoriaId = calcularProximoId(vistorias);

function adicionarVistoria(vistoria) {
  const novaVistoria = { id: proximoVistoriaId, ...vistoria };
  proximoVistoriaId += 1;
  vistorias.push(novaVistoria);
  salvarVistorias();
  return novaVistoria;
}

function removerVistoria(id) {
  const indice = vistorias.findIndex((v) => v.id === id);
  if (indice >= 0) {
    vistorias.splice(indice, 1);
    salvarVistorias();
  }
}

function listarVistorias() {
  return vistorias;
}

// --- ARMAZENAMENTO DE AGENDAMENTOS ---
const CHAVE_AGENDA = "vistorias.agenda";

function carregarAgendamentos() {
  const dados = localStorage.getItem(CHAVE_AGENDA);
  return dados ? JSON.parse(dados) : [];
}

function salvarAgendamentos() {
  localStorage.setItem(CHAVE_AGENDA, JSON.stringify(agendamentos));
}

const agendamentos = carregarAgendamentos();
let proximoAgendaId = calcularProximoId(agendamentos);

function adicionarAgendamento(agendamento) {
  const novoAgendamento = { id: proximoAgendaId, ...agendamento };
  proximoAgendaId += 1;
  agendamentos.push(novoAgendamento);
  salvarAgendamentos();
  return novoAgendamento;
}

function removerAgendamento(id) {
  const indice = agendamentos.findIndex((a) => a.id === id);
  if (indice >= 0) {
    agendamentos.splice(indice, 1);
    salvarAgendamentos();
  }
}

function listarAgendamentos() {
  return agendamentos;
}


// --- FUNÇÕES AUXILIARES ---
function calcularProximoId(lista) {
  if (lista.length === 0) return 1;
  const maxId = lista.reduce((max, item) => Math.max(max, item.id), 0);
  return maxId + 1;
}

function calcularTotalAcumulado() {
  return vistorias.reduce((total, vistoria) => total + vistoria.valor, 0);
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
