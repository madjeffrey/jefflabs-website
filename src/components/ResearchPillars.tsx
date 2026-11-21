import React from "react";
import { Icon } from "@/components/ui/Icon";
import { home, person } from "@/resources";

export const ResearchPillars: React.FC = () => {
  if (!home.researchPillars || home.researchPillars.length === 0) return null;

  return (
    <section
      aria-label="Research Focus Pillars"
      className="flex w-full flex-col gap-4"
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {home.researchPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-transparent p-5 transition-colors duration-200 hover:bg-neutral-alpha-weak"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
                  {pillar.tag}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-brand bg-brand-soft text-brand">
                  <Icon name={pillar.icon} size="s" />
                </div>
              </div>
              <h3 className="font-heading text-lg font-bold tracking-tight text-fg">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-fg-muted">{pillar.description}</p>
            </div>

            {pillar.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pillar.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-border bg-neutral-alpha-weak px-2 py-0.5 font-mono text-[11px] text-fg-subtle"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {person.research?.coreStack && person.research.coreStack.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 text-xs backdrop-blur-md">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
            Core Stack
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {person.research.coreStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-neutral-alpha-weak px-2 py-0.5 font-mono text-[11px] text-fg-subtle"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
