"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { style } from "@/resources";
import type { ThemeMode } from "@/types";
import { Icon } from "@/components/ui/Icon";

interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export interface ToastItem {
  id: string;
  variant: "success" | "danger" | "info";
  message: string;
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setThemeState(current);
    } else if (style.theme === "light" || style.theme === "dark") {
      setThemeState(style.theme);
    }
  }, []);

  const setTheme = useCallback((nextMode: ThemeMode) => {
    const root = document.documentElement;
    const resolved =
      nextMode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : nextMode;
    setThemeState(resolved);
    root.setAttribute("data-theme", resolved);
    root.style.colorScheme = resolved;
  }, []);

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ToastContext.Provider value={{ addToast }}>
        {children}
        {toasts.length > 0 && (
          <div
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
          >
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-glass backdrop-blur-md animate-fade-up ${
                  t.variant === "success"
                    ? "border-emerald-500/40 bg-emerald-950/85 text-emerald-100"
                    : t.variant === "danger"
                      ? "border-rose-500/40 bg-rose-950/85 text-rose-100"
                      : "border-border-brand bg-surface-elevated text-fg"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    name={t.variant === "success" ? "check" : "sparkles"}
                    className="h-4 w-4 shrink-0 text-brand"
                  />
                  <span>{t.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                  className="text-fg-muted hover:text-fg transition-colors"
                  aria-label="Dismiss notification"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
}
