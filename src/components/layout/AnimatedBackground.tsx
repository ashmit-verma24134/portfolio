"use client";

import dynamic from "next/dynamic";

// Three.js only on the client, lazily — keeps first paint fast.
const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

/**
 * The persistent, fixed "live wallpaper" behind the whole site:
 *   1. Deep gradient base
 *   2. Two drifting aurora blobs (CSS)
 *   3. Animated dot/line grid with a radial fade
 *   4. Three.js drifting particle field (parallax)
 *   5. Noise + vignette for that premium, filmic finish
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(220_60%_10%)_0%,_hsl(var(--background))_55%)] dark:opacity-100" />

      {/* Aurora blobs. Blur cost scales with radius × area, so a smaller radius
          on a slightly more saturated blob reads the same for much less work. */}
      <div className="absolute -left-[10%] top-[-10%] h-[45vh] w-[45vh] rounded-full bg-brand-blue/30 blur-[56px] animate-aurora will-change-transform" />
      <div className="absolute right-[-5%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-brand-violet/30 blur-[56px] animate-aurora-2 will-change-transform" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:56px_56px] opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />

      {/* Three.js particles */}
      <div className="absolute inset-0 opacity-80">
        <ParticleField />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background)/0.9)_100%)]" />

      {/* Subtle static film grain (no blend mode — cheaper during scroll) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
