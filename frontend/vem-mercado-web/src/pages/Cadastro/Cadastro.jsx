import React from "react";
// Removendo useFieldArray
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cadastrarUsuario } from "../../api/usuarioApi";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import "./style.css";

// 1. Esquema de Validação Atualizado
// Removemos enderecoSchema e a validação do array 'endereco' do schema principal
const schema = yup.object({
  // Validações mais expressivas para mensagens de erro claras
  nome: yup
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("Email é obrigatório"),
  // Aumentado o mínimo da senha para 6
  senha: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .required("Senha é obrigatória"),
  // Validação focada em 11 dígitos para CPF (apenas números)
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF inválido. Use 11 dígitos.")
    .required("CPF é obrigatório"),
  // Validação focada em 10 ou 11 dígitos para Telefone (apenas números)
  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido. Use 10 ou 11 dígitos.")
    .required("Telefone é obrigatório"),
});

export default function Cadastro() {
  // 2. Lógica do Componente Atualizada
  // Não precisamos mais de 'control'
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    // Removendo defaultValues para 'endereco'
  });
  // Remoção de useFieldArray (fields, append, remove)

  const [toast, setToast] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // ⚠️ ASSUMIMOS que a API de cadastro agora aceita o payload sem o array de 'endereco'
      await cadastrarUsuario(data);
      setToast("Cadastro realizado com sucesso");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      // Melhoria no tratamento de erro para exibir mensagens mais específicas da API
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

        {/* ⚠️ Melhoria de UX: Adicionar formatação de máscara (ex: react-input-mask) para campos como CPF/Telefone em um cenário real. */}
        <input placeholder="CPF (somente números)" {...register("cpf")} />
        <p className="error">{errors.cpf?.message}</p>

        <input
          placeholder="Telefone (somente números)"
          {...register("telefone")}
        />
        <p className="error">{errors.telefone?.message}</p>

        {/* 3. Remoção da seção de Endereços no JSX */}

        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <Toast message={toast} />
    </div>
  );
}
