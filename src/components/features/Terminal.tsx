"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TERMINAL_COMMANDS, SITE_CONFIG } from "@/lib/constants";
import { Terminal as TerminalIcon, X } from "lucide-react";

type Line = { type: "input" | "output" | "error"; content: string };

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([
    { type: "output", content: "Anshul Deewan — Portfolio Terminal v1.0" },
    { type: "output", content: "Type 'help' for available commands.\n" },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  const run = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    const next: Line[] = [...history, { type: "input", content: `> ${cmd}` }];
    if (t === "clear") { setHistory([{ type: "output", content: "Terminal cleared.\n" }]); setCmdIdx(-1); return; }
    if (t === "resume") { window.open(SITE_CONFIG.resume, "_blank"); next.push({ type: "output", content: TERMINAL_COMMANDS.resume }); }
    else if (t === "github") { window.open(SITE_CONFIG.github, "_blank"); next.push({ type: "output", content: TERMINAL_COMMANDS.github }); }
    else if (TERMINAL_COMMANDS[t]) { next.push({ type: "output", content: TERMINAL_COMMANDS[t] }); }
    else if (t !== "") { next.push({ type: "error", content: `Command not found: '${t}'. Type 'help'.` }); }
    setHistory(next);
    setCmdHistory((h) => [cmd, ...h]);
    setCmdIdx(-1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const ni = Math.min(cmdIdx + 1, cmdHistory.length - 1); setCmdIdx(ni); setInput(cmdHistory[ni] ?? ""); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const ni = Math.max(cmdIdx - 1, -1); setCmdIdx(ni); setInput(ni === -1 ? "" : cmdHistory[ni]); }
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-[90] flex items-center gap-2 px-4 py-2.5 rounded-xl surface border border-theme text-theme2 hover:text-indigo-500 hover:border-theme-hover text-sm transition-all shadow-sm font-semibold"
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} title="Open Terminal CLI" aria-label="Open Terminal">
        <TerminalIcon size={15} className="text-indigo-500" />
        <span className="text-xs font-mono font-bold">Terminal</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-[150] bg-black/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed bottom-8 right-8 z-[151] w-full max-w-xl max-w-[calc(100vw-2rem)]"
              onClick={(e) => e.stopPropagation()}>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-950 border border-white/10">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/[0.06]">
                  <button onClick={() => setOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" aria-label="Close terminal" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-white/40 text-xs font-mono">anshul@portfolio ~</span>
                  <button onClick={() => setOpen(false)} className="ml-auto text-white/30 hover:text-white/70 transition-colors" aria-label="Close"><X size={14} /></button>
                </div>
                {/* Output */}
                <div className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1">
                  {history.map((line, i) => (
                    <div key={i} className={`whitespace-pre-wrap ${line.type === "input" ? "text-indigo-400 font-bold" : line.type === "error" ? "text-red-400" : "text-gray-300"}`}>
                      {line.content}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
                {/* Input */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/90 border-t border-white/[0.06]">
                  <span className="text-indigo-400 font-mono text-xs font-bold">›</span>
                  <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey} className="flex-1 bg-transparent text-gray-200 font-mono text-xs outline-none placeholder-gray-600"
                    placeholder="type a command…" spellCheck={false} autoComplete="off" />
                  <span className="terminal-cursor" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

