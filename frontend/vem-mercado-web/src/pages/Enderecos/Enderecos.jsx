// Arquivo: src/pages/Enderecos/Enderecos.jsx

import React, { useEffect, useState } from "react";
import {
  listarEnderecos,
  criarEndereco,
  atualizarEndereco,
  deletarEndereco,
} from "../../api/enderecoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
// Importamos o novo componente Modal
import EnderecoFormModal from "../../components/EnderecoForm/EnderecoFormModal";
import "./style.css";
// Removendo useForm, yupResolver e yup, pois a lógica foi movida para o Modal

export default function Enderecos() {
  const { usuario } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [toast, setToast] = useState(null);

  // Novo estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // O estado 'editing' agora guarda os dados para pré-preencher o modal
  const [editing, setEditing] = useState(null);

  // Função de carregamento dos dados
  const load = () => {
    if (!usuario) return;
    // Melhoria: Usar async/await aqui também para melhor legibilidade
    listarEnderecos(usuario.id)
      .then((res) => setEnderecos(res))
      .catch((err) =>
        setToast(err.response?.data?.mensagem || "Erro ao carregar"),
      );
  };

  useEffect(() => {
    load();
  }, [usuario]);

  // Função unificada de submissão (Criação/Edição) - Passada para o Modal
  const handleFormSubmit = async (data) => {
    try {
      if (editing) {
        // Envia o ID para a atualização
        await atualizarEndereco(usuario.id, editing.id, data);
        setToast("Endereço atualizado com sucesso");
      } else {
        await criarEndereco(usuario.id, data);
        setToast("Endereço criado com sucesso");
      }

      // Fecha o modal e limpa o estado de edição após o sucesso
      handleCloseModal();
      load(); // Recarrega a lista
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro na operação");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Função para abrir o modal para criação
  const handleOpenCreate = () => {
    setEditing(null); // Garantir que está no modo criação
    setIsModalOpen(true);
  };

  // Função para abrir o modal para edição
  const startEdit = (e) => {
    setEditing(e); // Define os dados para edição
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null); // Limpa o estado de edição ao fechar
  };

  // Função de remoção (mantida)
  const remove = async (id) => {
    try {
      await deletarEndereco(usuario.id, id);
      setToast("Endereço deletado");
      load();
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao deletar");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="enderecos-page">
      <h2>Endereços Cadastrados</h2>

      {/* Botão para ABRIR o Modal de Cadastro */}
      <button className="btn primary-action" onClick={handleOpenCreate}>
        + Cadastrar Novo Endereço
      </button>

      {/* Lista de Endereços */}
      <div className="grid">
        {enderecos.length > 0 ? (
          enderecos.map((e) => (
            <div className="card" key={e.id}>
              <div className="card-body">
                <p>
                  <strong>
                    {e.logradouro}, {e.numero}
                  </strong>{" "}
                  - {e.bairro}
                </p>
                <p>
                  {e.cidade} - {e.estado} - CEP: {e.cep}
                </p>
                <div className="card-footer">
                  {/* Botão de edição abre o modal com os dados */}
                  <button className="btn ghost" onClick={() => startEdit(e)}>
                    Editar
                  </button>
                  <button className="btn danger" onClick={() => remove(e.id)}>
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">
            Nenhum endereço cadastrado. Clique em "Cadastrar Novo Endereço" para
            começar.
          </p>
        )}
      </div>

      {/* Componente Modal */}
      <EnderecoFormModal
        isOpen={isModalOpen}
        editingData={editing}
        onClose={handleCloseModal}
        onSubmitForm={handleFormSubmit}
      />

      <Toast message={toast} />
    </div>
  );
}
