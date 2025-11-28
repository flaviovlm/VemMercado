package com.example.vem_mercado_api.model.Endereco;


import jakarta.persistence.*;

@Entity
@Table (name = "endereco")
public class EnderecoModel {

    @Id @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column ()

}
