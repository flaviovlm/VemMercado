package api.service;

import api.dto.itemPedidoDTO.ItemPedidoResponseDTO;
import api.dto.pedidoDTO.PedidoResponseDTO;
import api.model.UsuarioModel;
import api.model.pedido.PedidoModel;
import api.repository.PedidoRepository;
import api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<PedidoResponseDTO> listarTodos() {
        return pedidoRepository
                .findAll()
                .stream()
                .map(pedidoModel -> new PedidoResponseDTO(
                        pedidoModel.getId(),
                        pedidoModel.getUsuario().getId(),
                        pedidoModel.getItemPedido()
                                .stream()
                                .map(ItemPedidoResponseDTO::new)
                                .toList(),
                        pedidoModel.getEndereco().getId(),
                        pedidoModel.getStatusPedido(),
                        pedidoModel.getValorPedido()
                ))
                .toList();
    }

    public List<PedidoResponseDTO> listarPedidosDoUsuario(Long usuarioId) {
        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<PedidoModel> pedidos = pedidoRepository.findByUsuario(usuario);

        return pedidos.stream()
                .map(pedido -> new PedidoResponseDTO(
                        pedido.getId(),
                        pedido.getUsuario().getId(),
                        pedido.getItemPedido()
                                .stream()
                                .map(ItemPedidoResponseDTO::new)
                                .toList(),
                        pedido.getEndereco().getId(),
                        pedido.getStatusPedido(),
                        pedido.getValorPedido()
                ))
                .toList();
    }

}
