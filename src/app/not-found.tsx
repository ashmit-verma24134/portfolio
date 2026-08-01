import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AnimatedBackground />

      <p className="font-display text-[7rem] font-extrabold leading-none text-gradient sm:text-[10rem]">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">This page drifted into deep space</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg"
        >
          <Home size={16} /> Back home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50"
        >
          <ArrowLeft size={16} /> View projects
        </Link>
      </div>
    </main>
  );
}
