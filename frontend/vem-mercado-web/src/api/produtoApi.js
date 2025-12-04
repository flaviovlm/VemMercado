import { api } from "./api";

export const listarProdutos = async (nome) => {
  const res = await api.get("/produtos", { params: nome ? { nome } : {} });
  return res.data;
};