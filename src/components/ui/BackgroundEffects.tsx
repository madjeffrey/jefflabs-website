"use client";

import React, { useEffect, useState } from "react";
import type { EffectsConfig } from "@/types";

export interface BackgroundEffectsProps {
  effects: EffectsConfig;
  className?: string;
  contained?: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  effects,
  className = "",
  contained = false,
}) => {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 20 });

  useEffect(() => {
    if (!effects.mask.cursor) return;
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setCursorPos({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [effects.mask.cursor]);

  const maskX = effects.mask.cursor ? cursorPos.x : effects.mask.x;
  const maskY = effects.mask.cursor ? cursorPos.y : effects.mask.y;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none inset-0 overflow-hidden ${
        contained ? "absolute rounded-3xl" : "fixed -z-10"
      } ${className}`.trim()}
    >
      {effects.gradient.display && (
        <div
          style={{
            opacity: effects.gradient.opacity / 100,
            background: `radial-gradient(circle at ${maskX}% ${maskY}%, var(--brand-glow), transparent 65%)`,
          }}
          className="absolute inset-0 transition-opacity duration-500"
        />
      )}

      {effects.dots.display && (
        <div
          style={{
            opacity: effects.dots.opacity / 100,
            backgroundImage: `radial-gradient(var(--brand-primary) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: `radial-gradient(ellipse 80% 60% at 50% 15%, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse 80% 60% at 50% 15%, black 30%, transparent 100%)`,
          }}
          className="absolute inset-0"
        />
      )}

      {effects.grid.display && (
        <div
          style={{
            opacity: effects.grid.opacity / 100,
            backgroundImage: `linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          className="absolute inset-0"
        />
      )}
    </div>
  );
};
