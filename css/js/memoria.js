const vistorias = [];
let proximoId = 1;

function adicionarVistoria(vistoria) {
  const novaVistoria = {
    id: proximoId,
    ...vistoria
  };

  proximoId += 1;
  vistorias.push(novaVistoria);
  return novaVistoria;
}

function removerVistoria(id) {
  const indice = vistorias.findIndex((vistoria) => vistoria.id === id);

  if (indice >= 0) {
    vistorias.splice(indice, 1);
  }
}

function listarVistorias() {
  return vistorias;
}

function calcularTotalAcumulado() {
  return vistorias.reduce((total, vistoria) => total + vistoria.valor, 0);
}
