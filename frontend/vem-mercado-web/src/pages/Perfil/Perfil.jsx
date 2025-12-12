import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  atualizarUsuarioParcial,
  buscarUsuarioPorCpf,
} from "../../api/usuarioApi";
import Toast from "../../components/Toast";
import PerfilFormModal from "../../components/PerfilForm/PerfilFormModal";
import "./style.css";

export default function Perfil() {
  const { usuario, login } = useAuth();
  const [toast, setToast] = useState(null);
  const [perfilData, setPerfilData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const loadUserData = () => {
    if (usuario) {
      buscarUsuarioPorCpf(usuario.cpf)
        .then((res) => {
          setPerfilData(res);
        })
        .catch((err) => {
          setToast(
            err.response?.data?.mensagem || "Erro ao carregar dados do perfil",
          );
        });
    }
  };

  useEffect(() => {
    loadUserData();
  }, [usuario]); 

  const handleFormSubmit = async (data) => {
    try {
      const dirtyFields = {};

      if (data.nome !== perfilData.nome) dirtyFields.nome = data.nome;
      if (data.email !== perfilData.email) dirtyFields.email = data.email;
      if (data.telefone !== perfilData.telefone) dirtyFields.telefone = data.telefone;

      if (data.senha) dirtyFields.senha = data.senha;
      if (data.senhaAtual) dirtyFields.senhaAtual = data.senhaAtual;

      if (Object.keys(dirtyFields).length === 0) {
        setToast("Nenhuma alteração realizada.");
        setIsModalOpen(false); 
        return;
      }

      await atualizarUsuarioParcial(usuario.id, dirtyFields);
      setToast("Atualizado com sucesso!");

      const updated = await buscarUsuarioPorCpf(perfilData.cpf); 
      
      login(updated); 
      setPerfilData(updated); 
      setIsModalOpen(false); 

    } catch (err) {
      console.error(err);
      setToast(err.response?.data?.mensagem || "Erro ao atualizar");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (!perfilData) {
    return <div className="loading">Carregando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      <h2>Meu Perfil</h2>

      <div className="profile-card">
        <p>
          <strong>Nome:</strong> {perfilData.nome}
        </p>
        <p>
          <strong>Email:</strong> {perfilData.email}
        </p>
        <p>
          <strong>CPF:</strong> {perfilData.cpf}
        </p>
        <p>
          <strong>Telefone:</strong> {perfilData.telefone}
        </p>

        <button
          className="btn primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          Editar Informações
        </button>
      </div>

      <PerfilFormModal
        isOpen={isModalOpen}
        initialData={perfilData}
        onClose={() => setIsModalOpen(false)}
        onSubmitForm={handleFormSubmit}
      />

      <Toast message={toast} />
    </div>
  );
}