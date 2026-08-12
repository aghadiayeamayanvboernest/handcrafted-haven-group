-- Handcrafted Haven database schema (Supabase / Postgres)

create table if not exists public.sellers (
  id            text primary key,
  name          text not null,
  specialty     text,
  location      text,
  bio           text,
  avatar        text,
  created_at    timestamptz default now()
);

-- Links a storefront to the user account that owns it (their username).
alter table public.sellers add column if not exists owner_username text;

create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  username      text unique not null,
  name          text,
  password_hash text not null,
  created_at    timestamptz default now()
);

-- Profile fields collected at signup / editable in Settings.
alter table public.users add column if not exists location text;
alter table public.users add column if not exists bio text;

create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  price         numeric not null default 0,
  category      text not null,
  description   text,
  image         text,
  rating        numeric not null default 0,
  review_count  integer not null default 0,
  seller_id     text references public.sellers(id) on delete cascade,
  featured      boolean not null default false,
  created_at    timestamptz default now()
);

create table if not exists public.cart_items (
  id            uuid primary key default gen_random_uuid(),
  username      text not null,
  product_slug  text not null,
  quantity      integer not null default 1,
  created_at    timestamptz default now(),
  unique (username, product_slug)
);

create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  username      text not null,
  full_name     text,
  address       text,
  city          text,
  country       text,
  total         numeric not null default 0,
  created_at    timestamptz default now()
);

create table if not exists public.order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid references public.orders(id) on delete cascade,
  product_slug  text,
  name          text,
  price         numeric,
  quantity      integer not null default 1
);

create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  product_slug  text not null,
  username      text not null,
  rating        integer not null,
  comment       text,
  created_at    timestamptz default now(),
  unique (product_slug, username)
);

-- Public read; writes happen server-side with the service-role key.
alter table public.sellers  enable row level security;
alter table public.products enable row level security;

drop policy if exists "public read sellers" on public.sellers;
create policy "public read sellers" on public.sellers for select using (true);

drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products for select using (true);

-- Grants: our server code uses the service_role (bypasses RLS but still needs
-- table privileges); anon/authenticated get read-only for completeness.
grant usage on schema public to anon, authenticated, service_role;
grant all privileges on public.sellers  to service_role;
grant all privileges on public.products to service_role;
grant all privileges on public.users    to service_role;
grant all privileges on public.cart_items, public.orders, public.order_items, public.reviews to service_role;
grant select on public.sellers  to anon, authenticated;
grant select on public.products to anon, authenticated;

-- Server-only tables (accessed via the service_role, which bypasses RLS).
alter table public.users       enable row level security;
alter table public.cart_items  enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews     enable row level security;
