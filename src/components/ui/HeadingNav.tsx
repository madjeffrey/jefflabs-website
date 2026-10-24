"use client";

import React, { useEffect, useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export const HeadingNav: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h1[id], article h2[id], article h3[id]"),
    );
    const items: HeadingItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.replace("H", "")),
    }));
    setHeadings(items);

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={`flex flex-col gap-2.5 border-l border-border-strong pl-4 text-xs ${className}`.trim()}
    >
      <span className="font-semibold uppercase tracking-wider text-fg-subtle">On this page</span>
      {headings.map((h) => {
        const isActive = activeId === h.id;
        return (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(h.id);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                setActiveId(h.id);
              }
            }}
            className={`transition-all duration-200 line-clamp-2 ${
              h.level === 3 ? "pl-3" : ""
            } ${
              isActive
                ? "font-semibold text-brand translate-x-0.5"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {h.text}
          </a>
        );
      })}
    </nav>
  );
};
