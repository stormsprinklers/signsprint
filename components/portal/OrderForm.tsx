"use client";

import { DOOR_HANGER_RATE, estimateOrder, neighborhoods, YARD_SIGN_RATE } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { useMemo, useState } from "react";

export function OrderForm() {
  const [yardSigns, setYardSigns] = useState(50);
  const [doorHangers, setDoorHangers] = useState(0);
  const [weeks, setWeeks] = useState(4);
  const [selected, setSelected] = useState<string[]>(["Cherry Creek"]);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const estimate = useMemo(
    () => estimateOrder({ yardSigns, doorHangers, weeks }),
    [yardSigns, doorHangers, weeks],
  );

  function toggleNeighborhood(name: string) {
    setSelected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const form = event.currentTarget;
    const payload = {
      yardSigns,
      doorHangers,
      weeks,
      neighborhoods: selected,
      startDate: String(new FormData(form).get("startDate") ?? ""),
      creativeNotes: String(new FormData(form).get("creativeNotes") ?? ""),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as { error?: string; order?: { id: string; estimatedTotal: number } };
      if (!response.ok) throw new Error(body.error || "Could not submit order.");
      setStatus("done");
      setMessage(`Order ${body.order?.id} submitted at ${formatCurrency(body.order?.estimatedTotal ?? estimate)}.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8">
        <h2 className="font-display text-2xl font-semibold text-navy">Order received</h2>
        <p className="mt-3 text-slate-600">{message} We will confirm inventory, proofs, and a tracking number before print.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5 rounded-3xl border border-line bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-navy">Print mix</h2>
        <label className="grid gap-1.5 text-sm font-medium">
          Yard signs
          <input
            type="number"
            min={0}
            step={10}
            className="field"
            value={yardSigns}
            onChange={(event) => setYardSigns(Number(event.target.value))}
          />
          <span className="font-normal text-slate-500">{formatCurrency(YARD_SIGN_RATE)} each, printed and staked</span>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Door hangers
          <input
            type="number"
            min={0}
            step={100}
            className="field"
            value={doorHangers}
            onChange={(event) => setDoorHangers(Number(event.target.value))}
          />
          <span className="font-normal text-slate-500">{formatCurrency(DOOR_HANGER_RATE)} each, printed and dropped</span>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium">
            Start date
            <input required name="startDate" type="date" className="field" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Duration (weeks)
            <input
              type="number"
              min={2}
              max={16}
              className="field"
              value={weeks}
              onChange={(event) => setWeeks(Number(event.target.value))}
            />
          </label>
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Neighborhoods</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {neighborhoods.map((name) => (
              <label key={name} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(name)}
                  onChange={() => toggleNeighborhood(name)}
                />
                {name}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-1.5 text-sm font-medium">
          Creative and special instructions
          <textarea name="creativeNotes" rows={4} className="field" placeholder="Offer, colors, exclusive streets, or artwork notes." />
        </label>
      </div>

      <aside className="h-fit space-y-4 rounded-3xl bg-navy p-6 text-white">
        <p className="text-sm text-blue-200">Estimated total</p>
        <p className="font-display text-4xl font-semibold">{formatCurrency(estimate)}</p>
        <p className="text-sm leading-6 text-blue-100">
          Includes print, placement, and a campaign tracking number for the flight. Final invoice follows proof approval.
        </p>
        {message && status === "error" ? <p className="text-sm text-red-200">{message}</p> : null}
        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy disabled:opacity-70"
        >
          {status === "saving" ? "Submitting…" : "Submit order"}
        </button>
      </aside>
    </form>
  );
}
