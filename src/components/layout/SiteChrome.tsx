"use client";

import { useState } from "react";
import { FloatingNav } from "./FloatingNav";
import { CommandPalette } from "./CommandPalette";

/** Client-side chrome: floating nav + command palette sharing open state. */
export function SiteChrome() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <>
      <FloatingNav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
