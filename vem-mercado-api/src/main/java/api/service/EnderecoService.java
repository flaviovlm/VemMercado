package api.service;

import api.dto.enderecoDTO.EnderecoRequestDTO;
import api.dto.enderecoDTO.EnderecoResponseDTO;
import api.model.UsuarioModel;
import api.model.endereco.EnderecoModel;
import api.repository.EnderecoRepository;
import api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoService {

    @Autowired
    private  EnderecoRepository enderecoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<EnderecoResponseDTO> listarEndereco(Long usuarioId){

        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return enderecoRepository
                .findAll()
                .stream()
                .map(enderecoModel -> new EnderecoResponseDTO(enderecoModel))
                .toList();
    }

    public EnderecoModel salvarEndereco(Long usuarioId , EnderecoRequestDTO endereco) {

        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean existe = enderecoRepository.existsByLogradouroAndNumeroAndCepAndUsuario(
                endereco.getLogradouro(),
                endereco.getNumero(),
                endereco.getCep(),
                usuario
        );

        if (existe) {
            throw new RuntimeException("Endereço já cadastrado para este usuário");
        }

        EnderecoModel novoEndereco = new EnderecoModel();
        novoEndereco.setLogradouro(endereco.getLogradouro());
        novoEndereco.setNumero(endereco.getNumero());
        novoEndereco.setCep(endereco.getCep());
        novoEndereco.setEstado(endereco.getEstado());
        novoEndereco.setBairro(endereco.getBairro());
        novoEndereco.setCidade(endereco.getCidade());
        novoEndereco.setUsuario(usuario);
        enderecoRepository.save(novoEndereco);
        return novoEndereco;
    }

    public EnderecoModel atualizarEndereco(Long usuarioId, Long enderecoId, EnderecoRequestDTO endereco){

        EnderecoModel atualizarEndereco = enderecoRepository.findById(enderecoId)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        // Verificar se este endereço pertence ao usuário que está tentando editar
        if (!atualizarEndereco.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("Usuário não autorizado");
        }

        atualizarEndereco.setLogradouro(endereco.getLogradouro());
        atualizarEndereco.setNumero(endereco.getNumero());
        atualizarEndereco.setCep(endereco.getCep());
        atualizarEndereco.setEstado(endereco.getEstado());
        atualizarEndereco.setBairro(endereco.getBairro());
        atualizarEndereco.setCidade(endereco.getCidade());
        enderecoRepository.save(atualizarEndereco);
        return atualizarEndereco;
    }

    public void deletarEndereco(Long usuarioId , Long enderecoId){
        EnderecoModel deletarEndereco = enderecoRepository.findById(enderecoId)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        // Verificar se este endereço pertence ao usuário que está tentando deletar
        if (!deletarEndereco.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("Usuário não autorizado");
        }
        enderecoRepository.delete(deletarEndereco);
    }

}
