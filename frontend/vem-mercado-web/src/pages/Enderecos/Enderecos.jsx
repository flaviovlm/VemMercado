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

  // Usamos useCallback para memoizar a função load, para que ela não mude a cada renderização
  // e cause a re-execução do useEffect desnecessariamente.
  const load = useCallback(async () => {
    if (!usuario) {
      setEnderecos([]); // Limpa endereços se não houver usuário
      updateUserAddresses([]); // Limpa endereços no contexto também
      return;
    }
    try {
      const res = await listarEnderecos(usuario.id);
      setEnderecos(res);
      updateUserAddresses(res); // Atualiza o contexto global do usuário com os novos endereços
    } catch (err) {
      setToast(err.mensagem || "Erro ao carregar endereços");
      setTimeout(() => setToast(null), 3000);
    }
  }, [usuario, updateUserAddresses]); // Adicione usuario e updateUserAddresses como dependências

  // O useEffect agora depende apenas de usuario?.id e da função load (que é memoizada).
  // Isso garante que ele só seja disparado quando o ID do usuário realmente mudar ou
  // quando a função load for alterada (o que só acontecerá se suas dependências mudarem).
  useEffect(() => {
    load();
  }, [usuario?.id]);

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
      await load(); // Garante que a lista de endereços foi atualizada no estado local e no contexto
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
      await load(); // Garante que a lista de endereços foi atualizada no estado local e no contexto
    } catch (err) {
      setToast(err.mensagem || "Erro ao remover endereço");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="enderecos-page">
      <h2>Endereços</h2>

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
