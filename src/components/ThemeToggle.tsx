"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";

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
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ToggleButton
        size={size}
        variant={variant}
        prefixIcon="computer"
        aria-label="Toggle theme"
        {...props}
      />
    );
  }

  // Cycle between System (Device) -> Light -> Dark -> System
  const handleToggle = () => {
    if (theme === "system") {
      // If currently following device, switch to the opposite of resolved theme first
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else if (theme === "light") {
      setTheme(resolvedTheme === "light" ? "dark" : "system");
    } else {
      setTheme("system");
    }
  };

  const icon =
    theme === "system" ? "computer" : theme === "dark" ? "dark" : "light";

  const label =
    theme === "system"
      ? `System (${resolvedTheme} mode)`
      : `${theme.charAt(0).toUpperCase() + theme.slice(1)} mode`;

  return (
    <ToggleButton
      size={size}
      variant={variant}
      prefixIcon={icon}
      onClick={handleToggle}
      aria-label={`Theme: ${label}. Click to switch theme.`}
      title={`Theme: ${label}`}
      {...props}
    />
  );
};
