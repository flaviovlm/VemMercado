package api.dto.enderecoDTO;

import api.model.endereco.EnderecoModel;

public class EnderecoResponseDTO {
    private Long id;
    private String logradouro;
    private String numero;
    private String cep;
    private String estado;
    private String bairro;
    private String cidade;

    public EnderecoResponseDTO() {
    }

    public EnderecoResponseDTO(EnderecoModel enderecoModel) {
        this.id = enderecoModel.getId();
        this.logradouro = enderecoModel.getLogradouro();
        this.numero = enderecoModel.getNumero();
        this.cep = enderecoModel.getCep();
        this.estado = enderecoModel.getEstado();
        this.bairro = enderecoModel.getBairro();
        this.cidade = enderecoModel.getCidade();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
}