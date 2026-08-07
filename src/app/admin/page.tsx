"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Shield, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("skypilot_admin_auth") === "true") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "https://skypilot-be.vercel.app/api"}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      sessionStorage.setItem("skypilot_admin_auth", "true");
      sessionStorage.setItem("skypilot_admin_token", data.token);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] flex overflow-hidden">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12">
        {/* Background video */}
        <video
          src="/videos/hero-bg.MP4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-dark)] via-[var(--color-brand-dark)]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark)] via-transparent to-transparent z-10" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Logo */}
        <div className="relative z-20">
          <div className="relative h-16 w-52">
            <Image src="/navbar-logo.png" alt="SkyPilot" fill className="object-contain object-left" />
          </div>
        </div>

        {/* Center text */}
        <div className="relative z-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-[var(--color-brand-orange)]" />
            <span className="font-inter text-[10px] text-[var(--color-brand-orange)] font-black tracking-[0.3em] uppercase">
              Admin Portal
            </span>
          </div>
          <h2 className="font-oswald text-5xl xl:text-6xl font-extrabold uppercase tracking-tight text-white leading-none mb-6">
            Operations<br />
            <span className="text-[var(--color-brand-orange)]">Control</span><br />
            Center
          </h2>
          <p className="font-inter text-gray-400 text-sm leading-relaxed max-w-sm">
            Manage drone projects, client portfolios, and service operations from a single secure dashboard.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="relative z-20 flex gap-8">
          {[
            { value: "8", label: "Projects" },
            { value: "24", label: "Clients" },
            { value: "120+", label: "Missions" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-oswald text-2xl font-extrabold text-white">{s.value}</p>
              <p className="font-inter text-[10px] text-gray-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Ambient glow */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="relative h-12 w-44">
              <Image src="/navbar-logo.png" alt="SkyPilot" fill className="object-contain" />
            </div>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/20 px-4 py-2 rounded-full">
              <Shield className="w-3 h-3 text-[var(--color-brand-orange)]" />
              <span className="font-inter text-[9px] font-black tracking-[0.25em] uppercase text-[var(--color-brand-orange)]">
                Secure Admin Portal
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-[#0d0d0d] border border-white/[0.07] rounded-3xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            {/* Icon + Title */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-brand-orange)] to-orange-700 flex items-center justify-center shadow-[0_0_30px_rgba(245,133,31,0.35)]">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0d0d0d] flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-white fill-white" />
                </div>
              </div>
              <h1 className="font-oswald text-2xl font-bold uppercase tracking-widest text-white text-center">
                SkyPilot Admin
              </h1>
              <p className="font-inter text-[10px] text-gray-500 mt-1.5 tracking-wider">
                Sign in to your admin account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">
                  Username or Email
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="skypilot_admin"
                  className="w-full bg-[#111] border border-white/[0.07] focus:border-[var(--color-brand-orange)]/50 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-gray-700"
                />
              </div>
              <div>
                <label className="block text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-[#111] border border-white/[0.07] focus:border-[var(--color-brand-orange)]/50 rounded-xl py-3.5 px-4 pr-12 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-[10px] font-bold mt-2 tracking-wide flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-500 disabled:opacity-60 text-black font-inter text-xs font-black tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,133,31,0.25)] hover:shadow-[0_4px_35px_rgba(245,133,31,0.45)] mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Unlock Console
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/[0.05] text-center">
              <p className="text-[9px] text-gray-600 leading-relaxed">
                Use your admin credentials to sign in
              </p>
            </div>
          </div>

          <p className="text-center text-[9px] text-gray-700 mt-6 tracking-wider">
            © 2025 SkyPilot Drone Services · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
