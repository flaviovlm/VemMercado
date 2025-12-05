import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  atualizarUsuarioParcial,
  buscarUsuarioPorCpf,
} from "../../api/usuarioApi";
import Toast from "../../components/Toast";
// Importa o novo modal (certifique-se que o caminho está correto)
import PerfilFormModal from "../../components/PerfilForm/PerfilFormModal";
import "./style.css";

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

  // Função de submissão OTIMIZADA
  const handleFormSubmit = async (data) => {
    try {
      // Objeto que conterá apenas o que realmente mudou
      const dirtyFields = {};

      // Compara os valores do formulário (data) com os originais (perfilData)
      if (data.nome !== perfilData.nome) dirtyFields.nome = data.nome;
      if (data.email !== perfilData.email) dirtyFields.email = data.email;
      if (data.telefone !== perfilData.telefone) dirtyFields.telefone = data.telefone;

      // Senha e Senha Atual sempre entram se foram preenchidas (não nulas/vazias)
      // O formulário já garante que 'senha' e 'senhaAtual' vêm como string ou null/undefined
      if (data.senha) dirtyFields.senha = data.senha;
      if (data.senhaAtual) dirtyFields.senhaAtual = data.senhaAtual;

      // Se o objeto estiver vazio, significa que o usuário clicou em salvar sem mudar nada
      if (Object.keys(dirtyFields).length === 0) {
        setToast("Nenhuma alteração realizada.");
        setIsModalOpen(false); // Pode fechar o modal se quiser
        return;
      }

      // Envia a atualização apenas com os campos 'sujos' (alterados)
      await atualizarUsuarioParcial(usuario.id, dirtyFields);
      setToast("Atualizado com sucesso!");

      // Recarrega os dados e atualiza o contexto de autenticação
      // Nota: Como o CPF pode ter mudado (teoricamente), usamos o ID ou buscamos de novo
      // Se sua API permite mudar CPF, cuidado aqui. Se não, segue a busca pelo CPF atual.
      const updated = await buscarUsuarioPorCpf(perfilData.cpf); 
      
      login(updated); // Atualiza o contexto global
      setPerfilData(updated); // Atualiza o estado local
      setIsModalOpen(false); // Fecha o modal

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