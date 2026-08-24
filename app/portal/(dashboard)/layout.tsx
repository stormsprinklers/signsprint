import { getSession } from "@/lib/auth";
import { PortalNav } from "@/components/portal/PortalNav";
import { redirect } from "next/navigation";

export default async function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/portal/login");

  return (
    <div className="flex min-h-full flex-col bg-ice lg:flex-row">
      <PortalNav company={session.company} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Customer portal</p>
            <p className="font-display text-lg font-semibold text-navy">{session.company}</p>
          </div>
          <form action="/api/auth/logout" method="POST" className="lg:hidden">
            <button type="submit" className="text-sm font-semibold text-navy">
              Sign out
            </button>
          </form>
        </header>
        <div className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</div>
      </div>
    </div>
  );
}
