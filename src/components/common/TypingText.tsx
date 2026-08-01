"use client";

import { useEffect, useState } from "react";

/** Typewriter effect cycling through a list of phrases. */
export function TypingText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1600,
  className,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className} aria-live="polite">
      {words[index % words.length].substring(0, subIndex)}
      <span className="ml-0.5 inline-block w-[3px] animate-blink bg-gradient-to-b from-brand-cyan to-brand-violet align-middle" style={{ height: "1em" }} />
    </span>
  );
}
