package api.repository;

import api.model.UsuarioModel;
import api.model.endereco.EnderecoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<EnderecoModel , Long> {
    boolean existsByLogradouroAndNumeroAndCepAndUsuario(
            String logradouro,
            String numero,
            String cep,
            UsuarioModel usuario
    );

    List<EnderecoModel> findByUsuarioId(Long usuarioId);
}
