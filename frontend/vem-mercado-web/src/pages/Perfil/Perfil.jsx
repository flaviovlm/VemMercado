import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  atualizarUsuarioParcial,
  buscarUsuarioPorCpf,
} from "../../api/usuarioApi";
import Toast from "../../components/Toast";
// Importa o novo modal
import PerfilFormModal from "../../components/PerfilForm/PerfilFormModal";
import "./style.css";
// Removemos useForm, yupResolver e yup daqui, pois a lógica de formulário está no modal.

export default function Perfil() {
  const { usuario, login } = useAuth();
  const [toast, setToast] = useState(null);
  const [perfilData, setPerfilData] = useState(null); // Estado para dados exibidos
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  // Função para carregar/recarregar os dados do usuário
  const loadUserData = () => {
    if (usuario) {
      // Busca os dados mais recentes (útil após login/atualização)
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
  }, [usuario]); // Executa ao montar e sempre que o objeto 'usuario' mudar

  // Função de submissão (será passada ao Modal)
  const handleFormSubmit = async (data) => {
    try {
      // 1. Filtra apenas campos preenchidos, removendo os vazios ou nulos (para atualização parcial/PATCH)
      const body = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined,
        ),
      );

      // 2. Garante que pelo menos um campo foi alterado
      if (Object.keys(body).length === 0) {
        setToast("Nenhuma alteração realizada.");
        return;
      }

      // 3. Envia a atualização
      await atualizarUsuarioParcial(usuario.id, body);
      setToast("Atualizado com sucesso!");

      // 4. Recarrega os dados e atualiza o contexto de autenticação (boa prática)
      const updated = await buscarUsuarioPorCpf(usuario.cpf);
      login(updated);
      setPerfilData(updated); // Atualiza o estado local para exibição

      setIsModalOpen(false); // Fecha o modal
    } catch (err) {
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

      {/* Seção de VISUALIZAÇÃO dos dados */}
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

        {/* Botão para abrir o modal de edição */}
        <button
          className="btn primary-action"
          onClick={() => setIsModalOpen(true)}
        >
          Editar Informações
        </button>
      </div>

      {/* Componente Modal */}
      <PerfilFormModal
        isOpen={isModalOpen}
        initialData={perfilData} // Passa os dados atuais
        onClose={() => setIsModalOpen(false)}
        onSubmitForm={handleFormSubmit}
      />

      <Toast message={toast} />
    </div>
  );
}
