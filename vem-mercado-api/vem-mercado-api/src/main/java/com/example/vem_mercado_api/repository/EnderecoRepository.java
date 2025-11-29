package com.example.vem_mercado_api.repository;

import com.example.vem_mercado_api.model.Endereco.EnderecoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<EnderecoModel , Long> {

}
