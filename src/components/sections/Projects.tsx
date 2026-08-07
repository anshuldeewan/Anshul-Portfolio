"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { PROJECTS, SITE_CONFIG } from "@/lib/constants";
import { ExternalLink, ArrowRight, Activity, ShieldCheck, Sparkles, Cpu, Layers, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
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
            // SECTION 03: FLAGSHIP SYSTEM REVEALS & ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-theme tracking-tight">
            Production <span className="gradient-text">Product Launches</span> & ML Models
          </h2>
          <p className="max-w-2xl text-theme2 text-sm sm:text-base leading-relaxed">
            Full-stack systems engineered at the intersection of AI Agent automation, machine learning inference, and quantitative analytics.
          </p>
        </motion.div>

        {/* Flagship Projects Stack */}
        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <SpotlightCard
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.18 }}
              spotlightColor={`${project.color}35`}
              className="glass-card rounded-2xl border border-theme p-6 sm:p-8 card-shadow hover:border-indigo-400/50 transition-all duration-300 group"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Product Information & Metrics (6 cols) */}
                <div className="lg:col-span-6 space-y-5">
                  
                  {/* Category & Status Chips */}
                  <div className="flex items-center gap-2 flex-wrap font-mono">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md border" style={{ background: `${project.color}15`, color: project.color, borderColor: `${project.color}30` }}>
                      // SYSTEM: {project.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 px-2.5 py-1 rounded-md surface border border-theme">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> PRODUCTION DEPLOYED
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-theme group-hover:text-indigo-400 transition-colors mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-indigo-400 mb-3">{project.tagline}</p>
                    <p className="text-theme2 text-xs sm:text-sm leading-relaxed">{project.description}</p>
                  </div>

                  {/* Key Benchmark Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl surface border border-theme font-mono">
                    {project.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-base sm:text-xl font-bold text-theme" style={{ color: project.color }}>{s.value}</div>
                        <div className="text-[10px] text-theme3 font-semibold uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md surface border border-theme text-theme2 text-[11px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2 flex-wrap font-mono">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-bold shadow-md"
                    >
                      <span>Interactive Architecture</span>
                      <ArrowRight size={14} />
                    </Link>

                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl surface border border-theme text-xs font-semibold text-theme hover:border-indigo-400 transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>Live App</span>
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl surface border border-theme text-xs font-semibold text-theme3 hover:text-theme transition-colors"
                    >
                      <FaGithub size={13} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Simulated Architecture Window Mockup (6 cols) */}
                <div className="lg:col-span-6 font-mono">
                  <div className="rounded-xl overflow-hidden border border-theme surface-bg shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    
                    {/* Simulated Browser Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 surface-bg2 border-b border-theme/60 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="px-2.5 py-0.5 rounded surface border border-theme text-[10px] text-theme3 font-medium truncate max-w-[220px]">
                        https://{project.id}.anshuldeewan.dev
                      </div>
                      <div className="flex items-center gap-1 text-theme3">
                        <Activity size={12} className="text-emerald-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Window Content Mockup */}
                    <div className="p-5 space-y-3">
                      {project.id === "rideplus" ? (
                        <div className="space-y-3 text-xs">
                          <div className="flex items-center justify-between p-3 rounded-lg surface border border-theme">
                            <div className="flex items-center gap-2">
                              <Sparkles size={15} className="text-indigo-400" />
                              <span className="font-bold text-theme">AI Water Purifier Agent</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10">ONLINE</span>
                          </div>
                          <div className="p-3 rounded-lg bg-black/40 border border-theme/40 text-[11px] text-slate-300 space-y-1">
                            <div className="text-indigo-400 font-bold">› supabase.auth.getUser()</div>
                            <div className="text-sky-400">✓ Auth Session Verified</div>
                            <div className="text-emerald-400">✓ Calculated Distance: 42.5 km // Fare: ₹450</div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 text-xs">
                          <div className="flex items-center justify-between p-3 rounded-lg surface border border-theme">
                            <div className="flex items-center gap-2">
                              <ShieldCheck size={15} className="text-violet-400" />
                              <span className="font-bold text-theme">UPI Risk Scoring Engine</span>
                            </div>
                            <span className="text-[10px] font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10">92% ACCURACY</span>
                          </div>
                          <div className="p-3 rounded-lg bg-black/40 border border-theme/40 text-[11px] text-slate-300 space-y-1">
                            <div className="text-violet-400 font-bold">› model.predict_proba(transaction)</div>
                            <div className="text-emerald-400">✓ Low Risk Score: 0.08 // Transaction Approved</div>
                            <div className="text-slate-400">// Gradient Boosting Classifier (Scikit-learn)</div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
