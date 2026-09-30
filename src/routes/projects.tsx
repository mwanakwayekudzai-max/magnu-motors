import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-aircon.jpg";
import coldroom from "@/assets/coldroom.jpg";
import gate from "@/assets/gate-motor.jpg";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Portfolio | Reafix" },
      { name: "description", content: "Completed and ongoing Reafix jobs: car aircon regassing, coldroom servicing and gate motor installations." },
      { property: "og:title", content: "Reafix Projects" },
      { property: "og:description", content: "See the work we've completed and what's in progress." },
    ],
  }),
  component: Projects,
});

const projects = [
  { img: hero, title: "Toyota fleet aircon regassing", status: "Completed", detail: "Leak test, R134a regas and cabin filter replacement across a 6-vehicle fleet." },
  { img: coldroom, title: "Butchery coldroom compressor", status: "Completed", detail: "Diagnosed failed compressor, replaced and recharged — back to temperature same day." },
  { img: gate, title: "Residential gate motor install", status: "Ongoing", detail: "New sliding gate motor, wiring and remote programming for a family home." },
];

function Projects() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Our projects" text="Examples of jobs we handle every week." />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="overflow-hidden rounded-lg border-2 border-navy bg-card shadow-bold">
            <img src={p.img} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-6">
              <span className={`rounded px-2 py-1 text-xs font-bold uppercase ${p.status === "Completed" ? "bg-navy text-navy-foreground" : "bg-primary text-primary-foreground"}`}>{p.status}</span>
              <h2 className="mt-3 text-2xl text-navy">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
