import React from "react";
import { IconButton } from "@/components/ui/Button";
import { display, person, social } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 px-4 py-8 pb-24 md:pb-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-fg-muted">
          <div className="flex items-center gap-1.5">
            <span className="text-fg-subtle">© {currentYear} /</span>
            <span className="font-medium text-fg">{person.name}</span>
          </div>
          {display.themeSwitcher && <ThemeToggle />}
        </div>

        <div className="flex items-center gap-2">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </div>
      </div>
    </footer>
  );
};
