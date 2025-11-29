package api.model.pedido;

import api.model.endereco.EnderecoModel;
import api.model.UsuarioModel;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table (name = "pedido")
public class PedidoModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, precision = 10, scale = 2)
    private BigDecimal valorPedido;

    @Column
    private LocalDateTime dataCriacao;

    @ManyToOne
    @JoinColumn (name = "usuario_id")
    private UsuarioModel usuario;

    @ManyToOne
    @JoinColumn (name = "endereco_id")
    private EnderecoModel endereco;

    @OneToMany (mappedBy = "pedido", cascade = CascadeType.ALL)
    private List <ItemPedidoModel> itemPedido;

    @OneToMany (mappedBy = "pedido",cascade = CascadeType.ALL)
    private List<StatusPedidoModel> statusPedido;

    public PedidoModel() {
    }

    public PedidoModel(Long id, BigDecimal valorPedido, LocalDateTime dataCriacao, UsuarioModel usuario, EnderecoModel endereco, List<ItemPedidoModel> itemPedido, List<StatusPedidoModel> statusPedido) {
        this.id = id;
        this.valorPedido = valorPedido;
        this.dataCriacao = dataCriacao;
        this.usuario = usuario;
        this.endereco = endereco;
        this.itemPedido = itemPedido;
        this.statusPedido = statusPedido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValorPedido() {
        return valorPedido;
    }

    public void setValorPedido(BigDecimal valorPedido) {
        this.valorPedido = valorPedido;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }

    public EnderecoModel getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoModel endereco) {
        this.endereco = endereco;
    }

    public List<ItemPedidoModel> getItemPedido() {
        return itemPedido;
    }

    public void setItemPedido(List<ItemPedidoModel> itemPedido) {
        this.itemPedido = itemPedido;
    }

    public List<StatusPedidoModel> getStatusPedido() {
        return statusPedido;
    }

    public void setStatusPedido(List<StatusPedidoModel> statusPedido) {
        this.statusPedido = statusPedido;
    }
}
