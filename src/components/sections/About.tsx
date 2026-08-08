"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Brain, Code2, TrendingUp, Award, MapPin, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import SpotlightCard from "@/components/ui/SpotlightCard";

const MILESTONES = [
  {
    code: "[01_VIT_CSE]",
    title: "Vellore Institute of Technology",
    sub: "B.Tech CSE (2022–Present) · CGPA 7.87",
    desc: "Specializing in Computer Science, Machine Learning algorithms, and scalable web infrastructure.",
    color: "#635bff",
    icon: <GraduationCap size={16} />,
  },
  {
    code: "[02_FULL_STACK]",
    title: "Full Stack Engineering",
    sub: "Next.js · React 19 · Supabase · REST APIs",
    desc: "Engineered production platforms from zero to deployment. Built RidePlus serving active users with 99.9% uptime.",
    color: "#0284c7",
    icon: <Code2 size={16} />,
  },
  {
    code: "[03_AI_RESEARCH]",
    title: "AI Systems & LLM Architecture",
    sub: "Anthropic Certifications · Model Evaluation · Agentic RAG",
    desc: "12+ Anthropic AI certifications. Built machine learning models achieving 92% fraud prediction accuracy.",
    color: "#7c3aed",
    icon: <Brain size={16} />,
  },
  {
    code: "[04_QUANT_TRADING]",
    title: "Quantitative Market Analytics",
    sub: "Futures Markets · Volatility Spread · Python Analytics",
    desc: "Traded 5 commodity futures markets at Axxela. Built Python analytics dashboards with Z-Score rolling metrics.",
    color: "#059669",
    icon: <TrendingUp size={16} />,
  },
];

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
      {/* Seamless Top Ambient Lighting Continuation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1000px] h-[350px] rounded-full bg-violet-600/10 dark:bg-indigo-500/12 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Research Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="space-y-3 text-left"
        >
          <div className="font-mono text-xs text-indigo-400 tracking-wider font-semibold">
            // SECTION 01: CORE ENGINEERING THESIS & TRACK RECORD
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-theme tracking-tight">
            Bridging <span className="text-indigo-500 dark:text-violet-400 font-extrabold">Statistical Rigor</span> with Production Products
          </h2>
          <p className="max-w-2xl text-theme2 text-sm sm:text-base leading-relaxed">
            I specialize in designing autonomous AI agents, fine-tuned LLM workflows, quantitative trading analytics, and resilient web infrastructure.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive 3D Profile & Anthropic Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              ref={cardRef}
              onMouseMove={onMouseMove}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => { setHovered(false); mx.set(0); my.set(0); }}
              style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <SpotlightCard
                spotlightColor="var(--c-glow-strong)"
                className="glass-card rounded-2xl p-6 sm:p-7 card-shadow border border-theme hover:border-indigo-400/50 space-y-5"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-sky-500 flex items-center justify-center text-xl font-extrabold text-white shadow-lg flex-shrink-0 cursor-pointer group"
                  >
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 opacity-50 blur group-hover:opacity-100 transition duration-300" />
                    <span className="relative z-10">AD</span>
                  </motion.div>
                  
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="relative group/name cursor-default"
                      >
                        {/* Ambient glow behind name on hover */}
                        <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-sky-500/20 opacity-0 group-hover/name:opacity-100 blur-md transition duration-300 pointer-events-none" />
                        
                        <h3 className="relative text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
                          <span className="name-gradient-animated font-black">
                            Anshul Deewan
                          </span>
                          <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="inline-block"
                          >
                            <Sparkles size={16} className="text-amber-400 fill-amber-400/20" />
                          </motion.span>
                        </h3>
                      </motion.div>
                      
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-mono font-semibold">
                        <CheckCircle2 size={12} className="text-indigo-400 flex-shrink-0" />
                        <span>Verified</span>
                      </div>
                    </div>
                    
                    <p className="text-indigo-400 text-xs font-mono font-semibold mt-1">AI Systems Architect & Full Stack Developer</p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-theme3 text-xs font-mono">
                      <MapPin size={12} className="text-rose-500" />
                      <span>Jaipur, Rajasthan, India</span>
                    </div>
                  </div>
                </div>

                <p className="text-theme2 text-xs sm:text-sm leading-relaxed">
                  Computer Science undergraduate at VIT. Experienced in deploying agentic RAG workflows, quantitative futures trading analytics at <strong className="text-theme">Axxela Research</strong>, and scalable web apps at <strong className="text-theme">Aletheions</strong>.
                </p>

                <div className="pt-4 border-t border-theme/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-theme3 font-bold uppercase">DEGREE</span>
                  <span className="text-indigo-400 font-bold px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    VIT CSE · CGPA 7.87
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Anthropic Certifications Grid */}
            <SpotlightCard spotlightColor="rgba(124, 58, 237, 0.25)" className="glass-card rounded-2xl p-6 card-shadow border border-theme space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-theme font-bold">
                  <Award size={16} className="text-indigo-400" />
                  <span>ANTHROPIC CERTIFICATIONS</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                  12+ COMPLETED
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CERTIFICATIONS.map((c) => (
                  <motion.span
                    key={c}
                    whileHover={{ scale: 1.04 }}
                    className="px-2.5 py-1 rounded-lg surface border border-theme text-theme2 text-[11px] font-mono font-medium flex items-center gap-1.5"
                  >
                    <Sparkles size={11} className="text-indigo-400" />
                    <span>{c}</span>
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Track Record Milestones Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {MILESTONES.map((item, i) => (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <SpotlightCard
                  spotlightColor={`${item.color}25`}
                  className="glass-card rounded-2xl p-5 border border-theme hover:border-indigo-400/50 transition-all duration-300 card-shadow space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: item.color }}>
                      {item.code}
                    </span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-theme text-base">{item.title}</h4>
                  <p className="text-xs font-mono font-semibold" style={{ color: item.color }}>{item.sub}</p>
                  <p className="text-xs text-theme2 leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
