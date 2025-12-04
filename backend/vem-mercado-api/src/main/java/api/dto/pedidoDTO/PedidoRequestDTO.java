package api.dto.pedidoDTO;

import api.dto.itemPedidoDTO.ItemPedidoRequestDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class PedidoRequestDTO {
    @NotNull(message = "O usuário é obrigatório")
    private Long usuarioId;

    @NotNull(message = "Os itens do pedido são obrigatórios")
    @Size(min = 1, message = "O pedido deve ter pelo menos um item")
    private List<ItemPedidoRequestDTO> itens;

    @NotNull(message = "O endereço de entrega é obrigatório")
    private Long enderecoEntregaId;

    public PedidoRequestDTO() {
    }

    public PedidoRequestDTO(Long usuarioId, List<ItemPedidoRequestDTO> itens, Long enderecoEntregaId) {
        this.usuarioId = usuarioId;
        this.itens = itens;
        this.enderecoEntregaId = enderecoEntregaId;
    }

    public @NotNull(message = "O usuário é obrigatório") Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(@NotNull(message = "O usuário é obrigatório") Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public @NotNull(message = "Os itens do pedido são obrigatórios") @Size(min = 1, message = "O pedido deve ter pelo menos um item") List<ItemPedidoRequestDTO> getItens() {
        return itens;
    }

    public void setItens(@NotNull(message = "Os itens do pedido são obrigatórios") @Size(min = 1, message = "O pedido deve ter pelo menos um item") List<ItemPedidoRequestDTO> itens) {
        this.itens = itens;
    }

    public @NotNull(message = "O endereço de entrega é obrigatório") Long getEnderecoEntregaId() {
        return enderecoEntregaId;
    }

    public void setEnderecoEntregaId(@NotNull(message = "O endereço de entrega é obrigatório") Long enderecoEntregaId) {
        this.enderecoEntregaId = enderecoEntregaId;
    }
}
