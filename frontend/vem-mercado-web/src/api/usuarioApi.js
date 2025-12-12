import { api } from "./api";

export const loginUsuario = async (body) => {
  const res = await api.post("/usuarios/login", body);
  return res.data;
};

export const cadastrarUsuario = async (body) => {
  const res = await api.post("/usuarios/cadastro", body);
  return res.data;
};

export const buscarUsuarioPorCpf = async (cpf) => {
  const res = await api.get(`/usuarios/buscar/${cpf}`);
  return res.data;
};

export const atualizarUsuarioParcial = async (id, body) => {
  const res = await api.patch(`/usuarios/atualizar-parcial/${id}`, body);
  return res.data;
};