import { OrderForm } from "@/components/portal/OrderForm";
import { getOrders } from "@/lib/store";
import { formatCurrency, formatDate, mediumLabel } from "@/lib/format";

export const metadata = { title: "New order" };

export default async function OrderPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">New campaign order</h1>
        <p className="mt-1 text-slate-600">
          Request yard signs, door hangers, or both. We assign a tracking number and add the flight to your map after print.
        </p>
      </div>
      <OrderForm />
      {orders.length > 0 ? (
        <section className="rounded-3xl border border-line bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-navy">Submitted orders</h2>
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-line px-4 py-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-navy">{order.id}</p>
                  <p>{formatCurrency(order.estimatedTotal)}</p>
                </div>
                <p className="mt-1 text-slate-500">
                  {order.mediums.map(mediumLabel).join(" + ")} · starts {formatDate(order.startDate)} · {order.weeks} weeks
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
