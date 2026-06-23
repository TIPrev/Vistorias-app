const form = document.querySelector("#vistoria-form");
const dataAgendadaInput = document.querySelector("#data-agendada");
const metragemInput = document.querySelector("#metragem");
const mobiliaInput = document.querySelector("#mobilia");
const qualidadeInput = document.querySelector("#qualidade");
const valorPreview = document.querySelector("#valor-preview");
const listaVistorias = document.querySelector("#lista-vistorias");
const listaVazia = document.querySelector("#lista-vazia");
const totalDia = document.querySelector("#total-dia");
const quantidadeVistorias = document.querySelector("#quantidade-vistorias");
const ganhoTotal = document.querySelector("#ganho-total");
const valorMedio = document.querySelector("#valor-medio");

function obterTipoSelecionado() {
  return document.querySelector("input[name='tipo']:checked").value;
}

function obterDadosFormulario() {
  return {
    dataAgendada: dataAgendadaInput.value,
    metragem: Number(metragemInput.value),
    tipo: obterTipoSelecionado(),
    mobilia: mobiliaInput.checked,
    qualidade: qualidadeInput.checked
  };
}

function atualizarPreview() {
  const dados = obterDadosFormulario();

  if (!dados.metragem) {
    valorPreview.textContent = formatarMoeda(0);
    return;
  }

  try {
    const valor = calcularVistoria(
      dados.metragem,
      dados.tipo,
      dados.mobilia,
      dados.qualidade
    );

    valorPreview.textContent = formatarMoeda(valor);
  } catch {
    valorPreview.textContent = formatarMoeda(0);
  }
}

function formatarData(dataISO) {
  if (!dataISO) {
    return "Sem data";
  }

  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function renderizarVistorias() {
  const vistorias = listarVistorias();
  const total = calcularTotalAcumulado();
  const media = vistorias.length > 0 ? total / vistorias.length : 0;

  listaVistorias.innerHTML = "";
  listaVazia.classList.toggle("hidden", vistorias.length > 0);

  vistorias.forEach((vistoria) => {
    const item = document.createElement("li");
    item.className = "inspection-item";
    const tipo = vistoria.tipo === "saida" ? "Saida" : "Entrada";

    item.innerHTML = `
      <div class="inspection-main">
        <div class="inspection-top">
          <span class="inspection-date">${formatarData(vistoria.dataAgendada)}</span>
          <span class="inspection-type">${tipo}</span>
        </div>
        <div class="inspection-details">
          <div>
            <span>Metragem</span>
            <strong>${vistoria.metragem} m2</strong>
          </div>
          <div>
            <span>Valor final</span>
            <strong>${formatarMoeda(vistoria.valor)}</strong>
          </div>
        </div>
      </div>
      <button class="remove-button" type="button" aria-label="Excluir vistoria">Excluir</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      removerVistoria(vistoria.id);
      renderizarVistorias();
    });

    listaVistorias.appendChild(item);
  });

  totalDia.textContent = formatarMoeda(total);
  quantidadeVistorias.textContent = String(vistorias.length);
  ganhoTotal.textContent = formatarMoeda(total);
  valorMedio.textContent = formatarMoeda(media);
}

function adicionarVistoriaPeloFormulario(event) {
  event.preventDefault();

  const dados = obterDadosFormulario();
  const valor = calcularVistoria(
    dados.metragem,
    dados.tipo,
    dados.mobilia,
    dados.qualidade
  );

  adicionarVistoria({
    ...dados,
    valor
  });

  form.reset();
  definirDataPadrao();
  atualizarPreview();
  renderizarVistorias();
  metragemInput.focus();
}

function definirDataPadrao() {
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  dataAgendadaInput.value = hoje.toISOString().slice(0, 10);
}

form.addEventListener("submit", adicionarVistoriaPeloFormulario);
form.addEventListener("input", atualizarPreview);

definirDataPadrao();
atualizarPreview();
renderizarVistorias();
