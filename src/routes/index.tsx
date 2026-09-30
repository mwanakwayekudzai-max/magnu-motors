import { createFileRoute, Link } from "@tanstack/react-router";
import { Snowflake, WashingMachine, Zap, Clock, BadgeCheck, Wallet, Home as HomeIcon, ArrowRight, MessageCircle } from "lucide-react";
import hero from "@/assets/hero-aircon.jpg";
import coldroom from "@/assets/coldroom.jpg";
import gate from "@/assets/gate-motor.jpg";
import tech from "@/assets/technician.jpg.asset.json";
import { services, whatsappLink, company } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reafix — Car Aircon Regassing & Appliance Repairs, Zimbabwe" },
      { name: "description", content: "R134a car aircon regassing, fridge, stove, geyser, coldroom and gate motor repairs. Fast, reliable, affordable, 24/7." },
      { property: "og:title", content: "Reafix — Car Aircon & Appliance Repairs" },
      { property: "og:description", content: "Keep your car cool and your home running. WhatsApp +263 77 265 2798." },
    ],
  }),
  component: Index,
});

const icons = [Snowflake, WashingMachine, Zap];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <img src={hero} alt="Reafix technician regassing a car aircon" width={1600} height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <p className="inline-flex items-center gap-2 rounded bg-secondary px-3 py-1 text-sm font-bold uppercase text-secondary-foreground">
            <Snowflake className="h-4 w-4" /> R134a refrigerant gas
          </p>
          <h1 className="mt-6 max-w-3xl text-6xl md:text-8xl">
            <span className="text-primary">Keep your car</span><br />cool & clean
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-foreground/80">
            Car aircon regassing, appliance repairs and electrical installations — done right the first time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-bold uppercase text-primary-foreground shadow-bold">
              <MessageCircle className="h-5 w-5" /> WhatsApp us
            </a>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-md border-2 border-navy-foreground/40 px-6 py-3.5 font-bold uppercase hover:border-primary hover:text-primary">
              Our services <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <img src={tech.url} alt="Reafix technician" loading="lazy" className="mx-auto max-h-[520px] rounded-lg object-cover object-top shadow-bold" />
        <div>
          <p className="font-semibold uppercase tracking-[0.25em] text-secondary">Welcome to Reafix</p>
          <h2 className="mt-3 text-5xl text-navy">Experience is hard to deny</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Reafix Appliance Repairs is a Zimbabwean repair business keeping cars cool and homes running. From regassing your car aircon to fixing fridges, stoves, geysers, coldrooms and gate motors — we come prepared, work cleanly and stand by our work.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-bold uppercase text-navy hover:text-secondary">
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-5xl text-navy">Featured services</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => {
              const Icon = icons[i];
              return (
                <div key={s.slug} className="rounded-lg border-2 border-navy bg-card p-7 shadow-bold">
                  <Icon className="h-10 w-10 text-secondary" />
                  <h3 className="mt-4 text-2xl text-navy">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.short}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-navy py-20 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-5xl">Why choose <span className="text-primary">Reafix</span></h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Clock, "24/7 Service", "Breakdowns don't wait — neither do we."],
              [BadgeCheck, "Reliable work", "Proper diagnosis and quality parts."],
              [Wallet, "Affordable", "Fair, upfront pricing on every job."],
              [HomeIcon, "We come to you", "Home, office or roadside call-outs."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Clock;
              return (
                <div key={t as string}>
                  <I className="h-9 w-9 text-primary" />
                  <h3 className="mt-3 text-2xl">{t as string}</h3>
                  <p className="mt-2 text-navy-foreground/70">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-5xl text-navy">Featured projects</h2>
          <Link to="/projects" className="font-bold uppercase text-secondary">View all →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[[hero, "Car aircon regassing"], [coldroom, "Coldroom service"], [gate, "Gate motor install"]].map(([img, t]) => (
            <figure key={t} className="group overflow-hidden rounded-lg bg-card shadow-bold">
              <img src={img} alt={t} loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
              <figcaption className="p-4 font-display text-xl uppercase text-navy">{t}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
          <h2 className="text-4xl">Need a repair today?</h2>
          <a href={`tel:${company.phoneLinks[0]}`} className="rounded-md bg-primary px-6 py-3.5 font-display text-2xl text-primary-foreground shadow-bold">
            {company.phones[0]}
          </a>
        </div>
      </section>
    </>
  );
}
