"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Segment = { name: string; percent: number; color: string };

/** Animated donut chart with a center label — used for language breakdowns. */
export function DonutChart({
  segments,
  size = 180,
  thickness = 20,
  centerLabel,
  centerSub,
}: {
  segments: Segment[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const arcs = segments.map((s) => {
    const length = (s.percent / 100) * circumference;
    const arc = { ...s, dash: length, gap: circumference - length, rotation: (offset / circumference) * 360 };
    offset += length;
    return arc;
  });

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={thickness} />
        {arcs.map((a, i) => (
          <motion.circle
            key={a.name}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={a.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${a.dash} ${a.gap}`}
            transform={`rotate(${a.rotation} ${size / 2} ${size / 2})`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={inView ? { strokeDasharray: `${a.dash} ${a.gap}` } : {}}
            transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 4px ${a.color}80)` }}
          />
        ))}
      </svg>
      {centerLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-gradient-static">{centerLabel}</span>
          {centerSub && <span className="text-[10px] uppercase tracking-wide text-muted">{centerSub}</span>}
        </div>
      )}
    </div>
  );
}

/** Circular progress ring with a percentage in the middle. */
export function CircularProgress({
  value,
  size = 120,
  thickness = 10,
  label,
  color = "#22d3ee",
}: {
  value: number;
  size?: number;
  thickness?: number;
  label?: string;
  color?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={thickness} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={inView ? { strokeDasharray: `${dash} ${circumference}` } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}90)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold" style={{ color }}>
          {value}%
        </span>
        {label && <span className="text-[9px] uppercase tracking-wide text-muted">{label}</span>}
      </div>
    </div>
  );
}
