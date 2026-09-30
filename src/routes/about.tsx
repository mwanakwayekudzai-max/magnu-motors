import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import tech from "@/assets/technician.jpg.asset.json";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Reafix — Our Story, Mission & Team" },
      { name: "description", content: "Learn about Reafix Appliance Repairs: our background, mission, vision, values and the team behind the tools." },
      { property: "og:title", content: "About Reafix Appliance Repairs" },
      { property: "og:description", content: "Our background, mission, vision and core values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="We value your existence" text="A hands-on repair company built on experience, honesty and getting the job done." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-4xl text-navy">Company background</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Reafix started as a trusted local technician fixing fridges and stoves for neighbours, and grew into a full repair service for car air conditioning, home and commercial appliances, and electrical installations. Today we serve households, drivers and businesses who need dependable work at a fair price.
          </p>
          <h3 className="mt-10 text-3xl text-navy">Company objectives</h3>
          <ul className="mt-4 space-y-2">
            {["Fix it right the first time", "Respond quickly, 24/7", "Keep pricing fair and transparent", "Grow skilled local technicians"].map((o) => (
              <li key={o} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />{o}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6">
          <div className="rounded-lg bg-navy p-7 text-navy-foreground shadow-bold">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-3xl">Mission</h3>
            <p className="mt-2 text-navy-foreground/80">To deliver fast, reliable and affordable repairs that keep our customers' cars cool and homes running.</p>
          </div>
          <div className="rounded-lg border-2 border-navy bg-card p-7 shadow-bold">
            <Eye className="h-8 w-8 text-secondary" />
            <h3 className="mt-3 text-3xl text-navy">Vision</h3>
            <p className="mt-2 text-muted-foreground">To be Zimbabwe's most trusted name in aircon and appliance repair.</p>
          </div>
        </div>
      </section>
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl text-navy">Core values</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Integrity", "Honest diagnosis, no hidden costs."], ["Quality", "Proper tools and quality parts."], ["Speed", "We respect your time."], ["Respect", "We value every customer."]].map(([t, d]) => (
              <div key={t} className="rounded-lg bg-card p-6"><h3 className="text-2xl text-secondary">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl text-navy">Our team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <figure className="overflow-hidden rounded-lg bg-card shadow-bold">
            <img src={tech.url} alt="Reafix lead technician" loading="lazy" className="aspect-square w-full object-cover object-top" />
            <figcaption className="p-5"><p className="font-display text-2xl uppercase text-navy">Reason Zinyama</p><p className="text-muted-foreground">Founder & Lead Technician</p></figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
