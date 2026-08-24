import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { seedCalls } from "@/lib/data";
import type { CallRecord, CampaignOrder, LeadInquiry } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(path.join(dataDir, file), JSON.stringify(value, null, 2), "utf8");
}

export async function getLeads() {
  return readJson<LeadInquiry[]>("leads.json", []);
}

export async function addLead(lead: LeadInquiry) {
  const leads = await getLeads();
  leads.unshift(lead);
  await writeJson("leads.json", leads);
  return lead;
}

export async function getOrders() {
  return readJson<CampaignOrder[]>("orders.json", []);
}

export async function addOrder(order: CampaignOrder) {
  const orders = await getOrders();
  orders.unshift(order);
  await writeJson("orders.json", orders);
  return order;
}

export async function getLoggedCalls() {
  return readJson<CallRecord[]>("calls.json", []);
}

export async function addCall(call: CallRecord) {
  const calls = await getLoggedCalls();
  const index = calls.findIndex((item) => item.id === call.id);
  if (index >= 0) {
    calls[index] = { ...calls[index], ...call };
  } else {
    calls.unshift(call);
  }
  await writeJson("calls.json", calls);
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
  await writeJson("calls.json", calls);
  return calls[index];
}

export async function getAllCalls() {
  const logged = await getLoggedCalls();
  const loggedIds = new Set(logged.map((call) => call.id));
  return [...logged, ...seedCalls.filter((call) => !loggedIds.has(call.id))].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  );
}
