"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
  loading: () => null,
});

export default function GlobalParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 opacity-75 pointer-events-none">
      <ParticleField />
    </div>
  );
}

