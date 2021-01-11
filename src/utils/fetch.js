export function fazerRequisicaoComBody(url, metodo, conteudo) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      //Authorization: token && `Bearer ${token}`,
    },
    body: JSON.stringify(conteudo),
  });
}
