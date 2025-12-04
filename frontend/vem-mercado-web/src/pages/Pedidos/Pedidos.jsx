import React, { useEffect, useState } from "react";
import { listarPedidosDoUsuario, buscarPedidoPorId } from "../../api/pedidoApi";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";

export default function Pedidos(){
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [toast, setToast] = useState(null);
  const [buscaId, setBuscaId] = useState("");

  useEffect(()=>{
    if (!usuario) return;
    listarPedidosDoUsuario(usuario.id).then(res=> setPedidos(res)).catch(err=> setToast(err.response?.data?.mensagem || "Erro"));
  },[usuario]);

  const buscar = async () => {
    if(!buscaId) return;
    try {
      const res = await buscarPedidoPorId(buscaId);
      setPedidos([res]);
    } catch (err) {
      setToast(err.response?.data?.mensagem || "Erro ao buscar");
    } finally { setTimeout(()=>setToast(null),3000); }
  };

  return (
    <div>
      <h2>Meus Pedidos</h2>
      <div className="search-row">
        <input placeholder="Buscar por ID" value={buscaId} onChange={e=>setBuscaId(e.target.value)} />
        <button className="btn" onClick={buscar}>Buscar</button>
      </div>
      <div className="grid">
        {pedidos.map(p => (
          <div className="card" key={p.idPedido}>
            <div className="card-body">
              <p>ID: {p.idPedido}</p>
              <p>Data: {p.dataCriacao || "—"}</p>
              <p>Status: {p.status}</p>
              <p>Valor Total: R$ {p.valorTotal?.toFixed ? p.valorTotal.toFixed(2) : p.valorTotal}</p>
              <div className="card-footer">
                <details>
                  <summary>Itens</summary>
                  <ul>
                    {p.itens.map((it, idx) => (
                      <li key={idx}>{it.nomeProduto} — {it.quantidade} x R$ {it.valorItem}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}