package api.vem_mercado_api.model.Produto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Categoria {
    UTILIDADES ("Utilidades"),
    LIMPEZA ("Limpeza"),
    HORTOLICAS ("Hortoliças"),
    DERMOCOSMETICOS ("Dermocosméticos");

    private String texto;

    Categoria(String texto) {
        this.texto = texto;
    }

    @JsonValue
    public String getTexto() {
        return texto;
    }

    @JsonCreator
    public static Categoria fromTexto(String value) {
        for (Categoria categoria : Categoria.values()) {
            if (categoria.texto.equalsIgnoreCase(value)) {
                return categoria;
            }
        }
        throw new IllegalArgumentException("Categoria inválida: " + value);
    }
}
