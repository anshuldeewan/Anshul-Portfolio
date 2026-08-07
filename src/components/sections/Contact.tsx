"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { Send, Mail, MapPin, CheckCircle, Loader2, Phone, Copy, Check, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"sent">("idle");
  const [focused, setFocused] = useState<string|null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="space-y-3 text-left"
        >
          <div className="font-mono text-xs text-indigo-400 tracking-wider font-semibold">
            // SECTION 06: SYSTEM INQUIRIES & DIRECT COLLABORATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-theme tracking-tight">
            Initiate <span className="gradient-text">Engineering Collaboration</span>
          </h2>
          <p className="max-w-2xl text-theme2 text-sm sm:text-base leading-relaxed">
            Open to full-time AI/ML engineering positions, quantitative software projects, and production systems architecture.
          </p>
        </motion.div>

        {/* 2-Column Contact Terminal */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct System Channels & Location (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-4 font-mono"
          >
            {/* Status Card */}
            <div className="glass-card rounded-2xl border border-theme p-6 card-shadow space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-theme font-bold flex items-center gap-2">
                  <Terminal size={15} className="text-emerald-400 animate-pulse" />
                  <span>COMMUNICATION CHANNEL</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                  AVAILABLE
                </span>
              </div>
              <p className="text-theme2 text-xs leading-relaxed font-sans">
                Seeking high-impact full-time roles in AI Agent architecture, Machine Learning engineering, and Full-Stack systems development.
              </p>
            </div>

            {/* Email Quick Copy Box */}
            <div className="glass-card rounded-xl border border-theme p-4 flex items-center justify-between card-shadow">
              <div className="space-y-0.5">
                <div className="text-[10px] text-theme3 font-bold uppercase">// PRIMARY EMAIL</div>
                <div className="text-xs text-theme font-bold">{SITE_CONFIG.email}</div>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg surface border border-theme text-xs font-semibold text-theme hover:border-indigo-400 transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} className="text-indigo-400" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Channel List */}
            {[
              { icon: <Phone size={14} />, label: "Phone", val: "+91 91666 97613", href: "tel:+919166697613", color: "#4f46e5" },
              { icon: <FaGithub size={14} />, label: "GitHub", val: "github.com/anshuldeewan", href: SITE_CONFIG.github, color: "#8b5cf6" },
              { icon: <FaLinkedin size={14} />, label: "LinkedIn", val: "linkedin.com/in/anshul-deewan", href: SITE_CONFIG.linkedin, color: "#0284c7" },
              { icon: <MapPin size={14} />, label: "Location", val: "Jaipur, India · VIT B.Tech CSE", href: null, color: "#059669" },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => item.href && window.open(item.href)}
                className={`glass-card rounded-xl border border-theme p-4 flex items-center justify-between transition-all ${
                  item.href ? "cursor-pointer hover:border-indigo-400/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-theme3 font-bold uppercase">{item.label}</div>
                    <div className="text-xs text-theme font-bold">{item.val}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Column: Direct Transmission Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7"
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full glass-card rounded-2xl border border-emerald-500/30 p-8 flex flex-col items-center justify-center text-center card-shadow space-y-4 font-mono"
              >
                <CheckCircle size={48} className="text-emerald-400" />
                <h3 className="text-lg font-bold text-theme font-sans">Message Transmitted!</h3>
                <p className="text-theme2 text-xs max-w-xs font-sans">
                  Thank you for connecting. I will review your message and reply within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="px-4 py-2 rounded-xl surface border border-theme text-xs font-semibold text-theme2 hover:text-theme transition-colors"
                >
                  Transmit Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-theme p-6 sm:p-7 space-y-5 card-shadow font-mono">
                <div className="flex items-center justify-between border-b border-theme/60 pb-3 text-xs">
                  <span className="text-theme font-bold flex items-center gap-2">
                    <Send size={14} className="text-indigo-400" />
                    <span>DIRECT MESSAGE PORTAL</span>
                  </span>
                  <span className="text-[10px] text-theme3 font-semibold">// SECURE TRANSMISSION</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-theme3 uppercase tracking-wider font-bold mb-1.5">// SENDER NAME</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      required
                      placeholder="Your name"
                      className="input-theme w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-theme3 uppercase tracking-wider font-bold mb-1.5">// SENDER EMAIL</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      required
                      placeholder="your@email.com"
                      className="input-theme w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-theme3 uppercase tracking-wider font-bold mb-1.5">// MESSAGE / PROJECT DETAILS</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    rows={4}
                    required
                    placeholder="Describe your project, role, or collaboration proposal..."
                    className="input-theme w-full rounded-xl px-3.5 py-2.5 text-xs outline-none resize-none border transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-primary text-xs font-bold shadow-lg disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
