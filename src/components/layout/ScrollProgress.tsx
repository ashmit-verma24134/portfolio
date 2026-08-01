"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Top-of-page gradient progress bar tied to scroll position. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-violet shadow-[0_0_12px_rgba(34,211,238,0.7)]"
    />
  );
}
