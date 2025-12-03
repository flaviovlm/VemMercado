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
@RequestMapping("/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoService enderecoService;

    @GetMapping("/listar/{id}")
    public ResponseEntity<List<EnderecoResponseDTO>> listarEndereco(@PathVariable Long usuarioId){
        return ResponseEntity.status(HttpStatus.OK).body(enderecoService.listarEndereco(usuarioId));
    }

    @PostMapping("/salvar")
    public ResponseEntity<Map<String , Object>> salvarEndereco(@Valid @PathVariable Long usuarioId , @RequestBody EnderecoRequestDTO endereco){
        enderecoService.salvarEndereco(usuarioId,endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message: " , "Endereço salvo" , "sucesse: ", true));
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Map<String , Object>> atualizarEndereco(@)


}
