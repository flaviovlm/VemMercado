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

    public PedidoModel() {
    }

    public PedidoModel(Long id, BigDecimal valorPedido, LocalDateTime dataCriacao, UsuarioModel usuario, EnderecoModel endereco, List<ItemPedidoModel> itemPedido) {
        this.id = id;
        this.valorPedido = valorPedido;
        this.dataCriacao = dataCriacao;
        this.usuario = usuario;
        this.endereco = endereco;
        this.itemPedido = itemPedido;
    }
}
