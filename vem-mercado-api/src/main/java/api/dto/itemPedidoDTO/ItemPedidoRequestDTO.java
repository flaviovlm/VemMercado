package api.dto.itemPedidoDTO;

import api.model.produto.ProdutoModel;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ItemPedidoRequestDTO {

    @NotNull (message = "É necessário haver um produto")
    private Long idProduto;

    @NotNull (message = "A quantidade é obrigatória")
    @Min(value = 1 ,message = "O mínimo para compra é 1")
    private Integer quantidade;

    public ItemPedidoRequestDTO() {
    }

    public ItemPedidoRequestDTO(Long idProduto, Integer quantidade) {
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
