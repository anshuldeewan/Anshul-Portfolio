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

    // Harmonious theme palette
    const palette = [
      new THREE.Color("#8b5cf6"), // violet-500
      new THREE.Color("#635bff"), // primary indigo
      new THREE.Color("#38bdf8"), // sky-400
      new THREE.Color("#a78bfa"), // violet-400
      new THREE.Color("#34d399"), // emerald-400
    ];

    // Group 1: Fine background particle field (800 particles)
    const count1 = 800;
    const pos1 = new Float32Array(count1 * 3);
    const col1 = new Float32Array(count1 * 3);
    for (let i = 0; i < count1; i++) {
      const i3 = i * 3;
      pos1[i3]     = (Math.random() - 0.5) * 32;
      pos1[i3 + 1] = (Math.random() - 0.5) * 32;
      pos1[i3 + 2] = (Math.random() - 0.5) * 16;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col1[i3] = c.r; col1[i3 + 1] = c.g; col1[i3 + 2] = c.b;
    }
    const geo1 = new THREE.BufferGeometry();
    geo1.setAttribute("position", new THREE.BufferAttribute(pos1, 3));
    geo1.setAttribute("color", new THREE.BufferAttribute(col1, 3));
    const mat1 = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const points1 = new THREE.Points(geo1, mat1);
    scene.add(points1);

    // Group 2: Floating ember square particles with 3D drift (400 particles)
    const count2 = 400;
    const pos2 = new Float32Array(count2 * 3);
    const col2 = new Float32Array(count2 * 3);
    const initialY2 = new Float32Array(count2);

    for (let i = 0; i < count2; i++) {
      const i3 = i * 3;
      pos2[i3]     = (Math.random() - 0.5) * 26;
      const yVal   = (Math.random() - 0.5) * 26;
      pos2[i3 + 1] = yVal;
      initialY2[i] = yVal;
      pos2[i3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col2[i3] = c.r; col2[i3 + 1] = c.g; col2[i3 + 2] = c.b;
    }
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    geo2.setAttribute("color", new THREE.BufferAttribute(col2, 3));
    const mat2 = new THREE.PointsMaterial({
      size: 0.095,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const points2 = new THREE.Points(geo2, mat2);
    scene.add(points2);

    // Mouse Tracking
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

      // Group 1: Slow background tilt & rotation
      points1.rotation.y = t * 0.015 + targetX * 0.12;
      points1.rotation.x = Math.sin(t * 0.01) * 0.06 - targetY * 0.12;

      // Group 2: Upward drifting floating ember positions
      const posAttr2 = geo2.attributes.position as THREE.BufferAttribute;
      const arr2 = posAttr2.array as Float32Array;
      for (let i = 0; i < count2; i++) {
        const i3 = i * 3;
        arr2[i3 + 1] = initialY2[i] + Math.sin(t * 0.6 + i) * 0.4 + ((t * 0.15) % 26) - 13;
        arr2[i3]     += Math.sin(t * 0.4 + i) * 0.0015;
      }
      posAttr2.needsUpdate = true;

      points2.rotation.y = t * 0.02 + targetX * 0.18;
      points2.rotation.x = Math.cos(t * 0.015) * 0.08 - targetY * 0.18;

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
      geo1.dispose(); mat1.dispose();
      geo2.dispose(); mat2.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ background: "transparent" }} />;
}
