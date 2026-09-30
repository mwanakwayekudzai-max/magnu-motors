import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-aircon.jpg";
import coldroom from "@/assets/coldroom.jpg";
import gate from "@/assets/gate-motor.jpg";
import aircon from "@/assets/aircon.jpg.asset.json";
import appliances from "@/assets/appliances.jpg.asset.json";
import tech from "@/assets/technician.jpg.asset.json";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Reafix Appliance Repairs" },
      { name: "description", content: "Photos of the Reafix team, our services and completed repair jobs." },
      { property: "og:title", content: "Reafix Gallery" },
      { property: "og:description", content: "Company, service and project photos." },
    ],
  }),
  component: Gallery,
});

const photos = [
  { src: tech.url, cat: "Company", alt: "Reafix technician" },
  { src: aircon.url, cat: "Services", alt: "Car aircon regassing flyer" },
  { src: hero, cat: "Projects", alt: "Aircon regassing" },
  { src: appliances.url, cat: "Services", alt: "Appliance repairs flyer" },
  { src: coldroom, cat: "Projects", alt: "Coldroom service" },
  { src: gate, cat: "Projects", alt: "Gate motor install" },
];

function Gallery() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Tools, team & results" />
      <section className="mx-auto max-w-7xl columns-1 gap-6 px-6 py-20 sm:columns-2 lg:columns-3">
        {photos.map((p) => (
          <figure key={p.alt} className="relative mb-6 break-inside-avoid overflow-hidden rounded-lg shadow-bold">
            <img src={p.src} alt={p.alt} loading="lazy" className="w-full" />
            <span className="absolute left-3 top-3 rounded bg-primary px-2 py-1 text-xs font-bold uppercase text-primary-foreground">{p.cat}</span>
          </figure>
        ))}
      </section>
    </>
  );
}
