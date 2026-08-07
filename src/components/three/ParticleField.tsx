"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100);
    camera.position.z = 9;

    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Theme harmonious palette
    const palette = [
      new THREE.Color("#8b5cf6"), // violet-500
      new THREE.Color("#635bff"), // primary indigo
      new THREE.Color("#38bdf8"), // sky-400
      new THREE.Color("#a78bfa"), // violet-400
      new THREE.Color("#34d399"), // emerald-400
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 28;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

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
      
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      points.rotation.y = t * 0.025 + targetX * 0.15;
      points.rotation.x = Math.sin(t * 0.015) * 0.08 - targetY * 0.15;

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
      renderer.dispose(); geo.dispose(); mat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ background: "transparent" }} />;
}


