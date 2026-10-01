import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site-chrome";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Car — Magnus Motors Affiliate" },
      { name: "description", content: "Sell your car through Magnus Motors Affiliate. Send us your vehicle details and we'll get back to you with an offer." },
      { property: "og:title", content: "Sell Your Car — Magnus Motors Affiliate" },
      { property: "og:description", content: "Send your vehicle details and get an offer." },
    ],
  }),
  component: Sell,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  make: z.string().trim().min(1, "Please enter the make and model").max(100),
  year: z.string().trim().min(4, "Please enter the year").max(4),
  mileage: z.string().trim().max(20),
  price: z.string().trim().max(20),
  notes: z.string().trim().max(1000),
});

function Sell() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) return setError(r.error.issues[0]?.message ?? "Please check the form");
    setError(null);
    const v = r.data;
    window.open(whatsappLink(
      `Hi Magnus Motors, I'd like to sell my car.\nName: ${v.name} (${v.phone})\nVehicle: ${v.make}, ${v.year}\nMileage: ${v.mileage || "—"}\nAsking price: ${v.price || "—"}\nNotes: ${v.notes || "—"}`
    ), "_blank");
  }

  const field = "w-full rounded-md border-2 border-input bg-card px-4 py-3 focus:border-navy focus:outline-none";

  return (
    <>
      <PageHero eyebrow="Sell your car" title="Get a fair offer" text="Fill in your vehicle details and we'll respond on WhatsApp with the next steps." />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <form onSubmit={onSubmit} className="space-y-4 rounded-lg border-2 border-navy bg-card p-8 shadow-bold">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" placeholder="Your name" maxLength={100} className={field} />
            <input name="phone" placeholder="Phone number" maxLength={20} className={field} />
          </div>
          <input name="make" placeholder="Make and model (e.g. Toyota Corolla)" maxLength={100} className={field} />
          <div className="grid gap-4 sm:grid-cols-3">
            <input name="year" placeholder="Year" maxLength={4} className={field} />
            <input name="mileage" placeholder="Mileage (km)" maxLength={20} className={field} />
            <input name="price" placeholder="Asking price (US$)" maxLength={20} className={field} />
          </div>
          <textarea name="notes" rows={4} placeholder="Condition, service history, anything else we should know" maxLength={1000} className={field} />
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
          <button className="w-full rounded-md bg-primary py-3.5 font-bold uppercase text-primary-foreground">Send via WhatsApp</button>
        </form>
      </section>
    </>
  );
}
