<div align="center">
  <h1>SQLearn 🎓</h1>
  <p><strong>Plataforma gamificada para aprender SQL na prática</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#começar-agora">Começar Agora</a> •
    <a href="#estrutura">Estrutura</a> •
    <a href="#deploy">Deploy</a>
  </p>
</div>

---

## ✨ Features

- **📚 30+ Lições Interativas** — Desde fundamentos até Window Functions
- **✅ 6 Módulos Progressivos** — Fundamentos → Agregação → JOINs → Avançado → Negócio → Window
- **🎮 Sistema de Gamificação** — XP, 10 níveis, 12 conquistas desbloqueáveis
- **🔥 Streak Tracking** — Acompanhe seus dias consecutivos de estudo
- **💡 Editor SQL Interativo** — Com Monaco Editor, syntax highlighting e feedback automático
- **📊 Banco de Dados Realista** — 25 clientes, 18 produtos, 35 pedidos de uma empresa fictícia (TechRetail)
- **📱 Totalmente Responsivo** — Funciona perfeitamente em desktop, tablet e mobile
- **🌙 Tema Escuro/Claro** — Proteja seus olhos
- **🇧🇷 100% em Português** — Conteúdo, interface e feedback

## 🚀 Começar Agora

### Localmente

**Requisitos:** Node.js 18+

```bash
# 1. Clone o repositório
git clone https://github.com/Pedrofreitas001/SQlearn.git
cd SQlearn

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O app abrirá em `http://localhost:3000`

### Online (Vercel)

Clique no botão abaixo ou vá para [vercel.com](https://vercel.com) e importe este repositório:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPedrofreitas001%2FSQlearn)

## 📚 Roadmap do Aprendizado

### Módulo 1: Fundamentos (9 lições)
- SELECT e FROM
- WHERE com operadores
- AND/OR
- ORDER BY
- LIMIT
- DISTINCT
- LIKE
- IN e BETWEEN
- AS (Alias)

### Módulo 2: Funções de Agregação (4 lições)
- COUNT, SUM, AVG
- GROUP BY
- HAVING
- Agregações Avançadas

### Módulo 3: JOINs (4 lições)
- INNER JOIN
- LEFT JOIN
- JOIN com múltiplas tabelas
- JOIN + GROUP BY

### Módulo 4: SQL Avançado (4 lições)
- Subqueries
- CTEs (WITH)
- CASE WHEN
- Subquery com IN

### Módulo 5: Casos de Negócio (4 lições)
- Relatório de Faturamento
- Análise de Clientes VIP
- Dashboard de Pedidos
- Folha de Pagamento

### Módulo 6: Window Functions (3 lições)
- ROW_NUMBER()
- RANK() e DENSE_RANK()
- SUM() e AVG() como Window

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Layout.tsx      # Sidebar + estrutura
│   ├── SqlEditor.tsx   # Editor SQL com Monaco
│   ├── ResultTable.tsx # Exibição de resultados
│   ├── SchemaPanel.tsx # Referência de schema
│   └── ModuleCard.tsx  # Cards dos módulos
├── contexts/           # React Context
│   ├── AuthContext.tsx
│   ├── GamificationContext.tsx
│   └── ThemeContext.tsx
├── pages/              # Páginas/rotas
│   ├── Dashboard.tsx
│   ├── Lesson.tsx
│   ├── Login.tsx
│   ├── Leaderboard.tsx
│   └── Settings.tsx
├── data/
│   └── curriculum.ts   # Conteúdo de todas as lições
├── lib/
│   ├── db.ts          # AlaSQL em-memória (banco demo)
│   └── supabase.ts    # Cliente Supabase (opcional)
└── App.tsx            # Roteamento
```

## 🎯 Banco de Dados (Demo)

O app inclui um banco de dados em memória (AlaSQL) com dados sintéticos realistas:

### Tabelas
- **clientes** — 25 clientes de diferentes cidades brasileiras
- **produtos** — 18 produtos em 5 categorias
- **pedidos** — 35 pedidos em 3 status
- **itens_pedido** — 55 itens de pedidos
- **funcionarios** — 12 funcionários em 6 departamentos

**Nota:** Para dados persistentes, configure o Supabase. Veja [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

## 🎮 Sistema de Gamificação

### XP e Níveis
- Ganhe 50 XP ao completar uma lição
- Níveis aumentam exponencialmente
- 10 títulos desbloqueáveis (Aprendiz SQL → Lenda dos Bancos)

### Conquistas (12 total)
- Primeira query
- Módulos completos (6 total)
- Metade do caminho
- Todos os módulos (Graduado)
- 10 lições
- 3 dias seguidos
- 7 dias seguidos (Semana On Fire)

### Streak
- Rastreie seus dias consecutivos de estudo
- Desbloqueie conquistas especiais

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS v4
- **Editor SQL:** Monaco Editor
- **Database (Demo):** AlaSQL (em memória)
- **Database (Produção):** Supabase (PostgreSQL)
- **Auth:** Supabase Auth ou Demo
- **Routing:** React Router v7
- **Icons:** Lucide React

## 📋 Roadmap Futuro

- [ ] Exportar/compartilhar soluções
- [ ] Multiplayer (competições)
- [ ] Certificates (PDF)
- [ ] API para desenvolvedores
- [ ] Mobile app (React Native)
- [ ] Mais idiomas
- [ ] AI tutor (Claude/ChatGPT)

## 📝 Deploy

Para fazer deploy na Vercel, GitHub Pages ou outro:

Veja [DEPLOY.md](DEPLOY.md) para instruções completas.

Quick start:
```bash
npm run build
# Arquivos prontos em dist/
```

## 🤝 Contribuindo

Contribuições são bem-vindas!

```bash
# Fork, clone e crie uma branch
git checkout -b feature/sua-feature
# Faça suas mudanças
git commit -m "feat: descrição"
git push origin feature/sua-feature
# Abra um Pull Request
```

## 📄 Licença

MIT — Sinta-se livre para usar, modificar e distribuir.

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar devs a dominarem SQL.

---

<div align="center">
  <strong>Comece a aprender SQL agora! 🚀</strong>
  <p>Sem registros necessários. Sem credit card. Apenas código.</p>
</div>
