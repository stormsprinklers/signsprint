"use client";

import { useState } from "react";

const trades = ["HVAC", "Plumbing", "Roofing", "Pest control", "Garage doors", "Lawn & landscape", "Other"];
const budgets = ["Under $1,500 / mo", "$1,500–$3,000 / mo", "$3,000–$6,000 / mo", "$6,000+ / mo"];
const times = ["Morning", "Afternoon", "Evening"];

export function InterestForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error || "Could not submit the form.");
      }
      setStatus("done");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-white/20 bg-white p-8 text-slate-900 shadow-2xl">
        <p className="font-display text-2xl font-semibold text-navy">You are on the calendar list.</p>
        <p className="mt-3 text-slate-600">
          A SignSprint strategist will reach out to book a 20-minute call. We will come with neighborhood coverage ideas and a tracking-number plan for your trade.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
      <p className="font-display text-2xl font-semibold text-navy">Book a sales call</p>
      <p className="mt-2 text-sm text-slate-600">
        Tell us your trade and service area. We will follow up with a print plan, not a generic pitch.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Name
          <input required name="name" className="field" placeholder="Jordan Lee" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Company
          <input required name="company" className="field" placeholder="Summit Plumbing" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email
          <input required type="email" name="email" className="field" placeholder="jordan@company.com" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Phone
          <input required name="phone" className="field" placeholder="(303) 555-0100" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Trade
          <select name="trade" className="field" defaultValue="HVAC">
            {trades.map((trade) => (
              <option key={trade}>{trade}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Service area
          <input name="area" className="field" placeholder="Denver Metro" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Monthly print budget
          <select name="budget" className="field" defaultValue="$1,500–$3,000 / mo">
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Best time to call
          <select name="preferredTime" className="field" defaultValue="Morning">
            {times.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
          What should we know?
          <textarea name="message" rows={3} className="field min-h-[88px] resize-y" placeholder="Neighborhoods you want, offers you run, or current marketing mix." />
        </label>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-6 w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-70"
      >
        {status === "saving" ? "Sending…" : "Request a sales call"}
      </button>
    </form>
  );
}
