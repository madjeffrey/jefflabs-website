"use client";

import React, { useState } from "react";

export interface FilterOption {
  tag: string;
  count: number;
}

interface FilterBarProps {
  options: FilterOption[];
  totalCount: number;
  activeTag: string;
  onSelect: (tag: string) => void;
  ariaLabel: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  totalCount,
  activeTag,
  onSelect,
  ariaLabel,
}) => {
  const [pinnedOpen, setPinnedOpen] = useState(false);

  const items: FilterOption[] = [{ tag: "All", count: totalCount }, ...options];

  return (
    <div className="flex w-full justify-end -mt-4">
      <div
        data-open={pinnedOpen}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setPinnedOpen(false);
            if (
              document.activeElement instanceof HTMLElement &&
              e.currentTarget.contains(document.activeElement)
            ) {
              document.activeElement.blur();
            }
          }
        }}
        className="group/filter inline-flex max-w-full items-center rounded-full border border-transparent p-1 transition-all duration-300 ease-out hover:border-border hover:bg-surface/80 hover:backdrop-blur-md focus-within:border-border focus-within:bg-surface/80 focus-within:backdrop-blur-md data-[open=true]:border-border data-[open=true]:bg-surface/80 data-[open=true]:backdrop-blur-md"
      >
        <div className="grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity] duration-300 ease-out group-hover/filter:grid-cols-[1fr] group-hover/filter:opacity-100 group-focus-within/filter:grid-cols-[1fr] group-focus-within/filter:opacity-100 group-data-[open=true]/filter:grid-cols-[1fr] group-data-[open=true]/filter:opacity-100">
          <div className="min-w-0 overflow-hidden">
            <div
              role="group"
              aria-label={ariaLabel}
              className="flex items-center gap-1 whitespace-nowrap pr-1.5"
            >
              {items.map(({ tag, count }) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={isActive}
                    onClick={(e) => {
                      onSelect(tag);
                      setPinnedOpen(false);
                      if (e.detail > 0) {
                        e.currentTarget.blur();
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs sm:px-3.5 sm:py-1.5 sm:text-sm font-medium tracking-[-0.01em] transition-colors ${
                      isActive
                        ? "border-border-strong bg-[var(--nav-active-bg)] text-fg"
                        : "border-transparent bg-transparent text-fg-muted hover:bg-neutral-alpha-weak hover:text-fg"
                    }`}
                  >
                    <span>{tag}</span>
                    <span className="text-xs font-normal tabular-nums opacity-65">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={pinnedOpen}
          aria-label={activeTag !== "All" ? `Filter: ${activeTag}` : "Toggle filters"}
          onClick={(e) => {
            setPinnedOpen((prev) => !prev);
            if (e.detail > 0) {
              e.currentTarget.blur();
            }
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors duration-200 hover:text-fg group-hover/filter:border-transparent group-focus-within/filter:border-transparent group-data-[open=true]/filter:border-transparent"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-3.5 w-3.5"
          >
            <path d="M2.5 4h11M4.5 8h7M6.5 12h3" />
          </svg>
          {activeTag !== "All" && (
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
          )}
          <span className="group-hover/filter:hidden sm:group-hover/filter:inline group-data-[open=true]/filter:hidden sm:group-data-[open=true]/filter:inline">
            {activeTag !== "All" ? activeTag : "Filter"}
          </span>
        </button>
      </div>
    </div>
  );
};
