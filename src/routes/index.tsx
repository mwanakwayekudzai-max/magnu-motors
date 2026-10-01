import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, ShieldCheck, Handshake, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { vehicles, services, company, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magnus Motors Affiliate — Quality Vehicles & Worldwide Sourcing, Zimbabwe" },
      { name: "description", content: "Quality new and used vehicles for sale in Zimbabwe, plus worldwide car sourcing and import assistance. Based at 106 Nemakonde Way, Avondale West." },
      { property: "og:title", content: "Magnus Motors Affiliate" },
      { property: "og:description", content: "Local expertise. Worldwide sourcing. Quality vehicles for sale in Zimbabwe." },
    ],
  }),
  component: Index,
});

function Index() {
  const heroImg = vehicles[0]!.images[0]!;
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <img src={heroImg} alt="Toyota Land Cruiser 300 Series ZX" width={1600} height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <p className="inline-flex items-center gap-2 rounded bg-secondary px-3 py-1 text-sm font-bold uppercase text-secondary-foreground">
            <Globe2 className="h-4 w-4" /> Local expertise. Worldwide sourcing.
          </p>
          <h1 className="mt-6 max-w-3xl text-6xl md:text-8xl">
            <span className="text-primary">Drive your</span><br />next chapter
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-foreground/80">
            Quality new and used vehicles for sale in Zimbabwe — and if we don't have it, we'll source and import it from anywhere in the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/vehicles" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-bold uppercase text-primary-foreground shadow-bold">
              Browse vehicles <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-2 border-navy-foreground/40 px-6 py-3.5 font-bold uppercase hover:border-primary hover:text-primary">
              <MessageCircle className="h-5 w-5" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-5xl text-navy">Featured vehicles</h2>
          <Link to="/vehicles" className="font-bold uppercase text-secondary">View all →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v) => (
            <Link key={v.slug} to="/vehicles" className="group overflow-hidden rounded-lg border-2 border-navy bg-card shadow-bold">
              <img src={v.images[0]} alt={v.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
              <div className="p-5">
                <h3 className="text-xl text-navy">{v.title}</h3>
                <p className="mt-1 font-display text-2xl text-secondary">{v.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-5xl text-navy">What we do</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map(([t, d]) => (
              <div key={t} className="rounded-lg border-2 border-navy bg-card p-7 shadow-bold">
                <h3 className="text-2xl text-navy">{t}</h3>
                <p className="mt-3 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <Link to="/services" className="mt-8 inline-flex items-center gap-2 font-bold uppercase text-navy hover:text-secondary">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-gradient-navy py-20 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-5xl">Why choose <span className="text-primary">Magnus Motors</span></h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [ShieldCheck, "Quality assured", "Every vehicle is checked, duty paid and ready to drive."],
              [Globe2, "Worldwide sourcing", "We find and import the exact vehicle you want, from anywhere."],
              [Handshake, "Honest dealing", "Clear prices, clear paperwork, no surprises."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof ShieldCheck;
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

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
          <h2 className="text-4xl">Ready to find your next vehicle?</h2>
          <a href={`tel:${company.phoneLinks[0]}`} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-2xl text-primary-foreground shadow-bold">
            <Phone className="h-5 w-5" /> {company.phones[0]}
          </a>
        </div>
      </section>
    </>
  );
}
