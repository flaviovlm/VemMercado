package api.vem_mercado_api.repository;

import api.vem_mercado_api.model.Endereco.EnderecoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<EnderecoModel , Long> {

}
