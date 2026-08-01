"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Point = { contest: string; rating: number };

// Codeforces rank bands for the background stripes
const bands = [
  { from: 0, to: 1200, color: "rgba(148,163,184,0.10)", label: "Newbie" },
  { from: 1200, to: 1400, color: "rgba(16,185,129,0.12)", label: "Pupil" },
  { from: 1400, to: 1600, color: "rgba(6,182,212,0.12)", label: "Specialist" },
  { from: 1600, to: 1900, color: "rgba(59,130,246,0.12)", label: "Expert" },
];

export function RatingGraph({ data, height = 220 }: { data: Point[]; height?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const width = 640;
  const padX = 34;
  const padY = 24;
  const ratings = data.map((d) => d.rating);
  const min = Math.min(...ratings) - 80;
  const max = Math.max(...ratings) + 120;
  const range = max - min || 1;

  const x = (i: number) => padX + (i / (data.length - 1)) * (width - padX * 2);
  const y = (r: number) => padY + (1 - (r - min) / range) * (height - padY * 2);

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.rating)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length - 1)} ${height - padY} L ${x(0)} ${height - padY} Z`;

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[420px]" role="img" aria-label="Codeforces rating progression">
        <defs>
          <linearGradient id="rg-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="rg-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.28" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Rank bands */}
        {bands.map((b) => {
          const yTop = y(Math.min(b.to, max));
          const yBottom = y(Math.max(b.from, min));
          if (yBottom <= yTop) return null;
          return <rect key={b.label} x={padX} y={yTop} width={width - padX * 2} height={yBottom - yTop} fill={b.color} />;
        })}

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={width - padX}
            y1={padY + t * (height - padY * 2)}
            y2={padY + t * (height - padY * 2)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Area */}
        <motion.path
          d={areaPath}
          fill="url(#rg-area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#rg-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.5))" }}
        />

        {/* Points */}
        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={x(i)}
            cy={y(d.rating)}
            r="3.5"
            fill="#0b1120"
            stroke="url(#rg-line)"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.12 }}
          >
            <title>{`${d.contest}: ${d.rating}`}</title>
          </motion.circle>
        ))}

        {/* Peak label */}
        {(() => {
          const peakI = ratings.indexOf(Math.max(...ratings));
          return (
            <motion.text
              x={x(peakI)}
              y={y(ratings[peakI]) - 10}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="#22d3ee"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8 }}
            >
              {ratings[peakI]}
            </motion.text>
          );
        })()}
      </svg>
    </div>
  );
}
