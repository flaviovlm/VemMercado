package api.vem_mercado_api.repository;

import api.vem_mercado_api.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel , Long> {
    Optional<UsuarioModel> findByEmail(String email);
    Optional<UsuarioModel> findByCpf(String cpf);
    Optional<UsuarioModel> findByTelefone(String telefone);
}
