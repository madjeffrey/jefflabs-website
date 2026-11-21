"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/components/Providers";

export const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const active =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    setCurrentTheme(active);

    const observer = new MutationObserver(() => {
      const updated =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";
      setCurrentTheme(updated);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("user-has-toggled", "true");
      localStorage.setItem("data-theme", next);
    } catch {}
    setTheme(next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-neutral-alpha-weak hover:text-fg"
      >
        <Icon name="dark" size="s" />
      </button>
    );
  }

  const isDark = currentTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-neutral-alpha-weak hover:text-fg"
    >
      <Icon name={isDark ? "light" : "dark"} size="s" />
    </button>
  );
};
