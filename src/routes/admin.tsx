import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Magnus Motors" },
      { name: "description", content: "Magnus Motors stock management." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — Magnus Motors" },
      { property: "og:description", content: "Magnus Motors stock management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

type Car = Tables<"cars">;
const input = "w-full rounded-md border-2 border-input bg-card px-3 py-2 focus:border-navy focus:outline-none";
const btn = "rounded-md bg-primary px-5 py-2.5 font-bold uppercase text-primary-foreground shadow-bold disabled:opacity-50";

function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async (u: User | null) => {
      setUser(u);
      if (u) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin");
        setIsAdmin(!!data?.length);
      } else setIsAdmin(null);
      setReady(true);
    };
    supabase.auth.getUser().then(({ data }) => check(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((e, s) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT") check(s?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <p className="p-10 text-center">Loading…</p>;
  if (!user) return <Login />;
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-5xl text-navy">Manage cars</h1>
        <button onClick={() => supabase.auth.signOut()} className="font-bold uppercase text-secondary">Sign out</button>
      </div>
      {isAdmin ? <Dashboard /> : (
        <p className="mt-6 rounded-md bg-muted p-4">This account is not the admin. Only the first account created can manage cars.</p>
      )}
    </section>
  );
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password"));
    setBusy(true); setMsg("");
    const { data, error } = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    setBusy(false);
    if (error) setMsg(error.message);
    else if (mode === "up" && !data.session) setMsg("Check your email and click the confirmation link, then sign in here.");
  }
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-5xl text-navy">{mode === "in" ? "Admin sign in" : "Create admin account"}</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input name="email" type="email" required placeholder="Email" className={input} autoComplete="email" />
        <input name="password" type="password" required minLength={8} placeholder="Password (8+ characters)" className={input}
          autoComplete={mode === "in" ? "current-password" : "new-password"} />
        <button disabled={busy} className={btn}>{mode === "in" ? "Sign in" : "Create account"}</button>
      </form>
      {msg && <p className="mt-4 rounded-md bg-muted p-3 text-sm">{msg}</p>}
      <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(""); }} className="mt-6 text-sm font-semibold text-secondary">
        {mode === "in" ? "First time? Create the admin account" : "Already have an account? Sign in"}
      </button>
    </section>
  );
}

function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const load = () => supabase.from("cars").select("*").order("created_at", { ascending: false }).then(({ data }) => setCars(data ?? []));
  useEffect(() => { load(); }, []);

  async function toggleSold(c: Car) { await supabase.from("cars").update({ sold: !c.sold }).eq("id", c.id); load(); }
  async function remove(c: Car) {
    if (!confirm(`Delete ${c.title}?`)) return;
    await supabase.from("cars").delete().eq("id", c.id); load();
  }

  return (
    <>
      <AddCar onAdded={load} />
      <h2 className="mt-12 text-3xl text-navy">Cars you've added ({cars.length})</h2>
      <p className="text-sm text-muted-foreground">The four original cars stay on the site; ask in chat to change those.</p>
      <div className="mt-4 space-y-3">
        {cars.map((c) => (
          <div key={c.id} className="flex items-center gap-4 rounded-lg border-2 border-navy bg-card p-3">
            {c.images[0] && <img src={c.images[0]} alt="" className="h-16 w-24 rounded object-cover" />}
            <div className="flex-1">
              <p className="font-bold">{c.title} {c.sold && <span className="ml-2 rounded bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">SOLD</span>}</p>
              <p className="text-secondary">{c.price}</p>
            </div>
            <button onClick={() => toggleSold(c)} className="text-sm font-bold uppercase text-navy">{c.sold ? "Mark available" : "Mark sold"}</button>
            <button onClick={() => remove(c)} className="text-sm font-bold uppercase text-destructive">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

function AddCar({ onAdded }: { onAdded: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const files = (f.getAll("photos") as File[]).filter((x) => x.size > 0);
    setBusy(true); setMsg("Uploading photos…");
    const images: string[] = [];
    for (const file of files) {
      const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const up = await supabase.storage.from("car-photos").upload(path, file);
      if (up.error) { setBusy(false); setMsg(up.error.message); return; }
      const signed = await supabase.storage.from("car-photos").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (signed.data) images.push(signed.data.signedUrl);
    }
    const s = (k: string) => String(f.get(k) ?? "").trim();
    const { error } = await supabase.from("cars").insert({
      title: s("title"), price: s("price"), year: s("year"), transmission: s("transmission"), fuel: s("fuel"),
      condition: s("condition"), summary: s("summary"),
      features: s("features").split(",").map((x) => x.trim()).filter(Boolean), images,
    });
    setBusy(false);
    if (error) setMsg(error.message);
    else { setMsg("Car added — it's now on the Vehicles page."); form.reset(); onAdded(); }
  }
  return (
    <form onSubmit={submit} className="mt-8 grid gap-4 rounded-lg border-2 border-navy bg-card p-6 shadow-bold sm:grid-cols-2">
      <h2 className="text-3xl text-navy sm:col-span-2">Add a car</h2>
      <input name="title" required placeholder="Car name, e.g. 2018 Toyota Hilux" className={input} />
      <input name="price" required placeholder="Price, e.g. US$25,000" className={input} />
      <input name="year" placeholder="Year" className={input} />
      <input name="transmission" defaultValue="Automatic" placeholder="Transmission" className={input} />
      <input name="fuel" defaultValue="Petrol" placeholder="Fuel" className={input} />
      <input name="condition" placeholder="Condition, e.g. Duty paid" className={input} />
      <textarea name="summary" placeholder="Short description" rows={2} className={`${input} sm:col-span-2`} />
      <input name="features" placeholder="Features, separated by commas" className={`${input} sm:col-span-2`} />
      <label className="sm:col-span-2 text-sm font-semibold">Photos (first photo is the main one)
        <input name="photos" type="file" accept="image/*" multiple className="mt-1 block" />
      </label>
      <div className="sm:col-span-2 flex items-center gap-4">
        <button disabled={busy} className={btn}>{busy ? "Saving…" : "Add car"}</button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>
    </form>
  );
}
