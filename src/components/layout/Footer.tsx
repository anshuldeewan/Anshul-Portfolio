"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-theme py-10 section-tinted text-theme overflow-hidden transition-colors duration-300">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-500/20">A</div>
            <div>
              <p className="text-theme text-sm font-bold">Anshul Deewan</p>
              <p className="text-theme3 text-xs font-medium">AI Engineer · Full Stack Developer</p>
            </div>
          </div>
          <p className="text-theme3 text-xs text-center font-medium">
            © {new Date().getFullYear()} Anshul Deewan · Built with Next.js, Framer Motion & Three.js
          </p>
          <div className="flex items-center gap-1.5">
            {[
              { href: SITE_CONFIG.github, icon: <FaGithub size={16} />, label: "GitHub" },
              { href: SITE_CONFIG.linkedin, icon: <FaLinkedin size={16} />, label: "LinkedIn" },
              { href: `mailto:${SITE_CONFIG.email}`, icon: <Mail size={16} />, label: "Email" },
            ].map((l) => (
              <motion.a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                aria-label={l.label}
                className="p-2 rounded-lg text-theme3 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all"
                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}>
                {l.icon}
              </motion.a>
            ))}
            <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 rounded-lg text-theme3 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all ml-1"
              whileHover={{ scale: 1.12, y: -2 }} title="Back to top" aria-label="Back to top">
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

