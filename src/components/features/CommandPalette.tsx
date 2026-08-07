"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, ArrowRight, Hash, User, Briefcase, Code, Wrench, Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

const COMMANDS = [
  { id: "about", label: "About Anshul", group: "Navigate", icon: <User size={13} />, action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "experience", label: "Experience", group: "Navigate", icon: <Briefcase size={13} />, action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "projects", label: "Projects", group: "Navigate", icon: <Code size={13} />, action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "skills", label: "Skills", group: "Navigate", icon: <Wrench size={13} />, action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "contact", label: "Contact", group: "Navigate", icon: <Mail size={13} />, action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "resume", label: "Download Resume", group: "Actions", icon: <FileText size={13} />, action: () => window.open(SITE_CONFIG.resume, "_blank") },
  { id: "github", label: "Open GitHub", group: "Actions", icon: <FaGithub size={13} />, action: () => window.open(SITE_CONFIG.github, "_blank") },
  { id: "linkedin", label: "Open LinkedIn", group: "Actions", icon: <FaLinkedin size={13} />, action: () => window.open(SITE_CONFIG.linkedin, "_blank") },
  { id: "email", label: "Send Email", group: "Actions", icon: <Mail size={13} />, action: () => window.open(`mailto:${SITE_CONFIG.email}`) },
  { id: "top", label: "Back to Top", group: "Actions", icon: <Hash size={13} />, action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query ? COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())) : COMMANDS;
  const groups = [...new Set(filtered.map((c) => c.group))];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((o) => !o); setQuery(""); setSel(0); }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { setSel(0); }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && filtered[sel]) { filtered[sel].action(); setOpen(false); }
  };

  let gi = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.97, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg px-4"
            onKeyDown={onKeyDown}>
            <div className="rounded-2xl overflow-hidden glass-card border border-theme card-shadow">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-theme surface-bg2">
                <Search size={16} className="text-theme3 flex-shrink-0" />
                <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands or navigate…" className="flex-1 bg-transparent text-theme placeholder-theme3 outline-none text-sm font-medium" />
                <kbd className="px-2 py-1 rounded-md surface border border-theme text-theme3 text-[10px] font-mono font-semibold">ESC</kbd>
              </div>
              <div className="max-h-80 overflow-y-auto py-2 surface-bg">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-theme3 text-sm font-medium">No matching commands found</div>
                ) : groups.map((group) => (
                  <div key={group}>
                    <div className="px-4 py-2 text-[10px] text-theme3 uppercase tracking-widest font-bold">{group}</div>
                    {filtered.filter((c) => c.group === group).map((cmd) => {
                      gi++;
                      const idx = gi;
                      return (
                        <button key={cmd.id} onClick={() => { cmd.action(); setOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors font-medium ${
                            sel === idx ? "surface-bg2 text-indigo-500 font-bold" : "text-theme2 hover:text-theme hover:surface-bg2"
                          }`}>
                          <span className={sel === idx ? "text-indigo-500" : "text-theme3"}>{cmd.icon}</span>
                          <span>{cmd.label}</span>
                          {sel === idx && <ArrowRight size={12} className="ml-auto text-indigo-500" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-theme surface-bg2 flex items-center gap-4 text-theme3 text-[10px] font-semibold">
                <span>↑↓ Navigate</span><span>↵ Select</span><span>ESC Close</span>
                <span className="ml-auto flex items-center gap-1"><Command size={10} /> K to toggle</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

