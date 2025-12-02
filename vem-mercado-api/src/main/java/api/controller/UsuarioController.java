package api.controller;

import api.dto.usuarioDTO.UsuarioLoginRequestDTO;
import api.dto.usuarioDTO.UsuarioRequestDTO;
import api.dto.usuarioDTO.UsuarioResponseDTO;
import api.model.UsuarioModel;
import api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping ("/buscar/{cpf}")
    public ResponseEntity <UsuarioResponseDTO> buscarUsuario(@PathVariable String cpf){

        UsuarioResponseDTO usuarioEncontrado =  usuarioService.buscarUsuario(cpf);
        return ResponseEntity.ok().body(usuarioEncontrado);

    }

    @PostMapping ("/cadastro")
    public ResponseEntity <UsuarioResponseDTO> salvarUsuario (@RequestBody @Valid UsuarioRequestDTO requestDTO){
        UsuarioResponseDTO usuarioNovo =  usuarioService.salvarUsuario(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioNovo);
    }

    @PostMapping("/login")
    public ResponseEntity <Map<String, Object>> loginUsuario (@RequestBody @Valid UsuarioLoginRequestDTO loginRequestDTO){
        UsuarioResponseDTO usuarioLogado =  usuarioService.loginUsuario(loginRequestDTO);
        return ResponseEntity.ok().body(Map.of("message: ","Bem - vindo " +usuarioLogado.getNome() , "success", true));

    }
}
