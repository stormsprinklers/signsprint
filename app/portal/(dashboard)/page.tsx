import { CampaignMap } from "@/components/portal/CampaignMap";
import {
  campaigns,
  dashboardStats,
  getCampaignStats,
  placements,
} from "@/lib/data";
import { formatCurrency, formatDateTime, formatPhone } from "@/lib/format";
import { getAllCalls } from "@/lib/store";
import Link from "next/link";

export const metadata = { title: "Overview" };

export default async function PortalHomePage() {
  const calls = await getAllCalls();
  const stats = dashboardStats(calls);
  const recent = calls.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Campaign overview</h1>
        <p className="mt-1 text-slate-600">Spend, tracked calls, and print currently on the ground.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Ad spend", value: formatCurrency(stats.spend), hint: `${formatCurrency(stats.budget)} budget` },
          { label: "Calls", value: String(stats.calls), hint: "All tracking numbers" },
          { label: "Leads", value: String(stats.leads), hint: "Completed, forwarded calls" },
          { label: "Cost / lead", value: formatCurrency(stats.costPerLead), hint: `${stats.placements} placements live` },
        ].map((card) => (
          <article key={card.label} className="rounded-3xl border border-line bg-white p-5">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-navy">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-navy">Active campaigns</h2>
            <Link href="/portal/campaigns" className="text-sm font-semibold text-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {campaigns.map((campaign) => {
              const campaignStats = getCampaignStats(campaign.id, calls);
              return (
                <Link
                  key={campaign.id}
                  href={`/portal/campaigns/${campaign.id}`}
                  className="block rounded-2xl border border-line px-4 py-3 hover:bg-ice"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy">{campaign.name}</p>
                      <p className="text-sm text-slate-500">{formatPhone(campaign.trackingNumber)}</p>
                    </div>
                    <span className="rounded-full bg-ice px-2.5 py-1 text-xs font-semibold capitalize text-blue-700">
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-500">
                    <p>Spend {formatCurrency(campaign.spent)}</p>
                    <p>{campaignStats.calls} calls</p>
                    <p>{campaignStats.leads} leads</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </article>

        <article className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-navy">Live placements</h2>
            <Link href="/portal/map" className="text-sm font-semibold text-blue-700">
              Open map
            </Link>
          </div>
          <div className="h-[320px]">
            <CampaignMap placements={placements.filter((item) => item.status !== "removed")} className="rounded-none" />
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-navy">Recent calls</h2>
          <Link href="/portal/calls" className="text-sm font-semibold text-blue-700">
            Call log
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="pb-3 font-medium">When</th>
                <th className="pb-3 font-medium">From</th>
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((call) => {
                const campaign = campaigns.find((item) => item.id === call.campaignId);
                return (
                  <tr key={call.id} className="border-t border-line">
                    <td className="py-3">{formatDateTime(call.startedAt)}</td>
                    <td className="py-3">{formatPhone(call.from)}</td>
                    <td className="py-3">{campaign?.name ?? "Unassigned"}</td>
                    <td className="py-3 capitalize">{call.status.replace("-", " ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
