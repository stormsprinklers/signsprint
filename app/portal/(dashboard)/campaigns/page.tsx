import { campaigns, getCampaignStats } from "@/lib/data";
import { formatCurrency, formatDate, formatPhone, mediumLabel } from "@/lib/format";
import { getAllCalls } from "@/lib/store";
import Link from "next/link";

export const metadata = { title: "Campaigns" };

export default async function CampaignsPage() {
  const calls = await getAllCalls();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">Campaigns</h1>
          <p className="mt-1 text-slate-600">Spend, tracking numbers, and lead volume by print program.</p>
        </div>
        <Link href="/portal/order" className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
          New order
        </Link>
      </div>
      <div className="grid gap-4">
        {campaigns.map((campaign) => {
          const stats = getCampaignStats(campaign.id, calls);
          const progress = Math.min(100, Math.round((campaign.spent / campaign.budget) * 100));
          return (
            <Link
              key={campaign.id}
              href={`/portal/campaigns/${campaign.id}`}
              className="rounded-3xl border border-line bg-white p-6 hover:border-blue-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-semibold text-navy">{campaign.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {campaign.mediums.map(mediumLabel).join(" + ")} · {formatPhone(campaign.trackingNumber)}
                  </p>
                </div>
                <span className="rounded-full bg-ice px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                  {campaign.status}
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-4">
                <Stat label="Spend" value={formatCurrency(campaign.spent)} />
                <Stat label="Budget" value={formatCurrency(campaign.budget)} />
                <Stat label="Calls" value={String(stats.calls)} />
                <Stat label="Leads" value={String(stats.leads)} />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-mist">
                <div className="h-full rounded-full bg-blue-700" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)} · {campaign.neighborhoods.join(", ")}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-navy">{value}</p>
    </div>
  );
}
