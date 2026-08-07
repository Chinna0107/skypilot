"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { TrendingUp, Eye, Camera, Map, Users, ImageIcon, ArrowUpRight, ChevronRight, Activity } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://skypilot-be.vercel.app/api";


export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ clients: 0, portfolio: 0, testimonials: 0 });
  const [recentProjects, setRecentProjects] = useState<{ title: string; filter: string; created_at: string }[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("skypilot_admin_auth") !== "true") { router.replace("/admin"); return; }
    setMounted(true);
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    const [clients, portfolio, testimonials] = await Promise.all([
      fetch(`${API}/clients`).then(r => r.json()),
      fetch(`${API}/portfolio`).then(r => r.json()),
      fetch(`${API}/clients/testimonials`).then(r => r.json()),
    ]);
    setStats({
      clients: Array.isArray(clients) ? clients.length : 0,
      portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
      testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
    });
    setRecentProjects(Array.isArray(portfolio) ? portfolio.slice(0, 5) : []);
  };

  if (!mounted) return null;

  const STATS = [
    { label: "Portfolio Projects", value: stats.portfolio, icon: Camera, color: "from-orange-500 to-orange-700" },
    { label: "Active Clients",     value: stats.clients,   icon: Users,  color: "from-blue-500 to-blue-700" },
    { label: "Testimonials",       value: stats.testimonials, icon: Activity, color: "from-purple-500 to-purple-700" },
    { label: "Survey Missions",    value: "120+",          icon: Map,    color: "from-green-500 to-green-700" },
  ];

  const QUICK_LINKS = [
    { label: "Manage Clients",  href: "/admin/clients",   icon: Users,     desc: "Client logos & testimonials" },
    { label: "Portfolio",       href: "/admin/portfolio", icon: ImageIcon, desc: "Projects, images & videos" },
    { label: "View Live Site",  href: "/",                icon: Eye,       desc: "Public-facing website" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-inter text-[10px] text-green-400 font-bold tracking-widest uppercase">System Online</span>
          </div>
          <h1 className="font-oswald text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-white">Operations Dashboard</h1>
          <p className="font-inter text-gray-500 text-sm mt-1">Welcome back, Admin · SkyPilot Drone Services</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-inter text-[9px] text-green-400 font-bold tracking-wider bg-green-400/10 px-2 py-1 rounded-full">Live</span>
              </div>
              <p className="font-oswald text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="font-inter text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-oswald text-lg font-bold uppercase tracking-wider text-white">Recent Projects</h2>
                <p className="font-inter text-[10px] text-gray-500 mt-0.5">Latest portfolio entries</p>
              </div>
              <Link href="/admin/portfolio" className="flex items-center gap-1 font-inter text-[10px] text-[var(--color-brand-orange)] font-bold tracking-wider hover:underline">
                Manage All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentProjects.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0 group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/15 flex items-center justify-center">
                      <Camera className="w-3.5 h-3.5 text-[var(--color-brand-orange)]" />
                    </div>
                    <div>
                      <p className="font-inter text-xs font-semibold text-white group-hover:text-[var(--color-brand-orange)] transition-colors">{p.title}</p>
                      <p className="font-inter text-[10px] text-gray-500 capitalize">{p.filter}</p>
                    </div>
                  </div>
                  <span className="font-inter text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-green-400/10 text-green-400">Live</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="font-oswald text-lg font-bold uppercase tracking-wider text-white">Quick Access</h2>
              <p className="font-inter text-[10px] text-gray-500 mt-0.5">Navigate to key sections</p>
            </div>
            <div className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-brand-orange)]/30 hover:bg-[var(--color-brand-orange)]/5 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-brand-orange)]/15 transition-colors">
                      <link.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--color-brand-orange)] transition-colors" />
                    </div>
                    <div>
                      <p className="font-inter text-xs font-semibold text-white">{link.label}</p>
                      <p className="font-inter text-[9px] text-gray-500">{link.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-[var(--color-brand-orange)] transition-colors" />
                </Link>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-orange-900/5 border border-[var(--color-brand-orange)]/15">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[var(--color-brand-orange)]" />
                <p className="font-inter text-xs font-bold text-white tracking-wider">Content Overview</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Clients", pct: Math.min(100, stats.clients * 10) },
                  { label: "Portfolio", pct: Math.min(100, stats.portfolio * 8) },
                  { label: "Testimonials", pct: Math.min(100, stats.testimonials * 12) },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-inter text-[9px] text-gray-400">{item.label}</span>
                      <span className="font-inter text-[9px] text-[var(--color-brand-orange)] font-bold">{item.pct}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-400 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
