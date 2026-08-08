"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Command, FileText, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "@/components/ui/ThemeToggle";

function BatmanIcon({ className = "w-5 h-5 fill-white" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 60" fill="currentColor">
      <path d="M50 0 C44 14, 32 22, 18 22 C8 22, 0 32, 0 45 C15 45, 26 34, 36 45 C43 45, 47 38, 50 32 C53 38, 57 45, 64 45 C74 34, 85 45, 100 45 C100 32, 92 22, 82 22 C68 22, 56 14, 50 0 Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          scrolled
            ? "glass border-b border-theme card-shadow"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with Batman Emblem */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <BatmanIcon className="w-4.5 h-4.5 fill-white drop-shadow" />
              </div>
              <span className="font-extrabold text-sm text-theme group-hover:text-indigo-500 transition-colors">
                Anshul<span className="text-indigo-500">.</span>
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                    active === link.href.replace("#", "")
                      ? "text-indigo-500 dark:text-violet-400"
                      : "text-theme2 hover:text-theme"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {active === link.href.replace("#", "") && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl surface border border-theme shadow-sm"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <motion.button
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme surface text-xs text-theme3 hover:text-theme transition-all font-semibold"
                whileHover={{ scale: 1.02 }}
              >
                <Command size={12} />⌘K
              </motion.button>

              <ThemeToggle />

              <motion.a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-theme3 hover:text-theme hover:bg-indigo-500/10 transition-all"
                whileHover={{ scale: 1.08 }} aria-label="GitHub">
                <FaGithub size={16} />
              </motion.a>
              <motion.a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-theme3 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all"
                whileHover={{ scale: 1.08 }} aria-label="LinkedIn">
                <FaLinkedin size={16} />
              </motion.a>
              <motion.a
                href={SITE_CONFIG.resume} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-sm font-semibold"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                <FileText size={14} />Resume
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-xl surface border border-theme text-theme"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.94 }}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-[99] glass border-b border-theme px-4 py-5 shadow-xl"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    active === link.href.replace("#", "")
                      ? "surface border border-theme text-indigo-500"
                      : "text-theme2 hover:text-theme hover:bg-indigo-500/5"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-theme">
                <a href={SITE_CONFIG.resume} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl btn-primary text-sm font-semibold">
                  Resume
                </a>
                <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl surface border border-theme text-theme text-sm font-semibold hover:border-theme-hover">
                  GitHub
                </a>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

