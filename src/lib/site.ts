export const company = {
  name: "Reafix",
  fullName: "Reafix Appliance Repairs",
  tagline: "Experience is hard to deny.",
  motto: "We value your existence",
  phones: ["+263 77 265 2798", "+263 71 965 2798"],
  phoneLinks: ["+263772652798", "+263719652798"],
  whatsapp: "263772652798",
  email: "reasonzinyama74@gmail.com",
  facebook: "ReaFix Appliance Repairs",
  facebookUrl: "https://www.facebook.com/search/top?q=ReaFix%20Appliance%20Repairs",
  address: "Harare, Zimbabwe",
  mapQuery: "Harare, Zimbabwe",
};

export const whatsappLink = (text = "Hi Reafix, I'd like a quote.") =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

export type Service = { slug: string; title: string; short: string; items: string[] };

export const services: Service[] = [
  {
    slug: "aircon",
    title: "Car Aircon Regassing & Repair",
    short: "R134a regassing, leak detection and full car aircon service to keep your car cool and clean.",
    items: [
      "Car regassing (R134a refrigerant)",
      "Detection & fixing of broken aircon pipes",
      "Cabin air filter replacement",
      "Aircon pump fixing & replacement",
      "Gas leakage detection & fixing",
      "Full car aircon service",
    ],
  },
  {
    slug: "appliances",
    title: "Appliance Repairs",
    short: "Stoves, fridges, coldrooms, washing machines, geysers and friers — fixed fast, at home or in the shop.",
    items: ["Stoves & ovens", "Fridges & freezers", "Coldrooms", "Washing machines", "Geysers", "Friers"],
  },
  {
    slug: "electrical",
    title: "Electrical & Gate Motors",
    short: "Electrical installations, gate motor installs and repairs for homes and businesses.",
    items: ["Electrical installations", "Gate motor install & repair", "Fault finding", "Maintenance call-outs"],
  },
];
