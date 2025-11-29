package api.vem_mercado_api.repository;

import api.vem_mercado_api.model.Produto.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<ProdutoModel , Long> {
}
