import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css"; // Certifique-se de ter seus estilos aqui

// Schema de validação
const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório").min(3, "Mínimo 3 caracteres"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
  
  // A nova senha é opcional, mas se preenchida deve ter regras
  senha: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .min(6, "A nova senha deve ter no mínimo 6 caracteres"),
    
  // A senha atual é validada se for enviada
  senhaAtual: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable(),
});

export default function PerfilFormModal({ isOpen, initialData, onClose, onSubmitForm }) {
  // Estado para controlar se o campo de NOVA SENHA está visível
  const [editandoSenha, setEditandoSenha] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {},
  });

  // --- O ESPIÃO (useWatch) ---
  // Monitoramos os campos para saber se houve alteração sensível
  const watchedEmail = useWatch({ control, name: "email" });
  const watchedTelefone = useWatch({ control, name: "telefone" });
  
  // Verifica se mudou algo sensível comparando com o dado inicial
  const emailMudou = initialData && watchedEmail !== initialData.email;
  const telefoneMudou = initialData && watchedTelefone !== initialData.telefone;

  // A regra de ouro: Pedir senha atual SE:
  // 1. O usuário abriu o campo de nova senha (editandoSenha === true)
  // 2. OU mudou o email
  // 3. OU mudou o telefone
  const devePedirSenhaAtual = editandoSenha || emailMudou || telefoneMudou;

  // Reseta o form quando o modal abre ou os dados mudam
  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        ...initialData,
        senha: "",       // Nova senha começa vazia
        senhaAtual: ""   // Senha atual começa vazia
      });
      setEditandoSenha(false); // Esconde o campo de nova senha ao abrir
    }
  }, [isOpen, initialData, reset]);

  // Função para abrir/fechar a área de troca de senha
  const toggleEditSenha = () => {
    if (editandoSenha) {
      // Se estava aberto e vai fechar, limpa o campo de nova senha
      setValue("senha", "");
    }
    setEditandoSenha(!editandoSenha);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Perfil</h3>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          
          {/* --- DADOS BÁSICOS --- */}
          <div className="form-group">
            <label>Nome</label>
            <input {...register("nome")} placeholder="Seu nome" />
            <p className="error">{errors.nome?.message}</p>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input {...register("email")} placeholder="seu@email.com" />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input {...register("telefone")} placeholder="DD999999999" />
            <p className="error">{errors.telefone?.message}</p>
          </div>

          <hr />

          {/* --- BOTÃO PARA QUEM QUER TROCAR SENHA --- */}
          {!editandoSenha && (
            <button 
              type="button" 
              className="btn-text" 
              onClick={toggleEditSenha}
              style={{ textDecoration: "underline", color: "#007bff", background: "none", border: "none", cursor: "pointer", padding: "10px 0" }}
            >
              Quero alterar minha senha
            </button>
          )}

          {/* --- CAMPO DE NOVA SENHA (SÓ APARECE SE CLICOU NO BOTÃO) --- */}
          {editandoSenha && (
            <div className="nova-senha-area" style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label>Nova Senha</label>
                <button type="button" onClick={toggleEditSenha} style={{ fontSize: "0.8rem", color: "red", background: "none", border: "none", cursor: "pointer" }}>
                  Cancelar troca
                </button>
              </div>
              <input 
                type="password" 
                {...register("senha")} 
                placeholder="Digite a nova senha" 
              />
              <p className="error">{errors.senha?.message}</p>
            </div>
          )}

          {/* --- CAMPO DE SENHA ATUAL (AUTOMÁTICO) --- */}
          {/* Aparece sozinho se mudou email/telefone OU se abriu a troca de senha */}
          {devePedirSenhaAtual && (
            <div className="senha-atual-area" style={{ border: "1px solid #ffc107", padding: "10px", borderRadius: "5px", backgroundColor: "#fff3cd", marginTop: "10px" }}>
              <label style={{ fontWeight: "bold", color: "#856404" }}>
                Confirme sua Senha Atual
              </label>
              <small style={{ display: "block", marginBottom: "5px", color: "#856404" }}>
                Necessário para salvar alterações sensíveis (Email, Telefone ou Senha).
              </small>
              <input
                type="password"
                {...register("senhaAtual")}
                placeholder="Sua senha atual"
              />
              <p className="error">{errors.senhaAtual?.message}</p>
            </div>
          )}

          <div className="modal-actions" style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}