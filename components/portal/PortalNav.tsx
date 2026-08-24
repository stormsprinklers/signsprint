"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  LayoutDashboard,
  MapPinned,
  PhoneCall,
  PlusSquare,
  Signpost,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/portal", label: "Overview", icon: LayoutDashboard },
  { href: "/portal/campaigns", label: "Campaigns", icon: Signpost },
  { href: "/portal/map", label: "Live map", icon: MapPinned },
  { href: "/portal/calls", label: "Calls & leads", icon: PhoneCall },
  { href: "/portal/order", label: "New order", icon: PlusSquare },
  { href: "/portal/billing", label: "Billing", icon: CreditCard },
];

export function PortalNav({ company }: { company: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-navy text-white lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-5 py-4 lg:block">
        <Link href="/portal">
          <Logo inverted />
        </Link>
        <p className="hidden pt-3 text-xs text-blue-200 lg:block">{company}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-0">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/portal" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium ${
                active ? "bg-white text-navy" : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action="/api/auth/logout" method="POST" className="hidden p-4 lg:block">
        <button type="submit" className="w-full rounded-xl border border-white/20 px-3 py-2 text-sm text-blue-100 hover:bg-white/10">
          Sign out
        </button>
      </form>
    </aside>
  );
}
