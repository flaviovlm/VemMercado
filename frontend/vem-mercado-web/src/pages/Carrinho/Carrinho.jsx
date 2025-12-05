import React from "react";
import { useCart } from "../../context/CartContext";
import { criarPedido } from "../../api/pedidoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";

export default function Carrinho() {
  const { items, removeFromCart, updateQuantity, clear, total } = useCart();
  const { usuario } = useAuth();
  const [toast, setToast] = React.useState(null);

  const [enderecoSelecionado, setEnderecoSelecionado] = React.useState("");

  const handleCreateOrder = async () => {
    if (!usuario) return setToast("Faça login primeiro!");

    if (!items.length) return setToast("Seu carrinho está vazio.");

    if (!usuario.enderecos || usuario.enderecos.length === 0) {
      return setToast("Cadastre um endereço antes de finalizar o pedido.");
    }

    if (!enderecoSelecionado) {
      return setToast("Selecione um endereço de entrega.");
    }

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
      setToast("Pedido criado com sucesso!");
      clear();
      setEnderecoSelecionado("");
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao criar pedido");
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div>
      <h2>Carrinho</h2>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {/* LISTA DE ITENS DO CARRINHO */}
          <div>
            {items.map((it) => (
              <div key={it.id} className="cart-item">
                <div>{it.nome}</div>
                <div>R$ {parseFloat(it.valor).toFixed(2)}</div>

                <div>
                  <button
                    className="btn ghost"
                    onClick={() =>
                      updateQuantity(it.id, Math.max(1, it.quantity - 1))
                    }
                  >
                    -
                  </button>

                  <span>{it.quantity}</span>

                  <button
                    className="btn ghost"
                    onClick={() => updateQuantity(it.id, it.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn ghost"
                  onClick={() => removeFromCart(it.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* SELECT DE ENDEREÇO */}
          {usuario?.enderecos?.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <label>
                <strong>Selecione o endereço de entrega:</strong>
              </label>
              <select
                className="input"
                value={enderecoSelecionado}
                onChange={(e) => setEnderecoSelecionado(e.target.value)}
              >
                <option value="">Escolher endereço...</option>

                {usuario.enderecos.map((end) => (
                  <option key={end.id} value={end.id}>
                    {end.logradouro}, {end.numero} - {end.bairro} ({end.cidade})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Caso usuário não tenha endereço */}
          {usuario?.enderecos?.length === 0 && (
            <p style={{ marginTop: "15px", color: "red" }}>
              ⚠ Você ainda não cadastrou nenhum endereço.
            </p>
          )}

          {/* RESUMO DO PEDIDO */}
          <div className="cart-summary" style={{ marginTop: "20px" }}>
            <strong>Total: R$ {total.toFixed(2)}</strong>

            <button className="btn" onClick={handleCreateOrder}>
              Finalizar pedido
            </button>
          </div>
        </>
      )}

      <Toast message={toast} />
    </div>
  );
}
