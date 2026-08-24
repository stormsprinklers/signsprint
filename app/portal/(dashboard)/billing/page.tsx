import { billingProfile, invoices } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/format";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  const open = invoices.filter((invoice) => invoice.status !== "paid");
  const paid = invoices.filter((invoice) => invoice.status === "paid");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Billing</h1>
        <p className="mt-1 text-slate-600">Plan, payment method, and invoices for print, placement, and tracking.</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-3xl bg-navy p-6 text-white">
          <p className="text-sm text-blue-200">Current plan</p>
          <p className="mt-2 font-display text-3xl font-semibold">{billingProfile.plan}</p>
          <p className="mt-2 text-sm text-blue-100">
            {formatCurrency(billingProfile.monthlyMinimum)} monthly minimum · next bill {formatDate(billingProfile.nextBillDate)}
          </p>
        </article>
        <article className="rounded-3xl border border-line bg-white p-6">
          <p className="text-sm text-slate-500">Payment method</p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">{billingProfile.paymentMethod}</p>
          <p className="mt-2 text-sm text-slate-500">{billingProfile.autoPay ? "Auto-pay on" : "Auto-pay off"}</p>
          <button type="button" className="mt-4 text-sm font-semibold text-blue-700">
            Update card
          </button>
        </article>
        <article className="rounded-3xl border border-line bg-white p-6">
          <p className="text-sm text-slate-500">Open balance</p>
          <p className="mt-2 font-display text-2xl font-semibold text-navy">
            {formatCurrency(open.reduce((sum, invoice) => sum + invoice.amount, 0))}
          </p>
          <p className="mt-2 text-sm text-slate-500">{open.length} invoice waiting</p>
        </article>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Invoices</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="pb-3 font-medium">Invoice</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...open, ...paid].map((invoice) => (
                <tr key={invoice.id} className="border-t border-line">
                  <td className="py-3 font-medium text-navy">{invoice.id}</td>
                  <td className="py-3">{formatDate(invoice.date)}</td>
                  <td className="py-3">{invoice.description}</td>
                  <td className="py-3">{formatCurrency(invoice.amount)}</td>
                  <td className="py-3 capitalize">{invoice.status.replace("_", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
