package api.dto.produtoDTO;

import api.model.produto.Categoria;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ProdutoRequestDTO {

    @NotBlank(message = "É necessário inserir o nome do produto.")
    @Size(max = 100)
    private String nome;

    @Size(min = 8, max = 20)
    private String ean;

    @NotBlank(message = "É necessário inserir a descrição do produto.")
    private String descricao;

    @NotBlank(message = "É necessário inserir o SKU do produto.")
    @Size(max = 50)
    private String sku;

    @NotNull(message = "É necessário informar o valor do produto")
    @DecimalMin(value = "0.00", inclusive = false, message = "O preço deve ser maior que zero.")
    private BigDecimal valor;

    @NotNull(message = "É necessário informar a quantidade que será adicionada ao estoque")
    private Integer estoque;

    @NotNull(message = "É necessário inserir a categoria do produto.")
    private Categoria categoria;

    @NotNull(message = "A imagem do produto é obrigatória")
    private String imagem;

    public ProdutoRequestDTO() {
    }

    public ProdutoRequestDTO(String nome, String ean, String descricao, String sku, BigDecimal valor, Integer estoque, Categoria categoria, String imagem) {
        this.nome = nome;
        this.ean = ean;
        this.descricao = descricao;
        this.sku = sku;
        this.valor = valor;
        this.estoque = estoque;
        this.categoria = categoria;
        this.imagem = imagem;
    }

    public @NotBlank(message = "É necessário inserir o nome do produto.") @Size(max = 100) String getNome() {
        return nome;
    }

    public void setNome(@NotBlank(message = "É necessário inserir o nome do produto.") @Size(max = 100) String nome) {
        this.nome = nome;
    }

    public @Size(min = 8, max = 20) String getEan() {
        return ean;
    }

    public void setEan(@Size(min = 8, max = 20) String ean) {
        this.ean = ean;
    }

    public @NotBlank(message = "É necessário inserir a descrição do produto.") String getDescricao() {
        return descricao;
    }

    public void setDescricao(@NotBlank(message = "É necessário inserir a descrição do produto.") String descricao) {
        this.descricao = descricao;
    }

    public @NotBlank(message = "É necessário inserir o SKU do produto.") @Size(max = 50) String getSku() {
        return sku;
    }

    public void setSku(@NotBlank(message = "É necessário inserir o SKU do produto.") @Size(max = 50) String sku) {
        this.sku = sku;
    }

    public @NotNull(message = "É necessário informar o valor do produto") @DecimalMin(value = "0.00", inclusive = false, message = "O preço deve ser maior que zero.") BigDecimal getValor() {
        return valor;
    }

    public void setValor(@NotNull(message = "É necessário informar o valor do produto") @DecimalMin(value = "0.00", inclusive = false, message = "O preço deve ser maior que zero.") BigDecimal valor) {
        this.valor = valor;
    }

    public @NotNull(message = "É necessário informar a quantidade que será adicionada ao estoque") Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(@NotNull(message = "É necessário informar a quantidade que será adicionada ao estoque") Integer estoque) {
        this.estoque = estoque;
    }

    public @NotNull(message = "É necessário inserir a categoria do produto.") Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(@NotNull(message = "É necessário inserir a categoria do produto.") Categoria categoria) {
        this.categoria = categoria;
    }

    public @NotNull(message = "A imagem do produto é obrigatória") String getImagem() {
        return imagem;
    }

    public void setImagem(@NotNull(message = "A imagem do produto é obrigatória") String imagem) {
        this.imagem = imagem;
    }
}
