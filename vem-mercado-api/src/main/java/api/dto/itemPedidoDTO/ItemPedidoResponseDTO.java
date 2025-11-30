package api.dto.itemPedidoDTO;

import api.model.pedido.ItemPedidoModel;

import java.math.BigDecimal;

public class ItemPedidoResponseDTO {

    private String nomeProduto;
    private BigDecimal valorItem;
    private BigDecimal subTotal;
    private Integer quantidade;

    public ItemPedidoResponseDTO() {
    }

    public ItemPedidoResponseDTO(ItemPedidoModel item) {
        this.nomeProduto = item.getProduto().getNome();
        this.valorItem = item.getValorItem();
        this.quantidade = item.getQuantidade();
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public BigDecimal getValorItem() {
        return valorItem;
    }

    public void setValorItem(BigDecimal valorItem) {
        this.valorItem = valorItem;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
