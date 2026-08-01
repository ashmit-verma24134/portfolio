"use client";

import { Github, Linkedin, Mail, Swords, ArrowUp, Heart } from "lucide-react";
import { profile, socials, navItems } from "@/data/resume";

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const links = [
    { icon: Github, href: socials.github, label: "GitHub" },
    { icon: Linkedin, href: socials.linkedin, label: "LinkedIn" },
    { icon: Swords, href: socials.codeforces, label: "Codeforces" },
    { icon: Mail, href: `mailto:${socials.email}`, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-white/10 pb-24 pt-14 lg:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm text-center md:text-left">
            <button onClick={toTop} className="mb-3 inline-flex items-center gap-2.5" data-cursor="pointer">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet font-display text-lg font-extrabold text-white shadow-glow">
                A
              </span>
              <span className="font-display text-base font-semibold">{profile.name}</span>
            </button>
            <p className="text-sm text-muted">{profile.tagline}</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-sm text-muted transition-colors hover:text-accent"
                data-cursor="pointer"
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor="pointer"
                className="group flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
              >
                <Icon size={17} className="text-muted transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with <Heart size={12} className="text-rose-400" /> using Next.js, Tailwind &amp; Framer Motion.
          </p>
          <button
            onClick={toTop}
            className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
            data-cursor="pointer"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
