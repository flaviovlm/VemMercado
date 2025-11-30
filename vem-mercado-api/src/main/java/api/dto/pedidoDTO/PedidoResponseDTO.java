package api.dto.pedidoDTO;

import api.dto.itemPedidoDTO.ItemPedidoRequestDTO;

import java.util.List;

public class PedidoResponseDTO {

    private Long usuarioId;
    private List<ItemPedidoRequestDTO> itens;
    private Long enderecoEntregaId;

    public PedidoResponseDTO() {
    }

    public PedidoResponseDTO(Long usuarioId, List<ItemPedidoRequestDTO> itens, Long enderecoEntregaId) {
        this.usuarioId = usuarioId;
        this.itens = itens;
        this.enderecoEntregaId = enderecoEntregaId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public List<ItemPedidoRequestDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedidoRequestDTO> itens) {
        this.itens = itens;
    }

    public Long getEnderecoEntregaId() {
        return enderecoEntregaId;
    }

    public void setEnderecoEntregaId(Long enderecoEntregaId) {
        this.enderecoEntregaId = enderecoEntregaId;
    }
}
