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

    public UsuarioRequestDTO(String nome, String email, String senha, String cpf, String telefone, List<EnderecoRequestDTO> endereco) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public @NotBlank(message = "O nome é obrigatorio") @Size(min = 3, max = 50, message = "O nome deve ter minimo de 3 caracteres") String getNome() {
        return nome;
    }

    public void setNome(@NotBlank(message = "O nome é obrigatorio") @Size(min = 3, max = 50, message = "O nome deve ter minimo de 3 caracteres") String nome) {
        this.nome = nome;
    }

    public @NotBlank(message = "O email é obrigatorio") @Email(message = "Informe um email valido") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "O email é obrigatorio") @Email(message = "Informe um email valido") String email) {
        this.email = email;
    }

    public @NotBlank(message = "A senha é obrigatoria") @Size(min = 3, max = 10, message = "A senha deve ter minimo 10 caracteres") String getSenha() {
        return senha;
    }

    public void setSenha(@NotBlank(message = "A senha é obrigatoria") @Size(min = 3, max = 10, message = "A senha deve ter minimo 10 caracteres") String senha) {
        this.senha = senha;
    }

    public @NotBlank(message = "O CPF é obrigatorio") @Size(max = 11, message = "O CPF deve ter minimo 11 caracteres") String getCpf() {
        return cpf;
    }

    public void setCpf(@NotBlank(message = "O CPF é obrigatorio") @Size(max = 11, message = "O CPF deve ter minimo 11 caracteres") String cpf) {
        this.cpf = cpf;
    }

    public @NotBlank(message = "O telefone é obrigatorio") @Size(max = 11, message = "O telefone deve ter minimo 11 caracteres") String getTelefone() {
        return telefone;
    }

    public void setTelefone(@NotBlank(message = "O telefone é obrigatorio") @Size(max = 11, message = "O telefone deve ter minimo 11 caracteres") String telefone) {
        this.telefone = telefone;
    }

    public @Valid @NotNull(message = "A lista de endereços é obrigatória") @Size(min = 1, message = "É necessário pelo menos um endereço") List<EnderecoRequestDTO> getEndereco() {
        return endereco;
    }

    public void setEndereco(@Valid @NotNull(message = "A lista de endereços é obrigatória") @Size(min = 1, message = "É necessário pelo menos um endereço") List<EnderecoRequestDTO> endereco) {
        this.endereco = endereco;
    }
}
