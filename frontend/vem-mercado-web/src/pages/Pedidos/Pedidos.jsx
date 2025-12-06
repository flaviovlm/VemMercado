import React, { useEffect, useState } from "react";
import { listarPedidosDoUsuario } from "../../api/pedidoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
import "./style.css";

export default function Pedidos() {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [toast, setToast] = useState(null);
  
  // Estado para a barra de pesquisa
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!usuario) return;
    
    // Carrega TODOS os pedidos de uma vez
    listarPedidosDoUsuario(usuario.id)
      .then((res) => setPedidos(res))
      .catch((err) =>
        setToast(err.response?.data?.mensagem || "Erro ao carregar pedidos")
      );
  }, [usuario]);

  // Lógica de Filtro em Tempo Real (ID ou Status)
  const pedidosFiltrados = pedidos.filter((p) => {
    const termo = searchTerm.toLowerCase();
    const id = p.idPedido ? String(p.idPedido) : "";
    const status = p.status ? p.status.toLowerCase() : "";
    
    // Retorna se o ID ou o Status contém o que foi digitado
    return id.includes(termo) || status.includes(termo);
  });

  // Função auxiliar para formatar preço
  const formatMoney = (val) => {
    return parseFloat(val || 0).toFixed(2).replace('.', ',');
  };

  // Função auxiliar para formatar data
  const formatData = (dataIso) => {
    if (!dataIso) return "—";
    return new Date(dataIso).toLocaleDateString('pt-BR');
  };

  return (
    <div className="pedidos-page">
      <h2>Meus Pedidos</h2>

      {/* === BARRA DE PESQUISA (Estilo Apple) === */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" height="20" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" 
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          
          <input
            type="text"
            placeholder="Buscar por ID (#) ou Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* === GRID DE PEDIDOS === */}
      <div className="grid">
        {pedidosFiltrados.length > 0 ? (
          pedidosFiltrados.map((p) => (
            <div className="card" key={p.idPedido}>
              
              {/* Cabeçalho do Card: ID e Status */}
              <div className="card-header-row">
                <span className="order-id">#{p.idPedido}</span>
                <span className={`status-badge ${p.status?.toLowerCase()}`}>
                  {p.status}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="label">Data:</span>
                  <span className="value">{formatData(p.dataCriacao)}</span>
                </div>
                
                <div className="info-row">
                  <span className="label">Total:</span>
                  <span className="value price">R$ {formatMoney(p.valorTotal)}</span>
                </div>

                {/* Detalhes / Accordion */}
                <div className="card-footer">
                  <details>
                    <summary>Ver Itens do Pedido</summary>
                    <ul className="itens-lista">
                      {p.itens.map((it, idx) => (
                        <li key={idx}>
                          <span className="item-nome">{it.nomeProduto}</span>
                          <span className="item-total">
                            {it.quantidade}x R$ {formatMoney(it.valorItem)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            {searchTerm 
             ? `Nenhum pedido encontrado para "${searchTerm}"`
             : "Você ainda não fez nenhum pedido."}
          </div>
        )}
      </div>

      <Toast message={toast} />
    </div>
  );
}