import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { vehicles as staticVehicles, type Vehicle } from "@/lib/site";

export type ListedVehicle = Vehicle & { sold?: boolean };

/** Built-in cars from site.ts plus cars added through the admin dashboard. */
export function useVehicles(): ListedVehicle[] {
  const [extra, setExtra] = useState<ListedVehicle[]>([]);
  useEffect(() => {
    supabase.from("cars").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (!data) return;
      setExtra(data.map((c) => ({
        slug: c.id, title: c.title, price: c.price, year: c.year, transmission: c.transmission,
        fuel: c.fuel, condition: c.condition, summary: c.summary, features: c.features, images: c.images, sold: c.sold,
      })));
    });
  }, []);
  return [...extra, ...staticVehicles];
}
