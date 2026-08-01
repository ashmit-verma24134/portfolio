"use client";

import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Users,
  BookMarked,
  GitCommit,
  ArrowUpRight,
  Flame,
  GitPullRequest,
  Activity,
} from "lucide-react";
import { github, generateHeatmap } from "@/lib/mock-data";
import { socials } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { DonutChart } from "@/components/common/DonutChart";
import { Heatmap } from "@/components/common/Heatmap";

const activityIcon: Record<string, typeof GitCommit> = {
  push: GitCommit,
  star: Star,
  pr: GitPullRequest,
};

export function GitHubSection() {
  const heat = generateHeatmap(21, 26);

  return (
    <section id="github" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Open Source"
          title="On GitHub"
          subtitle="Repositories, languages and contribution activity — pulled from my public GitHub."
        />

        {/* Profile header */}
        <Reveal direction="up">
          <GlowCard className="mb-6 flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-glow">
                <Github size={30} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{github.username}</h3>
                <p className="text-sm text-muted">{github.bio}</p>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                  data-cursor="pointer"
                >
                  View profile <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: BookMarked, label: "Repos", value: github.publicRepos },
                { icon: Users, label: "Followers", value: github.followers },
                { icon: Star, label: "Stars", value: github.totalStars },
                { icon: Users, label: "Following", value: github.following },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-center">
                  <s.icon size={15} className="mx-auto mb-1 text-accent" />
                  <p className="font-display text-lg font-bold">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-[9px] uppercase tracking-wide text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </GlowCard>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Contribution heatmap */}
          <Reveal direction="up">
            <GlowCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  <Activity size={12} className="text-accent" /> Contribution graph
                </p>
                <div className="flex gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-orange-400"><Flame size={12} /> {github.currentStreak}d streak</span>
                  <span className="text-muted">Longest {github.longestStreak}d</span>
                </div>
              </div>
              <Heatmap cells={heat} label="contributions this period" />
              <p className="mt-4 text-[11px] text-muted">
                <AnimatedCounter value={github.totalContributions} className="font-mono text-accent" /> contributions ·
                member since {github.memberSince}
              </p>
            </GlowCard>
          </Reveal>

          {/* Languages donut */}
          <Reveal direction="up" delay={0.05}>
            <GlowCard className="flex h-full flex-col items-center justify-center p-6">
              <p className="mb-4 self-start font-mono text-[10px] uppercase tracking-wider text-muted">Most used languages</p>
              <DonutChart segments={[...github.languages]} centerLabel={`${github.publicRepos}`} centerSub="repos" />
              <div className="mt-5 grid w-full grid-cols-2 gap-2">
                {github.languages.map((l) => (
                  <div key={l.name} className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-foreground/80">{l.name}</span>
                    <span className="ml-auto font-mono text-muted">{l.percent}%</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* Pinned repos */}
        <div className="mt-6">
          <p className="mb-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            <BookMarked size={12} className="text-accent" /> Pinned repositories
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {github.pinnedRepos.map((repo, i) => (
              <Reveal key={repo.name} direction="up" delay={(i % 3) * 0.05}>
                <motion.a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5 }}
                  data-cursor="pointer"
                  className="group flex h-full flex-col rounded-2xl glass p-5 transition-all hover:border-accent/40 hover:shadow-glow"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                      <Github size={15} /> {repo.name}
                    </span>
                    <ArrowUpRight size={15} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-muted">{repo.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: repo.color }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1"><Star size={12} /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks}</span>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Activity timeline */}
        <Reveal direction="up" delay={0.1}>
          <GlowCard className="mt-6 p-6">
            <p className="mb-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              <GitCommit size={12} className="text-accent" /> Recent activity
            </p>
            <div className="space-y-3">
              {github.activity.map((a, i) => {
                const Icon = activityIcon[a.type] ?? GitCommit;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon size={14} />
                    </span>
                    <span className="text-foreground/80">{a.detail}</span>
                    <span className="ml-auto flex-shrink-0 font-mono text-[10px] text-muted">{a.repo}</span>
                  </motion.div>
                );
              })}
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
