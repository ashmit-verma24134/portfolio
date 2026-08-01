"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Reveal direction="up">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="text-gradient-static">{title}</span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal direction="up" delay={0.16}>
          <p className={cn("max-w-2xl text-base text-muted sm:text-lg", align === "center" && "mx-auto")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
