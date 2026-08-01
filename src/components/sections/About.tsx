"use client";

import Image from "next/image";
import { MapPin, Cake, Mail, GraduationCap, Target, Sparkles, Heart } from "lucide-react";
import { profile, expertiseAreas, interests } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal, RevealStagger, staggerItem } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";
import { motion } from "framer-motion";

const quickFacts = [
  { icon: GraduationCap, label: "Education", value: "B.Tech CS & Design · IIIT Delhi" },
  { icon: MapPin, label: "Based in", value: profile.location },
  { icon: Cake, label: "Born", value: profile.dob },
  { icon: Mail, label: "Email", value: profile.email },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="The engineer behind the work"
          subtitle="A quick look at who I am, what I care about, and where I'm headed."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left: portrait + quick facts */}
          <Reveal direction="right">
            <GlowCard className="h-full p-1.5">
              {/* The source portrait is square, so the frame is square too —
                  object-cover then has nothing to crop and the face stays whole. */}
              <div className="relative aspect-square overflow-hidden rounded-[0.9rem]">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={400}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="font-display text-xl font-bold">{profile.name}</p>
                  <p className="text-sm text-accent">Software Engineer · Problem Solver</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2">
                {quickFacts.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <f.icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted">{f.label}</p>
                      <p className="truncate text-xs font-medium text-foreground">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>

          {/* Right: story + objective */}
          <div className="flex flex-col gap-6">
            <Reveal direction="left">
              <GlowCard className="p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2 text-accent">
                  <Sparkles size={18} />
                  <h3 className="font-display text-lg font-semibold">Who I am</h3>
                </div>
                <p className="leading-relaxed text-muted">
                  I&apos;m a Computer Science &amp; Design undergraduate at{" "}
                  <span className="text-foreground">IIIT Delhi (Batch of 2028)</span> who loves turning hard
                  problems into clean, reliable systems. My work spans{" "}
                  <span className="text-foreground">production RAG pipelines and agentic AI</span>, clinical
                  ML forecasting, multi-tenant backends, and even a low-level assembler &amp; simulator. I
                  pair a strong algorithmic foundation — <span className="text-foreground">250+ DSA problems</span>{" "}
                  and active competitive programming — with an eye for design and user experience.
                </p>
              </GlowCard>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <GlowCard className="p-6 sm:p-7" spotlightColor="rgba(139,92,246,0.15)">
                <div className="mb-3 flex items-center gap-2 text-brand-violet">
                  <Target size={18} />
                  <h3 className="font-display text-lg font-semibold">Career objective</h3>
                </div>
                <p className="leading-relaxed text-muted">{profile.objective}</p>
              </GlowCard>
            </Reveal>

            {/* Expertise chips */}
            <Reveal direction="up" delay={0.15}>
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Areas of expertise</p>
                <RevealStagger className="flex flex-wrap gap-2" stagger={0.04}>
                  {expertiseAreas.map((area) => (
                    <motion.span
                      key={area}
                      variants={staggerItem}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
                      data-cursor="pointer"
                    >
                      {area}
                    </motion.span>
                  ))}
                </RevealStagger>
              </div>
            </Reveal>

            {/* Interests */}
            <Reveal direction="up" delay={0.2}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted">
                  <Heart size={13} className="text-rose-400" /> Beyond code
                </span>
                <div className="flex flex-wrap gap-2">
                  {interests.map((i) => (
                    <span key={i} className="rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-violet/10 px-3 py-1 text-xs text-foreground/80">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
