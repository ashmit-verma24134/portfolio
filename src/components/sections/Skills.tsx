"use client";

import { motion, useInView } from "framer-motion";
import {
  Code2,
  Boxes,
  Database,
  BrainCircuit,
  Wrench,
  Cloud,
  PenTool,
  Trophy,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { skillCategories, technicalElectives } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Boxes,
  Database,
  BrainCircuit,
  Wrench,
  Cloud,
  PenTool,
  Trophy,
};

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="group/skill">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-foreground/85">{name}</span>
        <span className="font-mono text-[10px] text-muted opacity-0 transition-opacity group-hover/skill:opacity-100">
          {level}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-violet"
        >
          <span className="absolute right-0 top-0 h-full w-4 bg-white/40 blur-sm" />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills & Stack"
          title="Tools I build with"
          subtitle="A categorized toolkit spanning languages, frameworks, databases, AI systems, cloud and design."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, ci) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <Reveal key={cat.title} direction="up" delay={ci * 0.05}>
                <GlowCard className="h-full p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.accent} text-white shadow-lg`}>
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-sm font-semibold leading-tight">{cat.title}</h3>
                  </div>
                  <div className="space-y-3.5">
                    {cat.skills.map((s, si) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} delay={si * 0.08} />
                    ))}
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        {/* Technical electives / coursework */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl glass p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 whitespace-nowrap text-accent">
              <GraduationCap size={18} />
              <span className="font-display text-sm font-semibold">Technical Electives &amp; Certifications</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalElectives.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
                  data-cursor="pointer"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
