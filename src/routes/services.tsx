import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { services, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Vehicle Sales, Sourcing & Imports | Magnus Motors" },
      { name: "description", content: "Vehicle sales, worldwide sourcing, import assistance, brokerage and customer consultation from Magnus Motors Affiliate, Zimbabwe." },
      { property: "og:title", content: "Magnus Motors Services" },
      { property: "og:description", content: "Sales, worldwide sourcing and import assistance." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="How we help" text="From local sales to worldwide imports — one trusted team." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([t, d], i) => (
            <div key={t} className="rounded-lg border-2 border-navy bg-card p-7 shadow-bold">
              <p className="font-display text-5xl text-primary">0{i + 1}</p>
              <h2 className="mt-3 text-2xl text-navy">{t}</h2>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
          <a href={whatsappLink("Hi Magnus Motors, I'd like to know more about your services.")} target="_blank" rel="noreferrer"
            className="flex flex-col items-start justify-between rounded-lg bg-navy p-7 text-navy-foreground shadow-bold">
            <h2 className="text-2xl">Not sure where to start?</h2>
            <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold uppercase text-primary-foreground">
              <MessageCircle className="h-5 w-5" /> Talk to us
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
