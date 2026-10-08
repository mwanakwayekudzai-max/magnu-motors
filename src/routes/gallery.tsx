import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-chrome";
import { useVehicles } from "@/lib/use-vehicles";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Magnus Motors Affiliate" },
      { name: "description", content: "Photos of vehicles currently in stock at Magnus Motors Affiliate, Zimbabwe." },
      { property: "og:title", content: "Magnus Motors Gallery" },
      { property: "og:description", content: "Exterior and interior photos of our vehicles." },
    ],
  }),
  component: Gallery,
});

function usePhotos() { return useVehicles().flatMap((v) => v.images.map((src, i) => ({ src, cat: v.title, alt: `${v.title} photo ${i + 1}` }))); }

function Gallery() {
  const photos = usePhotos();
  return (
    <>
      <PageHero eyebrow="Gallery" title="Our vehicles up close" />
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
