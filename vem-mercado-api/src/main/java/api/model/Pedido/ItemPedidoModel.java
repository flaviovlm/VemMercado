package api.model.Pedido;

import api.model.Produto.ProdutoModel;
import jakarta.persistence.*;

import java.text.DecimalFormat;

@Entity
@Table (name = "item_pedido")
public class ItemPedidoModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private Integer quantidade;

    @Column (nullable = false, precision = 10, scale = 2)
    private DecimalFormat valorItem;

    @ManyToOne
    @JoinColumn (name = "produto_id")
    private ProdutoModel produto;

    @ManyToOne
    @JoinColumn (name = "pedido_id")
    private PedidoModel pedido;

    public ItemPedidoModel() {
    }

    public ItemPedidoModel(Long id, Integer quantidade, DecimalFormat valorItem, ProdutoModel produto, PedidoModel pedido) {
        this.id = id;
        this.quantidade = quantidade;
        this.valorItem = valorItem;
        this.produto = produto;
        this.pedido = pedido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public DecimalFormat getValorItem() {
        return valorItem;
    }

    public void setValorItem(DecimalFormat valorItem) {
        this.valorItem = valorItem;
    }

    public ProdutoModel getProduto() {
        return produto;
    }

    public void setProduto(ProdutoModel produto) {
        this.produto = produto;
    }

    public PedidoModel getPedido() {
        return pedido;
    }

    public void setPedido(PedidoModel pedido) {
        this.pedido = pedido;
    }
}
