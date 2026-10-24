"use client";

import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { ToggleButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";
import { routes, display, person, about, blog, work, gallery } from "@/resources";
import type { IconName } from "@/resources/icons";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        const timeString = new Intl.DateTimeFormat(locale, options).format(now);
        setCurrentTime(timeString);
      } catch {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <span className="font-mono text-xs tracking-wider text-fg-muted">{currentTime}</span>;
};

export default TimeDisplay;

const navItems: { href: keyof typeof routes; icon: IconName; label: string }[] = [
  { href: "/about", icon: "person", label: about.label },
  { href: "/work", icon: "volleyball", label: work.label },
  { href: "/blog", icon: "book", label: blog.label },
  { href: "/gallery", icon: "gallery", label: gallery.label },
];

export const Header: React.FC = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-20 hidden h-20 bg-gradient-to-b from-page to-transparent md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-20 block h-20 bg-gradient-to-t from-page to-transparent md:hidden"
      />

      <header className="fixed bottom-5 inset-x-0 z-30 flex w-full items-center justify-between px-4 md:sticky md:top-4 md:bottom-auto md:px-8">
        <div className="hidden md:flex flex-1 items-center gap-2 text-xs font-medium text-fg-muted">
          {display.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1 backdrop-blur-md">
              <Icon name="globe" size="xs" className="text-brand" />
              <span>{person.location}</span>
            </span>
          )}
        </div>

        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex items-center gap-1 rounded-2xl border border-border-strong bg-surface-glass p-1.5 shadow-glass backdrop-blur-xl"
        >
          {routes["/"] && (
            <ToggleButton
              prefixIcon="home"
              href="/"
              aria-label="Home"
              selected={pathname === "/"}
            />
          )}
          <div className="mx-1 h-5 w-px bg-border-strong" />
          {navItems.map(
            (item) =>
              routes[item.href] && (
                <Fragment key={item.href}>
                  <div className="hidden sm:block">
                    <ToggleButton
                      prefixIcon={item.icon}
                      href={item.href}
                      label={item.label}
                      selected={pathname.startsWith(item.href)}
                    />
                  </div>
                  <div className="block sm:hidden">
                    <ToggleButton
                      prefixIcon={item.icon}
                      href={item.href}
                      aria-label={item.label}
                      selected={pathname.startsWith(item.href)}
                    />
                  </div>
                </Fragment>
              ),
          )}
          {display.themeSwitcher && (
            <>
              <div className="mx-1 h-5 w-px bg-border-strong" />
              <ThemeToggle size="s" />
            </>
          )}
        </nav>

        <div className="hidden md:flex flex-1 items-center justify-end gap-3">
          {display.time && (
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              <TimeDisplay timeZone={person.location} />
            </div>
          )}
        </div>
      </header>
    </>
  );
};
