package api.exception;

public class EanExistenteException extends IllegalArgumentException {
    public EanExistenteException(String message) {
        super(message);
    }
}
