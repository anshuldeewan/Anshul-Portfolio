"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EXPERIENCES } from "@/lib/constants";
import { Calendar, MapPin, CheckCircle2, TrendingUp, Code2, Terminal, Activity, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((e) => e.id === activeTab) ?? EXPERIENCES[0];

  return (
    <section id="experience" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
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
            // SECTION 02: CAREER LOG & ENGINEERING IMPACT LEDGER
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-theme tracking-tight">
            Production Experience & <span className="gradient-text">Quantitative Tradeoffs</span>
          </h2>
          <p className="max-w-2xl text-theme2 text-sm sm:text-base leading-relaxed">
            Hands-on technical roles spanning quantitative trading analytics at Axxela and full-stack AI development at Aletheions.
          </p>
        </motion.div>

        {/* 2-Column Experience Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Company Selector Tabs (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4 space-y-3"
          >
            {EXPERIENCES.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`w-full text-left p-4.5 rounded-xl transition-all duration-300 relative border flex items-center gap-3.5 font-mono ${
                  activeTab === exp.id
                    ? "glass-card border-indigo-500/50 shadow-md"
                    : "surface border-theme text-theme2 hover:text-theme hover:border-theme-hover"
                }`}
              >
                {activeTab === exp.id && (
                  <motion.div
                    layoutId="exp-active-bg"
                    className="absolute inset-0 rounded-xl bg-indigo-500/10 border border-indigo-500/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 z-10"
                  style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
                >
                  {exp.id === "axxela" ? <TrendingUp size={18} className="text-violet-400" /> : <Code2 size={18} className="text-sky-400" />}
                </div>
                <div className="z-10">
                  <div className="font-extrabold text-sm text-theme">{exp.company}</div>
                  <div className="text-xs font-semibold text-indigo-400">{exp.role}</div>
                  <div className="text-[10px] text-theme3 mt-0.5">{exp.period}</div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Detailed Experience Container (8 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <SpotlightCard
                key={activeExp.id}
                spotlightColor={`${activeExp.color}30`}
                className="glass-card rounded-2xl border border-theme p-6 sm:p-8 card-shadow space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-theme/60">
                  <div className="space-y-1">
                    <div className="font-mono text-xs font-bold text-indigo-400">// LOG ID: {activeExp.id.toUpperCase()}</div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-theme">{activeExp.role}</h3>
                    <div className="text-sm font-bold text-indigo-400 flex items-center gap-2 font-mono">
                      <span>{activeExp.company}</span>
                      <span>·</span>
                      <span className="text-xs text-theme3 flex items-center gap-1">
                        <MapPin size={12} /> {activeExp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg surface border border-theme text-xs font-mono font-semibold text-theme2">
                    <Calendar size={13} className="text-indigo-400" />
                    <span>{activeExp.period}</span>
                  </div>
                </div>

                <p className="text-theme2 text-xs sm:text-sm leading-relaxed font-medium">{activeExp.description}</p>

                {activeExp.bullets && (
                  <div className="space-y-2.5">
                    <div className="font-mono text-xs font-bold text-theme3 uppercase tracking-wider">// KEY DELIVERABLES & ENGINEERING IMPACT</div>
                    {activeExp.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-theme2 leading-relaxed">
                        <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-theme/60 space-y-2 font-mono">
                  <p className="text-[11px] text-theme3 uppercase tracking-widest font-bold">// TECH STACK & METHODOLOGY</p>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg surface border border-theme text-theme2 text-xs font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
