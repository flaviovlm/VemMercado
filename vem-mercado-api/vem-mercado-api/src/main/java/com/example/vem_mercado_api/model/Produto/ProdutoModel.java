package com.example.vem_mercado_api.model.Produto;

import com.example.vem_mercado_api.model.Pedido.ItemPedidoModel;
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
    @Column (nullable = false)
    private String ean;
    @Column (nullable = false)
    private String sku;
    @Column (nullable = false, precision = 10, scale = 2)
    private DecimalFormat valor;
    @Column (nullable = false)
    private String categoria;
    @OneToMany
    private List<ItemPedidoModel> itemPedido;

    public ProdutoModel() {
    }

    public ProdutoModel(Long id, String nome, String ean, String sku, DecimalFormat valor, String categoria, List<ItemPedidoModel> itemPedido) {
        this.id = id;
        this.nome = nome;
        this.ean = ean;
        this.sku = sku;
        this.valor = valor;
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<ItemPedidoModel> getItemPedido() {
        return itemPedido;
    }

    public void setItemPedido(List<ItemPedidoModel> itemPedido) {
        this.itemPedido = itemPedido;
    }
}
