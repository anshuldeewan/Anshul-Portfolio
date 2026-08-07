"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function EasterEgg() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setProgress((p) => {
        if (e.key === KONAMI[p]) {
          const next = p + 1;
          if (next === KONAMI.length) { setShow(true); return 0; }
          return next;
        }
        return e.key === KONAMI[0] ? 1 : 0;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(t);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
          <div className="glass rounded-3xl border border-purple-500/30 p-10 text-center max-w-sm shadow-2xl shadow-purple-500/20">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-6xl mb-4"
            >
              🎮
            </motion.div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Konami Code!</h3>
            <p className="text-white/60 text-sm">You found the easter egg. You&apos;re awesome 🚀</p>
            <div className="mt-4 flex justify-center gap-1">
              {["↑","↑","↓","↓","←","→","←","→","B","A"].map((k, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white/50 text-xs font-mono"
                >
                  {k}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
