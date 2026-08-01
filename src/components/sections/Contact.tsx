"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Swords,
  Copy,
  Check,
  ChevronDown,
  Send,
  MapPin,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { profile, socials } from "@/data/resume";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GlowCard } from "@/components/common/GlowCard";

type Channel = { icon: LucideIcon; label: string; value: string; href: string; color: string };

const channels: Channel[] = [
  { icon: Mail, label: "Email", value: socials.email, href: `mailto:${socials.email}`, color: "#22d3ee" },
  { icon: Github, label: "GitHub", value: `@${socials.githubUser}`, href: socials.github, color: "#a78bfa" },
  { icon: Linkedin, label: "LinkedIn", value: "Ashmit Verma", href: socials.linkedin, color: "#60a5fa" },
  { icon: Swords, label: "Codeforces", value: `@${socials.codeforcesUser}`, href: socials.codeforces, color: "#34d399" },
];

export function Contact() {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's connect"
          subtitle="Have an opportunity, a project, or just want to say hi? My inbox is always open."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: connect dropdown */}
          <Reveal direction="right">
            <GlowCard className="flex h-full flex-col p-7">
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to opportunities
                </div>
                <h3 className="font-display text-2xl font-bold">
                  Reach me <span className="text-gradient-static">directly</span>
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} className="text-accent" /> {profile.location}
                </p>
              </div>

              {/* Email quick copy */}
              <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Mail size={18} />
                  </span>
                  <span className="truncate text-sm text-foreground/85">{socials.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                  data-cursor="pointer"
                  aria-label="Copy email"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="c" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                        <Check size={14} /> Copied
                      </motion.span>
                    ) : (
                      <motion.span key="d" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                        <Copy size={14} /> Copy
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Expandable channels */}
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.05]"
                data-cursor="pointer"
                aria-expanded={open}
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={15} className="text-accent" /> All my channels
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {channels.map((c, i) => (
                        <motion.a
                          key={c.label}
                          href={c.href}
                          target="_blank"
                          rel="noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ y: -3 }}
                          data-cursor="pointer"
                          className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 transition-all hover:border-accent/40 hover:shadow-glow"
                        >
                          <span
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${c.color}1a`, color: c.color }}
                          >
                            <c.icon size={18} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wide text-muted">{c.label}</p>
                            <p className="truncate text-xs font-medium text-foreground/85">{c.value}</p>
                          </div>
                          <ArrowUpRight size={14} className="ml-auto text-muted transition-colors group-hover:text-accent" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlowCard>
          </Reveal>

          {/* Right: contact form */}
          <Reveal direction="left">
            <GlowCard className="p-7" spotlightColor="rgba(139,92,246,0.15)">
              <h3 className="mb-1 font-display text-2xl font-bold">Send a message</h3>
              <p className="mb-6 text-sm text-muted">This opens your mail client, pre-filled and ready to send.</p>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
                    />
                  </Field>
                </div>
                <Field label="Message">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the opportunity or idea…"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60"
                  />
                </Field>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg"
                  data-cursor="pointer"
                >
                  <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  Send Message
                </motion.button>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  );
}
