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

    // ── CORE GRAVITY WELL PARTICLES (High density around Hero center 0, 1.0, 0) ──
    const countA = 400;
    const posA = new Float32Array(countA * 3);
    const colA = new Float32Array(countA * 3);
    const radiiA = new Float32Array(countA);
    const anglesA = new Float32Array(countA);
    const speedA = new Float32Array(countA);
    const zOffsetA = new Float32Array(countA);

    const centerY = 1.0; // Centered behind headline

    for (let i = 0; i < countA; i++) {
      const r = Math.pow(Math.random(), 1.8) * 11 + 1.2; // Density concentrated near center
      const angle = Math.random() * Math.PI * 2;
      radiiA[i] = r;
      anglesA[i] = angle;
      speedA[i] = (0.15 + Math.random() * 0.25) * (i % 2 === 0 ? 1 : -1);
      zOffsetA[i] = (Math.random() - 0.5) * 8;

      const i3 = i * 3;
      posA[i3]     = Math.cos(angle) * r;
      posA[i3 + 1] = centerY + Math.sin(angle) * (r * 0.65);
      posA[i3 + 2] = zOffsetA[i];

      const c = palette[Math.floor(Math.random() * palette.length)];
      colA[i3] = c.r; colA[i3 + 1] = c.g; colA[i3 + 2] = c.b;
    }

    const geoA = new THREE.BufferGeometry();
    geoA.setAttribute("position", new THREE.BufferAttribute(posA, 3));
    geoA.setAttribute("color", new THREE.BufferAttribute(colA, 3));
    const matA = new THREE.PointsMaterial({
      size: 0.18,
      map: sqTex || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointsA = new THREE.Points(geoA, matA);
    scene.add(pointsA);

    // ── MIDGROUND ORBITAL DIAMONDS (300 particles) ──
    const countB = 300;
    const posB = new Float32Array(countB * 3);
    const colB = new Float32Array(countB * 3);
    const radiiB = new Float32Array(countB);
    const anglesB = new Float32Array(countB);

    for (let i = 0; i < countB; i++) {
      const r = 6 + Math.random() * 14;
      const angle = Math.random() * Math.PI * 2;
      radiiB[i] = r;
      anglesB[i] = angle;

      const i3 = i * 3;
      posB[i3]     = Math.cos(angle) * r;
      posB[i3 + 1] = centerY + Math.sin(angle) * (r * 0.55);
      posB[i3 + 2] = (Math.random() - 0.5) * 12;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colB[i3] = c.r; colB[i3 + 1] = c.g; colB[i3 + 2] = c.b;
    }
    const geoB = new THREE.BufferGeometry();
    geoB.setAttribute("position", new THREE.BufferAttribute(posB, 3));
    geoB.setAttribute("color", new THREE.BufferAttribute(colB, 3));
    const matB = new THREE.PointsMaterial({
      size: 0.12,
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

    // ── DISTANT BACKGROUND DUST (500 particles) ──
    const countC = 500;
    const posC = new Float32Array(countC * 3);
    const colC = new Float32Array(countC * 3);

    for (let i = 0; i < countC; i++) {
      const i3 = i * 3;
      posC[i3]     = (Math.random() - 0.5) * 36;
      posC[i3 + 1] = (Math.random() - 0.5) * 44; // Extended vertical span
      posC[i3 + 2] = (Math.random() - 0.5) * 20;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colC[i3] = c.r; colC[i3 + 1] = c.g; colC[i3 + 2] = c.b;
    }
    const geoC = new THREE.BufferGeometry();
    geoC.setAttribute("position", new THREE.BufferAttribute(posC, 3));
    geoC.setAttribute("color", new THREE.BufferAttribute(colC, 3));
    const matC = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointsC = new THREE.Points(geoC, matC);
    scene.add(pointsC);

    // ── LAYER D: About Section Soft Floating Embers (280 particles) ──
    const countD = 280;
    const posD = new Float32Array(countD * 3);
    const colD = new Float32Array(countD * 3);
    const initYD = new Float32Array(countD);
    const initXD = new Float32Array(countD);

    const aboutCenterY = -8.0; // Positioned behind About section

    for (let i = 0; i < countD; i++) {
      const i3 = i * 3;
      const xVal = (Math.random() - 0.5) * 28;
      const yVal = aboutCenterY + (Math.random() - 0.5) * 16;
      posD[i3]     = xVal; initXD[i] = xVal;
      posD[i3 + 1] = yVal; initYD[i] = yVal;
      posD[i3 + 2] = (Math.random() - 0.5) * 12;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colD[i3] = c.r; colD[i3 + 1] = c.g; colD[i3 + 2] = c.b;
    }
    const geoD = new THREE.BufferGeometry();
    geoD.setAttribute("position", new THREE.BufferAttribute(posD, 3));
    geoD.setAttribute("color", new THREE.BufferAttribute(colD, 3));
    const matD = new THREE.PointsMaterial({
      size: 0.13,
      map: sqTex || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointsD = new THREE.Points(geoD, matD);
    scene.add(pointsD);

    // Mouse Tracking with subtle inertia lerp
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
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;

      // Gravity Well Orbital Motion (Curving particles towards center behind headline)
      const arrA = (geoA.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < countA; i++) {
        const i3 = i * 3;
        const currentAngle = anglesA[i] + t * (0.08 / (radiiA[i] * 0.3 + 0.6)) * speedA[i];
        const pulsedRadius = radiiA[i] + Math.sin(t * 0.8 + i) * 0.3;
        arrA[i3]     = Math.cos(currentAngle) * pulsedRadius;
        arrA[i3 + 1] = centerY + Math.sin(currentAngle) * (pulsedRadius * 0.6);
      }
      (geoA.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      pointsA.rotation.y = targetX * 0.12;
      pointsA.rotation.x = -targetY * 0.12;

      // Layer B: Midground gentle counter-rotation
      const arrB = (geoB.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < countB; i++) {
        const i3 = i * 3;
        const currentAngle = anglesB[i] - t * 0.03;
        arrB[i3]     = Math.cos(currentAngle) * radiiB[i];
        arrB[i3 + 1] = centerY + Math.sin(currentAngle) * (radiiB[i] * 0.55);
      }
      (geoB.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      pointsB.rotation.y = -targetX * 0.09;
      pointsB.rotation.x = -targetY * 0.09;

      // Layer C: Background subtle rotation
      pointsC.rotation.y = t * 0.006 + targetX * 0.05;
      pointsC.rotation.x = Math.sin(t * 0.006) * 0.04 - targetY * 0.05;

      // Layer D: About Section upward drifting embers
      const arrD = (geoD.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < countD; i++) {
        const i3 = i * 3;
        arrD[i3 + 1] = initYD[i] + Math.sin(t * 0.5 + i * 0.4) * 0.3 + ((t * 0.18 + i * 0.05) % 18) - 9;
        arrD[i3]     = initXD[i] + Math.cos(t * 0.3 + i * 0.6) * 0.2;
      }
      (geoD.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      pointsD.rotation.y = t * 0.01 + targetX * 0.08;
      pointsD.rotation.x = Math.sin(t * 0.008) * 0.04 - targetY * 0.08;

      // Subtle twinkling
      matA.opacity = 0.82 + Math.sin(t * 1.6) * 0.12;
      matB.opacity = 0.68 + Math.cos(t * 1.2) * 0.1;
      matD.opacity = 0.70 + Math.sin(t * 1.4 + 1) * 0.1;

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
      geoD.dispose(); matD.dispose();
      sqTex?.dispose();
      dmTex?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ background: "transparent" }} />;
}
