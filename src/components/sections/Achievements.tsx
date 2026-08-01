"use client";

import { motion } from "framer-motion";
import {
  Swords,
  Medal,
  Globe2,
  Trophy,
  Flag,
  Binary,
  Rocket,
  Users,
  Crown,
  type LucideIcon,
} from "lucide-react";
import { achievements, leadership } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";

const iconMap: Record<string, LucideIcon> = {
  Swords,
  Medal,
  Globe2,
  Trophy,
  Flag,
  Binary,
  Rocket,
};

export function Achievements() {
  return (
    <section id="achievements" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Achievements & Leadership"
          title="Wins & recognition"
          subtitle="Hackathon podiums, global contests, competitive-programming milestones and the teams I've led."
        />

        {/* Achievement cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Trophy;
            return (
              <Reveal key={a.title} direction="up" delay={(i % 3) * 0.06}>
                <GlowCard className="group relative h-full overflow-hidden p-6">
                  {/* Glow orb */}
                  <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${a.accent} opacity-20 blur-2xl transition-opacity duration-500 group-hover/glow:opacity-40`} />

                  <div className="relative flex items-start justify-between">
                    <motion.span
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.accent} text-white shadow-lg`}
                    >
                      <Icon size={26} />
                    </motion.span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted">
                      {a.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold leading-tight">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        {/* Leadership / Positions of Responsibility */}
        <div className="mt-10">
          <Reveal direction="up">
            <div className="mb-5 flex items-center gap-2 text-accent">
              <Crown size={18} />
              <h3 className="font-display text-lg font-semibold">Positions of Responsibility</h3>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {leadership.map((l, i) => (
              <Reveal key={l.org} direction="up" delay={i * 0.06}>
                <GlowCard className="flex h-full items-center gap-4 p-5" spotlightColor="rgba(139,92,246,0.15)">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-indigo text-white shadow-glow">
                    <Users size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-foreground">{l.role}</p>
                    <p className="truncate text-xs text-muted">{l.org}</p>
                    {l.extra && <p className="mt-0.5 font-mono text-[10px] text-accent">{l.extra}</p>}
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
