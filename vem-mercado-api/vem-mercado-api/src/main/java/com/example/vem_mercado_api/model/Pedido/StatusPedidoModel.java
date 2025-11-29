package com.example.vem_mercado_api.model.Pedido;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table (name = "statusPedido")
public class StatusPedidoModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status statusPedido;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "idPedido")
    private PedidoModel pedido;

    public StatusPedidoModel() {
    }

    public StatusPedidoModel(Long id, Status statusPedido, LocalDateTime dataHora, PedidoModel pedido) {
        this.id = id;
        this.statusPedido = statusPedido;
        this.dataHora = dataHora;
        this.pedido = pedido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatusPedido() {
        return statusPedido;
    }

    public void setStatusPedido(Status statusPedido) {
        this.statusPedido = statusPedido;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public PedidoModel getPedido() {
        return pedido;
    }

    public void setPedido(PedidoModel pedido) {
        this.pedido = pedido;
    }
}
