// --- ELEMENTOS DO DOM ---

// Onboarding
const onboardingWelcome = document.querySelector("#onboarding-welcome");
const onboardingName = document.querySelector("#onboarding-name");
const startBtn = document.querySelector("#onboarding-start-btn");
const continueBtn = document.querySelector("#onboarding-continue-btn");
const nameInput = document.querySelector("#onboarding-name-input");
const onboardingBackBtn = document.querySelector("#onboarding-back-btn");

// App Principal
const splashEnterBtn = document.querySelector("#splash-enter-btn");
const splashScreen = document.querySelector("#splash-screen");
const appShell = document.querySelector(".app-shell");
const userGreeting = document.querySelector("#user-greeting");
const profileButton = document.querySelector("#profile-button");
const appBackBtn = document.querySelector("#app-back-btn");

const alertasContainer = document.querySelector("#alertas-container");
const abas = {
  novaVistoria: document.querySelector("#aba-nova-vistoria"),
  agenda: document.querySelector("#aba-agenda"),
  resumo: document.querySelector("#aba-resumo"),
};
const telas = {
  novaVistoria: document.querySelector("#tela-nova-vistoria"),
  agenda: document.querySelector("#tela-agenda"),
  resumo: document.querySelector("#tela-resumo"),
};

// Tela: Nova Vistoria
const vistoriaForm = document.querySelector("#vistoria-form");
const vistoriaDataInput = document.querySelector("#vistoria-data");
const vistoriaMetragemInput = document.querySelector("#vistoria-metragem");
const vistoriaMobiliaInput = document.querySelector("#vistoria-mobilia");
const vistoriaQualidadeInput = document.querySelector("#vistoria-qualidade");
const vistoriaValorPreview = document.querySelector("#vistoria-valor-preview");
const vistoriaCalcularBtn = document.querySelector("#vistoria-calcular-btn");
const vistoriaSalvarBtn = document.querySelector("#vistoria-salvar-btn");

// Tela: Agenda
const agendaForm = document.querySelector("#agenda-form");
const agendaDataInput = document.querySelector("#agenda-data");
const agendaHoraInput = document.querySelector("#agenda-hora");
const agendaEnderecoInput = document.querySelector("#agenda-endereco");
const agendaObsInput = document.querySelector("#agenda-obs");
const agendaListas = {
    hoje: document.querySelector("#agenda-lista-hoje"),
    amanha: document.querySelector("#agenda-lista-amanha"),
    semana: document.querySelector("#agenda-lista-semana"),
    futuras: document.querySelector("#agenda-lista-futuras"),
};
const agendaVazia = {
    hoje: document.querySelector("#agenda-vazia-hoje"),
    amanha: document.querySelector("#agenda-vazia-amanha"),
    semana: document.querySelector("#agenda-vazia-semana"),
    futuras: document.querySelector("#agenda-vazia-futuras"),
};

// Tela: Resumo
const historicoLista = document.querySelector("#historico-lista");
const historicoVazio = document.querySelector("#historico-vazio");
const dashboardHojeValor = document.querySelector("#dashboard-hoje-valor");
const dashboardHojeQtd = document.querySelector("#dashboard-hoje-qtd");
const dashboardSemanaValor = document.querySelector("#dashboard-semana-valor");
const dashboardSemanaQtd = document.querySelector("#dashboard-semana-qtd");
const dashboardMesValor = document.querySelector("#dashboard-mes-valor");
const dashboardMesQtd = document.querySelector("#dashboard-mes-qtd");
const dashboardAnoValor = document.querySelector("#dashboard-ano-valor");
const dashboardAnoQtd = document.querySelector("#dashboard-ano-qtd");
const ganhoEntradasValor = document.querySelector("#ganho-entradas-valor");
const ganhoEntradasQtd = document.querySelector("#ganho-entradas-qtd");
const ganhoSaidasValor = document.querySelector("#ganho-saidas-valor");
const ganhoSaidasQtd = document.querySelector("#ganho-saidas-qtd");
const rankingMaiorValor = document.querySelector("#ranking-maior-valor");
const rankingMenorValor = document.querySelector("#ranking-menor-valor");
const rankingMediaValor = document.querySelector("#ranking-media-valor");
const melhorDiaNome = document.querySelector("#melhor-dia-nome");
const melhorDiaValor = document.querySelector("#melhor-dia-valor");


// --- LÓGICA DE ONBOARDING E PERFIL ---

function updateUserGreeting(name) {
  if (!name) return;
  const firstName = name.split(" ")[0];
  userGreeting.innerHTML = `
    <h1>Olá, ${firstName}! 👋</h1>
    <p>Pronto para mais uma vistoria?</p>
  `;
}

function startApp(name) {
  // Esconde telas de onboarding e splash
  onboardingWelcome.classList.add("hidden");
  onboardingName.classList.add("hidden");
  splashScreen.style.display = 'none';

  // Mostra o app principal
  appShell.classList.remove("hidden");

  // Atualiza a saudação
  updateUserGreeting(name);

  // Inicializa o restante do app
  renderizarTudo();
  trocarTela("novaVistoria");
}

function handleOnboarding() {
  const userName = localStorage.getItem("vistoriaUserName");
  
  // Esconde o splash inicial
  splashScreen.classList.add("fade-out");
  setTimeout(() => {
    splashScreen.style.display = 'none';
  }, 500);

  if (userName) {
    // Se já tem nome, inicia o app direto
    startApp(userName);
  } else {
    // Se não, mostra a primeira tela do onboarding
    onboardingWelcome.classList.remove("hidden");
  }
}

function changeUserName() {
    const currentUser = localStorage.getItem("vistoriaUserName") || "";
    const newName = prompt("Qual é o seu nome?", currentUser);
    if (newName && newName.trim() !== "") {
        localStorage.setItem("vistoriaUserName", newName.trim());
        updateUserGreeting(newName.trim());
        alert("Seu nome foi atualizado!");
    }
}


// --- FUNÇÕES AUXILIARES DE DATA E FORMATO ---

function formatarData(dataISO) {
  if (!dataISO) return "Sem data";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function dataParaISO(data) {
  const dataObj = new Date(data);
  dataObj.setMinutes(dataObj.getMinutes() - dataObj.getTimezoneOffset());
  return dataObj.toISOString().slice(0, 10);
}

function hojeISO() { return dataParaISO(new Date()); }
function amanhaISO() {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    return dataParaISO(amanha);
}


// --- LÓGICA DE NAVEGAÇÃO ---

const navHistory = [];

function trocarTela(telaAtiva) {
  const telaAtual = Object.keys(telas).find(n => !telas[n].classList.contains("hidden"));
  if (telaAtual && telaAtual !== telaAtiva) navHistory.push(telaAtual);

  Object.keys(telas).forEach((nomeTela) => {
    const mostrar = nomeTela === telaAtiva;
    telas[nomeTela].classList.toggle("hidden", !mostrar);
    abas[nomeTela].classList.toggle("active", mostrar);
  });

  appBackBtn.classList.toggle("hidden", navHistory.length === 0);
}

function voltarTela() {
  if (navHistory.length === 0) return;
  const anterior = navHistory.pop();
  Object.keys(telas).forEach((nomeTela) => {
    const mostrar = nomeTela === anterior;
    telas[nomeTela].classList.toggle("hidden", !mostrar);
    abas[nomeTela].classList.toggle("active", mostrar);
  });
  appBackBtn.classList.toggle("hidden", navHistory.length === 0);
}

// --- TELA: NOVA VISTORIA ---

function calcularEExibirValor() {
  const metragem = Number(vistoriaMetragemInput.value);
  if (!metragem) {
    vistoriaValorPreview.textContent = formatarMoeda(0);
    return;
  }
  try {
    const tipo = document.querySelector("input[name='vistoria-tipo']:checked").value;
    const mobilia = vistoriaMobiliaInput.checked;
    const qualidade = vistoriaQualidadeInput.checked;
    const valor = calcularVistoria(metragem, tipo, mobilia, qualidade);
    vistoriaValorPreview.textContent = formatarMoeda(valor);
  } catch (error) {
    alert(error.message);
    vistoriaValorPreview.textContent = formatarMoeda(0);
  }
}

function salvarVistoria() {
  const data = vistoriaDataInput.value;
  const metragem = Number(vistoriaMetragemInput.value);
  if (!data || !metragem) {
    alert("Por favor, preencha a data e a metragem antes de salvar.");
    return;
  }

  try {
    const tipo = document.querySelector("input[name='vistoria-tipo']:checked").value;
    const mobilia = vistoriaMobiliaInput.checked;
    const qualidade = vistoriaQualidadeInput.checked;
    const valor = calcularVistoria(metragem, tipo, mobilia, qualidade);

    adicionarVistoria({ dataAgendada: data, metragem, tipo, mobilia, qualidade, valor });

    alert("Vistoria salva com sucesso!");
    vistoriaForm.reset();
    vistoriaDataInput.value = hojeISO();
    vistoriaValorPreview.textContent = formatarMoeda(0);
    renderizarTudo();
  } catch (error) {
    alert("Não foi possível salvar a vistoria: " + error.message);
  }
}

// --- TELA: AGENDA INTELIGENTE ---

function renderizarAgenda() {
  const todosAgendamentos = listarAgendamentos();
  
  const hoje = hojeISO();
  const amanha = amanhaISO();
  const dataDaqui7Dias = new Date();
  dataDaqui7Dias.setDate(dataDaqui7Dias.getDate() + 7);

  const grupos = {
      hoje: [],
      amanha: [],
      semana: [],
      futuras: [],
  };

  todosAgendamentos.forEach(ag => {
    const dataAg = new Date(ag.data + "T00:00:00");
    if (ag.data === hoje) {
      grupos.hoje.push(ag);
    } else if (ag.data === amanha) {
      grupos.amanha.push(ag);
    } else if (dataAg <= dataDaqui7Dias) {
      grupos.semana.push(ag);
    } else {
      grupos.futuras.push(ag);
    }
  });

  Object.keys(grupos).forEach(key => {
      const grupoAgendamentos = grupos[key];
      const listaEl = agendaListas[key];
      const VazioEl = agendaVazia[key];

      listaEl.innerHTML = "";
      grupoAgendamentos.sort((a,b) => new Date(a.data + 'T' + a.hora) - new Date(b.data + 'T' + b.hora));
      
      grupoAgendamentos.forEach(ag => {
          const card = document.createElement("li");
          card.className = "agenda-card";
          card.innerHTML = `
            <button class="remove-button" data-id="${ag.id}">&times;</button>
            <div class="agenda-card-header">
              <span>${formatarData(ag.data)}</span>
              <span>${ag.hora} - <strong>${ag.tipo.charAt(0).toUpperCase() + ag.tipo.slice(1)}</strong></span>
            </div>
            <p><strong>Endereço:</strong> ${ag.endereco}</p>
            ${ag.obs ? `<p><strong>Obs:</strong> ${ag.obs}</p>` : ''}
          `;
          listaEl.appendChild(card);
      });
      
      VazioEl.classList.toggle('hidden', grupoAgendamentos.length > 0);
      listaEl.classList.toggle('hidden', grupoAgendamentos.length === 0);
  });
}


function adicionarAgendamentoPeloFormulario(event) {
  event.preventDefault();
  const data = agendaDataInput.value;
  const hora = agendaHoraInput.value;
  const endereco = agendaEnderecoInput.value;
  const obs = agendaObsInput.value;
  const tipo = document.querySelector('input[name="agenda-tipo"]:checked').value;

  if (!data || !hora || !endereco) {
    alert("Preencha Data, Hora e Endereço.");
    return;
  }

  adicionarAgendamento({ data, hora, endereco, obs, tipo });
  agendaForm.reset();
  agendaDataInput.value = hojeISO();
  renderizarTudo();
}

function removerAgendamentoPelaLista(event) {
    const removeBtn = event.target.closest('.remove-button');
    if(removeBtn) {
        const id = Number(removeBtn.dataset.id);
        if (confirm("Tem certeza que deseja excluir este agendamento?")) {
            removerAgendamento(id);
            renderizarTudo();
        }
    }
}

// --- TELA: RESUMO (HISTÓRICO E DASHBOARD) ---

const ehHojeFiltro = (date) => new Date().toDateString() === new Date(date).toDateString();
const getStartOfWeek = (d) => { const date = new Date(d); const day = date.getDay(); const diff = date.getDate() - day + (day === 0 ? -6 : 1); return new Date(date.setDate(diff)); };
const ehNestaSemanaFiltro = (date) => new Date(date) >= getStartOfWeek(new Date());
const ehNesteMesFiltro = (date) => new Date().getMonth() === new Date(date).getMonth() && new Date().getFullYear() === new Date(date).getFullYear();
const ehNesteAnoFiltro = (date) => new Date().getFullYear() === new Date(date).getFullYear();

function calcularMetricas(vistorias, filtro) {
  const vistoriasFiltradas = vistorias.filter(v => v.dataAgendada && filtro(v.dataAgendada + "T00:00:00"));
  return {
    valor: vistoriasFiltradas.reduce((sum, v) => sum + v.valor, 0),
    qtd: vistoriasFiltradas.length,
  };
}

function renderizarResumo() {
  const vistorias = listarVistorias();
  historicoVazio.classList.toggle("hidden", vistorias.length > 0);
  historicoLista.innerHTML = "";
  
  if (vistorias.length === 0) {
    [dashboardHojeValor, dashboardSemanaValor, dashboardMesValor, dashboardAnoValor, ganhoEntradasValor, ganhoSaidasValor, rankingMaiorValor, rankingMenorValor, rankingMediaValor, melhorDiaValor].forEach(el => el.textContent = formatarMoeda(0));
    [dashboardHojeQtd, dashboardSemanaQtd, dashboardMesQtd, dashboardAnoQtd, ganhoEntradasQtd, ganhoSaidasQtd].forEach(el => el.textContent = '0 vistorias');
    melhorDiaNome.textContent = 'N/A';
    return;
  }

  vistorias.sort((a, b) => new Date(b.dataAgendada) - new Date(a.dataAgendada));

  vistorias.forEach(v => {
    const card = document.createElement("li");
    card.className = "historic-card";
    card.innerHTML = `
      <div class="historic-card-details">
        <small>${formatarData(v.dataAgendada)}</small>
        <strong>${v.metragem}m² - ${v.tipo.charAt(0).toUpperCase() + v.tipo.slice(1)}</strong>
      </div>
      <strong class="historic-card-valor">${formatarMoeda(v.valor)}</strong>
      <button class="remove-button" data-id="${v.id}">&times;</button>
    `;
    historicoLista.appendChild(card);
  });

  // Cálculos do Dashboard
  const hoje = calcularMetricas(vistorias, ehHojeFiltro);
  dashboardHojeValor.textContent = formatarMoeda(hoje.valor);
  dashboardHojeQtd.textContent = `${hoje.qtd} vistorias`;
  const semana = calcularMetricas(vistorias, ehNestaSemanaFiltro);
  dashboardSemanaValor.textContent = formatarMoeda(semana.valor);
  dashboardSemanaQtd.textContent = `${semana.qtd} vistorias`;
  const mes = calcularMetricas(vistorias, ehNesteMesFiltro);
  dashboardMesValor.textContent = formatarMoeda(mes.valor);
  dashboardMesQtd.textContent = `${mes.qtd} vistorias`;
  const ano = calcularMetricas(vistorias, ehNesteAnoFiltro);
  dashboardAnoValor.textContent = formatarMoeda(ano.valor);
  dashboardAnoQtd.textContent = `${ano.qtd} vistorias`;
  const entradas = vistorias.filter(v => v.tipo === 'entrada');
  ganhoEntradasValor.textContent = formatarMoeda(entradas.reduce((s, v) => s + v.valor, 0));
  ganhoEntradasQtd.textContent = `${entradas.length} vistorias`;
  const saidas = vistorias.filter(v => v.tipo === 'saida');
  ganhoSaidasValor.textContent = formatarMoeda(saidas.reduce((s, v) => s + v.valor, 0));
  ganhoSaidasQtd.textContent = `${saidas.length} vistorias`;
  const valores = vistorias.map(v => v.valor);
  rankingMaiorValor.textContent = formatarMoeda(Math.max(...valores));
  rankingMenorValor.textContent = formatarMoeda(Math.min(...valores));
  rankingMediaValor.textContent = formatarMoeda(valores.reduce((s, v) => s + v, 0) / valores.length);
  const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const ganhosPorDia = vistorias.reduce((acc, v) => {
    const dia = new Date(v.dataAgendada + "T00:00:00").getDay();
    acc[dia] = (acc[dia] || 0) + v.valor;
    return acc;
  }, {});
  const [melhorDiaIdx, maiorValor] = Object.entries(ganhosPorDia).reduce((melhor, [dia, v]) => (v > melhor[1] ? [dia, v] : melhor), [-1, -Infinity]);
  melhorDiaNome.textContent = melhorDiaIdx > -1 ? dias[melhorDiaIdx] : "N/A";
  melhorDiaValor.textContent = formatarMoeda(maiorValor > 0 ? maiorValor : 0);
}

function removerVistoriaDoHistorico(event) {
    const removeBtn = event.target.closest('.remove-button');
    if(removeBtn) {
        const id = Number(removeBtn.dataset.id);
        if (confirm("Tem certeza que deseja excluir esta vistoria salva?")) {
            removerVistoria(id);
            renderizarTudo();
        }
    }
}

// --- ALERTA ---
function renderizarAlertas() {
    alertasContainer.innerHTML = "";
    const vistorias = listarVistorias();
    const agendamentos = listarAgendamentos();
    const hoje = hojeISO();

    const vistoriasDeHoje = vistorias.filter(v => v.dataAgendada === hoje);
    const agendamentosDeHoje = agendamentos.filter(a => a.data === hoje);

    if (vistoriasDeHoje.length === 0) {
        const alerta = document.createElement('div');
        alerta.className = 'alerta warning';
        alerta.textContent = 'Você ainda não registrou vistorias hoje.';
        alertasContainer.appendChild(alerta);
    } else {
        const totalHoje = vistoriasDeHoje.reduce((sum, v) => sum + v.valor, 0);
        if (totalHoje > 200) {
            const alerta = document.createElement('div');
            alerta.className = 'alerta success';
            alerta.textContent = 'Meta diária de R$ 200,00 atingida!';
            alertasContainer.appendChild(alerta);
        }
    }

    if (agendamentosDeHoje.length > 0) {
        const alerta = document.createElement('div');
        alerta.className = 'alerta info';
        alerta.textContent = `Você tem ${agendamentosDeHoje.length} vistoria(s) agendada(s) para hoje.`;
        alertasContainer.appendChild(alerta);
    }
}


// --- INICIALIZAÇÃO ---

function renderizarTudo() {
    renderizarAgenda();
    renderizarResumo();
    renderizarAlertas();
}

function inicializar() {
  splashEnterBtn.addEventListener("click", handleOnboarding);

  // Listeners do Onboarding
  startBtn.addEventListener("click", () => {
    onboardingWelcome.classList.add("hidden");
    onboardingName.classList.remove("hidden");
    nameInput.focus();
    nameInput.focus();
  });

  continueBtn.addEventListener("click", () => {
    const userName = nameInput.value.trim();
    if (userName) {
      localStorage.setItem("vistoriaUserName", userName);
      startApp(userName);
    } else {
      alert("Por favor, digite seu nome para continuar.");
    }
  });

  // Botão voltar do onboarding (tela 2 → tela 1)
  onboardingBackBtn.addEventListener("click", () => {
    onboardingName.classList.add("hidden");
    onboardingWelcome.classList.remove("hidden");
  });

  // Botão voltar do app principal
  appBackBtn.addEventListener("click", voltarTela);

  // Listener do botão de Perfil
  profileButton.addEventListener("click", changeUserName);

  // --- Listeners do App Principal ---
  vistoriaDataInput.value = hojeISO();
  agendaDataInput.value = hojeISO();
  
  Object.keys(abas).forEach(nomeTela => {
    abas[nomeTela].addEventListener("click", () => trocarTela(nomeTela));
  });

  vistoriaCalcularBtn.addEventListener("click", calcularEExibirValor);
  vistoriaSalvarBtn.addEventListener("click", salvarVistoria);

  agendaForm.addEventListener("submit", adicionarAgendamentoPeloFormulario);
  document.querySelector("#agenda-grupos").addEventListener("click", removerAgendamentoPelaLista);

  historicoLista.addEventListener("click", removerVistoriaDoHistorico);

  // As chamadas de renderização agora acontecem dentro de startApp
}

// Inicia tudo
inicializar();
