// src/pages/Enderecos/Enderecos.jsx
import React, { useEffect, useState } from "react";
import {
  listarEnderecos,
  criarEndereco,
  atualizarEndereco,
  deletarEndereco,
} from "../../api/enderecoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
import EnderecoFormModal from "../../components/EnderecoForm/EnderecoFormModal";
import "./style.css";

export default function Enderecos() {
  const { usuario } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [toast, setToast] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Carregar endereços
  const load = async () => {
    if (!usuario) return;
    try {
      const res = await listarEnderecos(usuario.id);
      setEnderecos(res);
    } catch (err) {
      setToast(err.mensagem || "Erro ao carregar endereços");
      setTimeout(() => setToast(null), 3000);
    }
  };

  useEffect(() => {
    load();
  }, [usuario]);

  // Criar ou editar endereço
  const handleFormSubmit = async (data) => {
    try {
      if (editing) {
        await atualizarEndereco(usuario.id, editing.id, data);
        setToast("Endereço atualizado com sucesso!");
      } else {
        await criarEndereco(usuario.id, data);
        setToast("Endereço criado com sucesso!");
      }

      handleCloseModal();
      load(); // Atualiza lista
    } catch (err) {
      setToast(err.mensagem || "Erro ao salvar endereço");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Abrir modal criação
  const handleOpenCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  // Abrir modal edição
  const startEdit = (endereco) => {
    setEditing(endereco);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  // Remover endereço
  const remove = async (id) => {
    try {
      await deletarEndereco(usuario.id, id);
      setToast("Endereço removido com sucesso");
      load();
    } catch (err) {
      setToast(err.mensagem || "Erro ao remover endereço");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="enderecos-page">
      <h2>Endereços Cadastrados</h2>

      <button className="btn primary-action" onClick={handleOpenCreate}>
        + Cadastrar Novo Endereço
      </button>

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
            Nenhum endereço cadastrado. Clique em "Cadastrar Novo Endereço".
          </p>
        )}
      </div>

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
