import React, { useEffect, useState } from "react";
import { listarProdutos } from "../../api/produtoApi";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import { useCart } from "../../context/CartContext";
import Toast from "../../components/Toast";
import "./style.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Estado para a busca
  const [searchTerm, setSearchTerm] = useState("");
  
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    listarProdutos()
      .then((res) => setProdutos(res))
      .catch((err) =>
        setToast(err.response?.data?.mensagem || "Erro ao buscar produtos")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (p) => {
    addToCart({ id: p.id, nome: p.nome, valor: p.valor, imagem: p.imagem });
    setToast("Adicionado ao carrinho");
    setTimeout(() => setToast(null), 2000);
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const produtosPorCategoria = produtosFiltrados.reduce((acc, produto) => {
    const categoria = produto.categoria || "Outros";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(produto);
    return acc;
  }, {});

  const categorias = Object.keys(produtosPorCategoria).sort();

  return (
    <div className="produtos-page">
      <h2>Nossos Produtos</h2>

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
            placeholder="O que você está procurando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="catalogo-container">
          {!loading && categorias.length === 0 && (
            <div className="no-results">
              <p>Nenhum produto encontrado para "{searchTerm}"</p>
            </div>
          )}

          {categorias.map((categoria) => (
            <div key={categoria} className="categoria-section">
              <h3 className="categoria-titulo">{categoria}</h3>
              <div className="produtos-grid">
                {produtosPorCategoria[categoria].map((p) => (
                  <ProductCard key={p.id} produto={p} onAdd={handleAdd} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Toast message={toast} />
    </div>
  );
}