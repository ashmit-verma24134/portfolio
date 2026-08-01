"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view for scroll-spy navigation.
 * Uses IntersectionObserver for performance (no scroll listeners).
 */
export function useActiveSection(ids: string[], offset = 0.4) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
