"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/resume";

/**
 * Full-screen loading animation shown on first paint: an animated monogram,
 * a counting percentage, and a curtain reveal that lifts to show the site.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Session-scoped: only show the full intro once per tab session.
    if (sessionStorage.getItem("introSeen")) {
      setDone(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DURATION = 800;
    // Progress is written straight to the DOM instead of through setState —
    // a 60fps state update would re-render this whole subtree every frame
    // while the browser is still parsing/hydrating the rest of the page.
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const pct = Math.round(eased * 100);
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (pctRef.current) pctRef.current.textContent = `${pct}%`;
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("introSeen", "1");
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-8"
          >
            <svg width="96" height="96" viewBox="0 0 96 96" className="drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              <defs>
                <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#60a5fa" />
                  <stop offset="0.5" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="48"
                cy="48"
                r="44"
                fill="none"
                stroke="url(#pl-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              />
              <text
                x="48"
                y="62"
                textAnchor="middle"
                fontSize="42"
                fontWeight="800"
                fill="url(#pl-grad)"
                fontFamily="var(--font-display), sans-serif"
              >
                A
              </text>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 font-display text-sm uppercase tracking-[0.4em] text-muted"
          >
            {profile.name}
          </motion.div>

          <div className="h-px w-56 overflow-hidden bg-white/10">
            <div
              ref={barRef}
              className="h-full w-0 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-violet"
            />
          </div>
          <div ref={pctRef} className="mt-4 font-mono text-xs tabular-nums text-muted">
            0%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
