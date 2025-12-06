import React, { useEffect, useState, useCallback } from "react";
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
  const { usuario, updateUserAddresses } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    if (!usuario) {
      setEnderecos([]);
      updateUserAddresses([]);
      return;
    }
    try {
      const res = await listarEnderecos(usuario.id);
      setEnderecos(res);
      updateUserAddresses(res);
    } catch (err) {
      setToast(err.mensagem || "Erro ao carregar endereços");
      setTimeout(() => setToast(null), 3000);
    }
  }, [usuario, updateUserAddresses]);

  useEffect(() => {
    load();
  }, [usuario?.id]);

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
      await load();
    } catch (err) {
      setToast(err.mensagem || "Erro ao salvar endereço");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleOpenCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const startEdit = (endereco) => {
    setEditing(endereco);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const remove = async (id) => {
    try {
      await deletarEndereco(usuario.id, id);
      setToast("Endereço removido com sucesso");
      await load();
    } catch (err) {
      setToast(err.mensagem || "Erro ao remover endereço");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="enderecos-page">
      
      {/* --- AQUI ESTÁ A CORREÇÃO --- */}
      {/* Esta div agrupa o título e o botão para ficarem na mesma linha */}
      <div className="header-container">
        <h2>Endereços</h2>
        <button className="btn-novo-endereco" onClick={handleOpenCreate}>
          + Cadastrar Novo Endereço
        </button>
      </div>
      {/* ---------------------------- */}

      <div className="grid">
        {enderecos.length > 0 ? (
          enderecos.map((e) => (
            <div className="card" key={e.id}>
              <div className="card-body">
                <p>
                  <strong>{e.logradouro}, {e.numero}</strong> - {e.bairro}
                </p>
                <p>{e.cidade} - {e.estado} - CEP: {e.cep}</p>

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
            Nenhum endereço cadastrado.
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