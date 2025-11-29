package api.model.produto;

import api.model.pedido.ItemPedidoModel;
import jakarta.persistence.*;

import java.text.DecimalFormat;
import java.util.List;

@Entity
@Table ( name = "produto")
public class ProdutoModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private String nome;

    @Column (unique = true)
    private String ean;

    @Column
    private String descricao;

    @Column (nullable = false, unique = true)
    private String sku;

    @Column (nullable = false, precision = 10, scale = 2)
    private DecimalFormat valor;

    @Column (nullable = false)
    private Integer estoque;

    @Enumerated (EnumType.STRING)
    @Column
    private Categoria categoria;

    @OneToMany
    private List<ItemPedidoModel> itemPedido;

    public ProdutoModel() {
    }

    public ProdutoModel(Long id, String nome, String ean, String descricao, String sku, DecimalFormat valor, Integer estoque, Categoria categoria, List<ItemPedidoModel> itemPedido) {
        this.id = id;
        this.nome = nome;
        this.ean = ean;
        this.descricao = descricao;
        this.sku = sku;
        this.valor = valor;
        this.estoque = estoque;
        this.categoria = categoria;
        this.itemPedido = itemPedido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEan() {
        return ean;
    }

    public void setEan(String ean) {
        this.ean = ean;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public DecimalFormat getValor() {
        return valor;
    }

    public void setValor(DecimalFormat valor) {
        this.valor = valor;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public List<ItemPedidoModel> getItemPedido() {
        return itemPedido;
    }

    public void setItemPedido(List<ItemPedidoModel> itemPedido) {
        this.itemPedido = itemPedido;
    }
}
