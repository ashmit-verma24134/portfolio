"use client";

import { type HeatCell } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Two palettes: `accent` (site blue, used for GitHub-style grids) and
 * `green`, which mirrors how TakeUForward renders its own activity grid.
 */
const palettes = {
  accent: {
    0: "bg-white/5",
    1: "bg-accent/25",
    2: "bg-accent/45",
    3: "bg-accent/70",
    4: "bg-accent shadow-[0_0_8px_rgba(59,130,246,0.7)]",
  },
  green: {
    0: "bg-white/[0.06]",
    1: "bg-emerald-900",
    2: "bg-emerald-700",
    3: "bg-emerald-500",
    4: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
  },
} as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function Heatmap({
  cells,
  label,
  scheme = "accent",
  showMonths = false,
  emptyLabel = "Less",
  fullLabel = "More",
  rangeLabel = "Last 26 weeks",
  cellPx = 10,
}: {
  cells: HeatCell[];
  label?: string;
  scheme?: keyof typeof palettes;
  /** Render a month axis above the grid (TUF/GitHub style). */
  showMonths?: boolean;
  emptyLabel?: string;
  fullLabel?: string;
  rangeLabel?: string;
  /** Cell edge length in px — bump it when the grid spans fewer weeks. */
  cellPx?: number;
}) {
  const levelClass: Record<number, string> = palettes[scheme];
  const cellStyle = { width: cellPx, height: cellPx };

  // Chunk into weeks (columns of 7)
  const weeks: HeatCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const total = cells.reduce((s, c) => s + c.count, 0);

  // A month label sits above the first column whose month differs from the
  // previous column's — same rule GitHub and TUF use.
  const monthAt: (string | null)[] = weeks.map((week, i) => {
    const m = new Date(`${week[0].date}T00:00:00Z`).getUTCMonth();
    if (i === 0) return null;
    const prev = new Date(`${weeks[i - 1][0].date}T00:00:00Z`).getUTCMonth();
    return m !== prev ? MONTHS[m] : null;
  });

  return (
    <div className="w-full">
      {label && (
        <div className="mb-3 flex items-center justify-between text-xs text-muted">
          <span className="font-mono">
            {total.toLocaleString()} {label}
          </span>
          <span className="hidden sm:inline">{rangeLabel}</span>
        </div>
      )}

      <div className="overflow-x-auto pb-1">
        {showMonths && (
          <div className="mb-1 flex gap-[2px]">
            {weeks.map((week, wi) => (
              <div key={week[0].date} className="relative" style={{ width: cellPx }}>
                {monthAt[wi] && (
                  <span className="absolute left-0 top-0 text-[10px] leading-none text-muted">
                    {monthAt[wi]}
                  </span>
                )}
                <span className="block" style={{ height: cellPx }} />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-[2px]">
          {weeks.map((week) => (
            <div key={week[0].date} className="flex flex-col gap-[2px]">
              {week.map((cell) => (
                <div
                  key={cell.date}
                  title={`${cell.date}: ${cell.count} submissions`}
                  style={cellStyle}
                  className={cn("rounded-[2px]", levelClass[cell.level])}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted">
        <span>{emptyLabel}</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={cn("h-[10px] w-[10px] rounded-[2px]", levelClass[l])} />
        ))}
        <span>{fullLabel}</span>
      </div>
    </div>
  );
}
