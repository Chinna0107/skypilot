"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, ImageIcon, LogOut, Shield, Eye } from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Manage Clients",  href: "/admin/clients",   icon: Users },
  { label: "Portfolio",       href: "/admin/portfolio", icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    sessionStorage.removeItem("skypilot_admin_auth");
    sessionStorage.removeItem("skypilot_admin_token");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0d0d0d] border-r border-white/5 fixed h-full z-40">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-brand-orange)] to-orange-700 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-oswald text-sm font-bold uppercase tracking-widest text-white">SkyPilot</p>
              <p className="font-inter text-[9px] text-gray-500 tracking-wider uppercase">Admin Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="font-inter text-[9px] text-gray-600 uppercase tracking-widest font-bold px-3 py-2 mb-1">Menu</p>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-inter text-xs font-semibold tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all">
            <Eye className="w-4 h-4" />
            <span className="font-inter text-xs font-semibold tracking-wider">View Live Site</span>
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="w-4 h-4" />
            <span className="font-inter text-xs font-semibold tracking-wider">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <div className="relative h-8 w-32">
          <Image src="/navbar-logo.png" alt="SkyPilot" fill className="object-contain object-left" />
        </div>
        <div className="flex items-center gap-2">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={`p-2 rounded-lg ${pathname === item.href ? "text-[var(--color-brand-orange)]" : "text-gray-500"}`}>
              <item.icon className="w-4 h-4" />
            </Link>
          ))}
          <button onClick={logout} className="p-2 rounded-lg text-gray-500 hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
