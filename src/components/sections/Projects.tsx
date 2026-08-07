"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { PROJECTS, SITE_CONFIG } from "@/lib/constants";
import { ExternalLink, ArrowRight, Activity, ShieldCheck, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-label mx-auto mb-4 w-fit">03 / Featured Work</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-theme mb-4">Engineering <span className="gradient-text">Showcase</span></h2>
          <p className="max-w-xl mx-auto text-theme2 text-base sm:text-lg">Production applications built at the intersection of AI, full-stack web, and quantitative analytics.</p>
        </motion.div>

        {/* Projects Stack */}
        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <SpotlightCard key={project.id}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.18 }}
              spotlightColor={`${project.color}35`}
              className="glass-card rounded-3xl border border-theme p-6 sm:p-8 card-shadow hover:border-indigo-400/50 transition-all duration-300 group">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left: Info & Case Study Link */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="chip text-xs font-bold py-1 px-3" style={{ background: `${project.color}15`, color: project.color, borderColor: `${project.color}30` }}>
                      {project.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5 px-2.5 py-1 rounded-full surface border border-theme">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Production Ready
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-theme group-hover:text-indigo-500 transition-colors mb-2">{project.title}</h3>
                    <p className="text-sm font-semibold text-indigo-500 dark:text-violet-400 mb-3">{project.tagline}</p>
                    <p className="text-theme2 text-sm leading-relaxed">{project.description}</p>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl surface border border-theme">
                    {project.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-base sm:text-lg font-extrabold text-theme" style={{ color: project.color }}>{s.value}</div>
                        <div className="text-[10px] text-theme3 font-bold uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="chip text-[11px] font-medium">{t}</span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2 flex-wrap">
                    <Link href={`/projects/${project.id}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-bold">
                      <span>Interactive Architecture</span>
                      <ArrowRight size={14} />
                    </Link>

                    {project.live && project.live !== "#" && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl surface border border-theme text-xs font-semibold text-theme hover:border-indigo-400 transition-colors">
                        <ExternalLink size={13} />
                        <span>Live App</span>
                      </a>
                    )}

                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl surface border border-theme text-xs font-semibold text-theme3 hover:text-theme transition-colors">
                      <FaGithub size={13} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Right: Modern Simulated App Window */}
                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border border-theme surface-bg shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    {/* Simulated Browser Bar */}
                    <div className="flex items-center justify-between px-4 py-3 surface-bg2 border-b border-theme">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                      </div>
                      <div className="px-3 py-1 rounded-lg surface border border-theme text-[10px] text-theme3 font-mono font-medium truncate max-w-[200px]">
                        https://{project.id}.anshuldeewan.dev
                      </div>
                      <div className="flex items-center gap-1 text-theme3">
                        <Activity size={12} className="text-emerald-500 animate-pulse" />
                      </div>
                    </div>

                    {/* Window Content Mockup */}
                    <div className="p-6 space-y-4">
                      {project.id === "rideplus" ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl surface border border-theme">
                            <div className="flex items-center gap-2.5">
                              <Sparkles size={16} className="text-indigo-500" />
                              <span className="text-xs font-bold text-theme">AI Water Purifier Recommendation</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Optimal TDS Fit</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="p-3 rounded-xl surface border border-theme space-y-1">
                              <span className="text-[10px] text-theme3 font-semibold">TDS Reading</span>
                              <p className="text-sm font-extrabold text-indigo-500">450 PPM · High Mineral</p>
                            </div>
                            <div className="p-3 rounded-xl surface border border-theme space-y-1">
                              <span className="text-[10px] text-theme3 font-semibold">Recommended Model</span>
                              <p className="text-sm font-extrabold text-theme">PureFlow RO + UV + Alkaline</p>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl surface border border-theme flex items-center justify-between">
                            <span className="text-xs font-semibold text-theme2">Supabase Auth & Admin Panel RLS</span>
                            <span className="text-[10px] font-mono text-indigo-500 font-bold">15+ UI Components</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl surface border border-theme">
                            <div className="flex items-center gap-2.5">
                              <ShieldCheck size={16} className="text-blue-500" />
                              <span className="text-xs font-bold text-theme">UPI Transaction Fraud Analysis</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">Real-Time Risk API</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2.5 rounded-xl surface border border-theme">
                              <div className="text-sm font-extrabold text-blue-500">92%</div>
                              <div className="text-[9px] text-theme3 font-bold uppercase">Accuracy</div>
                            </div>
                            <div className="p-2.5 rounded-xl surface border border-theme">
                              <div className="text-sm font-extrabold text-blue-500">90%</div>
                              <div className="text-[9px] text-theme3 font-bold uppercase">Precision</div>
                            </div>
                            <div className="p-2.5 rounded-xl surface border border-theme">
                              <div className="text-sm font-extrabold text-blue-500">88%</div>
                              <div className="text-[9px] text-theme3 font-bold uppercase">Recall</div>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl surface border border-theme flex items-center justify-between">
                            <span className="text-xs font-semibold text-theme2">Scikit-Learn ML Pipeline</span>
                            <span className="text-[10px] font-mono text-blue-500 font-bold">10,000+ Records</span>
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

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="text-center mt-14">
          <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl surface border border-theme text-theme2 hover:text-theme hover:border-theme-hover transition-all text-sm font-semibold group shadow-sm">
            <FaGithub size={16} />View All Repositories on GitHub
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-indigo-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}


