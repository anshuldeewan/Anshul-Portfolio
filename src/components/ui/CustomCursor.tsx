"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      const target = e.target as HTMLElement;
      const clickable = target.tagName === "A" || target.tagName === "BUTTON" ||
        target.closest("a") || target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(!!clickable);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", () => setIsHidden(true));
    document.addEventListener("mouseenter", () => setIsHidden(false));

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full transition-all duration-150"
        style={{
          width: isPointer ? 14 : 8, height: isPointer ? 14 : 8,
          background: isPointer ? "linear-gradient(135deg, #7c3aed, #635bff)" : "var(--c-primary)",
          opacity: isHidden ? 0 : 0.9, willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] rounded-full"
        style={{
          width: isPointer ? 48 : 36, height: isPointer ? 48 : 36,
          border: `1.5px solid ${isPointer ? "var(--c-accent)" : "var(--c-primary)"}`,
          opacity: isHidden ? 0 : 0.45,
          transition: "width 0.25s, height 0.25s, opacity 0.2s, border-color 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}

