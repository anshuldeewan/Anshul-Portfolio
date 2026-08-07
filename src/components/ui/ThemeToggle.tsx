"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Shift key shortcut to toggle theme
  useEffect(() => {
    let shiftTimer: ReturnType<typeof setTimeout>;
    let shiftPressed = false;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !e.repeat && !shiftPressed) {
        shiftPressed = true;
        shiftTimer = setTimeout(() => {
          setTheme((t) => (t === "dark" ? "light" : "dark"));
          setShowHint(true);
          setTimeout(() => setShowHint(false), 1800);
          shiftPressed = false;
        }, 600); // hold Shift for 600ms
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        clearTimeout(shiftTimer);
        shiftPressed = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      clearTimeout(shiftTimer);
    };
  }, [setTheme]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border surface border-theme hover:border-theme-hover shadow-sm transition-all duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        title={`Switch to ${isDark ? "light" : "dark"} mode (hold Shift)`}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}>
              <Sun size={15} className="text-amber-400" />
            </motion.span>
          ) : (
            <motion.span key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}>
              <Moon size={15} className="text-indigo-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Shift shortcut toast */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-4 py-2.5 rounded-xl text-sm font-medium glass-card text-theme border-theme shadow-xl pointer-events-none"
          >
            {isDark ? "🌙 Dark mode on" : "☀️ Light mode on"}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
