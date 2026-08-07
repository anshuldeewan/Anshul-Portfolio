"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { Code, Cpu, Bot, Wrench, TrendingUp } from "lucide-react";

const TABS = [
  { key: "languages",  label: "Languages",   icon: <Code size={14} />,       color: "#635bff" },
  { key: "frameworks", label: "Frameworks",  icon: <Cpu size={14} />,        color: "#0ea5e9" },
  { key: "ai",         label: "AI / ML",     icon: <Bot size={14} />,        color: "#7c3aed" },
  { key: "tools",      label: "Tools & DBs", icon: <Wrench size={14} />,     color: "#10b981" },
  { key: "quant",      label: "Quant",       icon: <TrendingUp size={14} />, color: "#f59e0b" },
];

const ALL_SKILLS = [
  "Python","JavaScript","TypeScript","SQL","React.js","Next.js","Flask","Node.js",
  "Tailwind CSS","Supabase","PostgreSQL","Git","Vercel","Pandas","NumPy",
  "Scikit-learn","Generative AI","Prompt Engineering","LLM Apps","AI Agents",
  "Futures Trading","Spread Trading","Z-Score","Regression","Statistical Analysis",
  "REST APIs","Framer Motion","Three.js","Claude API","MCP",
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tab, setTab] = useState("languages");

  const cat = TABS.find((t) => t.key === tab)!;
  const skills = SKILLS[tab as keyof typeof SKILLS];

  return (
    <section id="skills" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="section-label mx-auto mb-4 w-fit">04 / Skills</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-theme mb-4">Technical <span className="gradient-text">Arsenal</span></h2>
          <p className="max-w-xl mx-auto text-theme2 text-base sm:text-lg">A curated toolkit of technologies I use to build intelligent, production-ready systems.</p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {TABS.map((t) => (
            <motion.button key={t.key} onClick={() => setTab(t.key)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                tab === t.key ? "text-white shadow-md" : "text-theme2 surface border border-theme hover:border-theme-hover"
              }`}
              style={tab === t.key ? { background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`, boxShadow: `0 4px 20px ${t.color}40` } : {}}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4.5 mb-12">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.06 }}
                className="glass-card rounded-xl border border-theme p-5 card-shadow hover:border-indigo-400/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-theme group-hover:text-indigo-500 transition-colors">{skill.name}</span>
                  <span className="text-xs font-extrabold tabular-nums" style={{ color: cat.color }}>{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full surface border border-theme overflow-hidden relative">
                  <motion.div className="h-full rounded-full relative overflow-hidden"
                    style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)` }}
                    initial={{ width: "0%" }} animate={inView ? { width: `${skill.level}%` } : { width: "0%" }}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.06, ease: "easeOut" }}>
                    <div className="absolute inset-0 shimmer" />
                    <div className="progress-bullet" style={{ boxShadow: `0 0 8px 2px ${cat.color}` }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Comprehensive Tech Cloud */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="glass-card rounded-2xl border border-theme p-7 card-shadow">
          <p className="text-[11px] text-theme3 uppercase tracking-widest mb-5 text-center font-bold">Comprehensive Tech Matrix</p>
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_SKILLS.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 + i * 0.015 }} whileHover={{ scale: 1.08 }}
                className="px-3.5 py-1.5 rounded-full surface border border-theme text-theme2 text-xs font-semibold cursor-default hover:border-indigo-400 hover:text-theme transition-all shadow-sm">
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


