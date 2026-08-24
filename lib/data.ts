import type {
  CallRecord,
  Campaign,
  Customer,
  Invoice,
  Placement,
} from "@/lib/types";

export const DEMO_PASSWORD = "demo1234";

export const customer: Customer = {
  id: "apex-hvac",
  company: "Apex Heating & Air",
  contactName: "Marcus Hale",
  email: "hannah.h@example.com",
  phone: "+13035552800",
  trade: "HVAC",
  forwardingNumber: "+13035552800",
  serviceArea: "Denver Metro",
};

export const neighborhoods = [
  "Cherry Creek",
  "Washington Park",
  "Highlands",
  "Lakewood",
  "Arvada",
  "Aurora",
  "Centennial",
  "Stapleton / Central Park",
  "DTC",
  "Boulder",
] as const;

export const campaigns: Campaign[] = [
  {
    id: "spring-tuneup",
    customerId: customer.id,
    name: "Spring Tune-Up Yard Signs",
    status: "active",
    mediums: ["yard_sign"],
    startDate: "2026-03-16",
    endDate: "2026-06-15",
    budget: 6000,
    spent: 4280,
    trackingNumber: "+17205550142",
    neighborhoods: ["Cherry Creek", "Washington Park", "Highlands"],
    notes: "18x24 yard signs with QR + unique tracking number. Crew restakes weekly.",
  },
  {
    id: "summer-ac",
    customerId: customer.id,
    name: "Summer AC Door Hangers",
    status: "active",
    mediums: ["door_hanger"],
    startDate: "2026-05-04",
    endDate: "2026-08-31",
    budget: 3500,
    spent: 2140,
    trackingNumber: "+17205550188",
    neighborhoods: ["Lakewood", "Arvada", "Aurora"],
    notes: "4x9 hangers, every-other-door coverage, 3 drops over 8 weeks.",
  },
  {
    id: "fall-furnace",
    customerId: customer.id,
    name: "Fall Furnace Check",
    status: "scheduled",
    mediums: ["yard_sign", "door_hanger"],
    startDate: "2026-09-08",
    endDate: "2026-11-15",
    budget: 4000,
    spent: 890,
    trackingNumber: "+13035550164",
    neighborhoods: ["Centennial", "DTC", "Stapleton / Central Park"],
    notes: "Combo drop launching after Labor Day. Creative in final proof.",
  },
];

const hubs: {
  neighborhood: string;
  lat: number;
  lng: number;
  campaignId: string;
  medium: Placement["medium"];
  count: number;
  seed: number;
}[] = [
  { neighborhood: "Cherry Creek", lat: 39.7175, lng: -104.9507, campaignId: "spring-tuneup", medium: "yard_sign", count: 16, seed: 11 },
  { neighborhood: "Washington Park", lat: 39.7003, lng: -104.9697, campaignId: "spring-tuneup", medium: "yard_sign", count: 12, seed: 21 },
  { neighborhood: "Highlands", lat: 39.7624, lng: -105.0348, campaignId: "spring-tuneup", medium: "yard_sign", count: 14, seed: 31 },
  { neighborhood: "Lakewood", lat: 39.7047, lng: -105.0814, campaignId: "summer-ac", medium: "door_hanger", count: 18, seed: 41 },
  { neighborhood: "Arvada", lat: 39.8028, lng: -105.0875, campaignId: "summer-ac", medium: "door_hanger", count: 14, seed: 51 },
  { neighborhood: "Aurora", lat: 39.7294, lng: -104.8319, campaignId: "summer-ac", medium: "door_hanger", count: 16, seed: 61 },
  { neighborhood: "Centennial", lat: 39.5807, lng: -104.8772, campaignId: "fall-furnace", medium: "yard_sign", count: 8, seed: 71 },
  { neighborhood: "DTC", lat: 39.6242, lng: -104.8933, campaignId: "fall-furnace", medium: "door_hanger", count: 10, seed: 81 },
  { neighborhood: "Stapleton / Central Park", lat: 39.7608, lng: -104.8881, campaignId: "fall-furnace", medium: "yard_sign", count: 7, seed: 91 },
];

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const placements: Placement[] = hubs.flatMap((hub) => {
  const rand = mulberry32(hub.seed);
  return Array.from({ length: hub.count }, (_, i) => {
    const lat = hub.lat + (rand() - 0.5) * 0.036;
    const lng = hub.lng + (rand() - 0.5) * 0.048;
    const day = 10 + Math.floor(rand() * 80);
    const scheduled = hub.campaignId === "fall-furnace" && i % 3 === 0;
    return {
      id: `${hub.campaignId}-${hub.neighborhood.slice(0, 3).toLowerCase()}-${i + 1}`,
      campaignId: hub.campaignId,
      medium: hub.medium,
      neighborhood: hub.neighborhood,
      address: `${hub.neighborhood} · block ${100 + Math.floor(rand() * 80) * 10}`,
      lat,
      lng,
      placedAt: new Date(Date.UTC(2026, hub.campaignId === "fall-furnace" ? 7 : 3, day)).toISOString(),
      status: scheduled ? "scheduled" : "placed",
    } satisfies Placement;
  });
});

const callSeeds: { campaignId: string; from: string; status: CallRecord["status"]; durationSec: number; daysAgo: number; hour: number }[] = [
  { campaignId: "spring-tuneup", from: "+17205551214", status: "completed", durationSec: 184, daysAgo: 0, hour: 9 },
  { campaignId: "summer-ac", from: "+13035559811", status: "completed", durationSec: 246, daysAgo: 0, hour: 11 },
  { campaignId: "spring-tuneup", from: "+17205553309", status: "no-answer", durationSec: 0, daysAgo: 0, hour: 14 },
  { campaignId: "spring-tuneup", from: "+13035554720", status: "completed", durationSec: 312, daysAgo: 1, hour: 8 },
  { campaignId: "summer-ac", from: "+17205557640", status: "completed", durationSec: 97, daysAgo: 1, hour: 16 },
  { campaignId: "fall-furnace", from: "+13035550102", status: "completed", durationSec: 141, daysAgo: 2, hour: 10 },
  { campaignId: "spring-tuneup", from: "+17205552188", status: "busy", durationSec: 0, daysAgo: 2, hour: 13 },
  { campaignId: "summer-ac", from: "+17205559002", status: "completed", durationSec: 428, daysAgo: 3, hour: 9 },
  { campaignId: "spring-tuneup", from: "+13035556217", status: "completed", durationSec: 205, daysAgo: 3, hour: 15 },
  { campaignId: "summer-ac", from: "+13035551944", status: "no-answer", durationSec: 0, daysAgo: 4, hour: 12 },
  { campaignId: "spring-tuneup", from: "+17205554830", status: "completed", durationSec: 166, daysAgo: 5, hour: 10 },
  { campaignId: "spring-tuneup", from: "+17205551107", status: "completed", durationSec: 389, daysAgo: 6, hour: 8 },
  { campaignId: "summer-ac", from: "+13035557721", status: "completed", durationSec: 73, daysAgo: 6, hour: 17 },
  { campaignId: "fall-furnace", from: "+17205550331", status: "completed", durationSec: 190, daysAgo: 7, hour: 11 },
  { campaignId: "spring-tuneup", from: "+13035553408", status: "completed", durationSec: 254, daysAgo: 8, hour: 9 },
  { campaignId: "summer-ac", from: "+17205556119", status: "failed", durationSec: 0, daysAgo: 8, hour: 18 },
  { campaignId: "spring-tuneup", from: "+17205558764", status: "completed", durationSec: 118, daysAgo: 9, hour: 13 },
  { campaignId: "summer-ac", from: "+13035552893", status: "completed", durationSec: 301, daysAgo: 10, hour: 10 },
  { campaignId: "spring-tuneup", from: "+17205551920", status: "completed", durationSec: 222, daysAgo: 11, hour: 15 },
  { campaignId: "spring-tuneup", from: "+13035554155", status: "no-answer", durationSec: 0, daysAgo: 12, hour: 8 },
  { campaignId: "summer-ac", from: "+17205554276", status: "completed", durationSec: 156, daysAgo: 13, hour: 12 },
  { campaignId: "fall-furnace", from: "+13035551870", status: "completed", durationSec: 88, daysAgo: 14, hour: 16 },
  { campaignId: "spring-tuneup", from: "+17205553004", status: "completed", durationSec: 267, daysAgo: 15, hour: 9 },
  { campaignId: "summer-ac", from: "+13035556012", status: "completed", durationSec: 194, daysAgo: 16, hour: 14 },
];

function daysAgoIso(daysAgo: number, hour: number) {
  const d = new Date();
  d.setHours(hour, 12 + (daysAgo % 7), 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

export const seedCalls: CallRecord[] = callSeeds.map((call, i) => {
  const campaign = campaigns.find((item) => item.id === call.campaignId)!;
  return {
    id: `seed-${i + 1}`,
    campaignId: call.campaignId,
    from: call.from,
    to: campaign.trackingNumber,
    status: call.status,
    durationSec: call.durationSec,
    startedAt: daysAgoIso(call.daysAgo, call.hour),
    forwardedTo: customer.forwardingNumber,
  };
});

export const invoices: Invoice[] = [
  { id: "INV-1048", date: "2026-08-01", amount: 2410, status: "paid", description: "August print + placement + tracking" },
  { id: "INV-1039", date: "2026-07-01", amount: 2385, status: "paid", description: "July print + placement + tracking" },
  { id: "INV-1031", date: "2026-06-01", amount: 2190, status: "paid", description: "June print + placement + tracking" },
  { id: "INV-1022", date: "2026-05-01", amount: 1860, status: "paid", description: "May campaign launch" },
  { id: "INV-1014", date: "2026-04-01", amount: 1640, status: "paid", description: "April yard sign program" },
  { id: "INV-1055", date: "2026-09-01", amount: 2490, status: "open", description: "September print + placement + tracking" },
];

export const billingProfile = {
  plan: "Growth",
  monthlyMinimum: 1800,
  paymentMethod: "Visa ending 4242",
  nextBillDate: "2026-09-01",
  autoPay: true,
};

export const YARD_SIGN_RATE = 18;
export const DOOR_HANGER_RATE = 0.85;
export const TRACKING_MONTHLY = 15;

export function estimateOrder(input: {
  yardSigns: number;
  doorHangers: number;
  weeks: number;
}) {
  const printPlace =
    input.yardSigns * YARD_SIGN_RATE + input.doorHangers * DOOR_HANGER_RATE;
  const tracking = TRACKING_MONTHLY * Math.max(1, Math.ceil(input.weeks / 4));
  return Math.round(printPlace + tracking);
}

export function getCampaign(id: string) {
  return campaigns.find((campaign) => campaign.id === id);
}

export function campaignByTrackingNumber(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1/, "");
  return campaigns.find((campaign) => campaign.trackingNumber.replace(/\D/g, "").replace(/^1/, "") === digits);
}

export function getCampaignStats(campaignId: string, calls: CallRecord[]) {
  const campaignCalls = calls.filter((call) => call.campaignId === campaignId);
  const completed = campaignCalls.filter((call) => call.status === "completed");
  return {
    calls: campaignCalls.length,
    leads: completed.length,
    missed: campaignCalls.filter((call) => call.status === "no-answer" || call.status === "busy").length,
    avgDuration: completed.length
      ? Math.round(completed.reduce((sum, call) => sum + call.durationSec, 0) / completed.length)
      : 0,
  };
}

export function dashboardStats(calls: CallRecord[]) {
  const completed = calls.filter((call) => call.status === "completed");
  const spend = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const budget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const costPerLead = completed.length ? spend / completed.length : 0;
  return {
    spend,
    budget,
    calls: calls.length,
    leads: completed.length,
    costPerLead,
    placements: placements.filter((item) => item.status === "placed").length,
  };
}
