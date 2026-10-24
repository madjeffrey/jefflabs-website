import React from "react";
import { Icon } from "@/components/ui/Icon";
import { home, person } from "@/resources";

export const CourtTelemetry: React.FC = () => {
  if (!home.highlights || home.highlights.length === 0) return null;

  return (
    <section
      aria-label="Volleyball & AI Telemetry Highlights"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {home.highlights.map((item, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-border-brand hover:shadow-brand-glow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
              {item.title}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:rotate-12">
              <Icon name={item.icon} size="s" />
            </div>
          </div>
          <div className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-fg">
            {item.metric}
          </div>
          <p className="text-xs leading-relaxed text-fg-muted">{item.description}</p>
        </div>
      ))}
      {person.volleyball && (
        <div className="sm:col-span-3 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border-brand bg-brand-soft/40 px-5 py-3.5 text-xs">
          <div className="flex items-center gap-2 font-semibold text-fg">
            <Icon name="volleyball" size="s" className="text-brand" />
            <span>Court Profile: {person.volleyball.position}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-fg-muted">
            <span>
              <strong className="text-fg">System:</strong> {person.volleyball.favoriteSystem}
            </span>
            <span>•</span>
            <span>
              <strong className="text-fg">Focus:</strong> {person.volleyball.playStyle}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
