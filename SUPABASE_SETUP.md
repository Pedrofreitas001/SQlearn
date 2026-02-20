# Configuração do Supabase

## ⚠️ Importante

Este projeto **funciona perfeitamente sem Supabase**. O banco de dados padrão é em memória (AlaSQL) e totalmente funcional para fins de aprendizado. Supabase é opcional e recomendado apenas para:

- ✅ Dados persistentes entre sessões
- ✅ Múltiplos usuários
- ✅ Autenticação OAuth (GitHub)
- ✅ Produção com escala

## Modos de Operação

1. **Modo Demonstração (Padrão)** ⭐
   - Banco de dados: AlaSQL em memória
   - Autenticação: Simulada (sem login OAuth)
   - Dados: Salvos no localStorage do navegador
   - Ideal para: Aprendizado local, testes, desenvolvimento

2. **Modo Supabase (Opcional)**
   - Banco de dados: PostgreSQL na nuvem
   - Autenticação: OAuth com GitHub
   - Dados: Persistentes no servidor
   - Ideal para: Multi-usuário, produção

## Para ativar o Supabase:

1. Crie um projeto no [Supabase](https://supabase.com).

2. Execute o seguinte SQL no Editor SQL do Supabase para criar as tabelas:

```sql
-- Tabela de Perfis (vinculada ao Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  avatar_url text,
  xp integer default 0,
  level integer default 1,
  completed_lessons text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Trigger para criar perfil automaticamente
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Tabelas do Curso (TechRetail)
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  cidade TEXT NOT NULL,
  data_cadastro DATE NOT NULL
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  data_pedido DATE NOT NULL,
  valor_total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE itens_pedido (
  pedido_id INTEGER REFERENCES pedidos(id),
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER NOT NULL,
  preco_unitario DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (pedido_id, produto_id)
);

CREATE TABLE funcionarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  departamento TEXT NOT NULL,
  salario DECIMAL(10, 2) NOT NULL,
  data_contratacao DATE NOT NULL
);

-- Inserir dados de exemplo (copiar do arquivo src/lib/db.ts mas adaptar para SQL padrão)
```

3. Obtenha suas credenciais (URL e Anon Key) nas configurações do projeto.

4. Crie um arquivo `.env.local` na raiz do projeto com as variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

5. Reinicie o servidor de desenvolvimento. O aplicativo detectará automaticamente as variáveis e mudará para o modo Supabase.

## Variáveis de Ambiente

```env
# .env.local ou .env.production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Obtenha estas variáveis em:
- **VITE_SUPABASE_URL**: Configurações do Projeto → API → URL
- **VITE_SUPABASE_ANON_KEY**: Configurações do Projeto → API → anon (public) key

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Variáveis não estão sendo lidas
1. Adicione `VITE_` antes do nome da variável (.env)
2. Reinicie o servidor (`npm run dev`)
3. Verifique em `console.log(import.meta.env.VITE_SUPABASE_URL)`

### OAuth GitHub não funciona
1. Vá para Settings → Authentication no Supabase
2. Habilite GitHub Provider
3. Copie a URL de callback
4. Configure em GitHub Settings → Developer settings → OAuth Apps

## Próximas Passos

1. Deploy na Vercel (veja [DEPLOY.md](DEPLOY.md))
2. Configure domínio personalizado
3. Monitore usage no Supabase Dashboard
