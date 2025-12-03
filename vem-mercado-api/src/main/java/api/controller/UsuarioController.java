package api.controller;

import api.dto.usuarioDTO.UsuarioLoginRequestDTO;
import api.dto.usuarioDTO.UsuarioPatchDTO;
import api.dto.usuarioDTO.UsuarioRequestDTO;
import api.dto.usuarioDTO.UsuarioResponseDTO;
import api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping ("/usuarios")
@CrossOrigin("http://localhost:5173/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping ("/buscar/{cpf}")
    public ResponseEntity <UsuarioResponseDTO> buscarUsuario(@PathVariable String cpf){

        UsuarioResponseDTO usuarioEncontrado =  usuarioService.buscarUsuario(cpf);
        return ResponseEntity.ok().body(usuarioEncontrado);

    }

    @PostMapping ("/cadastro")
    public ResponseEntity<Map<String , Object>> salvarUsuario (@RequestBody @Valid UsuarioRequestDTO usuario){
        usuarioService.salvarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Usuário salvo" , "success",true));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUsuario(@RequestBody @Valid UsuarioLoginRequestDTO loginRequestDTO){
        UsuarioResponseDTO usuarioLogado = usuarioService.loginUsuario(loginRequestDTO);
        return ResponseEntity.ok().body(Map.of(
                "message", "Bem-vindo " + usuarioLogado.getNome(),
                "success", true,
                "usuario", usuarioLogado  // ← ADICIONAR O OBJETO COMPLETO
        ));
    }

    @PatchMapping("/atualizar-parcial/{id}")
    public ResponseEntity<Map<String, Object>> updateUserPartial(
            @RequestBody UsuarioPatchDTO patchDTO,
            @PathVariable Long id) {

        usuarioService.atualizarParcial(id, patchDTO);

        return ResponseEntity.ok(Map.of(
                "message", "Usuário atualizado com sucesso!",
                "success", true
        ));
    }
}
