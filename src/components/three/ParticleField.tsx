"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

function createSquareTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fillRect(2, 2, 60, 60);
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fillRect(10, 10, 44, 44);
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(20, 20, 24, 24);

  return new THREE.CanvasTexture(canvas);
}

function createDiamondTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.save();
  ctx.translate(32, 32);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(-24, -24, 48, 48);
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.fillRect(-14, -14, 28, 28);
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();

  return new THREE.CanvasTexture(canvas);
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100);
    camera.position.z = 9;

    // Palette: Violet, Indigo, Sky, Purple, Emerald
    const palette = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#635bff"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#34d399"),
    ];

    const sqTex = createSquareTexture();
    const dmTex = createDiamondTexture();

    // ── LAYER A: Large Glowing Squares (Foreground - 250 particles) ──
    const countA = 250;
    const posA = new Float32Array(countA * 3);
    const colA = new Float32Array(countA * 3);
    const initYA = new Float32Array(countA);
    const initXA = new Float32Array(countA);

    for (let i = 0; i < countA; i++) {
      const i3 = i * 3;
      const xVal = (Math.random() - 0.5) * 28;
      const yVal = (Math.random() - 0.5) * 28;
      posA[i3]     = xVal; initXA[i] = xVal;
      posA[i3 + 1] = yVal; initYA[i] = yVal;
      posA[i3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colA[i3] = c.r; colA[i3 + 1] = c.g; colA[i3 + 2] = c.b;
    }
    const geoA = new THREE.BufferGeometry();
    geoA.setAttribute("position", new THREE.BufferAttribute(posA, 3));
    geoA.setAttribute("color", new THREE.BufferAttribute(colA, 3));
    const matA = new THREE.PointsMaterial({
      size: 0.22,
      map: sqTex || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointsA = new THREE.Points(geoA, matA);
    scene.add(pointsA);

    // ── LAYER B: Medium Soft Diamonds (Midground - 450 particles) ──
    const countB = 450;
    const posB = new Float32Array(countB * 3);
    const colB = new Float32Array(countB * 3);
    const initYB = new Float32Array(countB);

    for (let i = 0; i < countB; i++) {
      const i3 = i * 3;
      posB[i3]     = (Math.random() - 0.5) * 30;
      const yVal   = (Math.random() - 0.5) * 30;
      posB[i3 + 1] = yVal; initYB[i] = yVal;
      posB[i3 + 2] = (Math.random() - 0.5) * 14;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colB[i3] = c.r; colB[i3 + 1] = c.g; colB[i3 + 2] = c.b;
    }
    const geoB = new THREE.BufferGeometry();
    geoB.setAttribute("position", new THREE.BufferAttribute(posB, 3));
    geoB.setAttribute("color", new THREE.BufferAttribute(colB, 3));
    const matB = new THREE.PointsMaterial({
      size: 0.14,
      map: dmTex || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointsB = new THREE.Points(geoB, matB);
    scene.add(pointsB);

    // ── LAYER C: Tiny Distant Dust (Background - 900 particles) ──
    const countC = 900;
    const posC = new Float32Array(countC * 3);
    const colC = new Float32Array(countC * 3);
    for (let i = 0; i < countC; i++) {
      const i3 = i * 3;
      posC[i3]     = (Math.random() - 0.5) * 36;
      posC[i3 + 1] = (Math.random() - 0.5) * 36;
      posC[i3 + 2] = (Math.random() - 0.5) * 20;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colC[i3] = c.r; colC[i3 + 1] = c.g; colC[i3 + 2] = c.b;
    }
    const geoC = new THREE.BufferGeometry();
    geoC.setAttribute("position", new THREE.BufferAttribute(posC, 3));
    geoC.setAttribute("color", new THREE.BufferAttribute(colC, 3));
    const matC = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointsC = new THREE.Points(geoC, matC);
    scene.add(pointsC);

    // Mouse Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Layer A: Upward floating embers & horizontal sway
      const arrA = (geoA.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < countA; i++) {
        const i3 = i * 3;
        arrA[i3 + 1] = initYA[i] + Math.sin(t * 0.7 + i * 0.5) * 0.35 + ((t * 0.25 + i * 0.1) % 28) - 14;
        arrA[i3]     = initXA[i] + Math.sin(t * 0.4 + i * 0.8) * 0.25;
      }
      (geoA.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      pointsA.rotation.y = t * 0.02 + targetX * 0.18;
      pointsA.rotation.x = Math.sin(t * 0.015) * 0.08 - targetY * 0.18;

      // Layer B: Midground soft rotation & floating drift
      const arrB = (geoB.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < countB; i++) {
        const i3 = i * 3;
        arrB[i3 + 1] = initYB[i] + Math.cos(t * 0.5 + i * 0.3) * 0.2 + ((t * 0.18 + i * 0.05) % 30) - 15;
      }
      (geoB.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      pointsB.rotation.y = -t * 0.015 + targetX * 0.14;
      pointsB.rotation.x = Math.cos(t * 0.012) * 0.06 - targetY * 0.14;

      // Layer C: Background subtle rotation
      pointsC.rotation.y = t * 0.008 + targetX * 0.08;
      pointsC.rotation.x = Math.sin(t * 0.008) * 0.04 - targetY * 0.08;

      // Twinkle & subtle pulsating opacity
      matA.opacity = 0.75 + Math.sin(t * 1.8) * 0.12;
      matB.opacity = 0.65 + Math.cos(t * 1.4) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!canvas) return;
      const rw = window.innerWidth;
      const rh = window.innerHeight;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh, false);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geoA.dispose(); matA.dispose();
      geoB.dispose(); matB.dispose();
      geoC.dispose(); matC.dispose();
      sqTex?.dispose();
      dmTex?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ background: "transparent" }} />;
}
