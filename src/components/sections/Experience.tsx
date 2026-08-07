"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EXPERIENCES } from "@/lib/constants";
import { Calendar, MapPin, CheckCircle2, TrendingUp, Code2 } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((e) => e.id === activeTab) ?? EXPERIENCES[0];

  return (
    <section id="experience" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-label mx-auto mb-4 w-fit">02 / Experience</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-theme mb-4">Work <span className="gradient-text">History</span></h2>
          <p className="max-w-xl mx-auto text-theme2 text-base sm:text-lg">Hands-on industry internships supporting futures trading operations and building web applications.</p>
        </motion.div>

        {/* 2-Column Experience Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Company Selector Tabs */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }} className="lg:col-span-4 space-y-3">
            {EXPERIENCES.map((exp) => (
              <button key={exp.id} onClick={() => setActiveTab(exp.id)}
                className={`w-full text-left p-4.5 rounded-2xl transition-all duration-300 relative border flex items-center gap-3.5 ${
                  activeTab === exp.id
                    ? "glass-card border-indigo-500/50 shadow-md"
                    : "surface border-theme text-theme2 hover:text-theme hover:border-theme-hover"
                }`}>
                {activeTab === exp.id && (
                  <motion.div layoutId="exp-active-bg" className="absolute inset-0 rounded-2xl bg-indigo-500/5 border border-indigo-500/30" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                  {exp.id === "axxela" ? <TrendingUp size={20} className="text-violet-500" /> : <Code2 size={20} className="text-blue-500" />}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-theme">{exp.company}</div>
                  <div className="text-xs font-semibold text-theme3">{exp.role}</div>
                  <div className="text-[10px] text-theme3 mt-0.5 font-medium">{exp.period}</div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Detailed Experience Container */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 }} className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <SpotlightCard key={activeExp.id}
                spotlightColor={`${activeExp.color}30`}
                className="glass-card rounded-3xl border border-theme p-7 sm:p-8 card-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-theme">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-theme mb-1">{activeExp.role}</h3>
                    <div className="text-sm font-bold text-indigo-500 dark:text-violet-400 flex items-center gap-2">
                      <span>{activeExp.company}</span>
                      <span>·</span>
                      <span className="text-xs text-theme3 font-medium flex items-center gap-1">
                        <MapPin size={12} /> {activeExp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full surface border border-theme text-xs font-semibold text-theme2">
                    <Calendar size={13} className="text-indigo-500" />
                    <span>{activeExp.period}</span>
                  </div>
                </div>

                <p className="text-theme2 text-sm leading-relaxed mb-6 font-medium">{activeExp.description}</p>

                {activeExp.bullets && (
                  <div className="space-y-3 mb-7">
                    {activeExp.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-theme2 leading-relaxed">
                        <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-5 border-t border-theme">
                  <p className="text-[11px] text-theme3 uppercase tracking-widest font-bold mb-3">Technologies & Methodologies</p>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.tech.map((t) => (
                      <span key={t} className="chip text-xs py-1 px-3 font-semibold">{t}</span>
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
