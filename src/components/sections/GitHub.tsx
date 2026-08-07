"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

const REPOS = [
  { name: "rideplus", desc: "AI-powered RO water purifier booking platform with React, Supabase & Vercel", stars: 4, forks: 1, lang: "TypeScript", langColor: "#3178c6", topics: ["react","supabase","nextjs","ai"] },
  { name: "upi-risk-predictor", desc: "ML-powered UPI transaction fraud detection with 92% accuracy", stars: 6, forks: 2, lang: "Python", langColor: "#3572A5", topics: ["machine-learning","flask","scikit-learn"] },
  { name: "llm-agents-toolkit", desc: "AI agent patterns and LLM application templates using Claude API", stars: 8, forks: 3, lang: "Python", langColor: "#3572A5", topics: ["llm","ai-agents","claude","mcp"] },
  { name: "quant-analytics", desc: "Python dashboard for commodity spread trading with Z-Score & rolling statistics", stars: 3, forks: 1, lang: "Python", langColor: "#3572A5", topics: ["quant","pandas","trading"] },
];

function seed(w: number, d: number): number {
  const n = Math.sin(w * 127.1 + d * 311.7) * 43758.5453;
  return Math.floor((n - Math.floor(n)) * 5);
}

function HeatMap() {
  const WEEKS = 26; const DAYS = 7;
  const colors = ["var(--c-border2)", "var(--c-glow)", "var(--c-primary-hover)", "var(--c-primary)", "var(--c-accent)"];

  return (
    <div className="overflow-x-auto scrollbar-hide py-2">
      <div className="flex gap-1.5 min-w-max">
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {Array.from({ length: DAYS }).map((_, d) => {
              const lv = seed(w, d);
              return (
                <motion.div key={d}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * DAYS + d) * 0.0015 }}
                  className="w-3 h-3 rounded-sm cursor-pointer border border-theme"
                  style={{ background: colors[lv] }}
                  whileHover={{ scale: 1.5 }}
                  title={`${lv * 3} contributions`}
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="section-label mx-auto mb-4 w-fit">Open Source</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-theme mb-4"><span className="gradient-text">GitHub</span> Activity</h2>
          <p className="max-w-xl mx-auto text-theme2 text-base sm:text-lg">Consistent open-source building, contributions, and project development.</p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Repositories", value: "12+", color: "#635bff" },
            { label: "Contributions", value: "400+", color: "#0ea5e9" },
            { label: "Stars Earned", value: "21+", color: "#f59e0b" },
            { label: "Languages", value: "5+", color: "#10b981" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 + i * 0.07 }}
              className="glass-card rounded-xl border border-theme p-5 text-center card-shadow hover:border-indigo-400/50 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-theme3 font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Heatmap Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} className="glass-card rounded-2xl border border-theme p-6 mb-8 card-shadow">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-sm text-theme font-semibold flex items-center gap-2"><FaGithub size={15} className="text-theme3" /> Contribution Matrix · Recent Activity</span>
            <div className="flex items-center gap-1.5 text-[10px] text-theme3 font-medium">
              <span>Less</span>
              {["var(--c-border2)", "var(--c-glow)", "var(--c-primary-hover)", "var(--c-primary)", "var(--c-accent)"].map((c, idx) => <div key={idx} className="w-3 h-3 rounded-sm border border-theme" style={{ background: c }} />)}
              <span>More</span>
            </div>
          </div>
          <HeatMap />
        </motion.div>

        {/* Repos Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {REPOS.map((repo, i) => (
            <motion.a key={repo.name} href={`${SITE_CONFIG.github}/${repo.name}`} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-card rounded-xl border border-theme p-5 hover:border-indigo-400/50 transition-all group card-shadow hover:card-shadow-hover"
              whileHover={{ y: -3 }}>
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-2"><FaGithub size={15} className="text-theme3" /><span className="text-sm font-bold text-theme group-hover:text-indigo-500 transition-colors">{repo.name}</span></div>
                <ExternalLink size={13} className="text-theme3 group-hover:text-indigo-400 transition-colors" />
              </div>
              <p className="text-theme2 text-xs mb-4 leading-relaxed">{repo.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {repo.topics.map((t) => <span key={t} className="chip text-[10px] py-0.5 px-2.5 font-medium">{t}</span>)}
              </div>
              <div className="flex items-center gap-4 text-theme3 text-xs font-medium">
                <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: repo.langColor }} />{repo.lang}</span>
                <span className="flex items-center gap-1"><Star size={11} />{repo.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

