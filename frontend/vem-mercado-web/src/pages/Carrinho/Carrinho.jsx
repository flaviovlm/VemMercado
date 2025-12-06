import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { criarPedido } from "../../api/pedidoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
import { Link } from "react-router-dom"; // Assumindo que usa react-router
import "./style.css";

export default function Carrinho() {
  const { items, removeFromCart, updateQuantity, clear, total } = useCart();
  const { usuario } = useAuth();
  const [toast, setToast] = useState(null);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    if (!usuario) return setToast("Faça login para continuar.");
    if (!items.length) return setToast("Seu carrinho está vazio.");
    
    if (!usuario.enderecos || usuario.enderecos.length === 0) {
      return setToast("Cadastre um endereço antes de finalizar.");
    }
    if (!enderecoSelecionado) {
      return setToast("Selecione onde devemos entregar.");
    }

    setLoading(true);
    
    const body = {
      usuarioId: usuario.id,
      enderecoEntregaId: Number(enderecoSelecionado),
      itens: items.map((i) => ({
        idProduto: i.id,
        quantidade: i.quantity,
      })),
    };

    try {
      await criarPedido(body);
      setToast("Pedido realizado com sucesso! 🚀");
      clear();
      setEnderecoSelecionado("");
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao criar pedido");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Helper para imagem
  const getImage = (img) => {
    return img && img.length > 10 ? img : "https://placehold.co/100x100?text=Sem+Foto";
  };

  return (
    <div className="carrinho-page">
      <div className="cart-header">
        <h2>Seu Carrinho</h2>
        <span className="cart-count">{items.length} itens</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </div>
          <h3>Sua cesta está vazia</h3>
          <p>Parece que você ainda não escolheu seus produtos.</p>
          <Link to="/produtos" className="btn-continue">
            Voltar às Compras
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          
          {/* === LADO ESQUERDO: LISTA DE ITENS === */}
          <div className="cart-items-container">
            {items.map((it) => (
              <div key={it.id} className="cart-item">
                {/* Imagem do Produto */}
                <div className="item-image">
                  <img src={getImage(it.imagem)} alt={it.nome} />
                </div>

                {/* Detalhes */}
                <div className="item-details">
                  <div className="item-info">
                    <h3>{it.nome}</h3>
                    <span className="item-price">
                      R$ {parseFloat(it.valor).toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="item-actions">
                    {/* Controlador de Quantidade (Stepper) */}
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))}
                        disabled={it.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{it.quantity}</span>
                      <button onClick={() => updateQuantity(it.id, it.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(it.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* === LADO DIREITO: RESUMO/CHECKOUT === */}
          <div className="cart-summary-wrapper">
            <div className="cart-summary-card">
              <h3>Resumo do Pedido</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="summary-row">
                <span>Frete</span>
                <span className="free-shipping">Grátis</span>
              </div>

              <div className="divider"></div>

              {/* Seletor de Endereço Estilizado */}
              <div className="address-section">
                <label>Entregar em:</label>
                {usuario?.enderecos?.length > 0 ? (
                  <div className="select-wrapper">
                    <select
                      value={enderecoSelecionado}
                      onChange={(e) => setEnderecoSelecionado(e.target.value)}
                    >
                      <option value="" disabled>Selecione um endereço...</option>
                      {usuario.enderecos.map((end) => (
                        <option key={end.id} value={end.id}>
                          {end.logradouro}, {end.numero}
                        </option>
                      ))}
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                ) : (
                  <div className="no-address-alert">
                    <p>Nenhum endereço cadastrado.</p>
                    <Link to="/enderecos" className="link-add-addr">Cadastrar Endereço</Link>
                  </div>
                )}
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>

              <button 
                className="btn-checkout" 
                onClick={handleCreateOrder}
                disabled={loading}
              >
                {loading ? "Processando..." : "Finalizar Compra"}
              </button>
            </div>
          </div>

        </div>
      )}

      <Toast message={toast} />
    </div>
  );
}