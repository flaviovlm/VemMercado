package api.vem_mercado_api.model.Endereco;


import api.vem_mercado_api.model.UsuarioModel;
import jakarta.persistence.*;

@Entity
@Table (name = "endereco")
public class EnderecoModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (nullable = false)
    private String logradouro;
    @Column (nullable = false)
    private String numero;
    @Column (nullable = false)
    private String cep;
    @Column (nullable = false)
    private String estado;
    @Column (nullable = false)
    private String cidade;
    @ManyToOne
    @JoinColumn (name = "usuario_id")
    private UsuarioModel usuario;

    public EnderecoModel() {
    }

    public EnderecoModel(Long id, String logradouro, String numero, String cep, String estado, String cidade, UsuarioModel usuario) {
        this.id = id;
        this.logradouro = logradouro;
        this.numero = numero;
        this.cep = cep;
        this.estado = estado;
        this.cidade = cidade;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }
}
