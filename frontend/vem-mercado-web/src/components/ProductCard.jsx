import React from "react";

export default function ProductCard({ produto, onAdd }){
  return (
    <div className="card">
      {produto.imagem && <img src={produto.imagem} alt={produto.nome} className="card-img" />}
      <div className="card-body">
        <h3>{produto.nome}</h3>
        <p className="muted">{produto.descricao}</p>
        <div className="card-footer">
          <strong>R$ {produto.valor?.toFixed ? produto.valor.toFixed(2) : produto.valor}</strong>
          <button className="btn" onClick={() => onAdd(produto)}>Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
}