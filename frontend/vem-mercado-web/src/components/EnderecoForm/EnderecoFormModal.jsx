// Arquivo: src/components/EnderecoFormModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";

// Esquema de validação (mantido)
const schema = yup.object({
  logradouro: yup
    .string()
    .min(5, "Mínimo 5 caracteres")
    .required("Obrigatório"),
  numero: yup.string().max(10, "Máximo 10 caracteres").required("Obrigatório"),
  // Melhoria: Usar Regex para CEP (apenas 8 dígitos numéricos)
  cep: yup
    .string()
    .matches(/^\d{8}$/, "CEP deve ter 8 dígitos")
    .required("Obrigatório"),
  estado: yup
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(40, "Máximo 40 caracteres")
    .required("Obrigatório"), // Ajustando validação para 2 caracteres (UF)
  bairro: yup.string().min(3, "Mínimo 3 caracteres").required("Obrigatório"),
  cidade: yup.string().min(5, "Mínimo 5 caracteres").required("Obrigatório"),
});

/**
 * Componente Modal para criação e edição de endereço.
 * @param {boolean} isOpen - Controla a visibilidade do modal.
 * @param {object|null} editingData - Dados do endereço para edição ou null para criação.
 * @param {function} onClose - Função para fechar o modal e resetar o estado de edição.
 * @param {function} onSubmitForm - Função de submissão que lida com criação/edição via API.
 */
export default function EnderecoFormModal({
  isOpen,
  editingData,
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
    // Usamos mode: 'onBlur' para melhor UX, validando ao sair do campo
    mode: "onBlur",
  });

  // Efeito para popular o formulário quando 'editingData' muda (iniciar edição)
  useEffect(() => {
    if (editingData) {
      // Popula o formulário com os dados de edição
      reset(editingData);
    } else {
      // Reseta o formulário para campos vazios para um novo cadastro
      reset({
        logradouro: "",
        numero: "",
        cep: "",
        estado: "",
        bairro: "",
        cidade: "",
      });
    }
  }, [editingData, reset]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    // Estrutura do Modal (Backdrop e Conteúdo)
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{editingData ? "Editar Endereço" : "Novo Endereço"}</h3>

        <form onSubmit={handleSubmit(onSubmitForm)} className="card-form">
          {/* Inputs do Endereço */}
          <input placeholder="Logradouro" {...register("logradouro")} />
          <p className="error">{errors.logradouro?.message}</p>

          <input placeholder="Número" {...register("numero")} />
          <p className="error">{errors.numero?.message}</p>

          <input placeholder="CEP (Apenas 8 dígitos)" {...register("cep")} />
          <p className="error">{errors.cep?.message}</p>

          <input placeholder="Estado (Ex: SP)" {...register("estado")} />
          <p className="error">{errors.estado?.message}</p>

          <input placeholder="Bairro" {...register("bairro")} />
          <p className="error">{errors.bairro?.message}</p>

          <input placeholder="Cidade" {...register("cidade")} />
          <p className="error">{errors.cidade?.message}</p>

          <div className="form-actions">
            <button className="btn" type="submit">
              {editingData ? "Salvar" : "Criar"}
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
