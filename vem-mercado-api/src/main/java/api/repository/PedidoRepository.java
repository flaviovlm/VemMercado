package api.repository;

import api.model.UsuarioModel;
import api.model.pedido.PedidoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository <PedidoModel, Long> {
    List<PedidoModel> findByUsuario(UsuarioModel usuario);
}
