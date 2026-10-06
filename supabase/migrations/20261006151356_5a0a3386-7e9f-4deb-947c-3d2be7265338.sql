revoke execute on function public.make_first_user_admin() from public, anon, authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;