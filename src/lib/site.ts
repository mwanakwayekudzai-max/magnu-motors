import fitExterior from "@/assets/magnus/fit-exterior.jpeg";
import fitInterior from "@/assets/magnus/fit-interior.jpeg";
import xtrailFront from "@/assets/magnus/xtrail-front.jpeg";
import xtrailRear from "@/assets/magnus/xtrail-rear.jpeg";
import xtrailInterior from "@/assets/magnus/xtrail-interior.jpeg";
import vezelExterior from "@/assets/magnus/vezel-exterior.jpeg";
import vezelRear from "@/assets/magnus/vezel-rear.jpeg";
import vezelInterior from "@/assets/magnus/vezel-interior.jpeg";
import landcruiserFront from "@/assets/magnus/landcruiser-front.jpeg";
import landcruiserRear from "@/assets/magnus/landcruiser-rear.jpeg";
import landcruiserInterior from "@/assets/magnus/landcruiser-interior.jpeg";

export const company = {
  name: "Magnus Motors",
  fullName: "Magnus Motors Affiliate",
  tagline: "Drive your next chapter.",
  motto: "Local expertise. Worldwide sourcing.",
  phones: ["+263 78 947 5147", "+263 77 418 9707"],
  phoneLinks: ["+263789475147", "+263774189707"],
  whatsapp: "263774189707",
  email: "Magnusmotorsaffiliate@gmail.com",
  address: "106 Nemakonde Way, Avondale West, Zimbabwe",
  mapQuery: "106 Nemakonde Way, Avondale West, Harare, Zimbabwe",
};

export const whatsappLink = (text = "Hi Magnus Motors, I'd like to enquire about a vehicle.") =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

export type Vehicle = { slug: string; title: string; price: string; year: string; transmission: string; fuel: string; condition: string; summary: string; features: string[]; images: string[] };

export const vehicles: Vehicle[] = [
  {
    slug: "land-cruiser-300-zx", title: "Toyota Land Cruiser 300 Series ZX", price: "US$160,199", year: "Brand new", transmission: "Automatic", fuel: "Petrol", condition: "Delivery mileage",
    summary: "A brand-new, duty-paid flagship SUV with full specification and delivery mileage.",
    features: ["Recent import", "Duty paid", "Cruise control", "Bluetooth stereo", "Anti-collision sensors", "360° camera", "Immaculate condition", "Solid suspension"],
    images: [landcruiserFront, landcruiserRear, landcruiserInterior],
  },
  {
    slug: "honda-vezel", title: "Honda Vezel", price: "US$16,850", year: "Recent import", transmission: "Automatic", fuel: "Petrol hybrid", condition: "Duty paid",
    summary: "A premium hybrid crossover combining efficiency, comfort and advanced driver assistance.",
    features: ["Full specification", "Premium leather", "Bluetooth radio", "Cruise control", "Lane assist", "Parking sensors", "Traction control", "Reverse camera", "Mag wheels"],
    images: [vezelExterior, vezelRear, vezelInterior],
  },
  {
    slug: "nissan-xtrail-2017", title: "2017 Nissan X-Trail 20X X-Tremer", price: "US$16,600", year: "2017", transmission: "Automatic", fuel: "Petrol", condition: "Duty paid",
    summary: "A seven-seat, non-hybrid SUV with selective 4x4 and a premium perforated leather interior.",
    features: ["Recent import", "7 seater", "Selective 4x4", "Android radio", "Cruise control", "360° camera", "Quality sound system", "Mag wheels", "Steering controls"],
    images: [xtrailFront, xtrailRear, xtrailInterior],
  },
  {
    slug: "honda-fit-gr4", title: "Honda Fit GR4 HEV", price: "US$14,999", year: "Recent import", transmission: "Automatic", fuel: "1.5L petrol hybrid", condition: "Duty fully paid",
    summary: "A smart, economical hybrid hatchback with modern safety, comfort and control features.",
    features: ["Steering controls", "Cruise control", "Mirror indicators", "Fog lights", "Neat fabric interior", "Brand-new tyres", "Mag wheels"],
    images: [fitExterior, fitInterior],
  },
];

export const services = [
  ["Vehicle sales", "Quality new and used vehicles ready for viewing and purchase."],
  ["Worldwide sourcing", "We help you find and import the right vehicle from anywhere in the world."],
  ["Import assistance", "Guidance through sourcing, shipping, duty and local delivery."],
  ["Vehicle brokerage", "Connecting serious buyers and sellers with clear, professional support."],
  ["Customer consultation", "Straightforward advice to help you choose the right vehicle and budget."],
] as const;
