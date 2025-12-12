import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cadastrarUsuario } from "../../api/usuarioApi";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import "./style.css";

const schema = yup.object({

  nome: yup
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("Email é obrigatório"),

  senha: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(10, "A senha deve ter no máximo 20 caracteres")
    .required("Senha é obrigatória"),
  
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF inválido. Use 11 dígitos.")
    .required("CPF é obrigatório"),

  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido. Use 10 ou 11 dígitos.")
    .required("Telefone é obrigatório"),
});

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [toast, setToast] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await cadastrarUsuario(data);
      setToast("Cadastro realizado com sucesso");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setToast(
        err.response?.data?.mensagem || "Erro no cadastro. Verifique os dados.",
      );
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="card-form">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campos de Cadastro do Usuário */}
        <input placeholder="Nome" {...register("nome")} />
        <p className="error">{errors.nome?.message}</p>

        <input placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <input placeholder="Senha" type="password" {...register("senha")} />
        <p className="error">{errors.senha?.message}</p>

        <input placeholder="CPF (somente números)" {...register("cpf")} />
        <p className="error">{errors.cpf?.message}</p>

        <input
          placeholder="Telefone (somente números)"
          {...register("telefone")}
        />
        <p className="error">{errors.telefone?.message}</p>

        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <Toast message={toast} />
    </div>
  );
}
