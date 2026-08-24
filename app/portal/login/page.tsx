import { Logo } from "@/components/Logo";
import { customer, DEMO_PASSWORD } from "@/lib/data";
import Link from "next/link";

export const metadata = { title: "Portal login" };

export default async function LoginPage({ searchParams }: PageProps<"/portal/login">) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full flex-col bg-ice">
      <header className="mx-auto flex w-full max-w-md items-center justify-between px-5 py-6">
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/" className="text-sm font-medium text-slate-500">
          Back to site
        </Link>
      </header>
      <main className="mx-auto w-full max-w-md px-5 pb-16">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-sm">
          <h1 className="font-display text-2xl font-semibold text-navy">Customer portal</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to campaigns, live placement maps, call tracking, billing, and new orders.
          </p>
          {error ? (
            <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              That email or password did not match.
            </p>
          ) : null}
          <form action="/api/auth/login" method="POST" className="mt-6 grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <input name="email" type="email" required className="field" defaultValue={customer.email} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Password
              <input name="password" type="password" required className="field" defaultValue={DEMO_PASSWORD} />
            </label>
            <button type="submit" className="rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
              Sign in
            </button>
          </form>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Demo account is prefilled: {customer.email} / {DEMO_PASSWORD}. This is sample data for Apex Heating & Air.
          </p>
        </div>
      </main>
    </div>
  );
}
