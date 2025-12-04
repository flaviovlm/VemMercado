import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { atualizarUsuarioParcial, buscarUsuarioPorCpf } from "../../api/usuarioApi";
import Toast from "../../components/Toast";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().min(3).max(50),
  email: yup.string().email(),
  senha: yup.string().min(3).max(10),
  telefone: yup.string().min(11)
});

export default function Perfil(){
  const { usuario, login } = useAuth();
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (usuario) {
      buscarUsuarioPorCpf(usuario.cpf).then(res => {
        reset({
          nome: res.nome,
          email: res.email,
          telefone: res.telefone
        });
      });
    }
  }, [usuario]);

  const onSubmit = async (data) => {
    try {
      const body = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "" && v !== null)
      );

      if (Object.keys(body).length === 0) {
        setToast("Nenhuma alteração realizada.");
        return;
      }

      await atualizarUsuarioParcial(usuario.id, body);
      setToast("Atualizado com sucesso!");

      const updated = await buscarUsuarioPorCpf(usuario.cpf);
      login(updated);
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao atualizar");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="card-form">
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nome" {...register("nome")} />
        <p className="error">{errors.nome?.message}</p>

        <input placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <input placeholder="Senha" type="password" {...register("senha")} />
        <p className="error">{errors.senha?.message}</p>

        <input placeholder="Telefone" {...register("telefone")} />
        <p className="error">{errors.telefone?.message}</p>

        <button className="btn" type="submit">Salvar</button>
      </form>
      <Toast message={toast} />
    </div>
  );
}