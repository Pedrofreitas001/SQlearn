export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  initialCode: string;
  solution: string;
  hint: string;
  order: number;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Expert';
  lessons: Lesson[];
  order: number;
  icon: string;
};

export const curriculum: Module[] = [
  {
    id: 'mod-1',
    title: 'Fundamentos de SQL',
    description: 'Aprenda os conceitos básicos para consultar bancos de dados relacionais.',
    level: 'Iniciante',
    order: 1,
    icon: 'database',
    lessons: [
      {
        id: 'l-1-1',
        moduleId: 'mod-1',
        title: 'SELECT e FROM',
        description: 'Selecione dados de uma tabela específica.',
        content: `
# Bem-vindo ao SQL

O comando **SELECT** é a base de quase todas as consultas em SQL. Ele permite que você escolha quais colunas de dados deseja ver.

O comando **FROM** especifica de qual tabela esses dados devem vir.

### Sintaxe Básica

\`\`\`sql
SELECT coluna1, coluna2
FROM nome_tabela;
\`\`\`

Para selecionar todas as colunas, você pode usar o asterisco (*):

\`\`\`sql
SELECT *
FROM nome_tabela;
\`\`\`
        `,
        initialCode: `-- Selecione o nome e o preço de todos os produtos
SELECT nome, preco
FROM produtos;`,
        solution: `SELECT nome, preco FROM produtos`,
        hint: 'Use SELECT nome, preco FROM produtos;',
        order: 1
      },
      {
        id: 'l-1-2',
        moduleId: 'mod-1',
        title: 'Filtrando com WHERE',
        description: 'Aprenda a filtrar resultados baseados em condições.',
        content: `
# Filtrando Dados

Muitas vezes você não quer ver todos os registros, apenas aqueles que atendem a certos critérios. É aí que entra o **WHERE**.

### Operadores Comuns

* \`=\`: Igual a
* \`>\`: Maior que
* \`<\`: Menor que
* \`>=\`: Maior ou igual a
* \`!=\` ou \`<>\`: Diferente de

### Exemplo

\`\`\`sql
SELECT *
FROM clientes
WHERE cidade = 'São Paulo';
\`\`\`
        `,
        initialCode: `-- Selecione todos os produtos com preço maior que 1000
SELECT *
FROM produtos
WHERE ...`,
        solution: `SELECT * FROM produtos WHERE preco > 1000`,
        hint: 'Use WHERE preco > 1000',
        order: 2
      },
      {
        id: 'l-1-3',
        moduleId: 'mod-1',
        title: 'Ordenando com ORDER BY',
        description: 'Organize seus resultados em ordem crescente ou decrescente.',
        content: `
# Ordenação de Resultados

O comando **ORDER BY** permite classificar o conjunto de resultados por uma ou mais colunas.

* **ASC**: Ordem crescente (padrão)
* **DESC**: Ordem decrescente

### Exemplo

\`\`\`sql
SELECT nome, salario
FROM funcionarios
ORDER BY salario DESC;
\`\`\`
        `,
        initialCode: `-- Liste os clientes ordenados pelo nome em ordem alfabética
SELECT *
FROM clientes
ORDER BY ...`,
        solution: `SELECT * FROM clientes ORDER BY nome ASC`,
        hint: 'Use ORDER BY nome ASC (ou apenas ORDER BY nome, pois ASC é o padrão)',
        order: 3
      },
      {
        id: 'l-1-4',
        moduleId: 'mod-1',
        title: 'Limitando Resultados',
        description: 'Restrinja o número de linhas retornadas.',
        content: `
# Limitando Linhas

O comando **LIMIT** é usado para especificar o número máximo de registros a serem retornados. Isso é muito útil em tabelas grandes ou quando você quer apenas ver uma amostra dos dados.

### Exemplo

\`\`\`sql
SELECT *
FROM pedidos
LIMIT 5;
\`\`\`
        `,
        initialCode: `-- Selecione os 3 produtos mais caros
SELECT nome, preco
FROM produtos
ORDER BY preco DESC
LIMIT ...`,
        solution: `SELECT nome, preco FROM produtos ORDER BY preco DESC LIMIT 3`,
        hint: 'Use LIMIT 3 no final da sua query.',
        order: 4
      },
      {
        id: 'l-1-5',
        moduleId: 'mod-1',
        title: 'Valores Únicos com DISTINCT',
        description: 'Remova duplicatas dos seus resultados.',
        content: `
# Valores Distintos

O comando **DISTINCT** é usado para retornar apenas valores distintos (diferentes).

Em uma tabela, uma coluna pode conter muitos valores duplicados; e às vezes você quer apenas listar os valores diferentes (distintos).

### Exemplo

\`\`\`sql
SELECT DISTINCT cidade
FROM clientes;
\`\`\`
        `,
        initialCode: `-- Liste todas as categorias de produtos, sem repetições
SELECT ... categoria
FROM produtos;`,
        solution: `SELECT DISTINCT categoria FROM produtos`,
        hint: 'Use SELECT DISTINCT categoria ...',
        order: 5
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Consultas Intermediárias',
    description: 'Combine tabelas e agrupe dados para análises mais profundas.',
    level: 'Intermediário',
    order: 2,
    icon: 'layers',
    lessons: [
      {
        id: 'l-2-1',
        moduleId: 'mod-2',
        title: 'INNER JOIN',
        description: 'Combine dados de duas tabelas baseados em uma coluna comum.',
        content: `
# Juntando Tabelas

O **INNER JOIN** seleciona registros que têm valores correspondentes em ambas as tabelas.

### Sintaxe

\`\`\`sql
SELECT tabela1.coluna, tabela2.coluna
FROM tabela1
INNER JOIN tabela2 ON tabela1.id_comum = tabela2.id_comum;
\`\`\`
        `,
        initialCode: `-- Liste os pedidos e o nome do cliente que fez cada pedido
SELECT pedidos.id, clientes.nome, pedidos.valor_total
FROM pedidos
INNER JOIN clientes ON ...`,
        solution: `SELECT pedidos.id, clientes.nome, pedidos.valor_total FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id`,
        hint: 'A coluna comum é cliente_id na tabela pedidos e id na tabela clientes.',
        order: 1
      },
      {
        id: 'l-2-2',
        moduleId: 'mod-2',
        title: 'Agregando com GROUP BY',
        description: 'Agrupe linhas que têm os mesmos valores em linhas de resumo.',
        content: `
# Agrupamento de Dados

O **GROUP BY** agrupa linhas que têm os mesmos valores em linhas de resumo, como "encontrar o número de clientes em cada cidade".

É frequentemente usado com funções de agregação:
* \`COUNT()\`: Conta o número de linhas
* \`SUM()\`: Soma os valores
* \`AVG()\`: Calcula a média
* \`MAX()\`: Encontra o valor máximo
* \`MIN()\`: Encontra o valor mínimo

### Exemplo

\`\`\`sql
SELECT cidade, COUNT(*)
FROM clientes
GROUP BY cidade;
\`\`\`
        `,
        initialCode: `-- Conte quantos produtos existem em cada categoria
SELECT categoria, COUNT(*) as total_produtos
FROM produtos
GROUP BY ...`,
        solution: `SELECT categoria, COUNT(*) as total_produtos FROM produtos GROUP BY categoria`,
        hint: 'Agrupe pela coluna categoria.',
        order: 2
      },
      {
        id: 'l-2-3',
        moduleId: 'mod-2',
        title: 'Filtrando Grupos com HAVING',
        description: 'Filtre resultados após o agrupamento.',
        content: `
# Filtrando Grupos

A cláusula **HAVING** foi adicionada ao SQL porque a palavra-chave **WHERE** não pode ser usada com funções de agregação.

### Exemplo

\`\`\`sql
SELECT cidade, COUNT(*)
FROM clientes
GROUP BY cidade
HAVING COUNT(*) > 5;
\`\`\`
        `,
        initialCode: `-- Mostre apenas as categorias que têm mais de 1 produto
SELECT categoria, COUNT(*) as total
FROM produtos
GROUP BY categoria
HAVING ...`,
        solution: `SELECT categoria, COUNT(*) as total FROM produtos GROUP BY categoria HAVING COUNT(*) > 1`,
        hint: 'Use HAVING COUNT(*) > 1',
        order: 3
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'SQL Avançado',
    description: 'Domine subqueries, CTEs e funções de janela.',
    level: 'Avançado',
    order: 3,
    icon: 'zap',
    lessons: [
      {
        id: 'l-3-1',
        moduleId: 'mod-3',
        title: 'Subqueries',
        description: 'Use uma query dentro de outra query.',
        content: `
# Subconsultas

Uma subquery é uma consulta aninhada dentro de uma consulta maior.

### Exemplo

\`\`\`sql
SELECT nome
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);
\`\`\`
        `,
        initialCode: `-- Encontre os produtos que são mais caros que a média de todos os produtos
SELECT nome, preco
FROM produtos
WHERE preco > (SELECT ... FROM produtos)`,
        solution: `SELECT nome, preco FROM produtos WHERE preco > (SELECT AVG(preco) FROM produtos)`,
        hint: 'Use a função AVG(preco) na subquery.',
        order: 1
      },
      {
        id: 'l-3-2',
        moduleId: 'mod-3',
        title: 'CTEs (Common Table Expressions)',
        description: 'Crie tabelas temporárias nomeadas para organizar suas queries.',
        content: `
# CTEs (Common Table Expressions)

Uma CTE é uma "tabela temporária" que existe apenas durante a execução de uma única instrução SQL. Ela torna queries complexas mais legíveis.

### Sintaxe

\`\`\`sql
WITH NomeDaCTE AS (
    SELECT coluna1, coluna2
    FROM tabela
    WHERE condicao
)
SELECT *
FROM NomeDaCTE;
\`\`\`

### Exemplo

\`\`\`sql
WITH VendasAltas AS (
    SELECT *
    FROM pedidos
    WHERE valor_total > 1000
)
SELECT COUNT(*) FROM VendasAltas;
\`\`\`
        `,
        initialCode: `-- Use uma CTE para encontrar a média de salários por departamento, e depois selecione apenas os departamentos com média maior que 4000
WITH MediaSalarios AS (
    SELECT departamento, AVG(salario) as media
    FROM funcionarios
    GROUP BY departamento
)
SELECT *
FROM MediaSalarios
WHERE ...`,
        solution: `WITH MediaSalarios AS (SELECT departamento, AVG(salario) as media FROM funcionarios GROUP BY departamento) SELECT * FROM MediaSalarios WHERE media > 4000`,
        hint: 'Filtre onde a media > 4000.',
        order: 2
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Casos de Negócio',
    description: 'Aplique seus conhecimentos em cenários do mundo real.',
    level: 'Expert',
    order: 4,
    icon: 'briefcase',
    lessons: [
      {
        id: 'l-4-1',
        moduleId: 'mod-4',
        title: 'Análise de Vendas',
        description: 'Calcule o total de vendas por departamento.',
        content: `
# Relatório de Vendas

A diretoria precisa saber qual foi o faturamento total de cada categoria de produtos.

Você precisará juntar as tabelas \`itens_pedido\`, \`produtos\` e agrupar por categoria.
        `,
        initialCode: `-- Calcule o valor total vendido por categoria de produto
SELECT p.categoria, SUM(ip.quantidade * ip.preco_unitario) as faturamento_total
FROM itens_pedido ip
JOIN produtos p ON ip.produto_id = p.id
GROUP BY ...
ORDER BY faturamento_total DESC`,
        solution: `SELECT p.categoria, SUM(ip.quantidade * ip.preco_unitario) as faturamento_total FROM itens_pedido ip JOIN produtos p ON ip.produto_id = p.id GROUP BY p.categoria ORDER BY faturamento_total DESC`,
        hint: 'Agrupe por p.categoria.',
        order: 1
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'Window Functions',
    description: 'Aprenda a realizar cálculos através de um conjunto de linhas.',
    level: 'Expert',
    order: 5,
    icon: 'bar_chart',
    lessons: [
      {
        id: 'l-5-1',
        moduleId: 'mod-5',
        title: 'ROW_NUMBER()',
        description: 'Atribua um número sequencial para cada linha.',
        content: `
# Funções de Janela: ROW_NUMBER()

Funções de janela permitem fazer cálculos em um conjunto de linhas relacionadas à linha atual.

**ROW_NUMBER()** atribui um número inteiro sequencial a cada linha dentro de uma partição de um conjunto de resultados.

### Sintaxe

\`\`\`sql
SELECT coluna,
       ROW_NUMBER() OVER (ORDER BY coluna) as numero_linha
FROM tabela;
\`\`\`

Você também pode particionar (reiniciar a contagem) por grupos:

\`\`\`sql
SELECT departamento, nome, salario,
       ROW_NUMBER() OVER (PARTITION BY departamento ORDER BY salario DESC) as rank
FROM funcionarios;
\`\`\`
        `,
        initialCode: `-- Classifique os produtos por preço (do mais caro para o mais barato) usando ROW_NUMBER()
SELECT nome, preco,
       ROW_NUMBER() OVER (ORDER BY ...) as ranking
FROM produtos;`,
        solution: `SELECT nome, preco, ROW_NUMBER() OVER (ORDER BY preco DESC) as ranking FROM produtos`,
        hint: 'Use ORDER BY preco DESC dentro da cláusula OVER.',
        order: 1
      },
      {
        id: 'l-5-2',
        moduleId: 'mod-5',
        title: 'RANK() vs DENSE_RANK()',
        description: 'Entenda a diferença entre ranking com e sem "buracos".',
        content: `
# RANK() e DENSE_RANK()

Ambas as funções atribuem um rank para cada linha, mas tratam empates de forma diferente.

* **RANK()**: Se houver empate, o próximo número no ranking será pulado. (Ex: 1, 2, 2, 4)
* **DENSE_RANK()**: Se houver empate, o próximo número no ranking NÃO será pulado. (Ex: 1, 2, 2, 3)

### Exemplo

\`\`\`sql
SELECT nome, salario,
       RANK() OVER (ORDER BY salario DESC) as rank_normal,
       DENSE_RANK() OVER (ORDER BY salario DESC) as rank_denso
FROM funcionarios;
\`\`\`
        `,
        initialCode: `-- Use DENSE_RANK para classificar os funcionários por salário, sem pular números no ranking
SELECT nome, salario,
       ... OVER (ORDER BY salario DESC) as ranking
FROM funcionarios;`,
        solution: `SELECT nome, salario, DENSE_RANK() OVER (ORDER BY salario DESC) as ranking FROM funcionarios`,
        hint: 'Use DENSE_RANK() OVER ...',
        order: 2
      }
    ]
  }
];
