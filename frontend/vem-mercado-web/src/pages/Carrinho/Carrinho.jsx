import React from "react";
import { useCart } from "../../context/CartContext";
import { criarPedido } from "../../api/pedidoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";

export default function Carrinho(){
  const { items, removeFromCart, updateQuantity, clear, total } = useCart();
  const { usuario } = useAuth();
  const [toast, setToast] = React.useState(null);

  const handleCreateOrder = async () => {
    if (!usuario) return setToast("Faça login");
    if (!items.length) return setToast("Carrinho vazio");
    const body = {
      usuarioId: usuario.id,
      enderecoEntregaId: usuario.enderecos?.[0]?.id || null,
      itens: items.map(i => ({ idProduto: i.id, quantidade: i.quantity }))
    };
    try {
      await criarPedido(body);
      setToast("Pedido criado com sucesso");
      clear();
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao criar pedido");
    } finally {
      setTimeout(()=>setToast(null),3000);
    }
  };

  return (
    <div>
      <h2>Carrinho</h2>
      {items.length === 0 ? <p>Seu carrinho está vazio</p> : (
        <div>
          {items.map(it => (
            <div key={it.id} className="cart-item">
              <div>{it.nome}</div>
              <div>R$ {parseFloat(it.valor).toFixed(2)}</div>
              <div>
                <button className="btn ghost" onClick={() => updateQuantity(it.id, Math.max(1, it.quantity-1))}>-</button>
                <span>{it.quantity}</span>
                <button className="btn ghost" onClick={() => updateQuantity(it.id, it.quantity+1)}>+</button>
              </div>
              <div><button className="btn ghost" onClick={() => removeFromCart(it.id)}>Remover</button></div>
            </div>
          ))}
          <div className="cart-summary">
            <strong>Total: R$ {total.toFixed(2)}</strong>
            <button className="btn" onClick={handleCreateOrder}>Finalizar pedido</button>
          </div>
        </div>
      )}
      <Toast message={toast} />
    </div>
  );
}