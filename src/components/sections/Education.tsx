"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { education } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";

export function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic journey"
          subtitle="From a strong CBSE foundation to Computer Science & Design at IIIT Delhi."
        />

        <div className="relative">
          {/* Spine */}
          <div className="absolute left-[19px] top-3 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand-blue via-brand-cyan to-transparent" />

          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={edu.institution + edu.period} className="relative flex gap-6 pl-14">
                {/* Node */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-violet text-white shadow-glow"
                >
                  {i === 0 ? <GraduationCap size={18} /> : <BookOpen size={16} />}
                </motion.span>

                <Reveal direction="left" className="w-full">
                  <GlowCard className="p-6">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] text-accent">
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-teal-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        <Award size={13} /> {edu.scoreLabel}: {edu.score}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight">{edu.institution}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">{edu.degree}</p>
                    <p className="text-xs text-muted">{edu.detail}</p>

                    {edu.coursework && (
                      <div className="mt-4">
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">Relevant coursework</p>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.coursework.map((c) => (
                            <span key={c} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-foreground/75">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </GlowCard>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
