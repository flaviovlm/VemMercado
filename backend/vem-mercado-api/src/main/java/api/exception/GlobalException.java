package api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(EmailUtilizadoException.class)
    public ResponseEntity<Map<String, Object>> emailUtilizadoException(EmailUtilizadoException erro) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("mensagem", erro.getMessage(), "sucesso", false));
    }

    @ExceptionHandler(CpfExistenteException.class)
    public ResponseEntity<Map<String, Object>> cpfUtilizadoException(CpfExistenteException erro) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("mensagem", erro.getMessage(), "sucesso", false));
    }

    @ExceptionHandler(TelefoneExistenteException.class)
    public ResponseEntity<Map<String, Object>> telefoneExistenteException(TelefoneExistenteException erro) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("mensagem", erro.getMessage(), "sucesso", false));
    }


    @ExceptionHandler(EmailSenhaInvalidoException.class)
    public ResponseEntity<Map<String, Object>> emailSenhaInvalidoException(EmailSenhaInvalidoException erro) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("mensagem", erro.getMessage(), "sucesso", false));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> illegalArgumentException(IllegalArgumentException erro) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("mensagem", erro.getMessage(), "sucesso", false));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> runtimeException(RuntimeException erro) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // Ou BAD_REQUEST se preferir
                .body(Map.of("mensagem", "Erro interno no servidor: " + erro.getMessage(), "sucesso", false));
    }
}


