"use client";

import { motion } from "framer-motion";
import {
  Swords,
  TrendingUp,
  Trophy,
  Flame,
  Target,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Star,
  Activity,
  Code2,
  CheckCircle2,
  Info,
} from "lucide-react";
import type { Stats } from "@/lib/live-stats";
import { socials } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { RatingGraph } from "@/components/common/RatingGraph";
import { CircularProgress } from "@/components/common/DonutChart";
import { Heatmap } from "@/components/common/Heatmap";

const diffColors: Record<string, string> = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

export function CompetitiveProgramming({ stats }: { stats: Stats }) {
  const { codeforces, leetcode, tuf, tufHeat, live } = stats;
  const tufPercent = Math.round((tuf.totalSolved / tuf.totalPool) * 100);
  const lastActiveLabel = tuf.lastActive
    ? new Date(`${tuf.lastActive}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      })
    : null;
  const allLive = live.codeforces && live.leetcode && live.tuf;

  return (
    <section id="competitive" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Competitive Programming"
          title="The arena"
          subtitle="Live stats from Codeforces & TakeUForward — my primary DSA track — plus LeetCode. 250+ problems solved and climbing."
        />

        {/* Data source note */}
        <Reveal direction="up">
          <div className="mx-auto mb-10 flex max-w-3xl items-center gap-3 rounded-xl border border-accent/20 bg-accent/[0.04] px-4 py-3 text-xs text-muted">
            {allLive ? (
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            ) : (
              <Info size={16} className="flex-shrink-0 text-accent" />
            )}
            <p>
              {allLive ? (
                <>
                  Every number in this section is fetched straight from the public Codeforces, LeetCode
                  and TakeUForward APIs, and refreshes automatically every 24 hours.
                </>
              ) : (
                <>
                  These numbers come from the public Codeforces, LeetCode and TakeUForward APIs and
                  refresh every 24 hours. One or more platforms didn&apos;t respond on the last refresh,
                  so parts of this section are showing the most recent cached snapshot.
                </>
              )}
            </p>
          </div>
        </Reveal>

        {/* Overview stat tiles */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Swords, label: "CF Rating", value: codeforces.rating, suffix: "", color: "#22d3ee" },
            { icon: Code2, label: "Problems Solved", value: 250, suffix: "+", color: "#818cf8" },
            { icon: Trophy, label: "Rated Contests", value: codeforces.contests, suffix: "", color: "#f59e0b" },
            { icon: Target, label: "TUF Solved", value: tuf.totalSolved, suffix: "", color: "#a78bfa" },
          ].map((s, i) => (
            <Reveal key={s.label} direction="up" delay={i * 0.05}>
              <GlowCard className="flex flex-col items-center gap-2 p-5 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}1a`, color: s.color }}>
                  <s.icon size={20} />
                </span>
                <p className="font-display text-3xl font-bold text-gradient-static">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[11px] uppercase tracking-wide text-muted">{s.label}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* Codeforces big card */}
        <Reveal direction="up">
          <GlowCard className="mb-6 overflow-hidden p-0" spotlightColor="rgba(6,182,212,0.15)">
            <div className="relative border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-glow">
                    <Swords size={26} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold">Codeforces</h3>
                    <a
                      href={socials.codeforces}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                      data-cursor="pointer"
                    >
                      @{codeforces.handle} <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <span
                  className="rounded-full px-4 py-1.5 text-sm font-semibold"
                  style={{ backgroundColor: `${codeforces.color}22`, color: codeforces.color }}
                >
                  {codeforces.rank}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_1.3fr]">
              {/* Left: stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Current", value: codeforces.rating, color: codeforces.color },
                    { label: "Max Rating", value: codeforces.maxRating, color: "#f59e0b" },
                    { label: "Contests", value: codeforces.contests, color: "#818cf8" },
                    { label: "Solved", value: codeforces.problemsSolved, color: "#34d399", suffix: "+" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
                      <p className="font-display text-2xl font-bold" style={{ color: s.color }}>
                        <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent contests */}
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <Activity size={12} /> Recent contests
                  </p>
                  <div className="space-y-1.5">
                    {codeforces.recentContests.map((c) => (
                      <div key={c.name} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 text-xs">
                        <span className="truncate pr-2 text-foreground/80">{c.name}</span>
                        <span className={`flex flex-shrink-0 items-center gap-0.5 font-mono ${c.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {c.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                          {Math.abs(c.change)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: rating graph */}
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  <TrendingUp size={12} /> Rating progression ·{" "}
                  {codeforces.ratingHistory[0]?.rating ?? codeforces.rating} → {codeforces.maxRating}
                </p>
                <RatingGraph data={[...codeforces.ratingHistory]} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {codeforces.favoriteProblems.map((p) => (
                    <span key={p.name} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-foreground/70">
                      {p.name} <span className="text-muted">· {p.rating}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlowCard>
        </Reveal>

        {/* TUF (primary DSA track) + LeetCode row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* TakeUForward — the headline platform */}
          <Reveal direction="up">
            <GlowCard className="h-full overflow-hidden p-0" spotlightColor="rgba(139,92,246,0.18)">
              <div className="border-b border-white/10 bg-gradient-to-r from-violet-500/15 via-indigo-500/5 to-transparent p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-glow">
                      <Target size={26} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-bold">TakeUForward</h3>
                        <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                          Primary DSA track
                        </span>
                      </div>
                      <a href={socials.tuf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline" data-cursor="pointer">
                        @{tuf.username} <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-4xl font-bold text-gradient-static">
                      <AnimatedCounter value={tuf.totalSolved} />
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-muted">Problems solved</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[auto_1fr]">
                {/* Sheet completion ring */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <CircularProgress value={tufPercent} label="Sheet done" color="#8b5cf6" />
                  <div className="flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    <Flame size={13} /> {tuf.totalSolved} / {tuf.totalPool} problems
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="space-y-3">
                  {[
                    { label: "Easy", data: tuf.easy, color: "#34d399" },
                    { label: "Medium", data: tuf.medium, color: "#f59e0b" },
                    { label: "Hard", data: tuf.hard, color: "#f43f5e" },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span style={{ color: d.color }}>{d.label}</span>
                        <span className="font-mono text-muted">
                          {d.data.solved}
                          <span className="opacity-50"> / {d.data.total}</span>
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(d.data.solved / d.data.total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: d.color, boxShadow: `0 0 8px ${d.color}` }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { label: "Easy", data: tuf.easy, color: "#34d399" },
                      { label: "Medium", data: tuf.medium, color: "#f59e0b" },
                      { label: "Hard", data: tuf.hard, color: "#f43f5e" },
                    ].map((d) => (
                      <div key={d.label} className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5 text-center">
                        <p className="font-display text-lg font-bold" style={{ color: d.color }}>
                          {d.data.solved}
                        </p>
                        <p className="text-[9px] uppercase text-muted">{d.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TUF practice heatmap — lives inside the TUF card so the
                  activity is unambiguously attributed to this platform. */}
              <div className="border-t border-white/10 p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <Star size={12} className="text-emerald-400" /> TUF practice activity
                  </p>
                  {lastActiveLabel && (
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Last active {lastActiveLabel} · {tuf.lastActiveCount} submissions
                    </span>
                  )}
                </div>
                {/* Real day-by-day data from the TUF streak API, in the same
                    rolling-12-month window and green scale the profile uses. */}
                <Heatmap
                  cells={tufHeat}
                  label={`submissions in ${tuf.lastActive.slice(0, 4)}`}
                  scheme="green"
                  showMonths
                  cellPx={14}
                  rangeLabel={`Active days ${tuf.activeDays} · Max streak ${tuf.maxStreak}`}
                />
              </div>
            </GlowCard>
          </Reveal>

          {/* LeetCode — supporting card */}
          <Reveal direction="up" delay={0.05}>
            <GlowCard className="h-full overflow-hidden p-0" spotlightColor="rgba(245,158,11,0.15)">
              <div className="border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-glow">
                      <Code2 size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold">LeetCode</h3>
                      <a href={socials.leetcode} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline" data-cursor="pointer">
                        @{leetcode.username}
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-gradient-static">
                      <AnimatedCounter value={leetcode.totalSolved} />
                    </p>
                    <p className="text-[10px] uppercase text-muted">solved</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Easy", data: leetcode.easy, color: "#34d399" },
                    { label: "Medium", data: leetcode.medium, color: "#f59e0b" },
                    { label: "Hard", data: leetcode.hard, color: "#f43f5e" },
                  ].map((d) => (
                    <div key={d.label} className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5 text-center">
                      <p className="font-display text-lg font-bold" style={{ color: d.color }}>
                        {d.data.solved}
                      </p>
                      <p className="text-[9px] uppercase text-muted">{d.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="font-display text-xl font-bold text-amber-400">{leetcode.acceptanceRate}%</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted">Acceptance</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                    <Flame size={13} /> {leetcode.streak}-day
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {leetcode.languages.map((l) => (
                    <span key={l.name} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-foreground/70">
                      {l.name} · {l.solved}
                    </span>
                  ))}
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <CheckCircle2 size={12} /> Recent accepted
                  </p>
                  <div className="space-y-1">
                    {leetcode.recentSubmissions.slice(0, 4).map((s) => (
                      <div key={s.title} className="flex items-center justify-between text-[11px]">
                        <span className="truncate pr-2 text-foreground/75">{s.title}</span>
                        <span className={`flex-shrink-0 font-mono ${diffColors[s.difficulty]}`}>{s.difficulty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
