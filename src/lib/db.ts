import alasql from 'alasql';

let isInitialized = false;

export function initDb() {
  if (isInitialized) return;

  alasql(`
    CREATE TABLE clientes (
      id INT PRIMARY KEY,
      nome STRING,
      email STRING,
      cidade STRING,
      estado STRING,
      data_cadastro DATE
    );

    CREATE TABLE produtos (
      id INT PRIMARY KEY,
      nome STRING,
      categoria STRING,
      preco DECIMAL(10, 2),
      estoque INT
    );

    CREATE TABLE pedidos (
      id INT PRIMARY KEY,
      cliente_id INT,
      data_pedido DATE,
      valor_total DECIMAL(10, 2),
      status STRING
    );

    CREATE TABLE itens_pedido (
      id INT PRIMARY KEY,
      pedido_id INT,
      produto_id INT,
      quantidade INT,
      preco_unitario DECIMAL(10, 2)
    );

    CREATE TABLE funcionarios (
      id INT PRIMARY KEY,
      nome STRING,
      departamento STRING,
      cargo STRING,
      salario DECIMAL(10, 2),
      data_contratacao DATE
    );
  `);

  // --- CLIENTES (25 registros) ---
  alasql(`
    INSERT INTO clientes VALUES
    (1,  'Ana Silva',           'ana.silva@email.com',        'São Paulo',      'SP', '2022-01-15'),
    (2,  'Carlos Souza',        'carlos.souza@email.com',     'Rio de Janeiro', 'RJ', '2022-02-20'),
    (3,  'Beatriz Lima',        'beatriz.lima@email.com',     'Belo Horizonte', 'MG', '2022-03-10'),
    (4,  'Daniel Costa',        'daniel.costa@email.com',     'Curitiba',       'PR', '2022-04-05'),
    (5,  'Eduardo Pereira',     'eduardo.pereira@email.com',  'Porto Alegre',   'RS', '2022-05-12'),
    (6,  'Fernanda Rocha',      'fernanda.rocha@email.com',   'São Paulo',      'SP', '2022-06-18'),
    (7,  'Gustavo Mendes',      'gustavo.mendes@email.com',   'Recife',         'PE', '2022-07-22'),
    (8,  'Helena Martins',      'helena.martins@email.com',   'Salvador',       'BA', '2022-08-30'),
    (9,  'Igor Almeida',        'igor.almeida@email.com',     'Brasília',       'DF', '2022-09-14'),
    (10, 'Julia Nascimento',    'julia.nascimento@email.com', 'Florianópolis',  'SC', '2022-10-02'),
    (11, 'Lucas Barbosa',       'lucas.barbosa@email.com',    'São Paulo',      'SP', '2022-11-11'),
    (12, 'Mariana Ferreira',    'mariana.ferreira@email.com', 'Rio de Janeiro', 'RJ', '2022-12-05'),
    (13, 'Nathan Oliveira',     'nathan.oliveira@email.com',  'Belo Horizonte', 'MG', '2023-01-20'),
    (14, 'Patrícia Santos',     'patricia.santos@email.com',  'Curitiba',       'PR', '2023-02-14'),
    (15, 'Rafael Gonçalves',    'rafael.goncalves@email.com', 'Porto Alegre',   'RS', '2023-03-08'),
    (16, 'Sofia Ribeiro',       'sofia.ribeiro@email.com',    'São Paulo',      'SP', '2023-04-17'),
    (17, 'Thiago Cardoso',      'thiago.cardoso@email.com',   'Recife',         'PE', '2023-05-25'),
    (18, 'Valentina Moura',     'valentina.moura@email.com',  'Salvador',       'BA', '2023-06-30'),
    (19, 'William Teixeira',    'william.teixeira@email.com', 'Brasília',       'DF', '2023-07-12'),
    (20, 'Yasmin Correia',      'yasmin.correia@email.com',   'Manaus',         'AM', '2023-08-05'),
    (21, 'André Dias',          'andre.dias@email.com',       'Goiânia',        'GO', '2023-09-18'),
    (22, 'Camila Araujo',       'camila.araujo@email.com',    'Fortaleza',      'CE', '2023-10-22'),
    (23, 'Diego Lopes',         'diego.lopes@email.com',      'São Paulo',      'SP', '2023-11-30'),
    (24, 'Elisa Campos',        'elisa.campos@email.com',     'Rio de Janeiro', 'RJ', '2024-01-08'),
    (25, 'Fábio Monteiro',      'fabio.monteiro@email.com',   'Campinas',       'SP', '2024-02-14')
  `);

  // --- PRODUTOS (18 registros) ---
  alasql(`
    INSERT INTO produtos VALUES
    (1,  'Notebook Gamer X1',       'Eletrônicos',  4500.00, 15),
    (2,  'Mouse Wireless Pro',      'Acessórios',    150.00, 200),
    (3,  'Teclado Mecânico RGB',    'Acessórios',    350.00, 120),
    (4,  'Monitor UltraWide 34"',   'Eletrônicos',  2200.00, 30),
    (5,  'Cadeira Ergonômica',      'Móveis',        800.00, 45),
    (6,  'Mesa de Escritório',      'Móveis',        600.00, 60),
    (7,  'Webcam HD 1080p',        'Acessórios',    250.00, 150),
    (8,  'Headset Gamer',          'Acessórios',    280.00, 90),
    (9,  'SSD 1TB NVMe',           'Componentes',   450.00, 80),
    (10, 'Memória RAM 16GB',       'Componentes',   320.00, 100),
    (11, 'Placa de Vídeo RTX',     'Componentes',  3200.00, 12),
    (12, 'Fonte 750W Modular',     'Componentes',   520.00, 40),
    (13, 'Gabinete Gamer RGB',     'Componentes',   380.00, 55),
    (14, 'Mousepad Gamer XL',      'Acessórios',     90.00, 300),
    (15, 'Hub USB-C 7 Portas',     'Acessórios',    180.00, 70),
    (16, 'Suporte para Monitor',   'Móveis',        220.00, 85),
    (17, 'Luminária LED Desk',     'Móveis',        150.00, 110),
    (18, 'Notebook Ultrabook',     'Eletrônicos',  3800.00, 20)
  `);

  // --- PEDIDOS (35 registros) ---
  alasql(`
    INSERT INTO pedidos VALUES
    (1,  1,  '2023-01-05', 4650.00, 'entregue'),
    (2,  2,  '2023-01-12', 2200.00, 'entregue'),
    (3,  3,  '2023-01-20', 800.00,  'entregue'),
    (4,  1,  '2023-02-03', 350.00,  'entregue'),
    (5,  4,  '2023-02-15', 1400.00, 'entregue'),
    (6,  5,  '2023-03-01', 530.00,  'entregue'),
    (7,  6,  '2023-03-14', 4500.00, 'entregue'),
    (8,  7,  '2023-03-28', 680.00,  'entregue'),
    (9,  8,  '2023-04-10', 2480.00, 'entregue'),
    (10, 9,  '2023-04-22', 150.00,  'entregue'),
    (11, 10, '2023-05-05', 3200.00, 'entregue'),
    (12, 11, '2023-05-18', 970.00,  'entregue'),
    (13, 12, '2023-06-01', 1050.00, 'entregue'),
    (14, 2,  '2023-06-15', 5300.00, 'entregue'),
    (15, 13, '2023-07-02', 380.00,  'entregue'),
    (16, 14, '2023-07-20', 600.00,  'entregue'),
    (17, 15, '2023-08-08', 2200.00, 'entregue'),
    (18, 1,  '2023-08-25', 830.00,  'entregue'),
    (19, 16, '2023-09-10', 4500.00, 'entregue'),
    (20, 17, '2023-09-28', 440.00,  'entregue'),
    (21, 18, '2023-10-12', 1250.00, 'entregue'),
    (22, 19, '2023-10-30', 3580.00, 'entregue'),
    (23, 20, '2023-11-15', 250.00,  'cancelado'),
    (24, 21, '2023-11-28', 520.00,  'entregue'),
    (25, 22, '2023-12-10', 7700.00, 'entregue'),
    (26, 3,  '2023-12-22', 1600.00, 'entregue'),
    (27, 23, '2024-01-08', 350.00,  'processando'),
    (28, 24, '2024-01-15', 4950.00, 'processando'),
    (29, 5,  '2024-01-22', 280.00,  'processando'),
    (30, 25, '2024-02-01', 900.00,  'processando'),
    (31, 11, '2024-02-10', 3800.00, 'processando'),
    (32, 6,  '2024-02-14', 150.00,  'cancelado'),
    (33, 9,  '2024-02-18', 2200.00, 'processando'),
    (34, 14, '2024-02-20', 450.00,  'processando'),
    (35, 1,  '2024-02-25', 6020.00, 'processando')
  `);

  // --- ITENS_PEDIDO (55 registros) ---
  alasql(`
    INSERT INTO itens_pedido VALUES
    (1,  1,  1,  1, 4500.00),
    (2,  1,  2,  1, 150.00),
    (3,  2,  4,  1, 2200.00),
    (4,  3,  5,  1, 800.00),
    (5,  4,  3,  1, 350.00),
    (6,  5,  6,  1, 600.00),
    (7,  5,  5,  1, 800.00),
    (8,  6,  8,  1, 280.00),
    (9,  6,  7,  1, 250.00),
    (10, 7,  1,  1, 4500.00),
    (11, 8,  3,  1, 350.00),
    (12, 8,  10, 1, 320.00),
    (13, 9,  4,  1, 2200.00),
    (14, 9,  8,  1, 280.00),
    (15, 10, 2,  1, 150.00),
    (16, 11, 11, 1, 3200.00),
    (17, 12, 9,  1, 450.00),
    (18, 12, 12, 1, 520.00),
    (19, 13, 3,  2, 350.00),
    (20, 13, 14, 1, 90.00),
    (21, 14, 1,  1, 4500.00),
    (22, 14, 5,  1, 800.00),
    (23, 15, 13, 1, 380.00),
    (24, 16, 6,  1, 600.00),
    (25, 17, 4,  1, 2200.00),
    (26, 18, 5,  1, 800.00),
    (27, 18, 14, 1, 90.00),
    (28, 19, 1,  1, 4500.00),
    (29, 20, 2,  1, 150.00),
    (30, 20, 8,  1, 280.00),
    (31, 21, 9,  2, 450.00),
    (32, 21, 3,  1, 350.00),
    (33, 22, 11, 1, 3200.00),
    (34, 22, 13, 1, 380.00),
    (35, 23, 7,  1, 250.00),
    (36, 24, 12, 1, 520.00),
    (37, 25, 1,  1, 4500.00),
    (38, 25, 11, 1, 3200.00),
    (39, 26, 5,  2, 800.00),
    (40, 27, 3,  1, 350.00),
    (41, 28, 18, 1, 3800.00),
    (42, 28, 2,  1, 150.00),
    (43, 28, 10, 2, 320.00),
    (44, 29, 8,  1, 280.00),
    (45, 30, 6,  1, 600.00),
    (46, 30, 17, 2, 150.00),
    (47, 31, 18, 1, 3800.00),
    (48, 32, 2,  1, 150.00),
    (49, 33, 4,  1, 2200.00),
    (50, 34, 9,  1, 450.00),
    (51, 35, 1,  1, 4500.00),
    (52, 35, 3,  1, 350.00),
    (53, 35, 9,  1, 450.00),
    (54, 35, 15, 2, 180.00),
    (55, 35, 16, 1, 220.00)
  `);

  // --- FUNCIONARIOS (12 registros) ---
  alasql(`
    INSERT INTO funcionarios VALUES
    (1,  'Fernanda Oliveira', 'Vendas',     'Vendedora',              3500.00, '2021-01-10'),
    (2,  'Gabriel Santos',    'TI',         'Desenvolvedor Pleno',    5500.00, '2021-03-15'),
    (3,  'Helena Costa',      'RH',         'Analista de RH',         4000.00, '2021-05-20'),
    (4,  'Igor Almeida',      'Vendas',     'Vendedor',               3200.00, '2021-07-01'),
    (5,  'Julia Martins',     'Marketing',  'Analista de Marketing',  4200.00, '2021-09-10'),
    (6,  'Ricardo Mendes',    'TI',         'Desenvolvedor Sênior',   7800.00, '2020-02-01'),
    (7,  'Patrícia Duarte',   'Vendas',     'Gerente de Vendas',      6500.00, '2020-06-15'),
    (8,  'Marcos Vieira',     'TI',         'Estagiário',             1800.00, '2023-01-10'),
    (9,  'Amanda Lopes',      'Marketing',  'Gerente de Marketing',   7200.00, '2020-04-20'),
    (10, 'Bruno Nascimento',  'RH',         'Gerente de RH',          6800.00, '2019-11-05'),
    (11, 'Carolina Reis',     'Financeiro', 'Analista Financeiro',    4500.00, '2022-02-14'),
    (12, 'Diego Ferreira',    'Financeiro', 'Diretor Financeiro',     9500.00, '2019-03-01')
  `);

  isInitialized = true;
}

export function executeQuery(query: string) {
  initDb();
  try {
    const lowerQuery = query.toLowerCase().trim();
    const forbidden = ['drop', 'delete', 'update', 'insert', 'alter', 'truncate', 'create'];
    for (const word of forbidden) {
      if (lowerQuery.includes(word)) {
        return { error: 'Apenas consultas SELECT são permitidas neste ambiente de aprendizado.' };
      }
    }

    let results = alasql(query);

    if (Array.isArray(results) && results.length > 0 && Array.isArray(results[0])) {
      results = results[results.length - 1];
    }

    return { data: results };
  } catch (error: any) {
    let msg = error.message || 'Erro desconhecido na execução da query.';

    // Friendly error messages in Portuguese
    if (msg.includes('not exist')) {
      const match = msg.match(/Table '(\w+)'/i);
      msg = match
        ? `A tabela "${match[1]}" não existe. Tabelas disponíveis: clientes, produtos, pedidos, itens_pedido, funcionarios.`
        : 'Tabela não encontrada. Verifique o nome da tabela.';
    } else if (msg.includes('Column')) {
      msg = `Coluna não encontrada. Verifique os nomes das colunas na sua query.`;
    } else if (msg.includes('Parse error')) {
      msg = `Erro de sintaxe SQL. Verifique se sua query está escrita corretamente.`;
    }

    return { error: msg };
  }
}

export function getTableSchema(): { name: string; columns: string[] }[] {
  initDb();
  return [
    { name: 'clientes',     columns: ['id', 'nome', 'email', 'cidade', 'estado', 'data_cadastro'] },
    { name: 'produtos',     columns: ['id', 'nome', 'categoria', 'preco', 'estoque'] },
    { name: 'pedidos',      columns: ['id', 'cliente_id', 'data_pedido', 'valor_total', 'status'] },
    { name: 'itens_pedido', columns: ['id', 'pedido_id', 'produto_id', 'quantidade', 'preco_unitario'] },
    { name: 'funcionarios', columns: ['id', 'nome', 'departamento', 'cargo', 'salario', 'data_contratacao'] },
  ];
}
