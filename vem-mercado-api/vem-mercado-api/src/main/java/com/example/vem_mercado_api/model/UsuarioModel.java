package com.example.vem_mercado_api.model;

import com.example.vem_mercado_api.model.Endereco.EnderecoModel;
import com.example.vem_mercado_api.model.Pedido.PedidoModel;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table (name = "usuario")
public class UsuarioModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private String nome;

    @Column (nullable = false, unique = true)
    private String email;

    @Column (nullable = false)
    private String senha;

    @Column (nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false , unique = true)
    private String telefone;

    @OneToMany (mappedBy = "usuario",cascade = CascadeType.ALL)
    private List<EnderecoModel> endereco;

    @OneToMany(mappedBy = "usuario")
    private List<PedidoModel> pedido;

    public UsuarioModel() {
    }

    public UsuarioModel(Long id, String nome, String email, String senha, String cpf, String telefone, List<EnderecoModel> endereco, List<PedidoModel> pedido) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.pedido = pedido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public List<EnderecoModel> getEndereco() {
        return endereco;
    }

    public void setEndereco(List<EnderecoModel> endereco) {
        this.endereco = endereco;
    }

    public List<PedidoModel> getPedido() {
        return pedido;
    }

    public void setPedido(List<PedidoModel> pedido) {
        this.pedido = pedido;
    }
}
