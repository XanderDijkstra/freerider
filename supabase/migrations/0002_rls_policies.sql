-- ============================================================================
-- FreeRider.no - RLS policies (0002)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- profiles
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles_read_public" on public.profiles;
create policy "profiles_read_public"
  on public.profiles for select
  using (true);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "profiles_admin_write" on public.profiles;
create policy "profiles_admin_write"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- companies
-- ----------------------------------------------------------------------------
alter table public.companies enable row level security;

drop policy if exists "companies_read_public" on public.companies;
create policy "companies_read_public"
  on public.companies for select
  using (true);

drop policy if exists "companies_member_update" on public.companies;
create policy "companies_member_update"
  on public.companies for update
  using (public.is_company_member(id) or public.is_admin())
  with check (public.is_company_member(id) or public.is_admin());

drop policy if exists "companies_admin_write" on public.companies;
create policy "companies_admin_write"
  on public.companies for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- company_members
-- ----------------------------------------------------------------------------
alter table public.company_members enable row level security;

drop policy if exists "company_members_read_self_or_admin" on public.company_members;
create policy "company_members_read_self_or_admin"
  on public.company_members for select
  using (profile_id = auth.uid() or public.is_admin());

drop policy if exists "company_members_admin_write" on public.company_members;
create policy "company_members_admin_write"
  on public.company_members for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- vehicles
-- ----------------------------------------------------------------------------
alter table public.vehicles enable row level security;

drop policy if exists "vehicles_read_public" on public.vehicles;
create policy "vehicles_read_public"
  on public.vehicles for select
  using (true);

drop policy if exists "vehicles_member_write" on public.vehicles;
create policy "vehicles_member_write"
  on public.vehicles for all
  using (public.is_company_member(company_id) or public.is_admin())
  with check (public.is_company_member(company_id) or public.is_admin());

-- ----------------------------------------------------------------------------
-- listings: public read when published; member write
-- ----------------------------------------------------------------------------
alter table public.listings enable row level security;

drop policy if exists "listings_read_published" on public.listings;
create policy "listings_read_published"
  on public.listings for select
  using (status = 'published' or public.is_company_member(company_id) or public.is_admin());

drop policy if exists "listings_member_write" on public.listings;
create policy "listings_member_write"
  on public.listings for all
  using (public.is_company_member(company_id) or public.is_admin())
  with check (public.is_company_member(company_id) or public.is_admin());

-- ----------------------------------------------------------------------------
-- requests:
--   - drivers: insert their own, read their own
--   - company members: read+update for requests on their listings
--   - admin: full access
-- ----------------------------------------------------------------------------
alter table public.requests enable row level security;

drop policy if exists "requests_driver_read" on public.requests;
create policy "requests_driver_read"
  on public.requests for select
  using (
    driver_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.listings l
      where l.id = listing_id and public.is_company_member(l.company_id)
    )
  );

drop policy if exists "requests_driver_insert" on public.requests;
create policy "requests_driver_insert"
  on public.requests for insert
  with check (
    driver_id = auth.uid() and public.is_driver()
  );

drop policy if exists "requests_member_update" on public.requests;
create policy "requests_member_update"
  on public.requests for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.listings l
      where l.id = listing_id and public.is_company_member(l.company_id)
    )
    or driver_id = auth.uid()
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.listings l
      where l.id = listing_id and public.is_company_member(l.company_id)
    )
    or driver_id = auth.uid()
  );

-- ----------------------------------------------------------------------------
-- follows / favorite_locations / notification_prefs: owner-only
-- ----------------------------------------------------------------------------
alter table public.follows enable row level security;

drop policy if exists "follows_owner_all" on public.follows;
create policy "follows_owner_all"
  on public.follows for all
  using (driver_id = auth.uid())
  with check (driver_id = auth.uid());

alter table public.favorite_locations enable row level security;

drop policy if exists "favs_owner_all" on public.favorite_locations;
create policy "favs_owner_all"
  on public.favorite_locations for all
  using (driver_id = auth.uid())
  with check (driver_id = auth.uid());

alter table public.notification_prefs enable row level security;

drop policy if exists "prefs_owner_all" on public.notification_prefs;
create policy "prefs_owner_all"
  on public.notification_prefs for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
