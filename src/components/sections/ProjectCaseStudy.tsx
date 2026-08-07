"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectCaseStudy({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <main className="min-h-screen pt-28 pb-20 section-tinted text-theme transition-colors duration-300 relative overflow-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 rounded-full blur-[120px] opacity-15 pointer-events-none" style={{ background: project.color }} />


      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-theme3 hover:text-indigo-500 text-sm mb-10 transition-colors group font-semibold">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />Back to Portfolio
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="mb-10">
          <span className="chip mb-4 inline-flex font-semibold" style={{ color: project.color, background: `${project.color}14`, borderColor: `${project.color}25` }}>{project.category}</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-theme mb-2 tracking-tight">{project.title}</h1>
          <p className="text-xl font-semibold mb-5" style={{ color: project.color }}>{project.tagline}</p>
          <p className="text-theme2 text-base sm:text-lg leading-relaxed">{project.longDescription}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {project.stats.map((s) => (
            <div key={s.label} className="glass-card rounded-xl border border-theme p-5 text-center card-shadow">
              <div className="text-2xl font-extrabold mb-1" style={{ color: project.color }}>{s.value}</div>
              <div className="text-xs text-theme3 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl border border-theme p-7 mb-10 card-shadow">
          <h3 className="text-theme font-bold text-lg mb-4">Architecture & Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3.5 py-1.5 rounded-xl text-sm font-semibold"
                style={{ color: project.color, background: `${project.color}14`, border: `1px solid ${project.color}25` }}>{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-4 flex-wrap">
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm shadow-lg transition-all hover:scale-[1.03]"
            style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accent})`, boxShadow: `0 4px 20px ${project.color}35` }}>
            <ExternalLink size={15} />Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl surface border border-theme text-theme2 hover:text-theme hover:border-theme-hover text-sm font-semibold transition-all hover:shadow-md">
            <FaGithub size={15} />View Code
          </a>
        </motion.div>
      </div>
    </main>
  );
}

