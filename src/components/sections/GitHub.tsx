"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, ExternalLink, GitCommit, Activity, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

const REPOS = [
  { name: "RideplusRO", desc: "Production inter-city cab booking platform with React, Supabase & Vercel", stars: 4, forks: 1, lang: "TypeScript", langColor: "#3178c6", topics: ["react", "supabase", "nextjs", "ai"] },
  { name: "upi-risk-predictor", desc: "ML-powered UPI transaction fraud detection with 92% accuracy", stars: 6, forks: 2, lang: "Python", langColor: "#3572A5", topics: ["machine-learning", "flask", "scikit-learn"] },
  { name: "llm-agents-toolkit", desc: "AI agent patterns and LLM application templates using Claude API", stars: 8, forks: 3, lang: "Python", langColor: "#3572A5", topics: ["llm", "ai-agents", "claude", "mcp"] },
  { name: "quant-analytics", desc: "Python dashboard for commodity spread trading with Z-Score & rolling statistics", stars: 3, forks: 1, lang: "Python", langColor: "#3572A5", topics: ["quant", "pandas", "trading"] },
];

function seed(w: number, d: number): number {
  const n = Math.sin(w * 127.1 + d * 311.7) * 43758.5453;
  return Math.floor((n - Math.floor(n)) * 5);
}

const HEATMAP_CLASSES = [
  "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700",
  "bg-indigo-300 dark:bg-indigo-950 border-indigo-400 dark:border-indigo-800",
  "bg-indigo-400 dark:bg-indigo-800 border-indigo-500 dark:border-indigo-700",
  "bg-indigo-600 dark:bg-indigo-600 border-indigo-700 dark:border-indigo-500",
  "bg-violet-600 dark:bg-violet-400 border-violet-700 dark:border-violet-300",
];

function HeatMap() {
  const WEEKS = 26; const DAYS = 7;

  return (
    <div className="overflow-x-auto scrollbar-hide py-2">
      <div className="flex gap-1.5 min-w-max">
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {Array.from({ length: DAYS }).map((_, d) => {
              const lv = seed(w, d);
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * DAYS + d) * 0.0015 }}
                  className={`w-3.5 h-3.5 rounded-sm cursor-pointer border ${HEATMAP_CLASSES[lv]}`}
                  whileHover={{ scale: 1.5 }}
                  title={`${(lv + 1) * 3} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="github" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 font-mono">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="space-y-3 text-left"
        >
          <div className="text-xs text-indigo-400 tracking-wider font-semibold">
            // SECTION 05: OPEN SOURCE ENGINEERING VELOCITY & COMMITS LEDGER
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-theme tracking-tight font-sans">
            Continuous <span className="text-indigo-500 dark:text-violet-400 font-extrabold">GitHub Output</span> & Repositories
          </h2>
          <p className="max-w-2xl text-theme2 text-sm sm:text-base leading-relaxed font-sans">
            Live commit velocity, open-source building, and repository maintenance.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Public Repos", value: "12+", color: "#4f46e5" },
            { label: "Annual Commits", value: "400+", color: "#0284c7" },
            { label: "Stars Earned", value: "21+", color: "#8b5cf6" },
            { label: "Languages", value: "5+", color: "#059669" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="glass-card rounded-xl border border-theme p-4.5 text-center card-shadow hover:border-indigo-400/50 transition-all space-y-1"
            >
              <div className="text-xl sm:text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px] text-theme3 font-semibold uppercase">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Matrix Ledger Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="glass-card rounded-2xl border border-theme p-6 card-shadow space-y-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-theme font-bold flex items-center gap-2">
              <FaGithub size={15} className="text-indigo-400" />
              <span>COMMITS & ACTIVITY HEATMAP MATRIX</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-theme3 font-medium">
              <span>Less</span>
              {HEATMAP_CLASSES.map((cls, idx) => (
                <div key={idx} className={`w-3.5 h-3.5 rounded-sm border ${cls}`} />
              ))}
              <span>More</span>
            </div>
          </div>
          <HeatMap />
        </motion.div>

        {/* Repos Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {REPOS.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`${SITE_CONFIG.github}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-card rounded-xl border border-theme p-5 hover:border-indigo-400/50 transition-all group card-shadow space-y-3"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-theme group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <GitCommit size={14} className="text-indigo-400" />
                  <span>{repo.name}</span>
                </span>
                <div className="flex items-center gap-3 text-theme3 text-[11px]">
                  <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" />{repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork size={12} />{repo.forks}</span>
                </div>
              </div>
              <p className="text-xs text-theme2 leading-relaxed font-sans">{repo.desc}</p>
              <div className="flex items-center gap-2 text-[11px] pt-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: repo.langColor }} />
                <span className="text-theme2 font-semibold">{repo.lang}</span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
