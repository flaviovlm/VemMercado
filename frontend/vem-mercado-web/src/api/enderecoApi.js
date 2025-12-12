import { api } from "./api";

export const listarEnderecos = async (usuarioId) => {
  const res = await api.get(`/usuarios/${usuarioId}/enderecos`);
  return res.data;
};

export const criarEndereco = async (usuarioId, body) => {
  const res = await api.post(`/usuarios/${usuarioId}/enderecos`, body);
  return res.data;
};

export const atualizarEndereco = async (usuarioId, enderecoId, body) => {
  const res = await api.put(`/usuarios/${usuarioId}/enderecos/${enderecoId}`, body);
  return res.data;
};

export const deletarEndereco = async (usuarioId, enderecoId) => {
  const res = await api.delete(`/usuarios/${usuarioId}/enderecos/${enderecoId}`);
  return res.data;
};