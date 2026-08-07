"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ROLES, SITE_CONFIG } from "@/lib/constants";
import { FileText, Zap, Award, Terminal, Cpu, ArrowUpRight, Activity } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const sy = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const gx = useTransform(sx, (v) => `${v * 0.06}px`);
  const gy = useTransform(sy, (v) => `${v * 0.06}px`);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-tinted transition-colors duration-300 pt-28 pb-16"
    >
      {/* Cinematic AI Singularity Backdrop & Center-to-Edge Vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden select-none">
        {/* Mouse Parallax Core Singularity Blob */}
        <motion.div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[580px] rounded-full opacity-35 blur-[130px]"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.45) 0%, rgba(99, 91, 255, 0.28) 40%, rgba(14, 165, 233, 0.12) 65%, transparent 80%)",
            x: gx, y: gy,
          }}
        />

        {/* Ambient Pulsing Deep Violet Backlight */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1100px] h-[600px] rounded-full bg-violet-600/15 dark:bg-indigo-500/20 blur-[150px] pointer-events-none" />

        {/* Radial Edge Vignette — Darkens viewport edges for high center-to-edge contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,6,10,0.85)_75%,rgba(4,4,8,0.98)_100%)] pointer-events-none" />

        {/* Section Divider Hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
      </div>

      {/* Main Hero Grid Layout (60% AI Research Lab + 30% Product Launch + 10% Universe) */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Research & Title Composition (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Lab Index Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass border border-theme text-xs font-mono select-none"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-theme2 font-semibold">// RESEARCH LAB // 12x ANTHROPIC CERTIFIED</span>
            </motion.div>

            {/* Neural Activation Metadata Bar (Reveals on Name Hover) */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: activated ? 1 : 0, height: activated ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-mono text-indigo-400 flex items-center gap-2">
                <Cpu size={14} className="animate-spin text-sky-400" />
                <span>SYSTEM STATUS: NEURAL WEIGHTS ACTIVE // LOCATION: JAIPUR, INDIA // CGPA: 7.87</span>
              </div>
            </motion.div>

            {/* Main Name Heading with Signature Neural Activation Propagation */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="space-y-1 select-none"
              onMouseEnter={() => setActivated(true)}
              onMouseLeave={() => setActivated(false)}
            >
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-theme3 mb-1">
                [01] INFERENCE ARCHITECT & FULL STACK DEVELOPER
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-extrabold tracking-tight leading-[0.95] cursor-pointer group">
                <span className="gradient-text transition-all duration-300 group-hover:brightness-125 inline-block">Anshul</span>
                <br />
                <span className="text-theme transition-colors duration-300 group-hover:text-indigo-400 inline-block">Deewan</span>
              </h1>
            </motion.div>

            {/* Dynamic Role Typing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex items-center gap-3 text-lg sm:text-2xl font-bold font-mono text-theme2"
            >
              <span className="text-indigo-500 font-extrabold">›</span>
              <span className="gradient-text">
                <TypeAnimation
                  sequence={ROLES.flatMap((r) => [r, 2200])}
                  wrapper="span" cursor repeat={Infinity} speed={55}
                />
              </span>
            </motion.div>

            {/* Editorial Research Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65 }}
              className="text-base sm:text-lg text-theme2 leading-relaxed max-w-xl font-normal"
            >
              Architecting production <span className="text-theme font-semibold">AI Agents</span>, autonomous LLM workflows, high-frequency quantitative dashboards, and resilient full-stack web platforms.
            </motion.p>

            {/* CTAs with Monospace Index Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.8 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <HeroBtn href={SITE_CONFIG.resume} external primary>
                <FileText size={15} /> [01] Resume / CV
              </HeroBtn>
              <HeroBtn onClick={() => scroll("projects")}>
                <Zap size={15} /> [02] Product Reveals
              </HeroBtn>
              <HeroBtn href={SITE_CONFIG.github} external>
                <FaGithub size={15} /> GitHub <ArrowUpRight size={13} />
              </HeroBtn>
              <HeroBtn href={SITE_CONFIG.linkedin} external>
                <FaLinkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
              </HeroBtn>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.95 }}
              className="pt-4 grid grid-cols-4 gap-4 max-w-lg border-t border-theme/60"
            >
              {[
                { value: "12+", label: "Anthropic Certs", color: "text-indigo-400" },
                { value: "2", label: "Internships", color: "text-violet-400" },
                { value: "92%", label: "ML Accuracy", color: "text-sky-400" },
                { value: "7.87", label: "CGPA at VIT", color: "text-emerald-400" },
              ].map((s, i) => (
                <div key={i} className="space-y-0.5">
                  <div className={`text-xl font-mono font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] text-theme3 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Live Neural Inference Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <SpotlightCard
              spotlightColor="var(--c-glow-strong)"
              className="glass-card rounded-2xl border border-theme p-6 space-y-4 card-shadow font-mono select-none"
            >
              <div className="flex items-center justify-between border-b border-theme/60 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-theme">
                  <Activity size={15} className="text-emerald-400 animate-pulse" />
                  <span>LIVE INFERENCE NODE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">
                  v2.4-ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-theme2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-theme3">Engine:</span>
                  <span className="text-sky-400 font-bold">Claude-3.5-Sonnet / Next.js 16</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-theme3">Quant Stream:</span>
                  <span className="text-violet-400 font-bold">Python Pandas / Rolling Volatility</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-theme3">Latency:</span>
                  <span className="text-emerald-400 font-bold">12ms // 60 FPS WebGL</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-theme/40 text-[11px] space-y-1.5 text-slate-300">
                <div className="text-indigo-400 font-bold">› agent.evaluate_portfolio()</div>
                <div className="text-emerald-400">✓ Target: OpenAI / Anthropic / Vercel Standards</div>
                <div className="text-slate-400">// Loaded 12x Anthropic Certifications & CV</div>
                <div className="text-sky-400 font-semibold">⚡ System ready for production deployment.</div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[10px] text-theme3 border-t border-theme/40">
                <span>JAIPUR, RAJASTHAN, INDIA</span>
                <span className="text-emerald-400 font-bold">OPEN TO WORK</span>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function HeroBtn({ children, href, onClick, external, primary }: {
  children: React.ReactNode; href?: string; onClick?: () => void;
  external?: boolean; primary?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20 });
  const sy = useSpring(y, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const cls = primary
    ? "flex items-center gap-2 px-5 py-3 rounded-xl btn-primary text-xs font-mono font-semibold shadow-lg"
    : "flex items-center gap-2 px-4.5 py-3 rounded-xl glass border border-theme text-theme2 hover:text-theme hover:border-theme-hover hover:shadow-md transition-all text-xs font-mono font-semibold";

  const props = {
    style: { x: sx, y: sy },
    onMouseMove: onMove, onMouseLeave: onLeave,
    whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 },
  };

  if (href)
    return (
      <motion.a ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href} target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls} {...props}>{children}</motion.a>
    );

  return (
    <motion.button ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick} className={cls} {...props}>{children}</motion.button>
  );
}
