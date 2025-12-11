// Arquivo: src/components/EnderecoFormModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";

const schema = yup.object({
  logradouro: yup
    .string()
    .min(5, "Mínimo 5 caracteres")
    .required("Obrigatório"),
  numero: yup.string().max(10, "Máximo 10 caracteres").required("Obrigatório"),
  cep: yup
    .string()
    .matches(/^\d{8}$/, "CEP deve ter 8 dígitos")
    .required("Obrigatório"),
  estado: yup
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(40, "Máximo 40 caracteres")
    .required("Obrigatório"),
  bairro: yup.string().min(3, "Mínimo 3 caracteres").required("Obrigatório"),
  cidade: yup.string().min(5, "Mínimo 5 caracteres").required("Obrigatório"),
});

/**
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
    mode: "onBlur",
  });

  useEffect(() => {
    if (editingData) {
      reset(editingData);
    } else {
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

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{editingData ? "Editar Endereço" : "Novo Endereço"}</h3>
        <form onSubmit={handleSubmit(onSubmitForm)} className="card-form">
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
            <button className="btn-primary" type="submit">
              {editingData ? "Salvar Alterações" : "Criar Endereço"}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}