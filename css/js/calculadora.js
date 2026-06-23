function calcularVistoria(metragem, tipo, temMobilia, temQualidade) {
  const area = Number(metragem);

  if (!Number.isFinite(area) || area <= 0) {
    throw new Error("Informe uma metragem valida.");
  }

  let subtotal;

  if (area <= 50) {
    subtotal = tipo === "saida" ? 43 : 39;
  } else if (area <= 500) {
    const excedente = area - 50;
    subtotal = tipo === "saida" ? 43 + excedente * 0.7 : 39 + excedente * 0.6;
  } else {
    subtotal = tipo === "saida" ? 337 : 283;
  }

  if (temMobilia) {
    subtotal *= 1.1;
  }

  if (temQualidade) {
    subtotal += 15;
  }

  return Number(subtotal.toFixed(2));
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
