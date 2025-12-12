package api.controller;

import api.dto.pedidoDTO.PedidoRequestDTO;
import api.dto.pedidoDTO.PedidoResponseDTO;
import api.model.pedido.Status;
import api.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin("http://localhost:5173/")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping("/{idPedido}")
    public ResponseEntity<PedidoResponseDTO> buscarPedidoPorId(
            @PathVariable Long idPedido) {

        PedidoResponseDTO pedido = pedidoService
                .listarTodos()
                .stream()
                .filter(p -> p.getIdPedido().equals(idPedido))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        return ResponseEntity.ok(pedido);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidosPorUsuario(
            @PathVariable Long idUsuario) {

        return ResponseEntity.ok(pedidoService.listarPedidosDoUsuario(idUsuario));
    }

    @PostMapping
    public ResponseEntity<PedidoResponseDTO> criarPedido(
            @Valid @RequestBody PedidoRequestDTO dto) {

        PedidoResponseDTO response = pedidoService.salvar(dto);
        return ResponseEntity.ok(response);
    }

    /* Guys, o Patch atualiza apenas um campo, nesse caso o Status, que é o que vamos fazer no insomnia */
    @PatchMapping("/{idPedido}/status")
    public ResponseEntity<PedidoResponseDTO> atualizarStatus(
            @PathVariable Long idPedido,
            @RequestParam Status status) {

        var pedidoAtualizado = pedidoService.atualizarStatus(idPedido, status);

        return ResponseEntity.ok(new PedidoResponseDTO(pedidoAtualizado));
    }
}