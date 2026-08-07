"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const KB: Record<string, string> = {
  skills: "Anshul is proficient in Python, JavaScript/TypeScript, React, Next.js, Flask, and SQL. Deep expertise in AI/ML — LLMs, AI Agents, prompt engineering, and Scikit-learn. Strong quant skills: futures trading, spread trading, Z-Score analysis, and regression modeling.",
  experience: "Anshul interned at Axxela Research & Analytics (Jan–Jul 2026) as a Market Analyst working with futures markets and Python dashboards, and at Aletheions (Jul–Dec 2025) as a Tech Intern building React frontends.",
  projects: "Anshul built RidePlus — an AI-powered RO water purifier booking platform (React, Supabase, Vercel). He also built a UPI Transaction Risk Prediction System using Flask + Scikit-learn achieving 92% accuracy on 10K+ transactions.",
  education: "B.Tech CSE at VIT, CGPA 7.87. 12+ Anthropic AI certifications including Claude API, MCP, AI Agents, Bedrock, and Vertex AI.",
  contact: "Email: asharma800077@gmail.com | GitHub: github.com/anshuldeewan | LinkedIn: linkedin.com/in/anshul-deewan",
  availability: "Anshul is currently open to full-time AI/ML engineering roles and high-impact projects.",
};

function getReply(q: string): string {
  const ql = q.toLowerCase();
  if (ql.match(/skill|tech|python|react|ml|ai|framework/)) return KB.skills;
  if (ql.match(/experience|work|intern|job|axxela|aletheion/)) return KB.experience;
  if (ql.match(/project|rideplus|upi|build/)) return KB.projects;
  if (ql.match(/education|school|vit|cgpa|cert|anthropic/)) return KB.education;
  if (ql.match(/contact|email|reach|hire|connect/)) return KB.contact;
  if (ql.match(/available|open|opportun|role|job/)) return KB.availability;
  return "Great question! Anshul specialises in AI engineering, full stack development, and quant analytics. Ask me about his skills, projects, experience, or certifications!";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey! I'm Anshul's AI assistant. Ask me about his skills, projects, experience, or background. 👋" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;
    const msg = input.trim(); setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setTyping(true);
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    setTyping(false);
    setMessages((m) => [...m, { role: "assistant", content: getReply(msg) }]);
  };

  const SUGGESTIONS = ["Anshul's skills?", "Tell me about RidePlus", "How to contact?", "Certifications?"];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-2xl btn-primary flex items-center justify-center shadow-xl"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Ask Anshul AI" aria-label="Open AI Assistant">
        <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Sparkles size={20} className="text-white" />
        </motion.div>
        <motion.div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900"
          animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-[150] bg-black/20 backdrop-blur-sm md:hidden" />
            <motion.div initial={{ opacity: 0, scale: 0.93, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 16 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed bottom-24 right-6 z-[151] w-[370px] max-w-[calc(100vw-2rem)]">
              <div className="rounded-2xl overflow-hidden glass-card border border-theme card-shadow">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-theme surface-bg2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-theme">Ask Anshul</p>
                    <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />AI Assistant · Online
                    </p>
                  </div>
                  <button onClick={() => setOpen(false)} className="ml-auto text-theme3 hover:text-theme transition-colors" aria-label="Close assistant"><X size={16} /></button>
                </div>

                {/* Messages Container */}
                <div className="h-64 overflow-y-auto p-4 space-y-3 surface-bg">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm" : "surface border border-theme"}`}>
                        {msg.role === "assistant" ? <Bot size={13} className="text-white" /> : <User size={13} className="text-theme3" />}
                      </div>
                      <div className={`max-w-[82%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${msg.role === "assistant" ? "surface border border-theme text-theme shadow-sm" : "btn-primary text-white"}`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Bot size={13} className="text-white" /></div>
                      <div className="surface border border-theme rounded-xl px-4 py-3 flex gap-1 items-center shadow-sm">
                        {[0,1,2].map((j) => (
                          <motion.div key={j} className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                            animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: j * 0.14 }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Prompt Suggestions */}
                {messages.length <= 1 && (
                  <div className="px-4 py-2.5 flex flex-wrap gap-1.5 border-t border-theme surface-bg2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} onClick={() => setInput(s)}
                        className="px-2.5 py-1 rounded-lg surface border border-theme text-theme2 text-[10px] font-semibold hover:border-indigo-400 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Controls */}
                <div className="flex items-center gap-2 px-3 py-3 border-t border-theme surface-bg2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask me anything…"
                    className="flex-1 input-theme rounded-xl px-3 py-2 text-xs outline-none transition-all" />
                  <motion.button onClick={send}
                    className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center flex-shrink-0 shadow-sm"
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} aria-label="Send message">
                    <Send size={13} className="text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

