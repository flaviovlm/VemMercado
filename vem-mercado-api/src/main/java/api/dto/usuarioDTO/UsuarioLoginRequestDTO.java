package api.dto.usuarioDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioLoginRequestDTO {

    @NotBlank(message = "O email é obrigatorio")
    @Email(message = "Informe um email valido")
    private String email;

    @NotBlank(message = "A senha é obrigatoria")
    @Size(min = 3 , max = 10 , message = "A senha deve ter entre 3 e 10 caracteres")
    private String senha;

    public UsuarioLoginRequestDTO() {
    }

    public UsuarioLoginRequestDTO(String email, String senha) {
        this.email = email;
        this.senha = senha;
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
}
