package api.dto.enderecoDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EnderecoRequestDTO {
    @NotBlank(message = "O logradouro é obrigatorio")
    @Size(min = 5 , max = 100 , message = "O logradouro deve ter minimo 5 caracteres")
    private String logradouro;

    @NotBlank(message = "O número é obrigatorio")
    @Size(max = 10 , message = "O número deve ter máximo 10 caracteres")
    private String numero;

    @NotBlank(message = "O cep é obrigatorio")
    @Size(min = 8 , max = 10 , message = "O cep deve ter máximo 10 caracteres")
    private String cep;

    @NotBlank(message = "O estado é obrigatorio")
    @Size(min = 3, max = 40 , message = "O estado ter deve ter minimo 3 caracteres")
    private String estado;

    @NotBlank(message = "O bairro é obrigatorio")
    @Size(min = 3 , max = 40 , message = "O bairro deve ter minimo 3 caracteres")

    @NotBlank(message = "A cidade é obrigatorio")
    @Size(min= 5 ,max = 40 , message = "A cidade deve ter minimo 5 caracteres")
    private String cidade;

    public EnderecoRequestDTO() {
    }

    public EnderecoRequestDTO(String logradouro, String numero, String cep, String estado, String cidade) {
        this.logradouro = logradouro;
        this.numero = numero;
        this.cep = cep;
        this.estado = estado;
        this.cidade = cidade;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
}
