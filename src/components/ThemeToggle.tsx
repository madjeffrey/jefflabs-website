"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton } from "@/components/ui/Button";
import { useTheme } from "@/components/Providers";

interface ThemeToggleProps {
  size?: "s" | "m" | "l" | "xl";
  variant?: "ghost" | "outline" | "subtle";
  className?: string;
  style?: React.CSSProperties;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = "s",
  variant = "ghost",
  ...props
}) => {
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

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const icon = currentTheme === "dark" ? "light" : "dark";
  const label =
    currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  if (!mounted) {
    return (
      <ToggleButton
        size={size}
        variant={variant}
        prefixIcon="light"
        aria-label="Toggle theme"
        {...props}
      />
    );
  }

  return (
    <ToggleButton
      size={size}
      variant={variant}
      prefixIcon={icon}
      onClick={handleToggle}
      aria-label={label}
      title={label}
      {...props}
    />
  );
};
