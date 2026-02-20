import alasql from 'alasql';

// Initialize the database
let isInitialized = false;

export function initDb() {
  if (isInitialized) return;

  // Create tables
  alasql(`
    CREATE TABLE clientes (
      id INT PRIMARY KEY,
      nome STRING,
      email STRING,
      cidade STRING,
      data_cadastro DATE
    );

    CREATE TABLE produtos (
      id INT PRIMARY KEY,
      nome STRING,
      categoria STRING,
      preco DECIMAL(10, 2)
    );

    CREATE TABLE pedidos (
      id INT PRIMARY KEY,
      cliente_id INT,
      data_pedido DATE,
      valor_total DECIMAL(10, 2)
    );

    CREATE TABLE itens_pedido (
      pedido_id INT,
      produto_id INT,
      quantidade INT,
      preco_unitario DECIMAL(10, 2)
    );

    CREATE TABLE funcionarios (
      id INT PRIMARY KEY,
      nome STRING,
      departamento STRING,
      salario DECIMAL(10, 2),
      data_contratacao DATE
    );
  `);

  // Seed data
  alasql(`
    INSERT INTO clientes VALUES 
    (1, 'Ana Silva', 'ana.silva@email.com', 'São Paulo', '2023-01-15'),
    (2, 'Carlos Souza', 'carlos.souza@email.com', 'Rio de Janeiro', '2023-02-20'),
    (3, 'Beatriz Lima', 'beatriz.lima@email.com', 'Belo Horizonte', '2023-03-10'),
    (4, 'Daniel Costa', 'daniel.costa@email.com', 'Curitiba', '2023-04-05'),
    (5, 'Eduardo Pereira', 'eduardo.pereira@email.com', 'Porto Alegre', '2023-05-12');

    INSERT INTO produtos VALUES 
    (1, 'Notebook Gamer X1', 'Eletrônicos', 4500.00),
    (2, 'Mouse Wireless Pro', 'Acessórios', 150.00),
    (3, 'Teclado Mecânico RGB', 'Acessórios', 350.00),
    (4, 'Monitor UltraWide 34"', 'Eletrônicos', 2200.00),
    (5, 'Cadeira Ergonômica', 'Móveis', 800.00),
    (6, 'Mesa de Escritório', 'Móveis', 600.00);

    INSERT INTO pedidos VALUES 
    (1, 1, '2023-06-01', 4650.00),
    (2, 2, '2023-06-02', 2200.00),
    (3, 3, '2023-06-03', 800.00),
    (4, 1, '2023-06-05', 350.00),
    (5, 4, '2023-06-10', 1400.00);

    INSERT INTO itens_pedido VALUES 
    (1, 1, 1, 4500.00),
    (1, 2, 1, 150.00),
    (2, 4, 1, 2200.00),
    (3, 5, 1, 800.00),
    (4, 3, 1, 350.00),
    (5, 6, 1, 600.00),
    (5, 5, 1, 800.00);

    INSERT INTO funcionarios VALUES 
    (1, 'Fernanda Oliveira', 'Vendas', 3500.00, '2022-01-10'),
    (2, 'Gabriel Santos', 'TI', 5500.00, '2022-03-15'),
    (3, 'Helena Costa', 'RH', 4000.00, '2022-05-20'),
    (4, 'Igor Almeida', 'Vendas', 3200.00, '2022-07-01'),
    (5, 'Julia Martins', 'Marketing', 4200.00, '2022-09-10');
  `);

  isInitialized = true;
}

export function executeQuery(query: string) {
  initDb();
  try {
    // Basic safety check
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('drop') || lowerQuery.includes('delete') || lowerQuery.includes('update') || lowerQuery.includes('insert')) {
      return { error: 'Neste ambiente de demonstração, apenas consultas SELECT são permitidas.' };
    }

    // AlaSQL executes directly
    let results = alasql(query);
    
    // If multiple queries, alasql returns an array of results. We want the last one (usually the SELECT).
    if (Array.isArray(results) && results.length > 0 && Array.isArray(results[0])) {
      results = results[results.length - 1];
    }
    
    return { data: results };
  } catch (error: any) {
    return { error: error.message || 'Erro desconhecido na execução da query.' };
  }
}
