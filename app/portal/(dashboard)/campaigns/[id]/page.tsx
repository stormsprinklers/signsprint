import { CampaignMap } from "@/components/portal/CampaignMap";
import { getCampaign, getCampaignStats, placements } from "@/lib/data";
import { formatCurrency, formatDate, formatDateTime, formatDuration, formatPhone, mediumLabel } from "@/lib/format";
import { getAllCalls } from "@/lib/store";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/portal/campaigns/[id]">) {
  const { id } = await params;
  const campaign = getCampaign(id);
  return { title: campaign?.name ?? "Campaign" };
}

export default async function CampaignDetailPage({ params }: PageProps<"/portal/campaigns/[id]">) {
  const { id } = await params;
  const campaign = getCampaign(id);
  if (!campaign) notFound();

  const calls = (await getAllCalls()).filter((call) => call.campaignId === campaign.id);
  const stats = getCampaignStats(campaign.id, calls);
  const campaignPlacements = placements.filter((item) => item.campaignId === campaign.id);
  const progress = Math.min(100, Math.round((campaign.spent / campaign.budget) * 100));

  return (
    <div className="space-y-6">
      <div>
        <Link href="/portal/campaigns" className="text-sm font-semibold text-blue-700">
          ← All campaigns
        </Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold text-navy">{campaign.name}</h1>
            <p className="mt-1 text-slate-600">
              {campaign.mediums.map(mediumLabel).join(" + ")} · {formatPhone(campaign.trackingNumber)}
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-blue-700">
            {campaign.status}
          </span>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card label="Ad spend" value={formatCurrency(campaign.spent)} hint={`${progress}% of ${formatCurrency(campaign.budget)}`} />
        <Card label="Calls" value={String(stats.calls)} hint={`${stats.missed} missed or busy`} />
        <Card label="Leads" value={String(stats.leads)} hint="Completed forwards" />
        <Card label="Avg. talk time" value={formatDuration(stats.avgDuration)} hint="Completed calls" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-navy">Placement map</h2>
            <p className="text-sm text-slate-500">{campaign.neighborhoods.join(" · ")}</p>
          </div>
          <div className="h-[380px]">
            <CampaignMap placements={campaignPlacements} className="rounded-none" />
          </div>
        </article>
        <article className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy">Campaign notes</h2>
          <p className="mt-3 leading-7 text-slate-600">{campaign.notes}</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <dt className="text-slate-500">Flight</dt>
              <dd>{formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <dt className="text-slate-500">Forwarding</dt>
              <dd>Apex on-call line</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <dt className="text-slate-500">Placements</dt>
              <dd>{campaignPlacements.filter((item) => item.status === "placed").length} live</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Call log</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="pb-3 font-medium">When</th>
                <th className="pb-3 font-medium">From</th>
                <th className="pb-3 font-medium">Duration</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="border-t border-line">
                  <td className="py-3">{formatDateTime(call.startedAt)}</td>
                  <td className="py-3">{formatPhone(call.from)}</td>
                  <td className="py-3">{formatDuration(call.durationSec)}</td>
                  <td className="py-3 capitalize">{call.status.replace("-", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-3xl border border-line bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-navy">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </article>
  );
}
