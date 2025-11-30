package api.repository;

import api.model.produto.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<ProdutoModel , Long> {
    List<ProdutoModel> findByNomeContainingIgnoreCase(String nome);
    Optional<ProdutoModel> findByEan(String ean);
}
