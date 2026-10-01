import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { company, whatsappLink, vehicles } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Magnus Motors — WhatsApp, Call or Email" },
      { name: "description", content: `WhatsApp or call ${company.phones.join(" / ")}, or email ${company.email}. Visit us at ${company.address}.` },
      { property: "og:title", content: "Contact Magnus Motors Affiliate" },
      { property: "og:description", content: "Enquire about a vehicle or our import services." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  subject: z.string().max(120),
  message: z.string().trim().min(1, "Please enter your message").max(1000),
});

function Contact() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) return setError(r.error.issues[0]?.message ?? "Please check the form");
    setError(null);
    const v = r.data;
    window.open(whatsappLink(`Hi Magnus Motors, I'm ${v.name} (${v.phone}).\nRegarding: ${v.subject}\n${v.message}`), "_blank");
  }

  const field = "w-full rounded-md border-2 border-input bg-card px-4 py-3 focus:border-navy focus:outline-none";

  return (
    <>
      <PageHero eyebrow="Contact us" title="Let's talk cars" text="WhatsApp now for a quick response." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
        <div className="space-y-4">
          {company.phones.map((p, i) => (
            <a key={p} href={`tel:${company.phoneLinks[i]}`} className="flex items-center gap-4 rounded-lg border-2 border-navy bg-card p-5 shadow-bold">
              <Phone className="h-7 w-7 text-secondary" /><span><span className="block text-sm text-muted-foreground">Call</span><span className="font-display text-2xl text-navy">{p}</span></span>
            </a>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-lg bg-navy p-5 text-navy-foreground shadow-bold">
            <MessageCircle className="h-7 w-7 text-primary" /><span><span className="block text-sm text-navy-foreground/70">WhatsApp</span><span className="font-display text-2xl">{company.phones[1]}</span></span>
          </a>
          <a href={`mailto:${company.email}`} className="flex items-center gap-4 rounded-lg bg-muted p-5"><Mail className="h-6 w-6 text-secondary" />{company.email}</a>
          <p className="flex items-center gap-4 rounded-lg bg-muted p-5"><MapPin className="h-6 w-6 text-secondary" />{company.address}</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-lg border-2 border-navy bg-card p-8 shadow-bold">
          <h2 className="text-3xl text-navy">Send an enquiry</h2>
          <input name="name" placeholder="Your name" maxLength={100} className={field} />
          <input name="phone" placeholder="Phone number" maxLength={20} className={field} />
          <select name="subject" className={field}>
            <option>General enquiry</option>
            {vehicles.map((v) => <option key={v.slug}>{v.title}</option>)}
            <option>Worldwide sourcing / import</option>
            <option>Selling my car</option>
          </select>
          <textarea name="message" rows={5} placeholder="Your message" maxLength={1000} className={field} />
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
          <button className="w-full rounded-md bg-primary py-3.5 font-bold uppercase text-primary-foreground">Send via WhatsApp</button>
        </form>
      </section>
      <iframe title="Magnus Motors location" className="h-96 w-full border-0" loading="lazy"
        src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`} />
    </>
  );
}
