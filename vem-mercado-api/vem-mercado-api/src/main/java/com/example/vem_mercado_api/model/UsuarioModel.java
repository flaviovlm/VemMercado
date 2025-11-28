package com.example.vem_mercado_api.model;

import com.example.vem_mercado_api.model.Endereco.EnderecoModel;
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
    @OneToMany (cascade = CascadeType.ALL)
    private List<EnderecoModel> endereco;


}
