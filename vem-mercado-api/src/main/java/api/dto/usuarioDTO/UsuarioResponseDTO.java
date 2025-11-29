package api.dto.usuarioDTO;

import api.dto.enderecoDTO.EnderecoResponseDTO;

import java.util.List;


public class UsuarioResponseDTO {
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private List<EnderecoResponseDTO> enderecos;

    public UsuarioResponseDTO() {
    }

    public UsuarioResponseDTO(String nome, String email, String cpf, String telefone, List<EnderecoResponseDTO> enderecos) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.enderecos = enderecos;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public List<EnderecoResponseDTO> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<EnderecoResponseDTO> enderecos) {
        this.enderecos = enderecos;
    }
}