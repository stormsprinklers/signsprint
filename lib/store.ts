import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { seedCalls } from "@/lib/data";
import type { CallRecord, CampaignOrder, LeadInquiry } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");

type MemoryStore = {
  leads: LeadInquiry[];
  orders: CampaignOrder[];
  calls: CallRecord[];
};

const memory: MemoryStore = {
  leads: [],
  orders: [],
  calls: [],
};

async function readJson<K extends keyof MemoryStore>(file: string, key: K): Promise<MemoryStore[K]> {
  try {
    const raw = await readFile(path.join(dataDir, file), "utf8");
    const parsed = JSON.parse(raw) as MemoryStore[K];
    memory[key] = parsed;
    return parsed;
  } catch {
    return memory[key];
  }
}

async function writeJson<K extends keyof MemoryStore>(file: string, key: K, value: MemoryStore[K]) {
  memory[key] = value;
  try {
    await mkdir(dataDir, { recursive: true });
    await writeFile(path.join(dataDir, file), JSON.stringify(value, null, 2), "utf8");
  } catch {
    // Vercel and other serverless hosts cannot write the repo filesystem.
  }
}

export async function getLeads() {
  return readJson("leads.json", "leads");
}

export async function addLead(lead: LeadInquiry) {
  const leads = await getLeads();
  leads.unshift(lead);
  await writeJson("leads.json", "leads", leads);
  return lead;
}

export async function getOrders() {
  return readJson("orders.json", "orders");
}

export async function addOrder(order: CampaignOrder) {
  const orders = await getOrders();
  orders.unshift(order);
  await writeJson("orders.json", "orders", orders);
  return order;
}

export async function getLoggedCalls() {
  return readJson("calls.json", "calls");
}

export async function addCall(call: CallRecord) {
  const calls = await getLoggedCalls();
  const index = calls.findIndex((item) => item.id === call.id);
  if (index >= 0) {
    calls[index] = { ...calls[index], ...call };
  } else {
    calls.unshift(call);
  }
  await writeJson("calls.json", "calls", calls);
  return call;
}

export async function updateCall(id: string, patch: Partial<CallRecord>) {
  const calls = await getLoggedCalls();
  const index = calls.findIndex((item) => item.id === id);
  if (index < 0) {
    return addCall({
      id,
      campaignId: patch.campaignId ?? "unknown",
      from: patch.from ?? "",
      to: patch.to ?? "",
      status: patch.status ?? "in-progress",
      durationSec: patch.durationSec ?? 0,
      startedAt: patch.startedAt ?? new Date().toISOString(),
      forwardedTo: patch.forwardedTo ?? "",
    });
  }
  calls[index] = { ...calls[index], ...patch };
  await writeJson("calls.json", "calls", calls);
  return calls[index];
}

export async function getAllCalls() {
  const logged = await getLoggedCalls();
  const loggedIds = new Set(logged.map((call) => call.id));
  return [...logged, ...seedCalls.filter((call) => !loggedIds.has(call.id))].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  );
}
