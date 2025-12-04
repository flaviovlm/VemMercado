package api.controller;

import api.dto.enderecoDTO.EnderecoRequestDTO;
import api.dto.enderecoDTO.EnderecoResponseDTO;
import api.service.EnderecoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios/{usuarioId}/enderecos")
@CrossOrigin("http://localhost:5173/")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;


    @GetMapping
    public ResponseEntity<List<EnderecoResponseDTO>> listarEnderecos(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(enderecoService.listarEndereco(usuarioId));
    }

    @PostMapping("/{usuarioId}")
    public ResponseEntity<Map<String, Object>> salvarEndereco(@PathVariable Long usuarioId, @Valid @RequestBody EnderecoRequestDTO endereco) {
        enderecoService.salvarEndereco(usuarioId, endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Endereço salvo", "success", true));
    }

    @PutMapping("/{enderecoId}")
    public ResponseEntity<Map<String, Object>> atualizarEndereco(@PathVariable Long usuarioId, @PathVariable Long enderecoId, @Valid @RequestBody EnderecoRequestDTO endereco) {
        enderecoService.atualizarEndereco(usuarioId, enderecoId, endereco);
        return ResponseEntity.ok(Map.of("message", "Endereço atualizado", "success", true));
    }

    @DeleteMapping("/{enderecoId}")
    public ResponseEntity<Map<String, Object>> deletarEndereco(@PathVariable Long usuarioId, @PathVariable Long enderecoId) {
        enderecoService.deletarEndereco(usuarioId, enderecoId);
        return ResponseEntity.ok(Map.of("message", "Endereço deletado", "success", true));
    }
}
