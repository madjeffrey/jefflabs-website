"use client";

import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { ToggleButton } from "@/components/ui/Button";
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

  return <span className="font-mono text-xs tracking-wider text-fg-subtle">{currentTime}</span>;
};

export default TimeDisplay;

const navItems: { href: keyof typeof routes; icon: IconName; label: string }[] = [
  { href: "/about", icon: "person", label: about.label },
  { href: "/work", icon: "grid", label: work.label },
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
        <div className="hidden md:flex flex-1 items-center text-xs text-fg-subtle">
          {display.location && <span>{person.location}</span>}
        </div>

        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex items-center gap-0.5 rounded-full bg-[var(--nav-bg)] p-1 shadow-[0_8px_28px_-6px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        >
          {routes["/"] && (
            <ToggleButton
              prefixIcon="home"
              href="/"
              aria-label="Home"
              selected={pathname === "/"}
            />
          )}
          <div className="mx-0.5 h-4 w-px bg-border-strong" />
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
        </nav>

        <div className="hidden md:flex flex-1 items-center justify-end">
          {display.time && <TimeDisplay timeZone={person.location} />}
        </div>
      </header>
    </>
  );
};
