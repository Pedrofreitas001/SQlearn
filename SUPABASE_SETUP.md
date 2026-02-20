# Configuração do Supabase

Este projeto está configurado para funcionar em dois modos:
1. **Modo Demonstração (Padrão):** Usa um banco de dados em memória (AlaSQL) e autenticação simulada.
2. **Modo Produção:** Usa Supabase para autenticação e banco de dados PostgreSQL.

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
