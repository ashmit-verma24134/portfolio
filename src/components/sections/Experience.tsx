"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Building2, CheckCircle2, FlaskConical } from "lucide-react";
import { useRef } from "react";
import { experiences } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've shipped"
          subtitle="Production internships and research where I built and deployed real systems end-to-end."
        />

        <div ref={ref} className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-brand-blue via-brand-cyan to-brand-violet shadow-glow"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const Icon = i === 0 ? Briefcase : FlaskConical;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={exp.company}
                  className={`relative flex flex-col gap-6 sm:flex-row sm:items-start ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background sm:left-1/2 sm:-translate-x-1/2">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-violet text-white shadow-glow"
                    >
                      <Icon size={17} />
                    </motion.span>
                  </div>

                  {/* Spacer for the other half on desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card */}
                  <div className="w-full pl-14 sm:w-1/2 sm:pl-0 sm:px-6">
                    <Reveal direction={isLeft ? "left" : "right"}>
                      <GlowCard className="p-6">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] text-accent">
                            {exp.period}
                          </span>
                          <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
                            {exp.team}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold leading-tight">{exp.role}</h3>
                        <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-accent">
                          <Building2 size={14} /> {exp.company}
                        </p>
                        <p className="mb-4 text-sm italic leading-relaxed text-muted">{exp.summary}</p>

                        <ul className="space-y-2.5">
                          {exp.highlights.map((h, hi) => (
                            <motion.li
                              key={hi}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: hi * 0.06 }}
                              className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/80"
                            >
                              <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                              <span>{h}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.stack.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-foreground/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </GlowCard>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
