"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Sparkles, Zap, AlertTriangle, Users, Calendar } from "lucide-react";
import { projects } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";

export function Projects() {
  return (
    <section id="projects" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I'm proud of"
          subtitle="From a hackathon-winning React app to ACID-compliant databases and a custom-ISA assembler — built end-to-end."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} direction="up" delay={(i % 2) * 0.08}>
              <GlowCard
                className={`flex h-full flex-col p-6 sm:p-7 ${p.featured ? "lg:min-h-[26rem]" : ""}`}
                spotlightColor={i % 2 === 0 ? "rgba(59,130,246,0.15)" : "rgba(139,92,246,0.15)"}
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    {p.award && (
                      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/10 px-3 py-1 text-[11px] font-medium text-amber-300">
                        {p.award}
                      </span>
                    )}
                    <h3 className="font-display text-xl font-bold leading-tight transition-colors group-hover/glow:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{p.tagline}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right text-[11px] text-muted">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {p.period}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {p.team.replace("Team Size · ", "Team of ")}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-muted">{p.description}</p>

                {/* Features */}
                <div className="mb-5">
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-cyan">
                    <Zap size={12} /> Key features
                  </p>
                  <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[12.5px] text-foreground/75">
                        <Sparkles size={12} className="mt-0.5 flex-shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenge */}
                <div className="mb-5 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-3">
                  <p className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-400/90">
                    <AlertTriangle size={11} /> Challenge solved
                  </p>
                  <p className="text-[12.5px] leading-relaxed text-foreground/70">{p.challenges}</p>
                </div>

                {/* Footer: stack + links */}
                <div className="mt-auto">
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {p.github && (
                      <motion.a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                        data-cursor="pointer"
                      >
                        <Github size={15} /> Source
                      </motion.a>
                    )}
                    {p.demo && (
                      <motion.a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.03 }}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent"
                        data-cursor="pointer"
                      >
                        Live demo <ArrowUpRight size={14} />
                      </motion.a>
                    )}
                    <span className="ml-auto rounded-full bg-white/[0.03] px-2.5 py-1 text-[10px] text-muted">
                      {p.category}
                    </span>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
