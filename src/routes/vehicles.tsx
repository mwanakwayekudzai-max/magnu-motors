import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageCircle, Search } from "lucide-react";
import { PageHero } from "@/components/site-chrome";
import { whatsappLink } from "@/lib/site";
import { useVehicles } from "@/lib/use-vehicles";

export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: "Vehicles for Sale — Magnus Motors Affiliate" },
      { name: "description", content: "Browse quality vehicles for sale in Zimbabwe: Toyota Land Cruiser 300 ZX, Honda Vezel, Nissan X-Trail, Honda Fit GR4 HEV and more." },
      { property: "og:title", content: "Vehicles for Sale — Magnus Motors Affiliate" },
      { property: "og:description", content: "Quality duty-paid vehicles with clear prices. Enquire on WhatsApp." },
    ],
  }),
  component: Vehicles,
});

function Vehicles() {
  const vehicles = useVehicles();
  const fuels = ["All fuel types", ...Array.from(new Set(vehicles.map((v) => v.fuel)))];
  const [q, setQ] = useState("");
  const [fuel, setFuel] = useState(fuels[0]);

  const list = useMemo(() => vehicles.filter((v) => {
    const matchesQ = !q || `${v.title} ${v.summary}`.toLowerCase().includes(q.toLowerCase());
    const matchesFuel = fuel === fuels[0] || v.fuel === fuel;
    return matchesQ && matchesFuel;
  }), [q, fuel, vehicles]);

  return (
    <>
      <PageHero eyebrow="Vehicles" title="Current stock" text="Quality, duty-paid vehicles ready for viewing. Can't find what you want? We'll source it worldwide." />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search vehicles…"
              className="w-full rounded-md border-2 border-input bg-card py-3 pl-10 pr-4 focus:border-navy focus:outline-none" />
          </label>
          <select value={fuel} onChange={(e) => setFuel(e.target.value)}
            className="rounded-md border-2 border-input bg-card px-4 py-3 focus:border-navy focus:outline-none">
            {fuels.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {list.map((v) => (
            <article key={v.slug} className="overflow-hidden rounded-lg border-2 border-navy bg-card shadow-bold">
              <div className="relative">
                <img src={v.images[0]} alt={v.title} className="aspect-[16/10] w-full object-cover" />
                <span className="absolute left-3 top-3 rounded bg-primary px-3 py-1 font-display text-xl text-primary-foreground">{v.price}</span>
                {v.sold && <span className="absolute right-3 top-3 rounded bg-destructive px-3 py-1 font-display text-xl text-destructive-foreground">SOLD</span>}
              </div>
              <div className="p-6">
                <h2 className="text-3xl text-navy">{v.title}</h2>
                <p className="mt-2 text-muted-foreground">{v.summary}</p>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {[["Year", v.year], ["Transmission", v.transmission], ["Fuel", v.fuel], ["Condition", v.condition]].map(([k, val]) => (
                    <div key={k} className="rounded bg-muted px-3 py-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{val}</dd></div>
                  ))}
                </dl>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {v.features.map((f) => <li key={f} className="rounded-full border border-border px-3 py-1 text-xs font-semibold">{f}</li>)}
                </ul>
                {v.images.length > 1 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {v.images.slice(1).map((img, i) => (
                      <img key={i} src={img} alt={`${v.title} photo ${i + 2}`} loading="lazy" className="aspect-[4/3] rounded object-cover" />
                    ))}
                  </div>
                )}
                <a href={whatsappLink(`Hi Magnus Motors, I'm interested in the ${v.title} listed at ${v.price}. Is it still available?`)}
                  target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-bold uppercase text-primary-foreground shadow-bold">
                  <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">No vehicles match your search. Try clearing the filters — or ask us to source it for you.</p>}
      </section>
    </>
  );
}
