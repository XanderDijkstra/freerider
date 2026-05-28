-- ============================================================================
-- FreeRider.no - initial schema (0001)
-- Mirrors the type definitions in src/data/types.ts
-- Apply via Supabase SQL editor OR `supabase db push` after `supabase link`.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- profiles: extends auth.users with role-specific metadata
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'company', 'driver')),
  name text not null,
  email text not null,
  phone text,
  license_number text,
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

-- ----------------------------------------------------------------------------
-- companies
-- ----------------------------------------------------------------------------
create table if not exists public.companies (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text,
  logo_color text,
  fleet_size integer default 0,
  locations text[] default '{}',
  total_relocations integer default 0,
  established integer,
  contact_email text,
  contact_phone text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'suspended')),
  created_at timestamptz not null default now()
);

create index if not exists companies_status_idx on public.companies (status);

-- ----------------------------------------------------------------------------
-- company_members: links a profile (role=company) to a company
-- ----------------------------------------------------------------------------
create table if not exists public.company_members (
  company_id text not null references public.companies(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (company_id, profile_id)
);

create index if not exists company_members_profile_idx on public.company_members (profile_id);

-- ----------------------------------------------------------------------------
-- vehicles
-- ----------------------------------------------------------------------------
create table if not exists public.vehicles (
  id text primary key,
  company_id text not null references public.companies(id) on delete cascade,
  plate text not null,
  make text not null,
  model text not null,
  year integer not null,
  type text not null check (type in ('sedan', 'suv', 'van', 'wagon', 'compact')),
  fuel_type text not null check (fuel_type in ('petrol', 'diesel', 'hybrid', 'electric')),
  transmission text not null check (transmission in ('manual', 'automatic')),
  seats integer not null default 5,
  luggage integer default 0,
  features text[] default '{}',
  ev_range_km integer,
  photos text[] default '{}',
  status text not null default 'available' check (status in ('available', 'in-listing', 'maintenance', 'retired')),
  created_at timestamptz not null default now()
);

create index if not exists vehicles_company_idx on public.vehicles (company_id);
create index if not exists vehicles_status_idx on public.vehicles (status);

-- ----------------------------------------------------------------------------
-- listings
-- ----------------------------------------------------------------------------
create table if not exists public.listings (
  id text primary key,
  vehicle_id text not null references public.vehicles(id) on delete cascade,
  company_id text not null references public.companies(id) on delete cascade,
  from_city text not null,
  from_address text,
  to_city text not null,
  to_address text,
  distance_km integer not null,
  max_km integer not null,
  pickup_start timestamptz not null,
  pickup_end timestamptz not null,
  dropoff_deadline timestamptz not null,
  rules jsonb not null default '{}'::jsonb,
  compensation jsonb not null default '{"kind":"free"}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed', 'completed', 'expired')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists listings_status_idx on public.listings (status);
create index if not exists listings_from_idx on public.listings (from_city);
create index if not exists listings_to_idx on public.listings (to_city);
create index if not exists listings_company_idx on public.listings (company_id);

-- ----------------------------------------------------------------------------
-- requests: driver applications to listings
-- ----------------------------------------------------------------------------
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references public.listings(id) on delete cascade,
  driver_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  message text default '',
  preferred_pickup_at timestamptz not null,
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  unique (listing_id, driver_id)
);

create index if not exists requests_driver_idx on public.requests (driver_id);
create index if not exists requests_listing_idx on public.requests (listing_id);
create index if not exists requests_status_idx on public.requests (status);

-- ----------------------------------------------------------------------------
-- follows: drivers following companies
-- ----------------------------------------------------------------------------
create table if not exists public.follows (
  driver_id uuid not null references public.profiles(id) on delete cascade,
  company_id text not null references public.companies(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (driver_id, company_id)
);

-- ----------------------------------------------------------------------------
-- favorite_locations
-- ----------------------------------------------------------------------------
create table if not exists public.favorite_locations (
  driver_id uuid not null references public.profiles(id) on delete cascade,
  city text not null,
  created_at timestamptz not null default now(),
  primary key (driver_id, city)
);

-- ----------------------------------------------------------------------------
-- notification_prefs
-- ----------------------------------------------------------------------------
create table if not exists public.notification_prefs (
  user_id uuid not null references public.profiles(id) on delete cascade,
  pref_key text not null,
  email boolean not null default true,
  sms boolean not null default false,
  primary key (user_id, pref_key)
);

-- ----------------------------------------------------------------------------
-- helpers: role checks for RLS
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
  returns boolean
  language sql
  security definer
  stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_company_member(_company_id text)
  returns boolean
  language sql
  security definer
  stable
as $$
  select exists (
    select 1 from public.company_members
    where company_id = _company_id and profile_id = auth.uid()
  );
$$;

create or replace function public.is_driver()
  returns boolean
  language sql
  security definer
  stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'driver'
  );
$$;

-- ----------------------------------------------------------------------------
-- auto-create profile row when a new auth user signs up
-- (role defaults to driver; admin/company are set manually)
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer
as $$
begin
  insert into public.profiles (id, role, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'driver'),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------------------------------
-- auto-reject competing pending requests when one is approved
-- ----------------------------------------------------------------------------
create or replace function public.auto_reject_competitors()
  returns trigger
  language plpgsql
as $$
begin
  if new.status = 'approved' and (old is null or old.status <> 'approved') then
    update public.requests
       set status = 'rejected', decided_at = now()
     where listing_id = new.listing_id
       and id <> new.id
       and status = 'pending';
  end if;
  return new;
end;
$$;

drop trigger if exists requests_auto_reject on public.requests;
create trigger requests_auto_reject
  after update on public.requests
  for each row execute procedure public.auto_reject_competitors();
