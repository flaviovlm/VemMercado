import React from "react";

export default function ProductCard({ produto, onAdd }) {
  const imageSrc = produto.imagem && produto.imagem.length > 10 
    ? produto.imagem 
    : "https://placehold.co/200x200?text=Sem+Imagem";

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img src={imageSrc} alt={produto.nome} />
      </div>

      <div className="card-info">
        <h3>{produto.nome}</h3>
        
        <div className="card-bottom">
          <span className="price">
            {parseFloat(produto.valor).toFixed(2).replace('.', ',')}
          </span>
          <button onClick={() => onAdd(produto)}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}