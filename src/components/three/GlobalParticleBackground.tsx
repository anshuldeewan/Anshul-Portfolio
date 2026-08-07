"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
  loading: () => null,
});

export default function GlobalParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Layer 2: Animated Radial Aurora Gradients (Slow fluid motion) */}
      <motion.div
        className="absolute -top-[25%] -left-[15%] w-[75vw] h-[75vw] rounded-full blur-[140px] opacity-25 dark:opacity-35 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(99, 91, 255, 0.25) 45%, transparent 70%)",
        }}
        animate={{
          x: [0, 45, -35, 0],
          y: [0, -35, 45, 0],
          scale: [1, 1.08, 0.94, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full blur-[150px] opacity-20 dark:opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 75%)",
        }}
        animate={{
          x: [0, -55, 35, 0],
          y: [0, 45, -45, 0],
          scale: [1, 0.93, 1.07, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-[25%] left-[15%] w-[65vw] h-[65vw] rounded-full blur-[160px] opacity-20 dark:opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 91, 255, 0.4) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, 35, -45, 0],
          y: [0, -45, 35, 0],
          scale: [1, 1.06, 0.91, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 3: Soft Ambient Glow Center Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full bg-violet-600/10 dark:bg-indigo-500/15 blur-[160px] pointer-events-none" />

      {/* Layer 4: Multi-depth Three.js WebGL Particle Field */}
      <div className="absolute inset-0 z-0 opacity-80">
        <ParticleField />
      </div>

      {/* Layer 5: Subtle Animated Grain / Noise Texture */}
      <div className="absolute inset-0 noise opacity-[0.035] pointer-events-none z-10" />
    </div>
  );
}


