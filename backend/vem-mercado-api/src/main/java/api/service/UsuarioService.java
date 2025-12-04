package api.service;

import api.dto.enderecoDTO.EnderecoRequestDTO;
import api.dto.enderecoDTO.EnderecoResponseDTO;
import api.dto.usuarioDTO.UsuarioLoginRequestDTO;
import api.dto.usuarioDTO.UsuarioPatchDTO;
import api.dto.usuarioDTO.UsuarioRequestDTO;
import api.dto.usuarioDTO.UsuarioResponseDTO;
import api.exception.CpfExistenteException;
import api.exception.EmailSenhaInvalidoException;
import api.exception.EmailUtilizadoException;
import api.exception.TelefoneExistenteException;
import api.model.UsuarioModel;
import api.model.endereco.EnderecoModel;
import api.repository.EnderecoRepository;
import api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public UsuarioResponseDTO salvarUsuario(UsuarioRequestDTO dto){

        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()){
            throw new EmailUtilizadoException("Email já utilizado!");
        }
        if (usuarioRepository.findByCpf(dto.getCpf()).isPresent()){
            throw new CpfExistenteException("CPF já utilizado!");
        }
        if (usuarioRepository.findByTelefone(dto.getTelefone()).isPresent()){
            throw new TelefoneExistenteException("Telefone já utilizado");
        }

        UsuarioModel usuarioModel = new UsuarioModel();
        usuarioModel.setNome(dto.getNome());
        usuarioModel.setCpf( dto.getCpf());
        usuarioModel.setEmail(dto.getEmail());
        usuarioModel.setTelefone(dto.getTelefone());
        usuarioModel.setSenha(passwordEncoder.encode(dto.getSenha()));
        usuarioModel = usuarioRepository.save(usuarioModel);

        return new UsuarioResponseDTO(
                usuarioModel.getId(),
                usuarioModel.getNome(),
                usuarioModel.getEmail(),
                usuarioModel.getCpf(),
                usuarioModel.getTelefone(),
                List.of()
        );
    }

    public UsuarioResponseDTO loginUsuario (UsuarioLoginRequestDTO loginRequestDTO){

        UsuarioModel modelUser = usuarioRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new EmailSenhaInvalidoException("Email ou senha inválido!"));

        if (!passwordEncoder.matches(loginRequestDTO.getSenha(), modelUser.getSenha())) {
            throw new EmailSenhaInvalidoException("Email ou senha inválidos!");
        }

        return new UsuarioResponseDTO(
                modelUser.getId(),
                modelUser.getNome(),
                modelUser.getEmail(),
                modelUser.getCpf(),
                modelUser.getTelefone(),
                modelUser.getEndereco().stream()
                        .map(enderecoModel -> new EnderecoResponseDTO(enderecoModel))
                        .collect(Collectors.toList())

        );
    }

    public UsuarioResponseDTO buscarUsuario (String cpf){
        UsuarioModel modelUser = usuarioRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return new UsuarioResponseDTO(
                modelUser.getId(),
                modelUser.getNome(),
                modelUser.getEmail(),
                modelUser.getCpf(),
                modelUser.getTelefone(),
                modelUser.getEndereco().stream()
                        .map(enderecoModel -> new EnderecoResponseDTO(enderecoModel))
                        .collect(Collectors.toList())
        );
    }

    public void atualizarParcial(Long id, UsuarioPatchDTO patchDTO) {
        UsuarioModel usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (patchDTO.getNome() != null) {
            usuario.setNome(patchDTO.getNome());
        }

        if (patchDTO.getEmail() != null) {
            usuarioRepository.findByEmail(patchDTO.getEmail()).ifPresent(u -> {
                if (!u.getId().equals(id)) {
                    throw new RuntimeException("Este e-mail já está em uso");
                }
            });

            usuario.setEmail(patchDTO.getEmail());
        }

        if (patchDTO.getTelefone() != null) {
            usuarioRepository.findByTelefone(patchDTO.getTelefone()).ifPresent(u -> {
                if (!u.getId().equals(id)) {
                    throw new RuntimeException("Este telefone já está em uso");
                }
            });

            usuario.setTelefone(patchDTO.getTelefone());
        }

        if (patchDTO.getSenha() != null) {
            usuario.setSenha(passwordEncoder.encode(patchDTO.getSenha()));
        }

        usuarioRepository.save(usuario);
    }
}
