-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS vem_mercado_db;
USE vem_mercado_db;

-- 1. Tabela Usuário
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL, -- Aumentado para suportar BCrypt
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL UNIQUE
);

-- 2. Tabela Endereço
CREATE TABLE IF NOT EXISTS endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    estado VARCHAR(40) NOT NULL,
    cidade VARCHAR(40) NOT NULL,
    
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- 3. Tabela Produto
CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ean VARCHAR(20) UNIQUE, 
    sku VARCHAR(50) NOT NULL UNIQUE, 
    valor DECIMAL(10, 2) NOT NULL, 
    estoque INT DEFAULT 0,
    categoria ENUM ('UTILIDADES', 'LIMPEZA', 'HORTOLICAS', 'DERMOCOSMETICOS')
);

-- 4. Tabela Pedido
CREATE TABLE IF NOT EXISTS pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    valorPedido DECIMAL(10, 2) NOT NULL,
    
    usuario_id INT NOT NULL,
    endereco_id INT NOT NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

-- 5. Tabela Itens do Pedido (N:N)
CREATE TABLE IF NOT EXISTS item_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    valorItem DECIMAL(10, 2) NOT NULL, -- Preço "congelado" no momento da compra
    
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    
    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

-- 6. Histórico de Status do Pedido
CREATE TABLE IF NOT EXISTS status_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statusPedido ENUM('AGUARDANDO_PAGAMENTO', 'PAGO', 'SEPARACAO', 'ENVIADO', 'ENTREGUE', 'CANCELADO') NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    pedido_id INT NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);