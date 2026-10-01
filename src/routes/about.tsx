import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { company } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Magnus Motors Affiliate — Our Story & Values" },
      { name: "description", content: "Learn about Magnus Motors Affiliate: a Zimbabwean vehicle dealership offering quality cars, worldwide sourcing and import assistance." },
      { property: "og:title", content: "About Magnus Motors Affiliate" },
      { property: "og:description", content: "Our background, mission, vision and values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Driven by trust" text="A Zimbabwean dealership built on quality vehicles, honest dealing and worldwide reach." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-4xl text-navy">Company background</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {company.fullName} is a vehicle dealership based at {company.address}. We sell quality new and used vehicles, and we help customers source and import the exact vehicle they want from anywhere in the world — handling the journey from sourcing to shipping, duty and local delivery.
          </p>
          <h3 className="mt-10 text-3xl text-navy">Company objectives</h3>
          <ul className="mt-4 space-y-2">
            {["Supply quality, duty-paid vehicles", "Make worldwide sourcing simple and safe", "Keep pricing clear and fair", "Build lasting customer relationships"].map((o) => (
              <li key={o} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />{o}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6">
          <div className="rounded-lg bg-navy p-7 text-navy-foreground shadow-bold">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-3xl">Mission</h3>
            <p className="mt-2 text-navy-foreground/80">To connect every customer with the right vehicle — locally or from anywhere in the world — with honesty and professionalism.</p>
          </div>
          <div className="rounded-lg border-2 border-navy bg-card p-7 shadow-bold">
            <Eye className="h-8 w-8 text-secondary" />
            <h3 className="mt-3 text-3xl text-navy">Vision</h3>
            <p className="mt-2 text-muted-foreground">To be Zimbabwe's most trusted name in vehicle sales and import sourcing.</p>
          </div>
        </div>
      </section>
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl text-navy">Core values</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Integrity", "Honest deals, no hidden costs."], ["Quality", "Only vehicles we'd drive ourselves."], ["Reach", "Local stock, worldwide sourcing."], ["Respect", "Every customer matters."]].map(([t, d]) => (
              <div key={t} className="rounded-lg bg-card p-6"><h3 className="text-2xl text-secondary">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
