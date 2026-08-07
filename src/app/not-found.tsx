"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(160deg, #f0eeff, #f8f7ff, #eff6ff)" }}>
      <div className="text-center px-4">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[120px] font-bold gradient-text leading-none mb-4">404</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
          <p className="text-gray-500 mb-8">This page doesn&apos;t exist in this dimension.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-sm">
            <Home size={15} />Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
