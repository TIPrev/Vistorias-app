const form = document.querySelector("#vistoria-form");
const metragemInput = document.querySelector("#metragem");
const mobiliaInput = document.querySelector("#mobilia");
const qualidadeInput = document.querySelector("#qualidade");
const valorPreview = document.querySelector("#valor-preview");
const listaVistorias = document.querySelector("#lista-vistorias");
const listaVazia = document.querySelector("#lista-vazia");
const totalAcumulado = document.querySelector("#total-acumulado");

function obterTipoSelecionado() {
  return document.querySelector("input[name='tipo']:checked").value;
}

function obterDadosFormulario() {
  return {
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

function renderizarVistorias() {
  const vistorias = listarVistorias();

  listaVistorias.innerHTML = "";
  listaVazia.classList.toggle("hidden", vistorias.length > 0);

  vistorias.forEach((vistoria) => {
    const item = document.createElement("li");
    item.className = "inspection-item";

    const detalhes = [
      `${vistoria.metragem} m2`,
      vistoria.tipo === "saida" ? "Saida" : "Entrada",
      vistoria.mobilia ? "Com mobilia" : "Sem mobilia",
      vistoria.qualidade ? "Com qualidade" : "Sem qualidade"
    ].join(" | ");

    item.innerHTML = `
      <div class="inspection-main">
        <strong>${formatarMoeda(vistoria.valor)}</strong>
        <span>${detalhes}</span>
      </div>
      <button class="remove-button" type="button" aria-label="Remover vistoria">x</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      removerVistoria(vistoria.id);
      renderizarVistorias();
    });

    listaVistorias.appendChild(item);
  });

  totalAcumulado.textContent = formatarMoeda(calcularTotalAcumulado());
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
  atualizarPreview();
  renderizarVistorias();
  metragemInput.focus();
}

form.addEventListener("submit", adicionarVistoriaPeloFormulario);
form.addEventListener("input", atualizarPreview);

atualizarPreview();
renderizarVistorias();
