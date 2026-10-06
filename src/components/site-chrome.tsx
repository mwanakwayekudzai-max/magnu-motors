import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle, Mail, MapPin, CarFront, Instagram, Facebook } from "lucide-react";
import { company, whatsappLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/sell", label: "Sell your car" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
        <CarFront className="h-5 w-5" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-2xl text-navy-foreground">MAGNUS MOTORS</span>
        <span className="block text-[10px] font-semibold uppercase text-ice">Affiliate</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-navy-deep text-navy-foreground">
      <div className="hidden bg-secondary text-secondary-foreground text-sm md:block">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-1.5 font-semibold">
          <span>Vehicles sourced locally and worldwide</span>
          <span>Call {company.phones[0]} • WhatsApp {company.phones[1]}</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-sm font-semibold uppercase tracking-wider text-navy-foreground/80 hover:text-primary"
              activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={whatsappLink()} target="_blank" rel="noreferrer"
          className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase text-primary-foreground hover:brightness-95 lg:inline-flex">
          <MessageCircle className="h-4 w-4" /> Enquire now
        </a>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-navy-foreground/10 px-6 pb-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="block py-2 font-semibold uppercase tracking-wider">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="stripe-hazard h-2" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-navy-foreground/70">Quality vehicles, expert sourcing and import assistance from around the world.</p>
          <p className="mt-4 font-display text-xl text-primary">{company.tagline}</p>
        </div>
        <div>
          <h4 className="text-lg text-primary">Pages</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-navy-foreground/80">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="space-y-3 text-navy-foreground/80">
          <h4 className="text-lg text-primary">Contact</h4>
          {company.phones.map((p, i) => (
            <a key={p} href={`tel:${company.phoneLinks[i]}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" />{p}</a>
          ))}
          <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4" />{company.email}</a>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{company.address}</p>
          <div className="flex gap-3 pt-2">
            <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-md bg-navy-foreground/10 hover:bg-primary hover:text-primary-foreground"><Instagram className="h-5 w-5" /></a>
            <a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-md bg-navy-foreground/10 hover:bg-primary hover:text-primary-foreground"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-4 text-center text-sm text-navy-foreground/60">
        © {new Date().getFullYear()} {company.fullName}. {company.motto}.
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="bg-gradient-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-5xl md:text-7xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-navy-foreground/75">{text}</p>}
      </div>
    </section>
  );
}

export function WhatsAppFab() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp Magnus Motors"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-bold">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
