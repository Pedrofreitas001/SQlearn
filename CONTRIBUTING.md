# Contribuindo para SQLearn

Obrigado por seu interesse em contribuir! 🎉

## Como Contribuir

### 1. Reportando Bugs

Encontrou um bug? Abra uma [issue no GitHub](https://github.com/Pedrofreitas001/SQlearn/issues):

- **Título claro** — "Editor não salva código quando abre nova aba"
- **Descrição detalhada** — O que fez, o que esperava, o que aconteceu
- **Steps to reproduce** — Passo a passo exato
- **Seu ambiente** — Navegador, SO, Node version

### 2. Sugerindo Features

Quer uma nova feature? Abra uma [discussion](https://github.com/Pedrofreitas001/SQlearn/discussions):

- **Descrição clara** — O que quer adicionar?
- **Caso de uso** — Por que é importante?
- **Exemplos** — Como você imagina funcionando?

### 3. Enviando Code (Pull Request)

```bash
# 1. Faça fork do repositório
git clone https://github.com/SEU_USER/SQlearn.git
cd SQlearn

# 2. Crie uma branch para sua feature
git checkout -b feature/seu-nome-incrivel

# 3. Instale dependências
npm install

# 4. Faça suas mudanças
# ... edite arquivos ...

# 5. Verifique se tudo está ok
npm run lint
npm run build

# 6. Commit com mensagem clara
git commit -m "feat: descrição clara do que você fez"

# 7. Push e abra um PR
git push origin feature/seu-nome-incrivel
# Abra PR no GitHub (ele vai te oferecer o link)
```

## Padrões de Código

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (sem mudança de lógica)
- `refactor:` Refatoração de código
- `test:` Testes
- `perf:` Performance

Exemplos:
```bash
git commit -m "feat: add export to PDF for certificates"
git commit -m "fix: error when completing last lesson in module"
git commit -m "docs: update SUPABASE_SETUP.md with OAuth instructions"
```

### TypeScript

- Use tipos explícitos
- Evite `any`
- Componentes como `function`, não `const`

```tsx
// ✅ Bom
export function MyComponent({ items, onSelect }: MyComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  return <div>...</div>;
}

// ❌ Evitar
export const MyComponent = ({ items, onSelect }: any) => {
  let selected: any = null;
  return <div>...</div>;
};
```

### React

- Hooks ao invés de classes
- Context para estado global
- Componentes pequenos e testáveis

### CSS/Tailwind

- Use classes Tailwind
- Mobile-first (sm: antes de md:)
- Nomes semânticos para variáveis

```tsx
// ✅ Bom
<div className="p-4 md:p-6 rounded-lg bg-blue-50 dark:bg-blue-900/10">

// ❌ Evitar
<div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#f0f4ff' }}>
```

## Estrutura de Pastas

```
src/
├── components/    # Componentes reutilizáveis
├── contexts/      # React Context (Auth, Gamification, etc)
├── pages/         # Componentes de página/rota
├── data/          # Dados estáticos (curriculum)
├── lib/           # Funções utilitárias
└── App.tsx        # Roteamento principal
```

## Adicionando uma Nova Lição

1. Abra `src/data/curriculum.ts`
2. Encontre o módulo relevante (ex: `mod2Lessons`)
3. Adicione à array:

```typescript
{
  id: 'l-2-5',
  moduleId: 'mod-2',
  title: 'COUNT(DISTINCT coluna)',
  description: 'Conte valores únicos em uma coluna.',
  order: 5,
  content: `# Explicação com markdown...`,
  initialCode: `-- Template da lição`,
  solution: `SELECT DISTINCT(...) COUNT(...)`,
  hint: 'Combine DISTINCT com COUNT',
}
```

4. Teste localmente: `npm run dev` e navegue até a lição
5. Commit: `git commit -m "feat: add lesson on COUNT DISTINCT"`

## Traduzindo para Outro Idioma

Queremos SQLearn em mais idiomas! Se falar outro idioma:

1. Crie um arquivo `src/data/curriculum.pt-BR.ts` (exemplo)
2. Traduza todo o conteúdo
3. Adicione seletor de idioma no Layout
4. Abra um PR com `i18n: add portuguese (br) translation`

## Reportando Vulnerabilidades de Segurança

⚠️ **Não abra issue pública!**

Envie email para: `[seu email]` com:
- Descrição da vulnerabilidade
- Como explorar
- Impacto potencial
- Solução sugerida

## Code Review

Esperamos ser respeitosos em reviews. Quando receber feedback:

- ✅ Agradeça a sugestão
- ✅ Faça as mudanças solicitadas
- ✅ Pergunte se tem dúvidas
- ✅ Re-request review quando pronto

## Licença

Ao contribuir, você concorda que seu código será licenciado sob MIT.

## Obrigado! 🙏

Toda contribuição, por menor que seja, nos ajuda a tornar SQLearn melhor para todos.

---

Dúvidas? Abra uma [discussion](https://github.com/Pedrofreitas001/SQlearn/discussions) ou mande um email.

**Happy coding!** 💻✨
