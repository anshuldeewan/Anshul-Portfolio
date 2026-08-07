"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Brain, Code2, TrendingUp, Award, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import SpotlightCard from "@/components/ui/SpotlightCard";

const STORY = [
  { icon: <GraduationCap size={16} />, title: "VIT University", sub: "B.Tech CSE · CGPA 7.87", desc: "Pursuing Computer Science with focus on AI/ML, algorithms, and production software.", color: "#635bff", year: "2022 – Present" },
  { icon: <Code2 size={16} />, title: "Full Stack Dev", sub: "React · Next.js · Supabase", desc: "Built production apps from zero to deployment. RidePlus serves real users with 99.9% uptime.", color: "#0ea5e9", year: "2023" },
  { icon: <Brain size={16} />, title: "AI / ML Engineer", sub: "LLMs · Agents · Scikit-learn", desc: "12+ Anthropic certifications. Built ML systems with 92% accuracy. Deep expertise in prompt engineering.", color: "#7c3aed", year: "2024" },
  { icon: <TrendingUp size={16} />, title: "Quant Analytics", sub: "Futures · Spread · Python", desc: "Analysed commodity futures at Axxela. Built Python dashboards with Z-Score, regression & rolling stats.", color: "#10b981", year: "2025–26" },
];

const TRAITS = ["AI Systems Architect","LLM Builder","Full Stack Engineer","Quant Analyst","ML Practitioner","Prompt Engineer","Problem Solver","Open Source"];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

  const onMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="about" className="relative py-24 lg:py-36 overflow-hidden section-tinted transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="section-label mx-auto mb-4 w-fit">01 / Story</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-theme mb-4">Engineering <span className="gradient-text">Background</span></h2>
          <p className="max-w-xl mx-auto text-theme2 text-base sm:text-lg">Computer Science undergraduate at VIT specializing in AI engineering, full-stack systems, and quantitative analytics.</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Profile Card with 3D Tilt & Spotlight */}
          <div className="lg:col-span-5">
            <motion.div
              ref={cardRef}
              onMouseMove={onMouseMove}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => { setHovered(false); mx.set(0); my.set(0); }}
              style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <SpotlightCard
                spotlightColor="var(--c-glow-strong)"
                className="glass-card rounded-3xl p-7 card-shadow border-theme hover:border-indigo-400/50"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-600 to-sky-500 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-indigo-500/25">
                      AD
                    </div>
                    <motion.div className="absolute -inset-0.5 rounded-2xl border-2 border-indigo-400/40"
                      animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-theme">Anshul Deewan</h3>
                      <CheckCircle2 size={16} className="text-indigo-500 fill-indigo-500/10" />
                    </div>
                    <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold mt-0.5">AI Engineer & Full Stack Developer</p>
                    <div className="flex items-center gap-2 mt-2 text-theme3 text-xs font-medium">
                      <MapPin size={12} className="text-rose-500" /><span>Jaipur, Rajasthan, India</span>
                    </div>
                  </div>
                </div>

                <p className="text-theme2 text-xs sm:text-sm leading-relaxed mb-5">
                  Computer Science undergraduate at VIT. Experienced in building AI agent systems, trading quantitative dashboards at <strong className="text-theme">Axxela</strong>, and delivering full-stack web applications at <strong className="text-theme">Aletheions</strong>.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Python","React.js","Generative AI","Quant Analytics","AI Agents","Flask"].map((t) => <span key={t} className="chip text-[10px]">{t}</span>)}
                </div>

                <div className="pt-4 border-t border-theme flex items-center justify-between">
                  <span className="text-xs font-bold text-theme3 uppercase tracking-wider">Education</span>
                  <span className="text-xs font-extrabold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">VIT CSE · CGPA 7.87</span>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Certifications Card */}
            <SpotlightCard spotlightColor="rgba(124, 58, 237, 0.25)" className="glass-card rounded-2xl p-6 card-shadow mt-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl surface border border-theme flex items-center justify-center">
                  <Award size={16} className="text-indigo-500 dark:text-violet-400" />
                </div>
                <span className="font-bold text-theme text-sm">Anthropic Certifications</span>
                <span className="ml-auto px-2.5 py-0.5 rounded-full chip font-bold text-xs">12+ Completed</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CERTIFICATIONS.map((c) => (
                  <motion.span key={c} whileHover={{ scale: 1.05 }} className="px-2.5 py-1 rounded-xl surface border border-theme text-theme2 text-[11px] font-semibold flex items-center gap-1.5 transition-all">
                    <Sparkles size={11} className="text-indigo-500 flex-shrink-0" />
                    <span>{c}</span>
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />
              <div className="space-y-6">
                {STORY.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }} className="relative pl-14 group">
                    <div className="absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm z-10"
                      style={{ background: `${item.color}15`, border: `1.5px solid ${item.color}35`, color: item.color }}>
                      {item.icon}
                    </div>
                    <SpotlightCard spotlightColor={`${item.color}25`} className="glass-card rounded-2xl p-5 group-hover:border-indigo-400/50 transition-all duration-300 card-shadow">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-bold text-theme text-sm">{item.title}</h4>
                        <span className="text-[10px] text-theme3 font-semibold flex-shrink-0 ml-2">{item.year}</span>
                      </div>
                      <p className="text-xs font-semibold mb-2" style={{ color: item.color }}>{item.sub}</p>
                      <p className="text-xs text-theme2 leading-relaxed">{item.desc}</p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trait Marquee */}
        <div className="overflow-hidden py-3 surface rounded-2xl border border-theme card-shadow">
          <motion.div className="flex gap-4 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            {[...TRAITS, ...TRAITS, ...TRAITS].map((t, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full surface border border-theme text-theme2 text-xs font-semibold flex-shrink-0 whitespace-nowrap shadow-sm hover:border-indigo-400 transition-colors">
                ⚡ {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
