package api.dto.usuarioDTO;


import api.dto.enderecoDTO.EnderecoRequestDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class UsuarioRequestDTO {

    @NotBlank(message = "O nome é obrigatorio")
    @Size(min = 3 , max = 50 , message = "O nome deve ter minimo de 3 caracteres")
    private String nome;

    @NotBlank(message = "O email é obrigatorio")
    @Email(message = "Informe um email valido")
    private String email;

    @NotBlank(message = "A senha é obrigatoria")
    @Size(min = 3 , max = 10 , message = "A senha deve ter minimo 10 caracteres")
    private String senha;

    @NotBlank(message = "O CPF é obrigatorio")
    @Size(max = 11 , message = "O CPF deve ter minimo 11 caracteres")
    private String cpf;

    @NotBlank(message = "O telefone é obrigatorio")
    @Size(max = 11 , message = "O telefone deve ter minimo 11 caracteres")
    private String telefone;

    @Valid
    @NotNull(message = "A lista de endereços é obrigatória")
    @Size(min = 1, message = "É necessário pelo menos um endereço")
    private List<EnderecoRequestDTO> endereco;

    public UsuarioRequestDTO() {
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
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

    public List<EnderecoRequestDTO> getEndereco() {
        return endereco;
    }

    public void setEndereco(List<EnderecoRequestDTO> endereco) {
        this.endereco = endereco;
    }
}
