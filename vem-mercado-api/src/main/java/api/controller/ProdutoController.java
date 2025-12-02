package api.controller;

import api.dto.produtoDTO.ProdutoRequestDTO;
import api.dto.produtoDTO.ProdutoResponseDTO;
import api.model.produto.ProdutoModel;
import api.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodosProdutos() {
        return ResponseEntity
                .ok()
                .body(produtoService.listarTodos());
    }

    @GetMapping("/nome")
    public ResponseEntity<List<ProdutoResponseDTO>> listarProdutosPeloNome(String nome) {
        return ResponseEntity
                .ok()
                .body(produtoService.buscarPorNome(nome));
    }

    @PostMapping("/adicionar")
    public ResponseEntity<Map<String, Object>> adicionarProduto(@RequestBody @Valid ProdutoRequestDTO requestDTO) {
        produtoService.salvar(requestDTO);
        return ResponseEntity.created(null).body(Map.of("message", "produto adicionado com sucesso.", "sucesso", true));
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Map<String, Object>> atualizarProduto(
            @PathVariable Long id,
            @RequestBody ProdutoRequestDTO requestDTO) {
        produtoService.atualizar(id, requestDTO);
        return ResponseEntity
                .ok()
                .body(Map.of("message", "produto atualizado com sucesso.", "sucesso", true));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity
                .noContent()
                .build();
    }

}
