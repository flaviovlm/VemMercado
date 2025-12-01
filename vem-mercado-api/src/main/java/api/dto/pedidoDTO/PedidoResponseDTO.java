package api.dto.pedidoDTO;

import api.dto.itemPedidoDTO.ItemPedidoRequestDTO;
import api.dto.itemPedidoDTO.ItemPedidoResponseDTO;
import api.model.pedido.PedidoModel;
import api.model.pedido.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponseDTO {

    private Long idPedido;
    private Long usuarioId;
    private List<ItemPedidoResponseDTO> itens;
    private Long enderecoEntregaId;
    private Status status;
    private BigDecimal valorTotal;
    private LocalDateTime dataCriacao;

    public PedidoResponseDTO(Long idPedido, Long usuarioId, List<ItemPedidoResponseDTO> itens, Long enderecoEntregaId, Status status, BigDecimal valorTotal) {
        this.idPedido = idPedido;
        this.usuarioId = usuarioId;
        this.itens = itens;
        this.enderecoEntregaId = enderecoEntregaId;
        this.status = status;
        this.valorTotal = valorTotal;
    }

    public PedidoResponseDTO(PedidoModel pedido) {
        this.idPedido = pedido.getId();
        this.usuarioId = pedido.getUsuario().getId();
        this.enderecoEntregaId = pedido.getEndereco().getId();
        this.status = pedido.getStatusPedido();
        this.valorTotal = pedido.getValorPedido();
        this.itens = pedido
                .getItemPedido()
                .stream()
                .map(ItemPedidoResponseDTO::new)
                .toList();
    }

    public PedidoResponseDTO() {
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

    public List<ItemPedidoResponseDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedidoResponseDTO> itens) {
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

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
