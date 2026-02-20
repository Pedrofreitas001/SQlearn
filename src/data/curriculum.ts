export type QuizOption = {
  text: string;
  isCorrect: boolean;
};

export type Quiz = {
  question: string;
  options: QuizOption[];
  explanation: string;
};

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
  quiz: Quiz;
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

// ─────────────────────────────────────────────
// MÓDULO 1 — Fundamentos de SQL
// ─────────────────────────────────────────────
const mod1Lessons: Lesson[] = [
  {
    id: 'l-1-1',
    moduleId: 'mod-1',
    title: 'SELECT e FROM',
    description: 'Selecione o nome e o email de todos os clientes.',
    order: 1,
    content: `
# Sua Primeira Consulta SQL

Imagine que você tem uma planilha com milhares de linhas. O SQL é a ferramenta que permite "perguntar" coisas para essa planilha — e obter respostas instantâneas.

Tudo começa com dois comandos:

- **SELECT** — escolhe quais *colunas* você quer ver
- **FROM** — indica de qual *tabela* esses dados vêm

### Sintaxe

\`\`\`sql
SELECT coluna1, coluna2
FROM nome_tabela;
\`\`\`

### Selecionando tudo

O asterisco (\`*\`) é um atalho que significa "todas as colunas":

\`\`\`sql
SELECT * FROM clientes;
\`\`\`

> **Dica profissional:** em projetos reais, evite \`SELECT *\` — sempre liste as colunas que precisa. Isso torna a query mais eficiente e mais fácil de entender.

### A tabela \`clientes\`

Neste desafio, você vai consultar a tabela **clientes**, que tem estas colunas:

| Coluna | Tipo | Exemplo |
|--------|------|---------|
| \`id\` | Número | 1 |
| \`nome\` | Texto | Ana Silva |
| \`email\` | Texto | ana.silva@email.com |
| \`cidade\` | Texto | São Paulo |
| \`estado\` | Texto | SP |
| \`data_cadastro\` | Data | 2022-01-15 |

### Conceitos-chave

| Termo | Significado |
|-------|-------------|
| **Tabela** | Um conjunto de dados organizado em linhas e colunas |
| **Coluna** | Um campo específico (ex: \`nome\`, \`email\`) |
| **Linha** | Um registro individual (ex: um cliente) |
    `,
    quiz: {
      question: 'Qual comando SQL é usado para escolher quais colunas você quer ver?',
      options: [
        { text: 'FROM', isCorrect: false },
        { text: 'SELECT', isCorrect: true },
        { text: 'WHERE', isCorrect: false },
        { text: 'TABLE', isCorrect: false },
      ],
      explanation: 'O SELECT indica quais colunas você quer ver. O FROM indica de qual tabela buscar os dados.',
    },
    initialCode: `-- Selecione o nome e o email de todos os clientes\nSELECT ...\nFROM clientes;`,
    solution: `SELECT nome, email FROM clientes`,
    hint: 'Substitua os ... pelas colunas que deseja: nome e email. Exemplo: SELECT nome, email FROM clientes;',
  },
  {
    id: 'l-1-2',
    moduleId: 'mod-1',
    title: 'Filtrando com WHERE',
    description: 'Selecione todos os produtos com preço maior que 1000.',
    order: 2,
    content: `
# Filtrando Dados com WHERE

Na vida real, você quase nunca quer ver *todos* os dados. Quer ver apenas os clientes de São Paulo, os produtos acima de R$ 500, os pedidos de janeiro...

É aí que entra o **WHERE**. Ele funciona como um filtro.

### Sintaxe

\`\`\`sql
SELECT coluna1, coluna2
FROM tabela
WHERE condição;
\`\`\`

### Operadores de Comparação

| Operador | Significado | Exemplo |
|----------|-------------|---------|
| \`=\` | Igual a | \`WHERE cidade = 'São Paulo'\` |
| \`>\` | Maior que | \`WHERE preco > 1000\` |
| \`<\` | Menor que | \`WHERE salario < 5000\` |
| \`>=\` | Maior ou igual | \`WHERE estoque >= 50\` |
| \`<=\` | Menor ou igual | \`WHERE preco <= 200\` |
| \`!=\` ou \`<>\` | Diferente | \`WHERE status != 'cancelado'\` |

### Exemplo

\`\`\`sql
SELECT nome, cidade
FROM clientes
WHERE cidade = 'São Paulo';
\`\`\`

> **Atenção:** textos (strings) sempre devem estar entre aspas simples: \`'São Paulo'\`. Números não precisam de aspas.

### A tabela \`produtos\`

Neste desafio, você vai filtrar a tabela **produtos**:

| Coluna | Tipo | Exemplo |
|--------|------|---------|
| \`id\` | Número | 1 |
| \`nome\` | Texto | Notebook Gamer X1 |
| \`categoria\` | Texto | Eletrônicos |
| \`preco\` | Decimal | 4500.00 |
| \`estoque\` | Número | 15 |
    `,
    quiz: {
      question: 'Qual operador filtra linhas que atendem a uma condição?',
      options: [
        { text: 'ORDER BY', isCorrect: false },
        { text: 'GROUP BY', isCorrect: false },
        { text: 'WHERE', isCorrect: true },
        { text: 'LIMIT', isCorrect: false },
      ],
      explanation: 'O WHERE filtra linhas com base em uma condição. Exemplo: WHERE preco > 1000 retorna apenas produtos com preço acima de 1000.',
    },
    initialCode: `-- Selecione todos os produtos com preço maior que 1000\nSELECT *\nFROM produtos\nWHERE ...`,
    solution: `SELECT * FROM produtos WHERE preco > 1000`,
    hint: 'Complete o WHERE com a condição: preco > 1000. A query completa fica: SELECT * FROM produtos WHERE preco > 1000;',
  },
  {
    id: 'l-1-3',
    moduleId: 'mod-1',
    title: 'WHERE com Texto e AND/OR',
    description: 'Selecione os clientes que moram em São Paulo e se cadastraram a partir de 2023.',
    order: 3,
    content: `
# Combinando Condições

E se você precisar de *mais de uma* condição? Use **AND** e **OR**.

### AND — ambas as condições devem ser verdadeiras

\`\`\`sql
SELECT * FROM produtos
WHERE categoria = 'Eletrônicos' AND preco > 2000;
\`\`\`

### OR — pelo menos uma condição deve ser verdadeira

\`\`\`sql
SELECT * FROM clientes
WHERE cidade = 'São Paulo' OR cidade = 'Rio de Janeiro';
\`\`\`

### Combinando AND e OR

Use parênteses para controlar a ordem:

\`\`\`sql
SELECT * FROM produtos
WHERE (categoria = 'Acessórios' OR categoria = 'Componentes')
  AND preco < 500;
\`\`\`

### Filtrando por data

Datas em SQL são comparadas como textos no formato \`'AAAA-MM-DD'\`:

\`\`\`sql
SELECT * FROM pedidos
WHERE data_pedido >= '2024-01-01';
\`\`\`

### Dados disponíveis

A tabela **clientes** tem clientes de várias cidades (São Paulo, Rio de Janeiro, Curitiba...) com datas de cadastro entre 2022 e 2024. Use \`cidade = 'São Paulo'\` e \`data_cadastro >= '2023-01-01'\`.
    `,
    quiz: {
      question: 'Qual operador combina duas condições onde AMBAS devem ser verdadeiras?',
      options: [
        { text: 'OR', isCorrect: false },
        { text: 'NOT', isCorrect: false },
        { text: 'AND', isCorrect: true },
        { text: 'BETWEEN', isCorrect: false },
      ],
      explanation: 'AND exige que ambas as condições sejam verdadeiras. OR exige que pelo menos uma seja.',
    },
    initialCode: `-- Selecione os clientes de São Paulo cadastrados a partir de 2023\nSELECT *\nFROM clientes\nWHERE cidade = '...' AND data_cadastro >= '...'`,
    solution: `SELECT * FROM clientes WHERE cidade = 'São Paulo' AND data_cadastro >= '2023-01-01'`,
    hint: "Substitua os '...' pelos valores corretos: cidade = 'São Paulo' AND data_cadastro >= '2023-01-01'",
  },
  {
    id: 'l-1-4',
    moduleId: 'mod-1',
    title: 'Ordenando com ORDER BY',
    description: 'Liste todos os funcionários ordenados pelo salário do maior para o menor.',
    order: 4,
    content: `
# Ordenando Resultados

Os dados voltam do banco em uma ordem "aleatória" por padrão. O **ORDER BY** organiza os resultados.

### Sintaxe

\`\`\`sql
SELECT coluna1, coluna2
FROM tabela
ORDER BY coluna [ASC | DESC];
\`\`\`

- **ASC** (ascendente) — do menor para o maior (A→Z, 0→9). É o padrão.
- **DESC** (descendente) — do maior para o menor (Z→A, 9→0).

### Exemplos

Ordenar clientes por nome (A→Z):
\`\`\`sql
SELECT nome, cidade FROM clientes ORDER BY nome;
\`\`\`

Ordenar produtos pelo preço (mais caro primeiro):
\`\`\`sql
SELECT nome, preco FROM produtos ORDER BY preco DESC;
\`\`\`

### Ordenação por múltiplas colunas

\`\`\`sql
SELECT nome, departamento, salario
FROM funcionarios
ORDER BY departamento ASC, salario DESC;
\`\`\`
Isso organiza primeiro por departamento (A→Z), e dentro de cada departamento, pelo salário (maior primeiro).

### A tabela \`funcionarios\`

| Coluna | Tipo | Exemplo |
|--------|------|---------|
| \`id\` | Número | 1 |
| \`nome\` | Texto | Fernanda Oliveira |
| \`departamento\` | Texto | Vendas |
| \`cargo\` | Texto | Vendedora |
| \`salario\` | Decimal | 3500.00 |
| \`data_contratacao\` | Data | 2021-01-10 |
    `,
    quiz: {
      question: 'Qual palavra-chave ordena os resultados do MAIOR para o menor?',
      options: [
        { text: 'ASC', isCorrect: false },
        { text: 'DESC', isCorrect: true },
        { text: 'LIMIT', isCorrect: false },
        { text: 'TOP', isCorrect: false },
      ],
      explanation: 'DESC (descendente) ordena do maior para o menor. ASC (ascendente) ordena do menor para o maior e é o padrão.',
    },
    initialCode: `-- Liste todos os funcionários ordenados pelo salário (maior para menor)\nSELECT nome, cargo, salario\nFROM funcionarios\nORDER BY ...`,
    solution: `SELECT nome, cargo, salario FROM funcionarios ORDER BY salario DESC`,
    hint: 'Complete com: ORDER BY salario DESC. O DESC faz a ordenação do maior para o menor.',
  },
  {
    id: 'l-1-5',
    moduleId: 'mod-1',
    title: 'LIMIT — Limitando Resultados',
    description: 'Selecione os 5 produtos mais caros.',
    order: 5,
    content: `
# Limitando a Quantidade de Resultados

Quando uma tabela tem milhares de linhas, você nem sempre quer ver tudo. O **LIMIT** restringe quantas linhas são retornadas.

### Sintaxe

\`\`\`sql
SELECT colunas
FROM tabela
LIMIT número;
\`\`\`

### Caso clássico: "Top N"

O LIMIT é muito usado junto com ORDER BY para obter os "top N" resultados:

\`\`\`sql
-- Os 3 funcionários mais bem pagos
SELECT nome, salario
FROM funcionarios
ORDER BY salario DESC
LIMIT 3;
\`\`\`

### Na prática

No mundo real, LIMIT é essencial para:
- **Paginação** — exibir 20 resultados por página
- **Performance** — não sobrecarregar o banco trazendo milhões de linhas
- **Amostragem** — ver uma amostra dos dados antes de fazer análises pesadas
    `,
    quiz: {
      question: 'Qual comando limita a quantidade de resultados retornados?',
      options: [
        { text: 'MAX', isCorrect: false },
        { text: 'TOP', isCorrect: false },
        { text: 'LIMIT', isCorrect: true },
        { text: 'COUNT', isCorrect: false },
      ],
      explanation: 'O LIMIT restringe quantas linhas são retornadas. LIMIT 5 retorna no máximo 5 linhas.',
    },
    initialCode: `-- Selecione os 5 produtos mais caros\nSELECT nome, preco\nFROM produtos\nORDER BY preco DESC\nLIMIT ...`,
    solution: `SELECT nome, preco FROM produtos ORDER BY preco DESC LIMIT 5`,
    hint: 'Substitua ... por 5. Combinado com ORDER BY preco DESC, isso retorna os 5 mais caros.',
  },
  {
    id: 'l-1-6',
    moduleId: 'mod-1',
    title: 'DISTINCT — Valores Únicos',
    description: 'Liste todas as cidades únicas dos clientes.',
    order: 6,
    content: `
# Eliminando Duplicatas

Às vezes você quer saber quais *valores diferentes* existem em uma coluna. Por exemplo: "quais cidades têm clientes cadastrados?".

O **DISTINCT** remove linhas duplicadas dos resultados.

### Sintaxe

\`\`\`sql
SELECT DISTINCT coluna
FROM tabela;
\`\`\`

### Exemplo

\`\`\`sql
-- Quais categorias de produtos existem?
SELECT DISTINCT categoria
FROM produtos;
\`\`\`

### DISTINCT com múltiplas colunas

Quando usado com várias colunas, o DISTINCT elimina combinações duplicadas:

\`\`\`sql
SELECT DISTINCT cidade, estado
FROM clientes;
\`\`\`
Isso retorna cada *par* (cidade, estado) apenas uma vez.

### Quando usar

- Listar valores únicos de uma coluna
- Descobrir categorias/tipos existentes
- Contar valores distintos com \`COUNT(DISTINCT coluna)\`
    `,
    quiz: {
      question: 'Qual palavra-chave remove valores duplicados do resultado?',
      options: [
        { text: 'UNIQUE', isCorrect: false },
        { text: 'DISTINCT', isCorrect: true },
        { text: 'DIFFERENT', isCorrect: false },
        { text: 'GROUP BY', isCorrect: false },
      ],
      explanation: 'DISTINCT elimina duplicatas do resultado. SELECT DISTINCT cidade retorna cada cidade apenas uma vez.',
    },
    initialCode: `-- Liste todas as cidades únicas dos clientes\nSELECT DISTINCT ...\nFROM clientes;`,
    solution: `SELECT DISTINCT cidade FROM clientes`,
    hint: 'Substitua ... pela coluna que quer ver sem duplicatas: cidade.',
  },
  {
    id: 'l-1-7',
    moduleId: 'mod-1',
    title: 'LIKE — Buscando Padrões',
    description: 'Selecione todos os produtos cujo nome contém a palavra "Gamer".',
    order: 7,
    content: `
# Buscando Padrões com LIKE

O operador **LIKE** permite buscar valores que *correspondem a um padrão*, em vez de uma correspondência exata.

### Caracteres curinga

| Curinga | Significado | Exemplo |
|---------|-------------|---------|
| \`%\` | Qualquer sequência de caracteres | \`'%silva'\` encontra "Ana Silva", "João da Silva" |
| \`_\` | Exatamente um caractere | \`'_arcos'\` encontra "Marcos" |

### Exemplos

\`\`\`sql
-- Nomes que começam com 'A'
SELECT * FROM clientes WHERE nome LIKE 'A%';

-- Nomes que terminam com 'Silva'
SELECT * FROM clientes WHERE nome LIKE '%Silva';

-- Nomes que contêm 'ar' em qualquer posição
SELECT * FROM clientes WHERE nome LIKE '%ar%';

-- Emails do domínio @email.com
SELECT * FROM clientes WHERE email LIKE '%@email.com';
\`\`\`

### NOT LIKE

Use \`NOT LIKE\` para excluir padrões:

\`\`\`sql
SELECT * FROM produtos WHERE nome NOT LIKE '%Gamer%';
\`\`\`
    `,
    quiz: {
      question: 'No LIKE, o que o caractere % representa?',
      options: [
        { text: 'Exatamente um caractere', isCorrect: false },
        { text: 'Apenas números', isCorrect: false },
        { text: 'Qualquer sequência de caracteres', isCorrect: true },
        { text: 'O fim da string', isCorrect: false },
      ],
      explanation: "O % representa qualquer sequência de caracteres (inclusive nenhum). '%Gamer%' encontra 'Gamer' em qualquer posição do texto.",
    },
    initialCode: `-- Selecione todos os produtos cujo nome contém "Gamer"\nSELECT *\nFROM produtos\nWHERE nome LIKE ...`,
    solution: `SELECT * FROM produtos WHERE nome LIKE '%Gamer%'`,
    hint: "Use aspas simples com % ao redor: '%Gamer%'. O % antes e depois significa que 'Gamer' pode estar em qualquer posição.",
  },
  {
    id: 'l-1-8',
    moduleId: 'mod-1',
    title: 'IN e BETWEEN',
    description: 'Selecione os produtos com preço entre 200 e 500.',
    order: 8,
    content: `
# IN e BETWEEN — Filtros Elegantes

### BETWEEN — Faixa de valores

O **BETWEEN** filtra valores dentro de um intervalo (inclusive):

\`\`\`sql
SELECT * FROM produtos
WHERE preco BETWEEN 100 AND 500;
\`\`\`

É equivalente a:
\`\`\`sql
WHERE preco >= 100 AND preco <= 500
\`\`\`

Funciona com datas também:
\`\`\`sql
SELECT * FROM pedidos
WHERE data_pedido BETWEEN '2023-06-01' AND '2023-12-31';
\`\`\`

### IN — Lista de valores

O **IN** verifica se o valor está em uma lista:

\`\`\`sql
SELECT * FROM clientes
WHERE cidade IN ('São Paulo', 'Rio de Janeiro', 'Curitiba');
\`\`\`

É mais limpo que escrever vários OR:
\`\`\`sql
-- Equivalente (mas mais verboso):
WHERE cidade = 'São Paulo' OR cidade = 'Rio de Janeiro' OR cidade = 'Curitiba'
\`\`\`

### NOT IN / NOT BETWEEN

Ambos têm versão negada:
\`\`\`sql
WHERE categoria NOT IN ('Móveis', 'Acessórios')
WHERE preco NOT BETWEEN 100 AND 500
\`\`\`
    `,
    quiz: {
      question: 'O que BETWEEN 200 AND 500 inclui?',
      options: [
        { text: 'Valores de 201 a 499 (exclui extremos)', isCorrect: false },
        { text: 'Valores de 200 a 500 (inclui extremos)', isCorrect: true },
        { text: 'Apenas o valor 200 ou 500', isCorrect: false },
        { text: 'Valores acima de 200', isCorrect: false },
      ],
      explanation: 'BETWEEN é inclusivo: inclui os dois extremos. BETWEEN 200 AND 500 é igual a preco >= 200 AND preco <= 500.',
    },
    initialCode: `-- Selecione os produtos com preço entre 200 e 500\nSELECT nome, categoria, preco\nFROM produtos\nWHERE preco BETWEEN ... AND ...`,
    solution: `SELECT nome, categoria, preco FROM produtos WHERE preco BETWEEN 200 AND 500`,
    hint: 'Substitua os ... pelos valores: BETWEEN 200 AND 500.',
  },
  {
    id: 'l-1-9',
    moduleId: 'mod-1',
    title: 'Alias com AS',
    description: 'Selecione o nome do produto e seu preço com 10% de desconto, chamando a coluna de "preco_com_desconto".',
    order: 9,
    content: `
# Renomeando Colunas com AS

O **AS** permite dar um "apelido" (alias) a colunas ou cálculos, tornando o resultado mais legível.

### Sintaxe

\`\`\`sql
SELECT coluna AS apelido
FROM tabela;
\`\`\`

### Exemplo básico

\`\`\`sql
SELECT nome AS produto, preco AS valor
FROM produtos;
\`\`\`

### Com cálculos

O AS brilha quando você faz cálculos:

\`\`\`sql
SELECT nome,
       preco AS preco_original,
       preco * 0.9 AS preco_com_desconto
FROM produtos;
\`\`\`

### Alias para tabelas

Também funciona para tabelas (muito útil em JOINs):

\`\`\`sql
SELECT c.nome, c.cidade
FROM clientes AS c;
\`\`\`

> **Dica:** o AS é opcional para alias de tabelas. \`FROM clientes c\` funciona da mesma forma. Mas usar AS torna o código mais legível.
    `,
    quiz: {
      question: 'Para que serve o AS no SQL?',
      options: [
        { text: 'Filtrar dados', isCorrect: false },
        { text: 'Ordenar resultados', isCorrect: false },
        { text: 'Dar um apelido (alias) a uma coluna ou tabela', isCorrect: true },
        { text: 'Criar uma nova tabela', isCorrect: false },
      ],
      explanation: 'O AS renomeia uma coluna no resultado. preco * 0.9 AS preco_com_desconto mostra o cálculo com um nome legível.',
    },
    initialCode: `-- Selecione o nome e o preço com 10% de desconto\nSELECT nome, preco * 0.9 AS ...\nFROM produtos;`,
    solution: `SELECT nome, preco * 0.9 AS preco_com_desconto FROM produtos`,
    hint: 'Substitua ... pelo nome da coluna: preco_com_desconto. Multiplicar por 0.9 aplica 10% de desconto.',
  },
];

// ─────────────────────────────────────────────
// MÓDULO 2 — Funções de Agregação
// ─────────────────────────────────────────────
const mod2Lessons: Lesson[] = [
  {
    id: 'l-2-1',
    moduleId: 'mod-2',
    title: 'COUNT, SUM, AVG',
    description: 'Descubra quantos clientes existem no total.',
    order: 1,
    content: `
# Funções de Agregação

Até agora, você consultou dados individuais. Mas e quando precisa de **resumos**? Quantos clientes temos? Qual o total de vendas? Qual o salário médio?

As **funções de agregação** calculam um valor único a partir de várias linhas.

### Principais funções

| Função | O que faz | Exemplo |
|--------|-----------|---------|
| \`COUNT(*)\` | Conta linhas | Quantos pedidos existem? |
| \`COUNT(coluna)\` | Conta valores não-nulos | Quantos clientes têm email? |
| \`SUM(coluna)\` | Soma os valores | Qual o faturamento total? |
| \`AVG(coluna)\` | Calcula a média | Qual o preço médio dos produtos? |
| \`MAX(coluna)\` | Maior valor | Qual o produto mais caro? |
| \`MIN(coluna)\` | Menor valor | Qual o menor salário? |

### Exemplos

\`\`\`sql
-- Quantos clientes existem?
SELECT COUNT(*) AS total_clientes FROM clientes;

-- Qual o faturamento total?
SELECT SUM(valor_total) AS faturamento FROM pedidos;

-- Qual o preço médio dos produtos?
SELECT AVG(preco) AS preco_medio FROM produtos;

-- Qual o produto mais caro e o mais barato?
SELECT MAX(preco) AS mais_caro, MIN(preco) AS mais_barato
FROM produtos;
\`\`\`

> **Importante:** quando você usa uma função de agregação sem GROUP BY, ela retorna uma única linha com o resultado.
    `,
    quiz: {
      question: 'Qual função conta o número total de linhas?',
      options: [
        { text: 'SUM(*)', isCorrect: false },
        { text: 'COUNT(*)', isCorrect: true },
        { text: 'TOTAL(*)', isCorrect: false },
        { text: 'AVG(*)', isCorrect: false },
      ],
      explanation: 'COUNT(*) conta o número de linhas. SUM soma valores numéricos. AVG calcula a média.',
    },
    initialCode: `-- Descubra quantos clientes existem no total\nSELECT COUNT(*) AS total_clientes\nFROM ...`,
    solution: `SELECT COUNT(*) AS total_clientes FROM clientes`,
    hint: 'Substitua ... pelo nome da tabela: clientes.',
  },
  {
    id: 'l-2-2',
    moduleId: 'mod-2',
    title: 'GROUP BY — Agrupando Dados',
    description: 'Conte quantos clientes existem em cada cidade.',
    order: 2,
    content: `
# Agrupando com GROUP BY

E se você quiser saber o total de vendas *por categoria*? Ou a média de salário *por departamento*?

O **GROUP BY** divide as linhas em grupos e aplica a função de agregação a cada grupo separadamente.

### Sintaxe

\`\`\`sql
SELECT coluna_grupo, FUNCAO_AGREGACAO(coluna)
FROM tabela
GROUP BY coluna_grupo;
\`\`\`

### Exemplos

\`\`\`sql
-- Quantos clientes por cidade?
SELECT cidade, COUNT(*) AS total
FROM clientes
GROUP BY cidade;

-- Total de vendas por status
SELECT status, SUM(valor_total) AS total
FROM pedidos
GROUP BY status;

-- Salário médio por departamento
SELECT departamento, AVG(salario) AS media_salario
FROM funcionarios
GROUP BY departamento;
\`\`\`

### Regra fundamental

> Toda coluna no SELECT que **não** está dentro de uma função de agregação **deve** aparecer no GROUP BY.

\`\`\`sql
-- CORRETO:
SELECT cidade, COUNT(*) FROM clientes GROUP BY cidade;

-- INCORRETO (cidade não está no GROUP BY nem em agregação):
-- SELECT cidade, nome, COUNT(*) FROM clientes GROUP BY cidade;
\`\`\`
    `,
    quiz: {
      question: 'O GROUP BY faz o quê?',
      options: [
        { text: 'Ordena os resultados', isCorrect: false },
        { text: 'Divide linhas em grupos para aplicar agregações', isCorrect: true },
        { text: 'Filtra linhas antes da consulta', isCorrect: false },
        { text: 'Limita o número de resultados', isCorrect: false },
      ],
      explanation: 'O GROUP BY agrupa linhas com valores iguais. Combinado com COUNT(*), mostra a contagem por grupo.',
    },
    initialCode: `-- Conte quantos clientes existem em cada cidade\nSELECT cidade, COUNT(*) AS total_clientes\nFROM clientes\nGROUP BY ...`,
    solution: `SELECT cidade, COUNT(*) AS total_clientes FROM clientes GROUP BY cidade`,
    hint: 'Substitua ... pela coluna de agrupamento: cidade.',
  },
  {
    id: 'l-2-3',
    moduleId: 'mod-2',
    title: 'HAVING — Filtrando Grupos',
    description: 'Mostre apenas as categorias que têm mais de 2 produtos.',
    order: 3,
    content: `
# Filtrando Depois do Agrupamento

Você aprendeu que o **WHERE** filtra linhas *antes* do agrupamento. Mas e se quiser filtrar *depois*?

Por exemplo: "mostre apenas as cidades com mais de 3 clientes". Você não pode usar WHERE com COUNT() — é aí que entra o **HAVING**.

### WHERE vs HAVING

| | WHERE | HAVING |
|---|-------|--------|
| **Quando filtra** | Antes do GROUP BY | Depois do GROUP BY |
| **Pode usar agregação?** | Não | Sim |

### Sintaxe

\`\`\`sql
SELECT coluna, FUNCAO()
FROM tabela
WHERE condicao_linha        -- filtra linhas individuais
GROUP BY coluna
HAVING condicao_grupo;      -- filtra grupos
\`\`\`

### Exemplo

\`\`\`sql
-- Departamentos com salário médio acima de 5000
SELECT departamento, AVG(salario) AS media
FROM funcionarios
GROUP BY departamento
HAVING AVG(salario) > 5000;
\`\`\`

### Combinando WHERE + HAVING

\`\`\`sql
-- Entre os pedidos entregues, quais clientes compraram mais de uma vez?
SELECT cliente_id, COUNT(*) AS total_pedidos
FROM pedidos
WHERE status = 'entregue'
GROUP BY cliente_id
HAVING COUNT(*) > 1;
\`\`\`
    `,
    quiz: {
      question: 'Qual a diferença entre WHERE e HAVING?',
      options: [
        { text: 'WHERE é mais rápido que HAVING', isCorrect: false },
        { text: 'WHERE filtra antes do GROUP BY, HAVING filtra depois', isCorrect: true },
        { text: 'HAVING só funciona com números', isCorrect: false },
        { text: 'Não há diferença, são sinônimos', isCorrect: false },
      ],
      explanation: 'WHERE filtra linhas individuais ANTES do agrupamento. HAVING filtra grupos DEPOIS, podendo usar funções de agregação.',
    },
    initialCode: `-- Mostre as categorias com mais de 2 produtos\nSELECT categoria, COUNT(*) AS total\nFROM produtos\nGROUP BY categoria\nHAVING ...`,
    solution: `SELECT categoria, COUNT(*) AS total FROM produtos GROUP BY categoria HAVING COUNT(*) > 2`,
    hint: 'Complete com: HAVING COUNT(*) > 2. Isso filtra apenas os grupos com mais de 2 itens.',
  },
  {
    id: 'l-2-4',
    moduleId: 'mod-2',
    title: 'Agregações Avançadas',
    description: 'Calcule o preço médio, máximo e mínimo dos produtos por categoria.',
    order: 4,
    content: `
# Combinando Múltiplas Agregações

Você pode usar várias funções de agregação na mesma query. Isso é muito útil para criar **relatórios resumidos**.

### Exemplo: relatório de produtos por categoria

\`\`\`sql
SELECT categoria,
       COUNT(*) AS qtd_produtos,
       AVG(preco) AS preco_medio,
       MIN(preco) AS menor_preco,
       MAX(preco) AS maior_preco,
       SUM(estoque) AS estoque_total
FROM produtos
GROUP BY categoria
ORDER BY qtd_produtos DESC;
\`\`\`

### Arredondando valores

A função \`ROUND()\` ajuda a deixar os números mais legíveis:

\`\`\`sql
SELECT categoria,
       ROUND(AVG(preco), 2) AS preco_medio
FROM produtos
GROUP BY categoria;
\`\`\`

### Dica: combinando ORDER BY com agregações

Você pode ordenar pelo resultado de uma agregação:

\`\`\`sql
SELECT departamento, AVG(salario) AS media
FROM funcionarios
GROUP BY departamento
ORDER BY media DESC;
\`\`\`
    `,
    quiz: {
      question: 'Se você usa AVG(preco) e MAX(preco) no SELECT, o que DEVE aparecer no GROUP BY?',
      options: [
        { text: 'preco', isCorrect: false },
        { text: 'Todas as colunas que NÃO estão em funções de agregação', isCorrect: true },
        { text: 'AVG e MAX', isCorrect: false },
        { text: 'Nada, o GROUP BY é opcional', isCorrect: false },
      ],
      explanation: 'Regra: toda coluna no SELECT que NÃO está dentro de uma agregação (AVG, MAX, etc.) deve estar no GROUP BY.',
    },
    initialCode: `-- Preço médio, máximo e mínimo por categoria\nSELECT categoria,\n       AVG(preco) AS preco_medio,\n       MAX(preco) AS preco_maximo,\n       MIN(preco) AS preco_minimo\nFROM produtos\nGROUP BY ...`,
    solution: `SELECT categoria, AVG(preco) AS preco_medio, MAX(preco) AS preco_maximo, MIN(preco) AS preco_minimo FROM produtos GROUP BY categoria`,
    hint: 'A coluna "categoria" está no SELECT mas não em uma agregação. Logo, deve ir no GROUP BY: GROUP BY categoria.',
  },
];

// ─────────────────────────────────────────────
// MÓDULO 3 — JOINs
// ─────────────────────────────────────────────
const mod3Lessons: Lesson[] = [
  {
    id: 'l-3-1',
    moduleId: 'mod-3',
    title: 'INNER JOIN',
    description: 'Liste os pedidos mostrando o nome do cliente que fez cada pedido.',
    order: 1,
    content: `
# Juntando Tabelas com JOIN

Até agora, cada query usou apenas *uma* tabela. Mas dados reais estão espalhados em várias tabelas relacionadas.

A tabela \`pedidos\` tem \`cliente_id\`, mas não o nome do cliente. Para ver o nome, precisamos **juntar** pedidos com clientes.

### O que é um JOIN?

Um **JOIN** combina linhas de duas tabelas com base em uma coluna em comum. É como olhar duas planilhas ao mesmo tempo, cruzando os dados por um ID.

### INNER JOIN

O **INNER JOIN** retorna apenas as linhas que têm correspondência em **ambas** as tabelas.

### Sintaxe

\`\`\`sql
SELECT tabela1.coluna, tabela2.coluna
FROM tabela1
INNER JOIN tabela2
  ON tabela1.chave = tabela2.chave;
\`\`\`

### Exemplo

\`\`\`sql
SELECT pedidos.id, clientes.nome, pedidos.valor_total
FROM pedidos
INNER JOIN clientes
  ON pedidos.cliente_id = clientes.id;
\`\`\`

### Com alias (mais limpo)

\`\`\`sql
SELECT p.id, c.nome, p.valor_total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id;
\`\`\`

> **Visualize:** o INNER JOIN é a intersecção de dois círculos em um diagrama de Venn — só mostra o que existe em ambos.
    `,
    quiz: {
      question: 'O que o INNER JOIN retorna?',
      options: [
        { text: 'Todas as linhas de ambas as tabelas', isCorrect: false },
        { text: 'Apenas linhas com correspondência em AMBAS as tabelas', isCorrect: true },
        { text: 'Todas da tabela da esquerda', isCorrect: false },
        { text: 'Apenas linhas sem correspondência', isCorrect: false },
      ],
      explanation: 'O INNER JOIN retorna apenas as linhas que têm correspondência em ambas as tabelas. É a intersecção.',
    },
    initialCode: `-- Liste os pedidos com o nome do cliente\nSELECT p.id, c.nome, p.valor_total\nFROM pedidos p\nINNER JOIN clientes c ON ...`,
    solution: `SELECT p.id, c.nome, p.valor_total FROM pedidos p INNER JOIN clientes c ON p.cliente_id = c.id`,
    hint: 'Complete a condição ON: p.cliente_id = c.id. Isso conecta cada pedido ao seu cliente.',
  },
  {
    id: 'l-3-2',
    moduleId: 'mod-3',
    title: 'LEFT JOIN',
    description: 'Liste TODOS os clientes e a quantidade de pedidos de cada um (inclusive quem nunca comprou).',
    order: 2,
    content: `
# LEFT JOIN — Mantendo Todos da Esquerda

O INNER JOIN só mostra linhas com correspondência em ambas as tabelas. Mas e se um cliente **nunca fez um pedido**? Com INNER JOIN, ele desaparece do resultado.

O **LEFT JOIN** resolve isso: mantém **todas** as linhas da tabela da esquerda, mesmo que não tenham correspondência na tabela da direita.

### Sintaxe

\`\`\`sql
SELECT a.coluna, b.coluna
FROM tabela_esquerda a
LEFT JOIN tabela_direita b
  ON a.chave = b.chave;
\`\`\`

### Exemplo

\`\`\`sql
SELECT c.nome, COUNT(p.id) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.nome;
\`\`\`

Clientes sem pedidos terão \`total_pedidos = 0\`.

### INNER JOIN vs LEFT JOIN

| Tipo | Mostra... |
|------|-----------|
| INNER JOIN | Apenas linhas com correspondência em ambas as tabelas |
| LEFT JOIN | Todas da esquerda + correspondências da direita (ou NULL) |

### Encontrando registros "órfãos"

Um truque útil — encontrar clientes que nunca compraram:

\`\`\`sql
SELECT c.nome
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;
\`\`\`
    `,
    quiz: {
      question: 'Qual a diferença principal entre INNER JOIN e LEFT JOIN?',
      options: [
        { text: 'LEFT JOIN é mais rápido', isCorrect: false },
        { text: 'LEFT JOIN mantém TODAS as linhas da tabela da esquerda, mesmo sem correspondência', isCorrect: true },
        { text: 'INNER JOIN retorna mais resultados', isCorrect: false },
        { text: 'Não há diferença', isCorrect: false },
      ],
      explanation: 'LEFT JOIN mantém todos os registros da tabela da esquerda. Se não houver correspondência, os campos da direita ficam NULL.',
    },
    initialCode: `-- Liste TODOS os clientes e quantos pedidos cada um fez\nSELECT c.nome, COUNT(p.id) AS total_pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON ...\nGROUP BY c.nome`,
    solution: `SELECT c.nome, COUNT(p.id) AS total_pedidos FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id GROUP BY c.nome`,
    hint: 'Complete o ON com: c.id = p.cliente_id. O LEFT JOIN garante que clientes sem pedidos também apareçam.',
  },
  {
    id: 'l-3-3',
    moduleId: 'mod-3',
    title: 'JOIN com Múltiplas Tabelas',
    description: 'Liste cada item de pedido mostrando o nome do produto e o nome do cliente.',
    order: 3,
    content: `
# Juntando 3 ou Mais Tabelas

No mundo real, frequentemente precisamos cruzar dados de várias tabelas. Basta encadear JOINs.

### Exemplo: Detalhamento completo de pedidos

Para ver "quem comprou o quê", precisamos cruzar:
- \`itens_pedido\` → tem produto_id e pedido_id
- \`produtos\` → tem o nome do produto
- \`pedidos\` → tem o cliente_id
- \`clientes\` → tem o nome do cliente

\`\`\`sql
SELECT c.nome AS cliente,
       pr.nome AS produto,
       ip.quantidade,
       ip.preco_unitario
FROM itens_pedido ip
INNER JOIN pedidos pe ON ip.pedido_id = pe.id
INNER JOIN clientes c ON pe.cliente_id = c.id
INNER JOIN produtos pr ON ip.produto_id = pr.id;
\`\`\`

### Dica: pense nas relações

Antes de escrever o JOIN, pergunte:
1. Quais tabelas contêm os dados que preciso?
2. Qual coluna conecta uma tabela à outra?
3. Preciso de INNER JOIN ou LEFT JOIN?

### Diagrama das relações

\`\`\`
clientes (id) ← pedidos (cliente_id)
pedidos (id) ← itens_pedido (pedido_id)
produtos (id) ← itens_pedido (produto_id)
\`\`\`
    `,
    quiz: {
      question: 'Para juntar 3 tabelas, quantos JOINs são necessários?',
      options: [
        { text: '1', isCorrect: false },
        { text: '2', isCorrect: true },
        { text: '3', isCorrect: false },
        { text: 'Depende dos dados', isCorrect: false },
      ],
      explanation: 'Para N tabelas, você precisa de N-1 JOINs. 3 tabelas = 2 JOINs, 4 tabelas = 3 JOINs.',
    },
    initialCode: `-- Liste itens mostrando o nome do produto e do cliente\nSELECT c.nome AS cliente,\n       pr.nome AS produto,\n       ip.quantidade,\n       ip.preco_unitario\nFROM itens_pedido ip\nINNER JOIN pedidos pe ON ip.pedido_id = pe.id\nINNER JOIN clientes c ON ...\nINNER JOIN produtos pr ON ...`,
    solution: `SELECT c.nome AS cliente, pr.nome AS produto, ip.quantidade, ip.preco_unitario FROM itens_pedido ip INNER JOIN pedidos pe ON ip.pedido_id = pe.id INNER JOIN clientes c ON pe.cliente_id = c.id INNER JOIN produtos pr ON ip.produto_id = pr.id`,
    hint: 'Complete as condições ON: clientes c ON pe.cliente_id = c.id e produtos pr ON ip.produto_id = pr.id.',
  },
  {
    id: 'l-3-4',
    moduleId: 'mod-3',
    title: 'JOIN + GROUP BY',
    description: 'Calcule o total gasto por cada cliente (nome do cliente e soma dos valores).',
    order: 4,
    content: `
# Combinando JOIN com Agregações

A verdadeira magia acontece quando combinamos **JOIN** com **GROUP BY**. Isso permite criar relatórios que cruzam dados de várias tabelas.

### Exemplo: Total gasto por cliente

\`\`\`sql
SELECT c.nome, SUM(p.valor_total) AS total_gasto
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.nome
ORDER BY total_gasto DESC;
\`\`\`

### Exemplo: Produtos mais vendidos (em quantidade)

\`\`\`sql
SELECT pr.nome, SUM(ip.quantidade) AS total_vendido
FROM itens_pedido ip
INNER JOIN produtos pr ON ip.produto_id = pr.id
GROUP BY pr.nome
ORDER BY total_vendido DESC;
\`\`\`

### Padrão comum

A estrutura "JOIN + GROUP BY + ORDER BY" é uma das mais usadas em relatórios:

\`\`\`sql
SELECT dimensao, AGREGACAO(metrica)
FROM tabela_fato
JOIN tabela_dimensao ON ...
GROUP BY dimensao
ORDER BY AGREGACAO(metrica) DESC;
\`\`\`

Esse padrão se repete constantemente em análise de dados.
    `,
    quiz: {
      question: 'Ao combinar JOIN + GROUP BY, você agrupa por qual coluna?',
      options: [
        { text: 'Pela coluna da função de agregação (SUM, COUNT)', isCorrect: false },
        { text: 'Pela coluna que identifica cada grupo (ex: nome do cliente)', isCorrect: true },
        { text: 'Pela chave primária da tabela principal', isCorrect: false },
        { text: 'Qualquer coluna serve', isCorrect: false },
      ],
      explanation: 'Agrupe pela dimensão que quer analisar. Para "total por cliente", agrupe por c.nome.',
    },
    initialCode: `-- Total gasto por cada cliente\nSELECT c.nome, SUM(p.valor_total) AS total_gasto\nFROM clientes c\nINNER JOIN pedidos p ON c.id = p.cliente_id\nGROUP BY ...\nORDER BY total_gasto DESC`,
    solution: `SELECT c.nome, SUM(p.valor_total) AS total_gasto FROM clientes c INNER JOIN pedidos p ON c.id = p.cliente_id GROUP BY c.nome ORDER BY total_gasto DESC`,
    hint: 'Complete com GROUP BY c.nome. Isso agrupa os pedidos por cliente e soma os valores.',
  },
];

// ─────────────────────────────────────────────
// MÓDULO 4 — SQL Avançado
// ─────────────────────────────────────────────
const mod4Lessons: Lesson[] = [
  {
    id: 'l-4-1',
    moduleId: 'mod-4',
    title: 'Subqueries',
    description: 'Encontre os produtos mais caros que o preço médio de todos os produtos.',
    order: 1,
    content: `
# Subconsultas (Subqueries)

Uma **subquery** é uma query dentro de outra query. É como fazer uma pergunta que depende da resposta de outra pergunta.

### Subquery no WHERE

A subquery mais comum retorna um valor usado como filtro:

\`\`\`sql
-- Produtos acima da média de preço
SELECT nome, preco
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);
\`\`\`

O banco de dados primeiro calcula a média, depois usa esse valor para filtrar.

### Subquery com IN

Quando a subquery retorna uma *lista* de valores:

\`\`\`sql
-- Clientes que já fizeram algum pedido
SELECT nome FROM clientes
WHERE id IN (SELECT DISTINCT cliente_id FROM pedidos);
\`\`\`

### Subquery no FROM (Tabela derivada)

A subquery pode ser usada como uma "tabela temporária":

\`\`\`sql
SELECT sub.departamento, sub.total
FROM (
  SELECT departamento, COUNT(*) AS total
  FROM funcionarios
  GROUP BY departamento
) AS sub
WHERE sub.total >= 2;
\`\`\`

### Quando usar subqueries

- Comparar com valores calculados (média, máximo, etc.)
- Filtrar com base em dados de outra tabela
- Criar tabelas temporárias para queries complexas
    `,
    quiz: {
      question: 'O que é uma subquery?',
      options: [
        { text: 'Um tipo de JOIN', isCorrect: false },
        { text: 'Uma query dentro de outra query', isCorrect: true },
        { text: 'Uma função de agregação', isCorrect: false },
        { text: 'Um alias para tabelas', isCorrect: false },
      ],
      explanation: 'Uma subquery é uma consulta dentro de outra. O banco executa a interna primeiro e usa o resultado na externa.',
    },
    initialCode: `-- Produtos com preço acima da média\nSELECT nome, preco\nFROM produtos\nWHERE preco > (SELECT ... FROM produtos)`,
    solution: `SELECT nome, preco FROM produtos WHERE preco > (SELECT AVG(preco) FROM produtos)`,
    hint: 'Dentro dos parênteses, calcule a média: SELECT AVG(preco) FROM produtos.',
  },
  {
    id: 'l-4-2',
    moduleId: 'mod-4',
    title: 'CTEs (WITH)',
    description: 'Use uma CTE para listar os departamentos com salário médio acima de 5000.',
    order: 2,
    content: `
# CTEs — Common Table Expressions

Uma CTE é como dar um **nome** a uma subquery, tornando a query principal muito mais legível.

### Sintaxe

\`\`\`sql
WITH nome_cte AS (
    SELECT ...
    FROM ...
)
SELECT * FROM nome_cte WHERE ...;
\`\`\`

### Subquery vs CTE

**Com subquery (difícil de ler):**
\`\`\`sql
SELECT * FROM (
  SELECT departamento, AVG(salario) AS media
  FROM funcionarios
  GROUP BY departamento
) sub WHERE sub.media > 5000;
\`\`\`

**Com CTE (limpo e legível):**
\`\`\`sql
WITH MediaPorDepto AS (
  SELECT departamento, AVG(salario) AS media
  FROM funcionarios
  GROUP BY departamento
)
SELECT * FROM MediaPorDepto WHERE media > 5000;
\`\`\`

### Múltiplas CTEs

Você pode encadear várias CTEs separadas por vírgula:

\`\`\`sql
WITH CTE1 AS (...),
     CTE2 AS (...)
SELECT ...
FROM CTE1
JOIN CTE2 ON ...;
\`\`\`

### Quando usar CTEs

- Queries longas e complexas que ficam difíceis de ler
- Quando você precisa reutilizar o mesmo "pedaço" de query
- Para tornar a lógica passo-a-passo mais clara
    `,
    quiz: {
      question: 'Qual a principal vantagem de uma CTE sobre uma subquery?',
      options: [
        { text: 'É mais rápida', isCorrect: false },
        { text: 'Torna a query mais legível, dando nome a partes complexas', isCorrect: true },
        { text: 'Retorna mais resultados', isCorrect: false },
        { text: 'Funciona com mais tabelas', isCorrect: false },
      ],
      explanation: 'CTEs são como dar um nome a uma subquery. A query fica mais organizada e fácil de entender.',
    },
    initialCode: `-- Departamentos com salário médio acima de 5000\nWITH MediaSalarios AS (\n    SELECT departamento, AVG(salario) AS media\n    FROM funcionarios\n    GROUP BY departamento\n)\nSELECT *\nFROM MediaSalarios\nWHERE ...`,
    solution: `WITH MediaSalarios AS (SELECT departamento, AVG(salario) AS media FROM funcionarios GROUP BY departamento) SELECT * FROM MediaSalarios WHERE media > 5000`,
    hint: 'Complete o WHERE com: media > 5000. A CTE já calculou a média por departamento.',
  },
  {
    id: 'l-4-3',
    moduleId: 'mod-4',
    title: 'CASE WHEN',
    description: 'Classifique os produtos em "Barato" (até 300), "Médio" (301-1000) ou "Caro" (acima de 1000).',
    order: 3,
    content: `
# Lógica Condicional com CASE WHEN

O **CASE WHEN** funciona como um "if/else" dentro do SQL. Permite criar colunas baseadas em condições.

### Sintaxe

\`\`\`sql
SELECT nome,
       CASE
         WHEN condicao1 THEN 'resultado1'
         WHEN condicao2 THEN 'resultado2'
         ELSE 'resultado_padrao'
       END AS nome_coluna
FROM tabela;
\`\`\`

### Exemplo: Classificar produtos

\`\`\`sql
SELECT nome, preco,
       CASE
         WHEN preco <= 300 THEN 'Barato'
         WHEN preco <= 1000 THEN 'Médio'
         ELSE 'Caro'
       END AS faixa_preco
FROM produtos;
\`\`\`

### CASE com agregações

\`\`\`sql
SELECT
  COUNT(CASE WHEN status = 'entregue' THEN 1 END) AS entregues,
  COUNT(CASE WHEN status = 'cancelado' THEN 1 END) AS cancelados,
  COUNT(CASE WHEN status = 'processando' THEN 1 END) AS processando
FROM pedidos;
\`\`\`

### Quando usar

- Criar categorias ou faixas
- Transformar códigos em textos legíveis
- Fazer contagens condicionais
    `,
    quiz: {
      question: 'O CASE WHEN no SQL é similar a qual estrutura de programação?',
      options: [
        { text: 'for/loop', isCorrect: false },
        { text: 'if/else', isCorrect: true },
        { text: 'try/catch', isCorrect: false },
        { text: 'import/export', isCorrect: false },
      ],
      explanation: 'CASE WHEN funciona como if/else: verifica condições em ordem e retorna o valor do primeiro THEN que for verdadeiro.',
    },
    initialCode: `-- Classifique os produtos por faixa de preço\nSELECT nome, preco,\n       CASE\n         WHEN preco <= 300 THEN 'Barato'\n         WHEN preco <= 1000 THEN 'Médio'\n         ELSE '...'\n       END AS faixa_preco\nFROM produtos`,
    solution: `SELECT nome, preco, CASE WHEN preco <= 300 THEN 'Barato' WHEN preco <= 1000 THEN 'Médio' ELSE 'Caro' END AS faixa_preco FROM produtos`,
    hint: "Substitua '...' por 'Caro'. Produtos acima de 1000 entram nessa faixa.",
  },
  {
    id: 'l-4-4',
    moduleId: 'mod-4',
    title: 'Subquery com IN',
    description: 'Liste os nomes dos clientes que compraram produtos da categoria "Eletrônicos".',
    order: 4,
    content: `
# Subqueries com IN — Filtrando com Listas Dinâmicas

Uma técnica poderosa é usar subqueries dentro do **IN** para filtrar baseado em dados de outras tabelas.

### O problema

"Quais clientes compraram produtos eletrônicos?"

Para responder, precisamos cruzar 4 tabelas: clientes → pedidos → itens_pedido → produtos.

### Abordagem com subquery encadeada

\`\`\`sql
SELECT nome FROM clientes
WHERE id IN (
  SELECT cliente_id FROM pedidos
  WHERE id IN (
    SELECT pedido_id FROM itens_pedido
    WHERE produto_id IN (
      SELECT id FROM produtos
      WHERE categoria = 'Eletrônicos'
    )
  )
);
\`\`\`

### Abordagem alternativa com JOINs

\`\`\`sql
SELECT DISTINCT c.nome
FROM clientes c
JOIN pedidos pe ON c.id = pe.cliente_id
JOIN itens_pedido ip ON pe.id = ip.pedido_id
JOIN produtos pr ON ip.produto_id = pr.id
WHERE pr.categoria = 'Eletrônicos';
\`\`\`

Ambas retornam o mesmo resultado. JOINs tendem a ser mais eficientes e legíveis, mas subqueries são mais intuitivas para iniciantes.
    `,
    quiz: {
      question: 'Qual palavra-chave garante que cada nome apareça apenas uma vez no resultado?',
      options: [
        { text: 'UNIQUE', isCorrect: false },
        { text: 'LIMIT 1', isCorrect: false },
        { text: 'DISTINCT', isCorrect: true },
        { text: 'GROUP BY', isCorrect: false },
      ],
      explanation: 'DISTINCT remove duplicatas do resultado. Sem ele, um cliente que comprou 3 produtos eletrônicos apareceria 3 vezes.',
    },
    initialCode: `-- Clientes que compraram produtos da categoria "Eletrônicos"\nSELECT DISTINCT c.nome\nFROM clientes c\nJOIN pedidos pe ON c.id = pe.cliente_id\nJOIN itens_pedido ip ON pe.id = ip.pedido_id\nJOIN produtos pr ON ip.produto_id = pr.id\nWHERE pr.categoria = '...'`,
    solution: `SELECT DISTINCT c.nome FROM clientes c JOIN pedidos pe ON c.id = pe.cliente_id JOIN itens_pedido ip ON pe.id = ip.pedido_id JOIN produtos pr ON ip.produto_id = pr.id WHERE pr.categoria = 'Eletrônicos'`,
    hint: "Substitua '...' por 'Eletrônicos' (com aspas simples).",
  },
];

// ─────────────────────────────────────────────
// MÓDULO 5 — Casos de Negócio
// ─────────────────────────────────────────────
const mod5Lessons: Lesson[] = [
  {
    id: 'l-5-1',
    moduleId: 'mod-5',
    title: 'Relatório de Faturamento',
    description: 'Calcule o faturamento total por categoria de produto.',
    order: 1,
    content: `
# Caso Real: Relatório de Faturamento por Categoria

A diretoria da TechRetail pediu um relatório: **qual categoria de produto gera mais receita?**

### O desafio

Precisamos:
1. Cruzar \`itens_pedido\` com \`produtos\` para saber a categoria de cada item vendido
2. Calcular o valor de cada item: \`quantidade * preco_unitario\`
3. Agrupar por categoria
4. Ordenar do maior para o menor faturamento

### Passo a passo

\`\`\`sql
SELECT pr.categoria,
       SUM(ip.quantidade * ip.preco_unitario) AS faturamento_total
FROM itens_pedido ip
JOIN produtos pr ON ip.produto_id = pr.id
GROUP BY pr.categoria
ORDER BY faturamento_total DESC;
\`\`\`

### Por que não usamos valor_total da tabela pedidos?

Porque \`pedidos.valor_total\` é o total do pedido inteiro. Se um pedido tem itens de categorias diferentes, não conseguimos separar por categoria usando essa coluna. Por isso usamos \`itens_pedido\` — ela tem o detalhe produto a produto.

### Cenário real

Esse tipo de relatório é pedido diariamente em empresas. Analistas de dados usam exatamente essa lógica para:
- Identificar categorias mais lucrativas
- Decidir onde investir em marketing
- Planejar estoque
    `,
    quiz: {
      question: 'Para calcular receita por item vendido, qual fórmula usar?',
      options: [
        { text: 'SUM(preco)', isCorrect: false },
        { text: 'quantidade * preco_unitario', isCorrect: true },
        { text: 'COUNT(*) * preco', isCorrect: false },
        { text: 'AVG(valor_total)', isCorrect: false },
      ],
      explanation: 'A receita de cada item é quantidade * preco_unitario. Somamos com SUM() e agrupamos por categoria.',
    },
    initialCode: `-- Faturamento total por categoria de produto\nSELECT pr.categoria,\n       SUM(ip.quantidade * ip.preco_unitario) AS faturamento_total\nFROM itens_pedido ip\nJOIN produtos pr ON ip.produto_id = pr.id\nGROUP BY ...\nORDER BY faturamento_total DESC`,
    solution: `SELECT pr.categoria, SUM(ip.quantidade * ip.preco_unitario) AS faturamento_total FROM itens_pedido ip JOIN produtos pr ON ip.produto_id = pr.id GROUP BY pr.categoria ORDER BY faturamento_total DESC`,
    hint: 'Complete com: GROUP BY pr.categoria. Isso agrupa o faturamento por categoria de produto.',
  },
  {
    id: 'l-5-2',
    moduleId: 'mod-5',
    title: 'Análise de Clientes VIP',
    description: 'Identifique os 5 clientes que mais gastaram, mostrando nome, total gasto e quantidade de pedidos.',
    order: 2,
    content: `
# Caso Real: Identificando Clientes VIP

O time de marketing quer identificar os **clientes mais valiosos** para criar um programa de fidelidade.

### O que precisamos

Para cada cliente:
- Nome
- Total gasto (soma dos valores dos pedidos)
- Quantidade de pedidos
- Ordenar pelo total gasto (maior primeiro)
- Limitar aos top 5

### Construindo a query

\`\`\`sql
SELECT c.nome,
       SUM(p.valor_total) AS total_gasto,
       COUNT(p.id) AS qtd_pedidos
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.nome
ORDER BY total_gasto DESC
LIMIT 5;
\`\`\`

### Análise

Esse tipo de consulta é a base de:
- **Segmentação de clientes** — dividir clientes em grupos (VIP, regular, esporádico)
- **Análise RFM** (Recência, Frequência, Monetário) — técnica clássica de marketing
- **Lifetime Value (LTV)** — estimar o valor de um cliente ao longo do tempo

> **No mundo real:** empresas como Amazon, iFood e Mercado Livre usam variações dessa query para personalizar ofertas e recompensas.
    `,
    quiz: {
      question: 'Para encontrar os "Top 5 clientes", qual combinação usar?',
      options: [
        { text: 'WHERE + LIMIT', isCorrect: false },
        { text: 'ORDER BY DESC + LIMIT', isCorrect: true },
        { text: 'GROUP BY + HAVING', isCorrect: false },
        { text: 'MAX() + TOP', isCorrect: false },
      ],
      explanation: 'ORDER BY total_gasto DESC coloca o maior primeiro, e LIMIT 5 pega apenas os 5 primeiros.',
    },
    initialCode: `-- Top 5 clientes que mais gastaram\nSELECT c.nome,\n       SUM(p.valor_total) AS total_gasto,\n       COUNT(p.id) AS qtd_pedidos\nFROM clientes c\nINNER JOIN pedidos p ON c.id = p.cliente_id\nGROUP BY c.nome\nORDER BY total_gasto DESC\nLIMIT ...`,
    solution: `SELECT c.nome, SUM(p.valor_total) AS total_gasto, COUNT(p.id) AS qtd_pedidos FROM clientes c INNER JOIN pedidos p ON c.id = p.cliente_id GROUP BY c.nome ORDER BY total_gasto DESC LIMIT 5`,
    hint: 'Substitua ... por 5. A query já está quase pronta!',
  },
  {
    id: 'l-5-3',
    moduleId: 'mod-5',
    title: 'Dashboard de Pedidos',
    description: 'Crie um resumo com a quantidade de pedidos por status (entregue, processando, cancelado).',
    order: 3,
    content: `
# Caso Real: Dashboard de Operações

O gerente de operações precisa de um **painel rápido** com o status dos pedidos. Quantos foram entregues? Quantos estão em processamento? Quantos foram cancelados?

### Query direta com GROUP BY

\`\`\`sql
SELECT status,
       COUNT(*) AS total_pedidos,
       SUM(valor_total) AS valor_total
FROM pedidos
GROUP BY status
ORDER BY total_pedidos DESC;
\`\`\`

### Por que isso importa?

Dashboards operacionais como esse são exibidos em telas de TV nos escritórios de empresas de e-commerce. Eles ajudam a:
- Monitorar o fluxo de pedidos em tempo real
- Identificar gargalos (muitos pedidos "processando")
- Medir taxa de cancelamento
- Reportar para a diretoria

### Expandindo o relatório

Com CASE WHEN, poderíamos criar colunas separadas:

\`\`\`sql
SELECT
  COUNT(*) AS total,
  COUNT(CASE WHEN status = 'entregue' THEN 1 END) AS entregues,
  COUNT(CASE WHEN status = 'processando' THEN 1 END) AS processando,
  COUNT(CASE WHEN status = 'cancelado' THEN 1 END) AS cancelados
FROM pedidos;
\`\`\`
    `,
    quiz: {
      question: 'Para criar um resumo de pedidos por status, qual coluna deve ir no GROUP BY?',
      options: [
        { text: 'valor_total', isCorrect: false },
        { text: 'data_pedido', isCorrect: false },
        { text: 'status', isCorrect: true },
        { text: 'cliente_id', isCorrect: false },
      ],
      explanation: 'Agrupamos por status para ver quantos pedidos estão em cada estado (entregue, processando, cancelado).',
    },
    initialCode: `-- Resumo de pedidos por status\nSELECT status,\n       COUNT(*) AS total_pedidos,\n       SUM(valor_total) AS valor_total\nFROM pedidos\nGROUP BY ...\nORDER BY total_pedidos DESC`,
    solution: `SELECT status, COUNT(*) AS total_pedidos, SUM(valor_total) AS valor_total FROM pedidos GROUP BY status ORDER BY total_pedidos DESC`,
    hint: 'Complete com: GROUP BY status.',
  },
  {
    id: 'l-5-4',
    moduleId: 'mod-5',
    title: 'Folha de Pagamento',
    description: 'Calcule o total da folha de pagamento por departamento, ordenado do maior para o menor.',
    order: 4,
    content: `
# Caso Real: Folha de Pagamento por Departamento

O departamento financeiro precisa saber **quanto cada departamento custa** em termos de salários.

### Informações necessárias

Para cada departamento:
- Nome do departamento
- Quantidade de funcionários
- Soma total dos salários
- Salário médio

### Exemplo

\`\`\`sql
SELECT departamento,
       COUNT(*) AS qtd_funcionarios,
       SUM(salario) AS folha_total,
       AVG(salario) AS salario_medio
FROM funcionarios
GROUP BY departamento
ORDER BY folha_total DESC;
\`\`\`

### Cenário real

Esse relatório é usado por:
- **RH** — para planejar orçamento de pessoal
- **Financeiro** — para projeções de custo
- **Diretoria** — para decidir sobre contratações e cortes

### Variação: custo anual

\`\`\`sql
SELECT departamento,
       SUM(salario) * 12 AS custo_anual
FROM funcionarios
GROUP BY departamento;
\`\`\`
    `,
    quiz: {
      question: 'Para ordenar departamentos pelo custo (maior primeiro), qual usar?',
      options: [
        { text: 'ORDER BY departamento', isCorrect: false },
        { text: 'ORDER BY folha_total DESC', isCorrect: true },
        { text: 'ORDER BY COUNT(*)', isCorrect: false },
        { text: 'HAVING folha_total > 0', isCorrect: false },
      ],
      explanation: 'ORDER BY folha_total DESC ordena pelo total de salários do maior para o menor.',
    },
    initialCode: `-- Folha de pagamento por departamento\nSELECT departamento,\n       COUNT(*) AS qtd_funcionarios,\n       SUM(salario) AS folha_total\nFROM funcionarios\nGROUP BY departamento\nORDER BY ... DESC`,
    solution: `SELECT departamento, COUNT(*) AS qtd_funcionarios, SUM(salario) AS folha_total FROM funcionarios GROUP BY departamento ORDER BY folha_total DESC`,
    hint: 'Substitua ... por folha_total. Isso ordena do departamento mais caro ao mais barato.',
  },
];

// ─────────────────────────────────────────────
// MÓDULO 6 — Window Functions
// ─────────────────────────────────────────────
const mod6Lessons: Lesson[] = [
  {
    id: 'l-6-1',
    moduleId: 'mod-6',
    title: 'ROW_NUMBER()',
    description: 'Classifique os produtos por preço (mais caro primeiro) usando ROW_NUMBER().',
    order: 1,
    content: `
# Funções de Janela (Window Functions)

Window Functions são um recurso **avançado e poderoso** do SQL. Elas fazem cálculos sobre um conjunto de linhas, mas **sem agrupar** os dados — cada linha mantém seu detalhe individual.

### A diferença

| GROUP BY | Window Function |
|----------|----------------|
| Agrupa linhas, retorna 1 por grupo | Mantém todas as linhas |
| Perde o detalhe individual | Mantém o detalhe + adiciona cálculo |

### ROW_NUMBER()

Atribui um número sequencial a cada linha dentro de uma "janela":

\`\`\`sql
SELECT nome, preco,
       ROW_NUMBER() OVER (ORDER BY preco DESC) AS ranking
FROM produtos;
\`\`\`

### A cláusula OVER

O \`OVER()\` define a "janela" — como as linhas devem ser ordenadas para o cálculo:

\`\`\`sql
ROW_NUMBER() OVER (ORDER BY coluna [ASC|DESC])
\`\`\`

### Com PARTITION BY

O \`PARTITION BY\` reinicia a numeração para cada grupo:

\`\`\`sql
SELECT nome, categoria, preco,
       ROW_NUMBER() OVER (
         PARTITION BY categoria
         ORDER BY preco DESC
       ) AS rank_na_categoria
FROM produtos;
\`\`\`

Isso dá um ranking separado por categoria: o mais caro de Eletrônicos é #1, o mais caro de Acessórios é #1, etc.
    `,
    quiz: {
      question: 'Qual a principal diferença entre GROUP BY e Window Functions?',
      options: [
        { text: 'Window Functions são mais lentas', isCorrect: false },
        { text: 'GROUP BY mantém todas as linhas', isCorrect: false },
        { text: 'Window Functions mantêm o detalhe de cada linha', isCorrect: true },
        { text: 'Não há diferença', isCorrect: false },
      ],
      explanation: 'GROUP BY colapsa linhas em grupos. Window Functions calculam sobre um grupo mas mantêm cada linha individual visível.',
    },
    initialCode: `-- Ranking de produtos por preço (mais caro primeiro)\nSELECT nome, preco,\n       ROW_NUMBER() OVER (ORDER BY ... ) AS ranking\nFROM produtos`,
    solution: `SELECT nome, preco, ROW_NUMBER() OVER (ORDER BY preco DESC) AS ranking FROM produtos`,
    hint: 'Complete o ORDER BY dentro do OVER(): preco DESC.',
  },
  {
    id: 'l-6-2',
    moduleId: 'mod-6',
    title: 'RANK() e DENSE_RANK()',
    description: 'Use DENSE_RANK para classificar os funcionários por salário (maior primeiro).',
    order: 2,
    content: `
# RANK() vs DENSE_RANK()

Ambas atribuem um ranking, mas tratam **empates** de forma diferente.

### A diferença

Imagine salários: 7800, 6800, 6500, 6500, 5500

| Função | Resultado |
|--------|-----------|
| **ROW_NUMBER()** | 1, 2, 3, 4, 5 (ignora empates) |
| **RANK()** | 1, 2, 3, 3, **5** (pula o 4) |
| **DENSE_RANK()** | 1, 2, 3, 3, **4** (não pula) |

### Exemplo

\`\`\`sql
SELECT nome, salario,
       RANK() OVER (ORDER BY salario DESC) AS rank_normal,
       DENSE_RANK() OVER (ORDER BY salario DESC) AS rank_denso
FROM funcionarios;
\`\`\`

### Quando usar cada um?

- **ROW_NUMBER()** — quando precisa de uma numeração única (sem empates)
- **RANK()** — rankings esportivos (se 2 ficam em 2o, o próximo é 4o)
- **DENSE_RANK()** — rankings sem buracos (se 2 ficam em 2o, o próximo é 3o)

### Exemplo prático: Top N por grupo

"Os 2 mais bem pagos de cada departamento":

\`\`\`sql
SELECT * FROM (
  SELECT nome, departamento, salario,
         ROW_NUMBER() OVER (
           PARTITION BY departamento
           ORDER BY salario DESC
         ) AS rank
  FROM funcionarios
) sub
WHERE rank <= 2;
\`\`\`
    `,
    quiz: {
      question: 'Se dois funcionários ganham R$6500, qual função dá o ranking 1, 2, 3, 3, 4 (sem pular)?',
      options: [
        { text: 'ROW_NUMBER()', isCorrect: false },
        { text: 'RANK()', isCorrect: false },
        { text: 'DENSE_RANK()', isCorrect: true },
        { text: 'COUNT()', isCorrect: false },
      ],
      explanation: 'DENSE_RANK() não pula posições em empates. RANK() pula (1,2,3,3,5). ROW_NUMBER() nunca empata (1,2,3,4,5).',
    },
    initialCode: `-- Ranking dos funcionários por salário com DENSE_RANK\nSELECT nome, salario,\n       DENSE_RANK() OVER (ORDER BY ... ) AS ranking\nFROM funcionarios`,
    solution: `SELECT nome, salario, DENSE_RANK() OVER (ORDER BY salario DESC) AS ranking FROM funcionarios`,
    hint: 'Complete o ORDER BY dentro do OVER(): salario DESC.',
  },
  {
    id: 'l-6-3',
    moduleId: 'mod-6',
    title: 'SUM() e AVG() como Window',
    description: 'Mostre cada pedido com uma coluna extra contendo o total acumulado (running total) dos valores.',
    order: 3,
    content: `
# Agregações como Window Functions

Funções como SUM, AVG, COUNT podem ser usadas como Window Functions! A diferença é que em vez de agrupar, elas calculam sobre uma "janela" de linhas.

### Total acumulado (Running Total)

\`\`\`sql
SELECT id, data_pedido, valor_total,
       SUM(valor_total) OVER (ORDER BY data_pedido) AS total_acumulado
FROM pedidos
WHERE status = 'entregue';
\`\`\`

Cada linha mostra o valor do pedido **e** a soma de todos os pedidos até aquela data.

### Média móvel

\`\`\`sql
SELECT id, data_pedido, valor_total,
       AVG(valor_total) OVER (ORDER BY data_pedido) AS media_movel
FROM pedidos;
\`\`\`

### Por que isso é importante?

- **Total acumulado** — essencial em relatórios financeiros (faturamento acumulado no mês)
- **Média móvel** — usado para suavizar variações e encontrar tendências
- **Contagem acumulada** — quantos pedidos foram feitos até determinada data

### Sem PARTITION BY vs Com PARTITION BY

\`\`\`sql
-- Total acumulado geral
SUM(valor_total) OVER (ORDER BY data_pedido)

-- Total acumulado por cliente
SUM(valor_total) OVER (PARTITION BY cliente_id ORDER BY data_pedido)
\`\`\`
    `,
    quiz: {
      question: 'O que um SUM() com OVER(ORDER BY data) produz?',
      options: [
        { text: 'A soma total de todos os valores', isCorrect: false },
        { text: 'A soma acumulada linha a linha (running total)', isCorrect: true },
        { text: 'A média acumulada', isCorrect: false },
        { text: 'O maior valor até a data', isCorrect: false },
      ],
      explanation: 'SUM() com OVER(ORDER BY) calcula um total acumulado: cada linha mostra a soma de todas as anteriores até ela.',
    },
    initialCode: `-- Pedidos entregues com total acumulado\nSELECT id, data_pedido, valor_total,\n       SUM(valor_total) OVER (ORDER BY ...) AS total_acumulado\nFROM pedidos\nWHERE status = 'entregue'`,
    solution: `SELECT id, data_pedido, valor_total, SUM(valor_total) OVER (ORDER BY data_pedido) AS total_acumulado FROM pedidos WHERE status = 'entregue'`,
    hint: 'Complete o ORDER BY dentro do OVER(): data_pedido. Isso ordena o acumulado por data.',
  },
];

// ─────────────────────────────────────────────
// EXPORTAÇÃO
// ─────────────────────────────────────────────
export const curriculum: Module[] = [
  {
    id: 'mod-1',
    title: 'Fundamentos de SQL',
    description: 'SELECT, WHERE, ORDER BY, LIMIT e outros comandos essenciais para começar.',
    level: 'Iniciante',
    order: 1,
    icon: 'database',
    lessons: mod1Lessons,
  },
  {
    id: 'mod-2',
    title: 'Funções de Agregação',
    description: 'COUNT, SUM, AVG, GROUP BY e HAVING — transforme dados em insights.',
    level: 'Iniciante',
    order: 2,
    icon: 'bar_chart',
    lessons: mod2Lessons,
  },
  {
    id: 'mod-3',
    title: 'JOINs — Cruzando Tabelas',
    description: 'Conecte dados de múltiplas tabelas e crie relatórios poderosos.',
    level: 'Intermediário',
    order: 3,
    icon: 'layers',
    lessons: mod3Lessons,
  },
  {
    id: 'mod-4',
    title: 'SQL Avançado',
    description: 'Subqueries, CTEs, CASE WHEN — técnicas que separam iniciantes de profissionais.',
    level: 'Avançado',
    order: 4,
    icon: 'zap',
    lessons: mod4Lessons,
  },
  {
    id: 'mod-5',
    title: 'Casos de Negócio',
    description: 'Aplique tudo que aprendeu em cenários reais de análise de dados empresarial.',
    level: 'Avançado',
    order: 5,
    icon: 'briefcase',
    lessons: mod5Lessons,
  },
  {
    id: 'mod-6',
    title: 'Window Functions',
    description: 'ROW_NUMBER, RANK, totais acumulados — o nível mais avançado de SQL.',
    level: 'Expert',
    order: 6,
    icon: 'trending_up',
    lessons: mod6Lessons,
  },
];
