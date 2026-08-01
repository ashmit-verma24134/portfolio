"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  Home,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  Swords,
  Trophy,
  GraduationCap,
  Mail,
  Command,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/resume";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
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

export function FloatingNav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const ids = navItems.map((n) => n.id);
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top brand + controls */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2.5"
            data-cursor="pointer"
            aria-label="Back to top"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet font-display text-lg font-extrabold text-white shadow-glow">
              A
            </span>
            <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
              Ashmit<span className="text-accent">.</span>
            </span>
          </button>

          {/* Desktop center pill nav */}
          <nav className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full glass-strong px-2 py-1.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    isActive ? "text-white" : "text-muted hover:text-foreground"
                  )}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue/80 to-brand-violet/80 shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-full glass px-3 py-2 text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground sm:flex"
              data-cursor="pointer"
              aria-label="Open command palette"
            >
              <Command size={14} />
              <span className="font-mono">⌘K</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Mobile / tablet bottom dock */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 lg:hidden"
      >
        <div className="flex items-center gap-1 overflow-x-auto rounded-2xl glass-strong px-2 py-2 shadow-glow-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const Icon = icons[item.id] ?? Home;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                aria-label={item.label}
                className={cn(
                  "relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                  isActive ? "text-white" : "text-muted"
                )}
                data-cursor="pointer"
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-blue/80 to-brand-violet/80 shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={19} className="relative z-10" />
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
