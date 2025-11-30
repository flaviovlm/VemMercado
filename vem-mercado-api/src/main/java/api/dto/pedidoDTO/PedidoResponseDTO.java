package api.dto.pedidoDTO;

import api.dto.itemPedidoDTO.ItemPedidoRequestDTO;
import api.model.pedido.Status;

import java.math.BigDecimal;
import java.util.List;

public class PedidoResponseDTO {

    private Long idPedido;
    private Long usuarioId;
    private List<ItemPedidoRequestDTO> itens;
    private Long enderecoEntregaId;
    private Status status;
    private BigDecimal valorTotal;

    public PedidoResponseDTO() {
    }

    public PedidoResponseDTO(Long idPedido, Long usuarioId, List<ItemPedidoRequestDTO> itens, Long enderecoEntregaId, Status status, BigDecimal valorTotal) {
        this.idPedido = idPedido;
        this.usuarioId = usuarioId;
        this.itens = itens;
        this.enderecoEntregaId = enderecoEntregaId;
        this.status = status;
        this.valorTotal = valorTotal;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
}
