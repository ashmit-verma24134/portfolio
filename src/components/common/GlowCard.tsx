"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glassmorphic card with a cursor-tracking radial spotlight and a
 * gradient hover border. The spotlight follows the pointer via CSS vars
 * updated on mousemove (no React re-render → smooth 60fps).
 */
export function GlowCard({
  children,
  className,
  spotlightColor = "rgba(59,130,246,0.15)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        // Explicit property list rather than `transition-all` — the latter also
        // animates layout-affecting properties on every one of these cards.
        "group/glow relative overflow-hidden rounded-2xl glass",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-accent/40 hover:shadow-glow",
        className
      )}
      style={
        {
          "--spot": spotlightColor,
        } as React.CSSProperties
      }
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--spot), transparent 65%)",
        }}
      />
      {/* Top sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-60"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
