"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Upload, Star } from "lucide-react";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://skypilot-be.vercel.app/api";


interface Client {
  id: number; name: string; logo_url: string; location: string; projects: string; sort_order: number;
}
interface Testimonial {
  id: number; tag: string; quote: string; author: string; role: string; rating: number; sort_order: number;
}

const emptyClient = { name: "", logo_url: "", location: "", projects: "", sort_order: 0 };
const emptyTestimonial = { tag: "", quote: "", author: "", role: "", rating: 5, sort_order: 0 };

export default function AdminClientsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"clients" | "testimonials">("clients");
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clientForm, setClientForm] = useState<Omit<Client, "id">>(emptyClient);
  const [testForm, setTestForm] = useState<Omit<Testimonial, "id">>(emptyTestimonial);
  const [editingClient, setEditingClient] = useState<number | null>(null);
  const [editingTest, setEditingTest] = useState<number | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("skypilot_admin_auth") !== "true") { router.replace("/admin"); return; }
    fetchAll();
  }, [router]);

  const fetchAll = async () => {
    const [c, t] = await Promise.all([
      fetch(`${API}/clients`).then(r => r.json()),
      fetch(`${API}/clients/testimonials`).then(r => r.json()),
    ]);
    setClients(Array.isArray(c) ? c : []);
    setTestimonials(Array.isArray(t) ? t : []);
  };

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch(`${API}/upload`, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    return data.url;
  };

  useEffect(() => {
    const anyOpen = showClientModal || showTestModal;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showClientModal, showTestModal]);

  // ── Clients ──────────────────────────────────────────────────
  const openAddClient = () => { setClientForm(emptyClient); setEditingClient(null); setShowClientModal(true); };
  const openEditClient = (c: Client) => { setClientForm({ name: c.name, logo_url: c.logo_url, location: c.location, projects: c.projects, sort_order: c.sort_order }); setEditingClient(c.id); setShowClientModal(true); };

  const saveClient = async () => {
    setSaving(true);
    const url = editingClient ? `${API}/clients/${editingClient}` : `${API}/clients`;
    await fetch(url, { method: editingClient ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(clientForm) });
    setSaving(false); setShowClientModal(false); fetchAll();
  };

  const deleteClient = async (id: number) => {
    if (!confirm("Delete this client?")) return;
    await fetch(`${API}/clients/${id}`, { method: "DELETE" });
    fetchAll();
  };

  // ── Testimonials ─────────────────────────────────────────────
  const openAddTest = () => { setTestForm(emptyTestimonial); setEditingTest(null); setShowTestModal(true); };
  const openEditTest = (t: Testimonial) => { setTestForm({ tag: t.tag, quote: t.quote, author: t.author, role: t.role, rating: t.rating, sort_order: t.sort_order }); setEditingTest(t.id); setShowTestModal(true); };

  const saveTest = async () => {
    setSaving(true);
    const url = editingTest ? `${API}/clients/testimonials/${editingTest}` : `${API}/clients/testimonials`;
    await fetch(url, { method: editingTest ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(testForm) });
    setSaving(false); setShowTestModal(false); fetchAll();
  };

  const deleteTest = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`${API}/clients/testimonials/${id}`, { method: "DELETE" });
    fetchAll();
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-oswald text-3xl font-extrabold uppercase tracking-wider text-white">Manage Clients</h1>
            <p className="font-inter text-gray-500 text-sm mt-1">Clients, logos & testimonials</p>
          </div>
          <button
            onClick={tab === "clients" ? openAddClient : openAddTest}
            className="flex items-center gap-2 bg-[var(--color-brand-orange)] text-black px-4 py-2.5 rounded-xl font-inter text-xs font-black tracking-wider hover:bg-orange-500 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add {tab === "clients" ? "Client" : "Testimonial"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["clients", "testimonials"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full font-inter text-xs font-bold tracking-widest uppercase transition-all border ${tab === t ? "bg-[var(--color-brand-orange)] border-transparent text-black" : "bg-transparent border-white/10 text-gray-400 hover:text-white"}`}>
              {t === "clients" ? `Clients (${clients.length})` : `Testimonials (${testimonials.length})`}
            </button>
          ))}
        </div>

        {/* Clients Grid */}
        {tab === "clients" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Add New Card */}
            <button
              onClick={openAddClient}
              className="bg-[#0d0d0d] border-2 border-dashed border-white/10 hover:border-[var(--color-brand-orange)]/50 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 group min-h-[180px] hover:bg-[var(--color-brand-orange)]/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[var(--color-brand-orange)]/15 border border-white/10 group-hover:border-[var(--color-brand-orange)]/30 flex items-center justify-center transition-all duration-300">
                <Plus className="w-5 h-5 text-gray-500 group-hover:text-[var(--color-brand-orange)] transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-oswald text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">Add New Client</p>
                <p className="font-inter text-[10px] text-gray-600 mt-0.5">Logo, name & location</p>
              </div>
            </button>
            {clients.map(c => (
              <div key={c.id} className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
                <div className="h-14 w-full bg-white rounded-xl flex items-center justify-center p-2 mb-4">
                  <img src={c.logo_url} alt={c.name} className="max-h-full max-w-full object-contain" />
                </div>
                <p className="font-oswald text-white font-bold uppercase tracking-wider text-sm">{c.name}</p>
                <p className="font-inter text-gray-500 text-[10px] mt-0.5">{c.location}</p>
                <span className="inline-block mt-2 font-inter text-[9px] text-[var(--color-brand-orange)] font-bold bg-[var(--color-brand-orange)]/10 px-2 py-0.5 rounded-full">{c.projects}</span>
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                  <button onClick={() => openEditClient(c)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all font-inter text-[10px] font-bold">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => deleteClient(c.id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-all font-inter text-[10px] font-bold">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials List */}
        {tab === "testimonials" && (
          <div className="space-y-4">
            {/* Add New Testimonial Card */}
            <button
              onClick={openAddTest}
              className="w-full bg-[#0d0d0d] border-2 border-dashed border-white/10 hover:border-[var(--color-brand-orange)]/50 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 group hover:bg-[var(--color-brand-orange)]/5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[var(--color-brand-orange)]/15 border border-white/10 group-hover:border-[var(--color-brand-orange)]/30 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                <Plus className="w-4 h-4 text-gray-500 group-hover:text-[var(--color-brand-orange)] transition-colors" />
              </div>
              <div className="text-left">
                <p className="font-oswald text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">Add New Testimonial</p>
                <p className="font-inter text-[10px] text-gray-600 mt-0.5">Quote, author & rating</p>
              </div>
            </button>
            {testimonials.map(t => (
              <div key={t.id} className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-inter text-[9px] text-[var(--color-brand-orange)] font-black tracking-widest uppercase bg-[var(--color-brand-orange)]/10 px-2.5 py-1 rounded-full border border-[var(--color-brand-orange)]/15">{t.tag}</span>
                      <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-[var(--color-brand-orange)] text-[var(--color-brand-orange)]" />)}</div>
                    </div>
                    <p className="font-inter text-gray-300 text-sm italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                    <p className="font-oswald text-white text-xs font-bold uppercase tracking-wider">{t.author} <span className="text-gray-500 font-inter normal-case tracking-normal font-normal">· {t.role}</span></p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEditTest(t)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteTest(t.id)} className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Client Modal */}
      {showClientModal && (
        <Modal title={editingClient ? "Edit Client" : "Add Client"} onClose={() => setShowClientModal(false)}>
          <div className="space-y-4">
            <Field label="Company Name" value={clientForm.name} onChange={v => setClientForm(f => ({ ...f, name: v }))} placeholder="e.g. LOGIC" />
            <div>
              <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Logo</label>
              <div className="flex gap-2">
                <input value={clientForm.logo_url} onChange={e => setClientForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="URL or upload below" className="flex-1 bg-[#111] border border-white/[0.07] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-orange)]/50 placeholder:text-gray-700" />
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 font-inter text-xs">
                  <Upload className="w-3.5 h-3.5" />{uploading ? "..." : "Upload"}
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async e => { if (e.target.files?.[0]) { const url = await uploadFile(e.target.files[0]); setClientForm(f => ({ ...f, logo_url: url })); }}} />
              {clientForm.logo_url && <div className="mt-2 h-12 bg-white rounded-lg flex items-center justify-center p-2"><img src={clientForm.logo_url} className="max-h-full object-contain" /></div>}
            </div>
            <Field label="Location" value={clientForm.location} onChange={v => setClientForm(f => ({ ...f, location: v }))} placeholder="e.g. Hyderabad, India" />
            <Field label="Projects" value={clientForm.projects} onChange={v => setClientForm(f => ({ ...f, projects: v }))} placeholder="e.g. 12 Projects" />
            <Field label="Sort Order" value={String(clientForm.sort_order)} onChange={v => setClientForm(f => ({ ...f, sort_order: Number(v) }))} placeholder="0" type="number" />
          </div>
          <ModalFooter onCancel={() => setShowClientModal(false)} onSave={saveClient} saving={saving} />
        </Modal>
      )}

      {/* Testimonial Modal */}
      {showTestModal && (
        <Modal title={editingTest ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setShowTestModal(false)}>
          <div className="space-y-4">
            <Field label="Tag / Service" value={testForm.tag} onChange={v => setTestForm(f => ({ ...f, tag: v }))} placeholder="e.g. Thermal Scanning" />
            <div>
              <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Quote</label>
              <textarea value={testForm.quote} onChange={e => setTestForm(f => ({ ...f, quote: e.target.value }))} rows={4} placeholder="Client testimonial..." className="w-full bg-[#111] border border-white/[0.07] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-orange)]/50 placeholder:text-gray-700 resize-none" />
            </div>
            <Field label="Author / Company" value={testForm.author} onChange={v => setTestForm(f => ({ ...f, author: v }))} placeholder="e.g. LOGIC" />
            <Field label="Role" value={testForm.role} onChange={v => setTestForm(f => ({ ...f, role: v }))} placeholder="e.g. Project Head" />
            <div>
              <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setTestForm(f => ({ ...f, rating: n }))} className={`p-1.5 rounded-lg transition-all ${testForm.rating >= n ? "text-[var(--color-brand-orange)]" : "text-gray-600"}`}>
                    <Star className={`w-5 h-5 ${testForm.rating >= n ? "fill-[var(--color-brand-orange)]" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
            <Field label="Sort Order" value={String(testForm.sort_order)} onChange={v => setTestForm(f => ({ ...f, sort_order: Number(v) }))} placeholder="0" type="number" />
          </div>
          <ModalFooter onCancel={() => setShowTestModal(false)} onSave={saveTest} saving={saving} />
        </Modal>
      )}
    </AdminLayout>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" style={{ overflow: 'hidden' }}>
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
        <div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0">
          <h2 className="font-oswald text-lg font-bold uppercase tracking-wider text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><X className="w-4 h-4" /></button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#111] border border-white/[0.07] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-orange)]/50 placeholder:text-gray-700" />
    </div>
  );
}

function ModalFooter({ onCancel, onSave, saving }: { onCancel: () => void; onSave: () => void; saving: boolean }) {
  return (
    <div className="flex gap-3 mt-6 pt-6 border-t border-white/5">
      <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white font-inter text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2"><X className="w-3.5 h-3.5" />Cancel</button>
      <button onClick={onSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-[var(--color-brand-orange)] text-black hover:bg-orange-500 disabled:opacity-60 font-inter text-xs font-black tracking-wider transition-all flex items-center justify-center gap-2"><Check className="w-3.5 h-3.5" />{saving ? "Saving..." : "Save"}</button>
    </div>
  );
}
