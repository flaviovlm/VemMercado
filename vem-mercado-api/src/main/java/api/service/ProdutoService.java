package api.service;

import api.dto.produtoDTO.ProdutoRequestDTO;
import api.dto.produtoDTO.ProdutoResponseDTO;
import api.exception.EanExistenteException;
import api.model.produto.ProdutoModel;
import api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository
                .findAll()
                .stream()
                .map(produtoModel -> new ProdutoResponseDTO(
                        produtoModel.getNome(),
                        produtoModel.getDescricao(),
                        produtoModel.getValor(),
                        produtoModel.getCategoria(),
                        produtoModel.getImagem()
                ))
                .toList();
    }

    public List<ProdutoResponseDTO> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(produto -> new ProdutoResponseDTO(
                        produto.getNome(),
                        produto.getDescricao(),
                        produto.getValor(),
                        produto.getCategoria(),
                        produto.getImagem()
                ))
                .toList();
    }

    public ProdutoModel salvar(ProdutoRequestDTO produtoRequestDTO) {
        if (produtoRepository.findByEan(produtoRequestDTO.getEan()).isPresent()) {
            throw new EanExistenteException("Este produto já está cadastrado.");
        }
        ProdutoModel produto = new ProdutoModel();
        produto.setNome(produtoRequestDTO.getNome());
        produto.setEan(produtoRequestDTO.getEan());
        produto.setDescricao(produtoRequestDTO.getDescricao());
        produto.setSku(produtoRequestDTO.getSku());
        produto.setValor(produtoRequestDTO.getValor());
        produto.setEstoque(produtoRequestDTO.getEstoque());
        produto.setCategoria(produtoRequestDTO.getCategoria());
        produto.setImagem(produtoRequestDTO.getImagem());

        produtoRepository.save(produto);
        return produto;
    }

    public ProdutoModel atualizar(Long id, ProdutoRequestDTO dto) {

        ProdutoModel produtoExistente = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Este produto não existe."));

        produtoExistente.setNome(dto.getNome());
        produtoExistente.setEan(dto.getEan());
        produtoExistente.setDescricao(dto.getDescricao());
        produtoExistente.setSku(dto.getSku());
        produtoExistente.setValor(dto.getValor());
        produtoExistente.setEstoque(dto.getEstoque());
        produtoExistente.setCategoria(dto.getCategoria());
        produtoExistente.setImagem(dto.getImagem());

        return produtoRepository.save(produtoExistente);
    }

        public void deletar(Long id) {
            if (!produtoRepository.existsById(id)) {
                throw new RuntimeException("Este produto não existe.");
            }
            produtoRepository.deleteById(id);
        }
}
