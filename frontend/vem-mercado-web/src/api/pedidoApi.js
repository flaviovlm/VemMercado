import { api } from "./api";

export const criarPedido = async (body) => {
  const res = await api.post("/pedidos", body);
  return res.data;
};

export const listarPedidosDoUsuario = async (usuarioId) => {
  const res = await api.get(`/pedidos/usuario/${usuarioId}`);
  return res.data;
};

export const buscarPedidoPorId = async (id) => {
  const res = await api.get(`/pedidos/${id}`);
  return res.data;
};

export const atualizarStatus = async (id, status) => {
  const res = await api.patch(`/pedidos/${id}/status`, null, { params: { status } });
  return res.data;
};