import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import hero from "@/assets/hero-aircon.jpg";
import coldroom from "@/assets/coldroom.jpg";
import gate from "@/assets/gate-motor.jpg";
import { PageHero } from "@/components/site-chrome";
import { services, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Aircon Regassing, Appliance & Electrical | Reafix" },
      { name: "description", content: "Car aircon regassing, pump and pipe repairs, fridge, stove, geyser, coldroom, washing machine and gate motor repairs." },
      { property: "og:title", content: "Reafix Services" },
      { property: "og:description", content: "Everything we fix — and how to request a quote." },
    ],
  }),
  component: Services,
});

const imgs = [hero, coldroom, gate];

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="What we fix" text="Three core services, one reliable team." />
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-20">
        {services.map((s, i) => (
          <section key={s.slug} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>img]:order-2" : ""}`}>
            <img src={imgs[i]} alt={s.title} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover shadow-bold" />
            <div>
              <p className="font-display text-6xl text-primary">0{i + 1}</p>
              <h2 className="text-4xl text-navy">{s.title}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{s.short}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {s.items.map((it) => <li key={it} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />{it}</li>)}
              </ul>
              <a href={whatsappLink(`Hi Reafix, I need a quote for: ${s.title}`)} target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold uppercase text-primary-foreground shadow-bold">
                <MessageCircle className="h-5 w-5" /> Request a quote
              </a>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
