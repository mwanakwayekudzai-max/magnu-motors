create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users see own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.make_first_user_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.make_first_user_admin();

create table public.cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price text not null,
  year text not null default '',
  transmission text not null default 'Automatic',
  fuel text not null default 'Petrol',
  condition text not null default '',
  summary text not null default '',
  features text[] not null default '{}',
  images text[] not null default '{}',
  sold boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.cars to anon, authenticated;
grant insert, update, delete on public.cars to authenticated;
grant all on public.cars to service_role;
alter table public.cars enable row level security;
create policy "Anyone can view cars" on public.cars for select to anon, authenticated using (true);
create policy "Admins insert cars" on public.cars for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update cars" on public.cars for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete cars" on public.cars for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins read car photos" on storage.objects for select to authenticated using (bucket_id = 'car-photos' and public.has_role(auth.uid(), 'admin'));
create policy "Admins upload car photos" on storage.objects for insert to authenticated with check (bucket_id = 'car-photos' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete car photos" on storage.objects for delete to authenticated using (bucket_id = 'car-photos' and public.has_role(auth.uid(), 'admin'));