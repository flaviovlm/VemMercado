package api.service;

import api.dto.itemPedidoDTO.ItemPedidoResponseDTO;
import api.dto.pedidoDTO.PedidoRequestDTO;
import api.dto.pedidoDTO.PedidoResponseDTO;
import api.model.UsuarioModel;
import api.model.endereco.EnderecoModel;
import api.model.pedido.ItemPedidoModel;
import api.model.pedido.PedidoModel;
import api.model.pedido.Status;
import api.model.produto.ProdutoModel;
import api.repository.EnderecoRepository;
import api.repository.PedidoRepository;
import api.repository.ProdutoRepository;
import api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

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

    public PedidoResponseDTO salvar(PedidoRequestDTO dto) {

        EnderecoModel endereco = enderecoRepository.findById(dto.getEnderecoEntregaId())
                .orElseThrow(() -> new RuntimeException("Endereço de entrega não encontrado"));

        // Usar o usuário dono do endereço como dono do pedido, em vez de confiar no usuarioId vindo do cliente
        UsuarioModel usuario = endereco.getUsuario();
        if (usuario == null) {
            throw new RuntimeException("Endereço não possui usuário associado");
        }

        PedidoModel pedido = new PedidoModel();
        pedido.setUsuario(usuario);
        pedido.setEndereco(endereco);
        pedido.setDataCriacao(LocalDateTime.now());
        pedido.setStatusPedido(Status.SEPARACAO);

        List<ItemPedidoModel> itens = dto.getItens().stream().map(itemDTO -> {
            ProdutoModel produto = produtoRepository.findById(itemDTO.getIdProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItemPedidoModel item = new ItemPedidoModel();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(itemDTO.getQuantidade());
            item.setValorItem(produto.getValor());

            return item;
        }).toList();

        pedido.setItemPedido(itens);

        BigDecimal total = itens.stream()
                .map(i -> i.getValorItem().multiply(BigDecimal.valueOf(i.getQuantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        pedido.setValorPedido(total);

        PedidoModel novoPedido = pedidoRepository.save(pedido);

        return new PedidoResponseDTO(novoPedido);
    }

    public PedidoModel atualizarStatus(Long idPedido, Status novoStatus) {

        PedidoModel pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Este pedido não existe."));

        pedido.setStatusPedido(novoStatus);

        return pedidoRepository.save(pedido);
    }

    public PedidoModel deletar(Long pedidoId) {

        PedidoModel pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (pedido.getStatusPedido() == Status.ENTREGUE) {
            throw new RuntimeException("Não é possível cancelar um pedido que já foi entregue.");
        }

        // Já está cancelado — simplesmente retorna (idempotência)
        if (pedido.getStatusPedido() == Status.CANCELADO) {
            return pedido;
        }

        pedido.setStatusPedido(Status.CANCELADO);

        return pedidoRepository.save(pedido);
    }

}
