"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp, Activity } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-theme/60 py-10 section-tinted text-theme overflow-hidden transition-colors duration-300 font-mono">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
              AD
            </div>
            <div>
              <p className="text-theme text-xs font-bold font-sans">Anshul Deewan</p>
              <p className="text-theme3 text-[10px] flex items-center gap-1.5">
                <Activity size={10} className="text-emerald-400 animate-pulse" />
                <span>v2.4-PRODUCTION // SYSTEM ONLINE</span>
              </p>
            </div>
          </div>

          <p className="text-theme3 text-[11px] text-center font-sans">
            © {new Date().getFullYear()} Anshul Deewan · Built with Next.js 16, React 19, Framer Motion & Three.js
          </p>

          <div className="flex items-center gap-1.5">
            {[
              { href: SITE_CONFIG.github, icon: <FaGithub size={15} />, label: "GitHub" },
              { href: SITE_CONFIG.linkedin, icon: <FaLinkedin size={15} />, label: "LinkedIn" },
              { href: `mailto:${SITE_CONFIG.email}`, icon: <Mail size={15} />, label: "Email" },
            ].map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="p-2 rounded-lg text-theme3 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
              >
                {l.icon}
              </motion.a>
            ))}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 rounded-lg text-theme3 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all ml-1"
              whileHover={{ scale: 1.12, y: -2 }}
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </motion.button>
          </div>

        </div>
      </div>
    </footer>
  );
}
