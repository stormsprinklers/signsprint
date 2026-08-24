import { InterestForm } from "@/components/InterestForm";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  MapPinned,
  Megaphone,
  PhoneCall,
  Printer,
  ShieldCheck,
  Signpost,
} from "lucide-react";
import Link from "next/link";

const nav = [
  { href: "#offer", label: "What we do" },
  { href: "#how", label: "How it works" },
  { href: "#tracking", label: "Call tracking" },
  { href: "#pricing", label: "Programs" },
  { href: "#book", label: "Book a call" },
];

const offers = [
  {
    icon: Signpost,
    title: "Yard signs",
    body: "Weatherproof 18x24 signs, professionally staked in the neighborhoods that actually buy your service. We restake, replace, and retire them on a schedule.",
  },
  {
    icon: Megaphone,
    title: "Door hangers",
    body: "High-coverage drops for offers that need volume. Every-other-door or saturation routes, with photos and counts logged to your campaign map.",
  },
  {
    icon: PhoneCall,
    title: "Tracked phone numbers",
    body: "Each campaign gets a local Twilio number. Homeowners call the print. We forward to your office or on-call tech and log the lead.",
  },
  {
    icon: MapPinned,
    title: "Live placement map",
    body: "See every sign and hanger route on a map, by neighborhood and medium. Know where print is working before you spend the next dollar.",
  },
];

const steps = [
  {
    n: "01",
    title: "Pick neighborhoods and an offer",
    body: "You tell us the trade, the ZIP codes, and the promotion. We size a yard-sign, hanger, or combo drop.",
  },
  {
    n: "02",
    title: "We print, place, and assign numbers",
    body: "Creative is proofed, inventory is printed, and a unique tracking number is printed on every piece.",
  },
  {
    n: "03",
    title: "Calls forward to your team",
    body: "When a homeowner calls, Twilio rings your forwarding number. You see the caller ID. We capture the lead.",
  },
  {
    n: "04",
    title: "Watch spend, calls, and coverage",
    body: "Your portal shows ad spend, call volume, and a live map so you can double down on what is ringing.",
  },
];

const programs = [
  {
    name: "Starter",
    price: "$1,800",
    cadence: "per month",
    detail: "One neighborhood, one medium, one tracking number.",
    points: ["50 yard signs or 1,500 hangers", "Weekly restake / one drop", "Customer portal access"],
  },
  {
    name: "Growth",
    price: "$3,400",
    cadence: "per month",
    detail: "The mix most HVAC and plumbing companies run.",
    points: ["200 signs + 2,000 hangers", "Two tracking numbers", "Live map + monthly recap"],
    featured: true,
  },
  {
    name: "Sweep",
    price: "Custom",
    cadence: "multi-city",
    detail: "Saturation for brands covering a full metro.",
    points: ["Multi-neighborhood coverage", "Shared or exclusive routes", "Dedicated campaign manager"],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-blue-100/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" aria-label="SignSprint home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-navy">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/portal/login" className="hidden text-sm font-semibold text-navy sm:inline">
              Customer portal
            </Link>
            <a
              href="#book"
              className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Book a call
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-navy text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                Print advertising for home services
              </p>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Yard signs and door hangers that make the phone ring.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">
                SignSprint prints, places, and tracks neighborhood campaigns for HVAC, plumbing, roofing, and other home-service teams. Every piece carries a unique number. Every call forwards to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-blue-50"
                >
                  Book a sales call <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/portal/login"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  View a live portal
                </Link>
              </div>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm">
                <div>
                  <dt className="text-blue-200">Tracked calls</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">Local #</dd>
                </div>
                <div>
                  <dt className="text-blue-200">Placement proof</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">Live map</dd>
                </div>
                <div>
                  <dt className="text-blue-200">Forwarding</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">Twilio</dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-3xl bg-white p-5 text-slate-900">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Campaign line</p>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Forwarding live
                    </span>
                  </div>
                  <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy">(720) 555-0142</p>
                  <p className="mt-1 text-sm text-slate-500">Rings Apex Heating & Air · Spring Tune-Up signs</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-ice p-3">
                      <p className="text-slate-500">This week</p>
                      <p className="mt-1 font-display text-xl font-semibold text-navy">18 calls</p>
                    </div>
                    <div className="rounded-2xl bg-ice p-3">
                      <p className="text-slate-500">Cost / lead</p>
                      <p className="mt-1 font-display text-xl font-semibold text-navy">$47</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {["Cherry Creek · yard sign", "Wash Park · yard sign", "Lakewood · door hanger"].map((row) => (
                      <div key={row} className="flex items-center justify-between rounded-xl border border-line px-3 py-2 text-sm">
                        <span>{row}</span>
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-ice">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-slate-600">
            <p className="font-medium text-navy">Built for local home-service brands</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-display text-sm font-semibold tracking-wide text-slate-400">
              <span>HVAC</span>
              <span>Plumbing</span>
              <span>Roofing</span>
              <span>Pest control</span>
              <span>Garage doors</span>
            </div>
          </div>
        </section>

        <section id="offer" className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">What we offer</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Neighborhood coverage with a number on every piece.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {offers.map((offer) => (
              <article key={offer.title} className="rounded-3xl border border-line bg-white p-7">
                <offer.icon className="h-6 w-6 text-blue-700" />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">{offer.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{offer.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="bg-ice py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              From proof to placements in one operating system.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <article key={step.n} className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="font-display text-sm font-semibold text-blue-700">{step.n}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tracking" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Twilio call forwarding</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Print gets a phone number. Your techs get the lead.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Each campaign uses a local tracking number. When someone calls off a sign or hanger, Twilio hits SignSprint, we match the campaign, and the call is bridged to your forwarding line. Duration, source, and outcome land in the portal.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                "Unique number per campaign or neighborhood",
                "Caller ID passed through to your office",
                "Missed, busy, and completed calls logged automatically",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-navy p-6 text-white">
            <div className="flex items-center gap-3 text-sm text-blue-100">
              <Printer className="h-4 w-4" />
              Inbound webhook
            </div>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/25 p-4 text-xs leading-6 text-blue-50">
{`POST /api/twilio/voice
Called  (720) 555-0142
From    homeowner
→ match Spring Tune-Up
→ Dial Apex Heating & Air`}
            </pre>
            <p className="mt-4 text-sm text-blue-100">
              Configure the number’s voice webhook to this app. We return TwiML that forwards and then record the result.
            </p>
          </div>
        </section>

        <section id="pricing" className="bg-ice py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Programs</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Sized for a route, not a billboard.
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {programs.map((program) => (
                <article
                  key={program.name}
                  className={`rounded-3xl p-7 ${program.featured ? "bg-navy text-white shadow-xl" : "border border-line bg-white"}`}
                >
                  <p className={`text-sm font-semibold ${program.featured ? "text-blue-200" : "text-blue-700"}`}>
                    {program.name}
                  </p>
                  <p className="mt-3 font-display text-4xl font-semibold">
                    {program.price}
                    <span className={`ml-2 text-base font-medium ${program.featured ? "text-blue-200" : "text-slate-500"}`}>
                      {program.cadence}
                    </span>
                  </p>
                  <p className={`mt-3 text-sm ${program.featured ? "text-blue-100" : "text-slate-600"}`}>{program.detail}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {program.points.map((point) => (
                      <li key={point}>· {point}</li>
                    ))}
                  </ul>
                  <a
                    href="#book"
                    className={`mt-8 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                      program.featured ? "bg-white text-navy" : "bg-blue-700 text-white"
                    }`}
                  >
                    Talk through a plan
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="bg-navy py-20 text-white">
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Book a sales call</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                See if SignSprint fits your routes.
              </h2>
              <p className="mt-4 leading-7 text-blue-100">
                Twenty minutes. We will look at your service area, sketch a first drop, and show how tracking numbers show up in the customer portal.
              </p>
              <p className="mt-8 text-sm text-blue-200">
                Already a customer?{" "}
                <Link href="/portal/login" className="font-semibold text-white underline decoration-white/40">
                  Open the portal
                </Link>
              </p>
            </div>
            <InterestForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p>Yard signs, door hangers, and tracked calls for home services.</p>
        </div>
      </footer>
    </div>
  );
}
