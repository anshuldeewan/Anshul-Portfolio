"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { Send, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"sent">("idle");
  const [focused, setFocused] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200)); setStatus("sent");
  };

  return (
    <section id="contact" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[350px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="section-label mx-auto mb-4 w-fit">05 / Contact</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-theme mb-4">Let&apos;s Build <span className="gradient-text">Together</span></h2>
          <p className="max-w-xl mx-auto text-theme2 text-base sm:text-lg">Open to full-time roles, freelance projects, and AI system engineering collaborations.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info Side */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.15 }} className="space-y-4">
            <div className="glass-card rounded-2xl border border-theme p-6 card-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">Open to Work</span>
              </div>
              <h3 className="text-theme font-extrabold text-lg mb-2">Available for Opportunities</h3>
              <p className="text-theme2 text-sm leading-relaxed">Looking for full-time AI/ML engineering roles. Also open to high-impact projects involving LLMs, AI agents, or production web apps.</p>
            </div>

            {[
              { icon: <Mail size={15} />, label: "Email", val: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}`, color: "#635bff" },
              { icon: <FaGithub size={15} />, label: "GitHub", val: "github.com/anshuldeewan", href: SITE_CONFIG.github, color: "#8b5cf6" },
              { icon: <FaLinkedin size={15} />, label: "LinkedIn", val: "linkedin.com/in/anshul-deewan", href: SITE_CONFIG.linkedin, color: "#0ea5e9" },
              { icon: <MapPin size={15} />, label: "Location", val: "India · VIT University", href: null, color: "#10b981" },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-xl glass-card border border-theme hover:border-indigo-400/50 transition-all cursor-pointer group card-shadow"
                onClick={() => item.href && window.open(item.href)}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}>{item.icon}</div>
                <div>
                  <p className="text-xs text-theme3 font-semibold">{item.label}</p>
                  <p className="text-theme text-sm font-bold group-hover:text-indigo-500 transition-colors">{item.val}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Side */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.25 }}>
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full glass-card rounded-2xl border border-emerald-500/30 p-10 flex flex-col items-center justify-center text-center card-shadow">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}>
                  <CheckCircle size={56} className="text-emerald-500 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-theme mb-2">Message Delivered!</h3>
                <p className="text-theme2 text-sm max-w-xs">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 px-5 py-2.5 rounded-xl surface border border-theme text-xs font-semibold text-theme2 hover:text-theme transition-colors">Send Another Message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-theme p-7 space-y-5 card-shadow">
                {[
                  { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[11px] font-bold text-theme3 uppercase tracking-widest mb-2">{f.label}</label>
                    <input type={f.type} value={form[f.key as "name"|"email"]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      onFocus={() => setFocused(f.key)} onBlur={() => setFocused(null)}
                      required placeholder={f.placeholder} className="input-theme w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all"
                      style={{ borderColor: focused === f.key ? "var(--c-primary)" : undefined, boxShadow: focused === f.key ? "0 0 0 3px var(--c-glow-strong)" : undefined }} />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-bold text-theme3 uppercase tracking-widest mb-2">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                    rows={4} required placeholder="Tell me about your project or role..." className="input-theme w-full rounded-xl px-4 py-3 text-sm outline-none resize-none border transition-all"
                    style={{ borderColor: focused === "msg" ? "var(--c-primary)" : undefined, boxShadow: focused === "msg" ? "0 0 0 3px var(--c-glow-strong)" : undefined }} />
                </div>
                <motion.button type="submit" disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl btn-primary text-sm font-semibold disabled:opacity-60 shadow-lg"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {status === "loading" ? <><Loader2 size={16} className="animate-spin" />Sending Message…</> : <><Send size={15} />Send Message</>}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

