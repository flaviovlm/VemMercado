package api.model.pedido;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    AGUARDANDO_PAGAMENTO ("Aguardando Pagamento"),
    PAGO ("Pago"),
    SEPARACAO ("Separação"),
    ENVIADO ("Enviado"),
    ENTREGUE ("Entregue"),
    CANCELADO ("Cancelado");

    private String texto;

    Status(String texto) {
        this.texto = texto;
    }

    @JsonValue
    public String getTexto() {
        return texto;
    }

    @JsonCreator
    public static Status fromTexto(String value) {
        for (Status status : Status.values()) {
            if (status.texto.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status inválido: " + value);
    }
}