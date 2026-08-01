"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  strength?: number;
};

type AnchorProps = BaseProps & {
  href: string;
  onClick?: never;
  download?: boolean | string;
  target?: string;
  rel?: string;
};
type ButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

const styles = {
  primary:
    "bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet text-white shadow-glow hover:shadow-glow-lg",
  secondary: "glass-strong text-foreground hover:border-accent/50",
  ghost: "text-foreground/80 hover:text-foreground",
} as const;

export function MagneticButton(props: AnchorProps | ButtonProps) {
  const { children, className, variant = "primary", strength = 0.35 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <span
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
        styles[variant],
        className
      )}
      data-cursor="pointer"
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/mag:translate-x-full transition-transform duration-700"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="group/mag inline-block"
      whileTap={{ scale: 0.96 }}
    >
      {"href" in props && props.href ? (
        <a
          href={props.href}
          download={props.download}
          target={props.target}
          rel={props.rel}
          className="inline-block"
        >
          {inner}
        </a>
      ) : (
        <button
          type={(props as ButtonProps).type ?? "button"}
          onClick={(props as ButtonProps).onClick}
          className="inline-block"
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
