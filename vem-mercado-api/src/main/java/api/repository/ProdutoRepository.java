package api.repository;

import api.model.produto.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<ProdutoModel , Long> {
    List<ProdutoModel> findByNomeContainingIgnoreCase(String nome);
}
