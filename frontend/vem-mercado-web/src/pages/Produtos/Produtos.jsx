import React, { useEffect, useState } from "react";
import { listarProdutos } from "../../api/produtoApi";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import { useCart } from "../../context/CartContext";
import Toast from "../../components/Toast";

export default function Produtos(){
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(()=>{
    setLoading(true);
    listarProdutos().then(res=> setProdutos(res)).catch(err=> setToast(err.response?.data?.mensagem || "Erro ao buscar produtos"))
      .finally(()=> setLoading(false));
  },[]);

  const handleAdd = (p) => {
    addToCart({ id: p.id, nome: p.nome, valor: p.valor, imagem: p.imagem });
    setToast("Adicionado ao carrinho");
    setTimeout(()=>setToast(null),2000);
  };

  return (
    <div>
      <h2>Produtos</h2>
      {loading ? <Loading/> : (
        <div className="grid">
          {produtos.map(p => <ProductCard key={p.id} produto={p} onAdd={handleAdd} />)}
        </div>
      )}
      <Toast message={toast} />
    </div>
  );
}