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
    public ResponseEntity<List<ProdutoResponseDTO>> buscarProdutos(@RequestParam(required = false) String nome) {

        if (nome == null || nome.isBlank()) {
            return ResponseEntity.ok(produtoService.listarTodos());
        }

        return ResponseEntity.ok(produtoService.buscarPorNome(nome));
    }

    @PostMapping("/adicionar")
    public ResponseEntity<Map<String, Object>> adicionarProduto(@RequestBody @Valid ProdutoRequestDTO requestDTO) {
        produtoService.salvar(requestDTO);
        return ResponseEntity.created(null).body(Map.of("message", "Produto salvo.", "success", true));
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Map<String, Object>> atualizarProduto(
            @PathVariable Long id,
            @RequestBody ProdutoRequestDTO requestDTO) {
        produtoService.atualizar(id, requestDTO);
        return ResponseEntity
                .ok()
                .body(Map.of("message", "Produto atualizado.", "success", true));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity
                .noContent()
                .build();
    }

}
