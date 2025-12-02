package api.dto.produtoDTO;

import api.model.produto.Categoria;

import java.math.BigDecimal;

public class ProdutoResponseDTO {

    private String nome;
    private String descricao;
    private BigDecimal valor;
    private Categoria categoria;
    private String imagem;

    public ProdutoResponseDTO() {
    }

    public ProdutoResponseDTO(String nome, String descricao, BigDecimal valor, Categoria categoria, String imagem) {
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        this.imagem = imagem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
