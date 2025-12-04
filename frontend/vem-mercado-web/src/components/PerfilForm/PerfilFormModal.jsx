// Arquivo: src/components/PerfilFormModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";

// **Schema de Validação aprimorado e com mensagens claras**
const schema = yup.object({
  // Campos opcionais, pois é uma atualização parcial, mas se preenchidos, devem ser válidos
  nome: yup
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: yup.string().email("Formato de e-mail inválido"),
  // Aumentando o mínimo da senha para segurança
  senha: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(10, "A senha deve ter no máximo 10 caracteres")
    .nullable(true),
  telefone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone inválido. Use 10 ou 11 dígitos.")
    .nullable(true),
});

/**
 * Modal para Edição do Perfil do Usuário.
 * @param {boolean} isOpen - Controla a visibilidade do modal.
 * @param {object} initialData - Dados atuais do usuário para pré-preenchimento.
 * @param {function} onClose - Função para fechar o modal.
 * @param {function} onSubmitForm - Função de submissão que lida com a atualização via API.
 */
export default function PerfilFormModal({
  isOpen,
  initialData,
  onClose,
  onSubmitForm,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // Define os dados iniciais do formulário (importantíssimo para edição)
    defaultValues: initialData,
  });

  // Efeito para garantir que o formulário seja preenchido quando os dados iniciais mudarem (ex: usuário loga ou atualiza)
  useEffect(() => {
    // Excluímos a 'senha' do reset para que o campo fique vazio (boa prática de segurança)
    const { senha, ...fieldsToReset } = initialData;
    reset(fieldsToReset);
  }, [initialData, reset]);

  // Se o modal não estiver aberto, não renderiza
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* Previne que o clique no modal feche o backdrop */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Perfil</h3>

        <form onSubmit={handleSubmit(onSubmitForm)} className="card-form">
          <label>Nome</label>
          <input placeholder="Nome" {...register("nome")} />
          <p className="error">{errors.nome?.message}</p>

          <label>Email</label>
          <input placeholder="Email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>

          <label>Nova Senha (deixe em branco para não alterar)</label>
          {/* Campo de Senha: Vazio por padrão e opcional */}
          <input placeholder="Senha" type="password" {...register("senha")} />
          <p className="error">{errors.senha?.message}</p>

          <label>Telefone</label>
          <input placeholder="Telefone" {...register("telefone")} />
          <p className="error">{errors.telefone?.message}</p>

          <div className="form-actions">
            <button className="btn" type="submit">
              Salvar Alterações
            </button>
            <button type="button" className="btn ghost" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
