"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, FileDown, FolderGit2, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { profile, socials, stats } from "@/data/resume";
import { TypingText } from "@/components/common/TypingText";
import { MagneticButton } from "@/components/common/MagneticButton";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: text */}
        <motion.div variants={container} initial="hidden" animate="visible" className="order-2 lg:order-1">
          <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for internships & collaborations
          </motion.div>

          <motion.p variants={item} className="mb-3 flex items-center gap-2 font-mono text-sm text-accent">
            <Sparkles size={15} /> Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={item} className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div variants={item} className="mt-4 flex items-center gap-2 font-display text-2xl font-semibold text-foreground/90 sm:text-3xl">
            <span className="text-muted">I&apos;m a</span>
            <TypingText words={[...profile.roles]} className="text-gradient-static" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href={profile.resume} target="_blank" variant="primary">
              <FileDown size={17} /> Download Résumé
            </MagneticButton>
            <MagneticButton href="#projects" variant="secondary">
              <FolderGit2 size={17} /> View Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail size={17} /> Contact Me
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {[
              { icon: Github, href: socials.github, label: "GitHub" },
              { icon: Linkedin, href: socials.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${socials.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor="pointer"
                className="group flex h-11 w-11 items-center justify-center rounded-full glass transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
              >
                <Icon size={18} className="text-muted transition-colors group-hover:text-accent" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div className="group relative">
            {/* Rotating gradient ring */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-violet opacity-40 blur-2xl animate-aurora" />
            <div className="absolute -inset-1 rounded-[2rem] bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.6),transparent_30%,rgba(139,92,246,0.6),transparent_60%)] animate-border-spin" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-card"
            >
              <Image
                src={profile.photo}
                alt={`${profile.name} — portrait`}
                width={440}
                height={520}
                priority
                className="h-[380px] w-[320px] object-cover object-center sm:h-[460px] sm:w-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              {/* Floating info chip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl glass-strong px-4 py-2.5">
                <div>
                  <p className="font-display text-sm font-semibold">{profile.name}</p>
                  <p className="text-[11px] text-muted">IIIT Delhi · CS &amp; Design</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                  Batch &apos;28
                </span>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-16 hidden rounded-xl glass-strong px-3 py-2 shadow-glow sm:block"
            >
              <p className="font-mono text-xs text-accent">{"</>"} C++ · Python</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 bottom-24 hidden rounded-xl glass-strong px-3 py-2 shadow-glow sm:block"
            >
              <p className="text-xs">🏆 Hackathon Winner</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mx-auto mt-12 w-full max-w-5xl px-5 sm:px-8"
      >
        <div className="grid grid-cols-2 gap-4 rounded-2xl glass px-5 py-5 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gradient-static">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="mx-auto mt-10 hidden w-fit flex-col items-center gap-1 text-muted lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        data-cursor="pointer"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
