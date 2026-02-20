# Deploy na Vercel

## Instruções de Deploy

### Opção 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Siga as instruções no terminal. O Vercel detectará automaticamente que é um projeto Vite.

### Opção 2: Deploy via GitHub

1. Push seu código para GitHub
2. Vá para [https://vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Selecione seu repositório
5. Vercel detectará Vite automaticamente
6. Clique em "Deploy"

## Variáveis de Ambiente (Opcional)

Se você quiser usar Supabase em produção:

1. Vá para as configurações do projeto no Vercel
2. Adicione as seguintes variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`: sua URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: sua chave pública do Supabase

> **Nota**: O app funciona perfeitamente sem essas variáveis, usando um banco de dados em memória (demo mode). Para dados persistentes, configure o Supabase.

## Build Local para Teste

```bash
npm run build
npm run preview
```

Isso serve o app em `http://localhost:4173`

## Domínio Personalizado

Após o deploy:
1. Vá para as configurações do projeto no Vercel
2. Clique em "Domains"
3. Adicione seu domínio personalizado

## Health Check

O app está pronto para produção quando:
- ✅ Todas as páginas carregam sem erro
- ✅ Editor SQL funciona
- ✅ Todas as lições são completáveis
- ✅ Gamificação funciona (XP, níveis, conquistas)
- ✅ Dados persistem no localStorage

## Troubleshooting

### App em branco após deploy
- Verifique se o `outputDirectory` em `vercel.json` está como `dist`
- Certifique-se de que `npm run build` roda sem erros localmente

### Rotas retornam 404
- O `vercel.json` já tem redirecionamento para `index.html`
- Se ainda tiver problemas, delete `vercel.json` e deixe o Vercel auto-detectar

### localStorage não funciona
- localStorage funciona em todos os navegadores modernos
- Dados são salvos por domínio
- Limpar cookies/cache pode fazer você "perder" dados (eles continuam lá mas o localStorage pode estar vazio)
