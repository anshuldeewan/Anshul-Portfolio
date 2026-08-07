"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ROLES, SITE_CONFIG } from "@/lib/constants";
import { FileText, Zap, Sparkles, Terminal, Award } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SpotlightCard from "@/components/ui/SpotlightCard";
import confetti from "canvas-confetti";

const SNIPPETS = [
  { code: "const ai = new LLMAgent()", x: "6%",  y: "22%", delay: 0 },
  { code: "await model.invoke(prompt)", x: "72%", y: "18%", delay: 0.5 },
  { code: "df.zscore().rolling(20)",    x: "4%",  y: "65%", delay: 1 },
  { code: "yield from agent.run()",     x: "70%", y: "62%", delay: 1.5 },
  { code: "supabase.from('users')",     x: "80%", y: "42%", delay: 0.8 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const triggerFirecrackers = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { x, y },
      colors: ["#8b5cf6", "#635bff", "#38bdf8", "#f43f5e", "#fbbf24", "#34d399"],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 60,
        origin: { x: Math.max(0.1, x - 0.08), y },
        colors: ["#a78bfa", "#38bdf8", "#fbbf24"],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 60,
        origin: { x: Math.min(0.9, x + 0.08), y },
        colors: ["#8b5cf6", "#f43f5e", "#34d399"],
      });
    }, 140);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-tinted transition-colors duration-300"
    >


      {/* Ambient glowing blobs */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-10%] left-[10%] w-[560px] h-[560px] rounded-full blob opacity-30 blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--c-primary), var(--c-accent2), transparent 70%)", x: gx, y: gy }}
        />
        <motion.div
          className="absolute bottom-[-5%] right-[5%] w-[440px] h-[440px] rounded-full blob opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--c-accent), var(--c-glow), transparent 70%)", animationDelay: "4s" }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-violet-600/15 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>



      {/* Floating code snippets */}
      <div className="absolute inset-0 z-[3] pointer-events-none hidden lg:block">
        {SNIPPETS.map((s, i) => (
          <motion.div key={i} className="absolute" style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.delay + 1.4, duration: 0.7 }}
          >
            <motion.div
              className="px-3.5 py-2 rounded-xl text-[10px] font-mono whitespace-nowrap select-none glass-card text-theme border-theme"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sky-500 font-bold">›</span> {s.code}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2.5 px-4.5 py-2 rounded-full glass border border-theme card-shadow text-xs font-semibold">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Award size={15} className="text-indigo-500 dark:text-violet-400" />
            </motion.div>
            <span className="text-theme">12+ Anthropic AI Certifications</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Open to Work</span>
          </div>
        </motion.div>

        {/* Subtitle Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="text-xs sm:text-sm text-theme3 mb-3 tracking-[0.25em] uppercase font-bold"
        >
          Hi, I&#39;m
        </motion.p>

        {/* Main Name Heading with Firecracker Hover Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: [0.23, 1, 0.32, 1] }}
          className="text-6xl sm:text-8xl lg:text-[100px] xl:text-[112px] font-extrabold tracking-tight leading-none mb-4 cursor-pointer select-none group inline-block"
          onMouseEnter={triggerFirecrackers}
          title="Hover to launch firecrackers! 🎆"
        >
          <span className="gradient-text transition-transform duration-300 group-hover:scale-105 inline-block">Anshul</span>
          <br />
          <span className="text-theme transition-transform duration-300 group-hover:scale-105 inline-block">Deewan</span>
        </motion.h1>

        {/* Dynamic Typing Role */}

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.78 }}
          className="flex items-center justify-center gap-3 mb-6 text-xl sm:text-2xl lg:text-3xl font-extrabold"
        >
          <span className="text-theme3">—</span>
          <span className="gradient-text">
            <TypeAnimation
              sequence={ROLES.flatMap((r) => [r, 2200])}
              wrapper="span" cursor repeat={Infinity} speed={55}
            />
          </span>
          <span className="text-theme3">—</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.95 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-theme2 leading-relaxed mb-10 font-medium"
        >
          Building{" "}
          <span className="text-indigo-500 font-bold">intelligent systems</span>,{" "}
          <span className="text-violet-500 font-bold">AI Agents</span>,{" "}
          <span className="text-sky-500 font-bold">LLM Applications</span>, and{" "}
          <span className="text-theme font-bold">quantitative analytics dashboards</span>.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.08 }}
          className="flex flex-wrap justify-center gap-3.5 mb-16"
        >
          <HeroBtn href={SITE_CONFIG.resume} external primary>
            <FileText size={15} /> Official Resume
          </HeroBtn>
          <HeroBtn onClick={() => scroll("projects")}>
            <Zap size={15} /> See Projects
          </HeroBtn>
          <HeroBtn href={SITE_CONFIG.github} external>
            <FaGithub size={15} /> GitHub
          </HeroBtn>
          <HeroBtn href={SITE_CONFIG.linkedin} external>
            <FaLinkedin size={15} /> LinkedIn
          </HeroBtn>
        </motion.div>

        {/* Stats Row with Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.2 }}
          className="max-w-3xl mx-auto"
        >
          <SpotlightCard
            spotlightColor="var(--c-glow-strong)"
            className="glass-card rounded-2xl border border-theme p-6 sm:p-7 card-shadow"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "12+",  label: "AI Certs",    color: "text-indigo-500" },
                { value: "2",    label: "Internships", color: "text-violet-500" },
                { value: "92%",  label: "ML Accuracy", color: "text-sky-500" },
                { value: "7.87", label: "CGPA at VIT", color: "text-emerald-500" },
              ].map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className={`text-2xl sm:text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-theme3 font-bold uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Scroll Cue */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          onClick={() => scroll("about")}
          className="flex flex-col items-center gap-2 text-theme3 hover:text-indigo-500 transition-colors mx-auto mt-14"
        >
          <span className="text-[10px] tracking-widest uppercase font-bold">Scroll</span>
          <div className="w-[1px] h-7 bg-gradient-to-b from-indigo-500 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-3 bg-indigo-400 rounded-full"
              animate={{ y: [0, 28] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.button>
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
    ? "flex items-center gap-2 px-6 py-3.5 rounded-2xl btn-primary text-sm font-semibold shadow-lg"
    : "flex items-center gap-2 px-5.5 py-3.5 rounded-2xl glass border border-theme text-theme2 hover:text-theme hover:border-theme-hover hover:shadow-md transition-all text-sm font-semibold";

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
