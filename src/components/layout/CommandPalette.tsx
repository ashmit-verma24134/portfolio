"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  Swords,
  Trophy,
  GraduationCap,
  SunMoon,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, profile, socials } from "@/data/resume";
import { useTheme } from "./ThemeProvider";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  group: "Navigate" | "Actions" | "Social";
  run: () => void;
};

const navIcons: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  skills: Cpu,
  experience: Briefcase,
  projects: FolderGit2,
  competitive: Swords,
  achievements: Trophy,
  education: GraduationCap,
  contact: Mail,
};

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleTheme } = useTheme();

  const close = () => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  };

  const commands: Command[] = useMemo(() => {
    const scrollTo = (id: string) => () => {
      close();
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
    };
    const nav: Command[] = navItems.map((n) => ({
      id: `nav-${n.id}`,
      label: `Go to ${n.label}`,
      icon: navIcons[n.id] ?? Home,
      group: "Navigate",
      run: scrollTo(n.id),
    }));
    const actions: Command[] = [
      {
        id: "resume",
        label: "Download Résumé",
        hint: "PDF",
        icon: FileDown,
        group: "Actions",
        run: () => {
          window.open(profile.resume, "_blank");
          close();
        },
      },
      {
        id: "theme",
        label: "Toggle Theme",
        hint: "Dark / Light",
        icon: SunMoon,
        group: "Actions",
        run: () => {
          toggleTheme();
          close();
        },
      },
    ];
    const social: Command[] = [
      { id: "gh", label: "GitHub", icon: Github, group: "Social", run: () => { window.open(socials.github, "_blank"); close(); } },
      { id: "li", label: "LinkedIn", icon: Linkedin, group: "Social", run: () => { window.open(socials.linkedin, "_blank"); close(); } },
      { id: "cf", label: "Codeforces", icon: Swords, group: "Social", run: () => { window.open(socials.codeforces, "_blank"); close(); } },
      { id: "mail", label: "Email Me", icon: Mail, group: "Social", run: () => { window.open(`mailto:${socials.email}`, "_blank"); close(); } },
    ];
    return [...nav, ...actions, ...social];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
  }, [query, commands]);

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  };

  const groups = ["Navigate", "Actions", "Social"] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-strong shadow-glow-lg"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={18} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search or jump to…"
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”.</p>
              )}
              {groups.map((g) => {
                const items = filtered.filter((c) => c.group === g);
                if (!items.length) return null;
                return (
                  <div key={g} className="mb-1">
                    <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">{g}</p>
                    {items.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const activeItem = globalIndex === cursor;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.run}
                          onMouseEnter={() => setCursor(globalIndex)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            activeItem ? "bg-accent/15 text-foreground" : "text-muted"
                          }`}
                        >
                          <Icon size={16} className={activeItem ? "text-accent" : ""} />
                          <span className="flex-1">{cmd.label}</span>
                          {cmd.hint && <span className="font-mono text-[10px] text-muted">{cmd.hint}</span>}
                          {activeItem && <CornerDownLeft size={13} className="text-accent" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2.5 text-[10px] text-muted">
              <span className="flex items-center gap-1"><ArrowUp size={11} /><ArrowDown size={11} /> navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft size={11} /> select</span>
              <span className="ml-auto font-mono">⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
