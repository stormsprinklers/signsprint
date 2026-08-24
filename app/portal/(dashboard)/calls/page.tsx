import { campaigns } from "@/lib/data";
import { formatDateTime, formatDuration, formatPhone } from "@/lib/format";
import { getAllCalls } from "@/lib/store";

export const metadata = { title: "Calls & leads" };

export default async function CallsPage() {
  const calls = await getAllCalls();
  const leads = calls.filter((call) => call.status === "completed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Calls and leads</h1>
        <p className="mt-1 text-slate-600">
          Every inbound call to a campaign tracking number is forwarded over Twilio and logged here. {leads} completed leads in this view.
        </p>
      </div>
      <section className="overflow-hidden rounded-3xl border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-ice text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">When</th>
                <th className="px-5 py-3 font-medium">From</th>
                <th className="px-5 py-3 font-medium">Tracking #</th>
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => {
                const campaign = campaigns.find((item) => item.id === call.campaignId);
                return (
                  <tr key={call.id} className="border-t border-line">
                    <td className="px-5 py-3">{formatDateTime(call.startedAt)}</td>
                    <td className="px-5 py-3">{formatPhone(call.from)}</td>
                    <td className="px-5 py-3">{formatPhone(call.to)}</td>
                    <td className="px-5 py-3">{campaign?.name ?? "Unassigned"}</td>
                    <td className="px-5 py-3">{formatDuration(call.durationSec)}</td>
                    <td className="px-5 py-3 capitalize">{call.status.replace("-", " ")}</td>
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
