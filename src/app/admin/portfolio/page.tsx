"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Upload, Play, Eye } from "lucide-react";
import Image from "next/image";

const API = "http://localhost:5000/api";
type Filter = "survey" | "industrial" | "cinematography";

interface PortfolioItem {
  id: number; title: string; category: string; filter: Filter;
  image_url: string; video_url: string | null; description: string; sort_order: number;
}

const emptyItem: Omit<PortfolioItem, "id"> = {
  title: "", category: "", filter: "survey", image_url: "", video_url: "", description: "", sort_order: 0,
};

const FILTER_COLORS: Record<Filter, string> = {
  survey: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  industrial: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  cinematography: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function AdminPortfolioPage() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState<Omit<PortfolioItem, "id">>(emptyItem);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState<"image" | "video" | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterTab, setFilterTab] = useState<"all" | Filter>("all");
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("skypilot_admin_auth") !== "true") { router.replace("/admin"); return; }
    fetchItems();
  }, [router]);

  const fetchItems = async () => {
    const data = await fetch(`${API}/portfolio`).then(r => r.json());
    setItems(Array.isArray(data) ? data : []);
  };

  const uploadFile = async (file: File, type: "image" | "video"): Promise<string> => {
    setUploading(type);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch(`${API}/upload`, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(null);
    return data.url;
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const openAdd = () => { setForm(emptyItem); setEditingId(null); setShowModal(true); };
  const openEdit = (item: PortfolioItem) => {
    setForm({ title: item.title, category: item.category, filter: item.filter, image_url: item.image_url, video_url: item.video_url || "", description: item.description, sort_order: item.sort_order });
    setEditingId(item.id); setShowModal(true);
  };

  const save = async () => {
    setSaving(true);
    const body = { ...form, video_url: form.video_url || null };
    const url = editingId ? `${API}/portfolio/${editingId}` : `${API}/portfolio`;
    await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false); setShowModal(false); fetchItems();
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`${API}/portfolio/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const filtered = filterTab === "all" ? items : items.filter(i => i.filter === filterTab);
  const counts = { all: items.length, survey: items.filter(i => i.filter === "survey").length, industrial: items.filter(i => i.filter === "industrial").length, cinematography: items.filter(i => i.filter === "cinematography").length };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-oswald text-3xl font-extrabold uppercase tracking-wider text-white">Portfolio</h1>
            <p className="font-inter text-gray-500 text-sm mt-1">Manage projects, images & videos</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-[var(--color-brand-orange)] text-black px-4 py-2.5 rounded-xl font-inter text-xs font-black tracking-wider hover:bg-orange-500 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["all", "survey", "industrial", "cinematography"] as const).map(f => (
            <button key={f} onClick={() => setFilterTab(f)}
              className={`px-4 py-2 rounded-full font-inter text-[10px] font-black tracking-widest uppercase transition-all border flex items-center gap-1.5 ${filterTab === f ? "bg-[var(--color-brand-orange)] border-transparent text-black" : "bg-transparent border-white/10 text-gray-400 hover:text-white"}`}>
              {f === "all" ? "All" : f} <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${filterTab === f ? "bg-black/20 text-black/70" : "bg-white/5 text-gray-600"}`}>{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Add New Card */}
          <button
            onClick={openAdd}
            className="bg-[#0d0d0d] border-2 border-dashed border-white/10 hover:border-[var(--color-brand-orange)]/50 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group min-h-[220px] hover:bg-[var(--color-brand-orange)]/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-[var(--color-brand-orange)]/15 border border-white/10 group-hover:border-[var(--color-brand-orange)]/30 flex items-center justify-center transition-all duration-300">
              <Plus className="w-6 h-6 text-gray-500 group-hover:text-[var(--color-brand-orange)] transition-colors" />
            </div>
            <div className="text-center px-4">
              <p className="font-oswald text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">Add New Project</p>
              <p className="font-inter text-[10px] text-gray-600 mt-0.5">Image, video & details</p>
            </div>
          </button>
          {filtered.map(item => (
            <div key={item.id} className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
              <div className="relative aspect-video bg-neutral-900">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-2 left-2 font-inter text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded-md border ${FILTER_COLORS[item.filter]}`}>{item.filter}</span>
                {item.video_url && <span className="absolute top-2 right-2 bg-[var(--color-brand-orange)]/90 text-black font-inter text-[8px] font-black px-2 py-0.5 rounded-md uppercase">VIDEO</span>}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  {item.video_url ? <Play className="w-8 h-8 text-white" /> : <Eye className="w-8 h-8 text-white" />}
                </div>
              </div>
              <div className="p-4">
                <p className="font-oswald text-white font-bold uppercase tracking-wide text-sm leading-tight mb-1">{item.title}</p>
                <p className="font-inter text-[var(--color-brand-orange)] text-[9px] font-bold tracking-wider uppercase mb-2">{item.category}</p>
                <p className="font-inter text-gray-500 text-[10px] leading-relaxed line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                  <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all font-inter text-[10px] font-bold">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-500/5 hover:bg-red-500/15 text-red-400 transition-all font-inter text-[10px] font-bold">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" style={{ overflow: 'hidden' }}>
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-oswald text-lg font-bold uppercase tracking-wider text-white">{editingId ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><X className="w-4 h-4" /></button>
            </div>
            <div className="overflow-y-auto flex-1 p-6 space-y-4">
              <Field label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Priya Cements Survey" />
              <Field label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} placeholder="e.g. Drone Survey & Progress Monitoring" />

              <div>
                <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Filter Type</label>
                <div className="flex gap-2">
                  {(["survey", "industrial", "cinematography"] as Filter[]).map(f => (
                    <button key={f} onClick={() => setForm(p => ({ ...p, filter: f }))}
                      className={`flex-1 py-2 rounded-xl font-inter text-[10px] font-black tracking-wider uppercase transition-all border ${form.filter === f ? "bg-[var(--color-brand-orange)] border-transparent text-black" : "border-white/10 text-gray-400 hover:text-white"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Thumbnail Image</label>
                <div className="flex gap-2">
                  <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="URL or upload" className="flex-1 bg-[#111] border border-white/[0.07] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-orange)]/50 placeholder:text-gray-700" />
                  <button onClick={() => imageRef.current?.click()} disabled={uploading === "image"} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 font-inter text-xs">
                    <Upload className="w-3.5 h-3.5" />{uploading === "image" ? "..." : "Upload"}
                  </button>
                </div>
                <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={async e => { if (e.target.files?.[0]) { const url = await uploadFile(e.target.files[0], "image"); setForm(f => ({ ...f, image_url: url })); }}} />
                {form.image_url && <div className="mt-2 aspect-video bg-neutral-900 rounded-xl overflow-hidden"><img src={form.image_url} className="w-full h-full object-cover" /></div>}
              </div>

              {/* Video upload */}
              <div>
                <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Video <span className="text-gray-600 normal-case tracking-normal font-normal">(optional)</span></label>
                <div className="flex gap-2">
                  <input value={form.video_url || ""} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} placeholder="URL or upload" className="flex-1 bg-[#111] border border-white/[0.07] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-orange)]/50 placeholder:text-gray-700" />
                  <button onClick={() => videoRef.current?.click()} disabled={uploading === "video"} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-1.5 font-inter text-xs">
                    <Upload className="w-3.5 h-3.5" />{uploading === "video" ? "..." : "Upload"}
                  </button>
                </div>
                <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={async e => { if (e.target.files?.[0]) { const url = await uploadFile(e.target.files[0], "video"); setForm(f => ({ ...f, video_url: url })); }}} />
                {form.video_url && <p className="mt-1 font-inter text-[9px] text-green-400">✓ Video attached</p>}
              </div>

              <div>
                <label className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Short project description..." className="w-full bg-[#111] border border-white/[0.07] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-orange)]/50 placeholder:text-gray-700 resize-none" />
              </div>
              <Field label="Sort Order" value={String(form.sort_order)} onChange={v => setForm(f => ({ ...f, sort_order: Number(v) }))} placeholder="0" type="number" />
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-white/5 flex-shrink-0">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white font-inter text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2"><X className="w-3.5 h-3.5" />Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-3 rounded-xl bg-[var(--color-brand-orange)] text-black hover:bg-orange-500 disabled:opacity-60 font-inter text-xs font-black tracking-wider transition-all flex items-center justify-center gap-2"><Check className="w-3.5 h-3.5" />{saving ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
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
