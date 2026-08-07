"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { Code, Cpu, Bot, Wrench, TrendingUp, Sparkles, Network } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const DOMAINS = [
  { key: "ai",         label: "AI / LLM Architecture", code: "[01_AI_LLM]", icon: <Bot size={15} />,        color: "#8b5cf6" },
  { key: "quant",      label: "Quant Market Analytics",code: "[02_QUANT]",  icon: <TrendingUp size={15} />, color: "#059669" },
  { key: "languages",  label: "Core Languages",        code: "[03_LANG]",   icon: <Code size={15} />,       color: "#4f46e5" },
  { key: "frameworks", label: "Full Stack Frameworks", code: "[04_STACK]",  icon: <Cpu size={15} />,        color: "#0284c7" },
  { key: "tools",      label: "Tools & Infra",         code: "[05_INFRA]",  icon: <Wrench size={15} />,     color: "#a855f7" },
];

const ALL_NODES = [
  "Python", "JavaScript", "TypeScript", "SQL", "React 19", "Next.js 16", "Flask", "Node.js",
  "Tailwind v4", "Supabase", "PostgreSQL", "Git", "Vercel", "Pandas", "NumPy",
  "Scikit-learn", "Generative AI", "Prompt Engineering", "LLM Apps", "AI Agents",
  "Futures Trading", "Spread Trading", "Z-Score", "Regression", "Statistical Analysis",
  "REST APIs", "Framer Motion", "Three.js", "Claude API", "MCP",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeDomain, setActiveDomain] = useState("ai");

  const currentDomain = DOMAINS.find((d) => d.key === activeDomain)!;
  const skillList = SKILLS[activeDomain as keyof typeof SKILLS];

  return (
    <section id="skills" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
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
            // SECTION 04: AI CAPABILITY MAP & NEURAL ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-theme tracking-tight">
            Technical <span className="gradient-text">Capability Vectors</span>
          </h2>
          <p className="max-w-2xl text-theme2 text-sm sm:text-base leading-relaxed">
            An interconnected domain matrix mapping competencies across AI model engineering, quantitative trading analytics, and production web systems.
          </p>
        </motion.div>

        {/* Domain Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2.5 font-mono"
        >
          {DOMAINS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDomain(d.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                activeDomain === d.key
                  ? "glass-card border-indigo-500/50 text-theme shadow-md"
                  : "surface border-theme text-theme2 hover:text-theme hover:border-theme-hover"
              }`}
            >
              <span style={{ color: d.color }}>{d.icon}</span>
              <span>{d.label}</span>
              <span className="text-[10px] text-theme3">{d.code}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Domain Capability Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {skillList.map((skill, i) => (
              <SpotlightCard
                key={skill.name}
                spotlightColor={`${currentDomain.color}30`}
                className="glass-card rounded-xl border border-theme p-5 card-shadow space-y-3 font-mono"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} style={{ color: currentDomain.color }} />
                    <span className="font-bold text-theme text-sm">{skill.name}</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10" style={{ color: currentDomain.color }}>
                    {skill.level}% MATCH
                  </span>
                </div>

                <div className="h-1.5 rounded-full surface border border-theme/60 overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${currentDomain.color}, ${currentDomain.color}aa)` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                  />
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Global Technology Neural Matrix Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl border border-theme p-6 sm:p-8 card-shadow space-y-4 font-mono"
        >
          <div className="flex items-center justify-between border-b border-theme/60 pb-3 text-xs">
            <div className="flex items-center gap-2 text-theme font-bold">
              <Network size={16} className="text-indigo-400 animate-pulse" />
              <span>GLOBAL STACK NEURAL NODE CLOUD</span>
            </div>
            <span className="text-[10px] text-theme3 font-semibold">30 ACTIVE NODES</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_NODES.map((node, i) => (
              <motion.span
                key={node}
                whileHover={{ scale: 1.06 }}
                className="px-3 py-1.5 rounded-lg surface border border-theme text-theme2 text-xs font-semibold hover:border-indigo-400 hover:text-theme transition-all cursor-default"
              >
                # {node}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
