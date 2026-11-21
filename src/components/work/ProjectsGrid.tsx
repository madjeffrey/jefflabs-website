"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Media } from "@/components/ui/Media";
import { FilterBar } from "@/components/ui/FilterBar";

export interface ProjectItem {
  slug: string;
  href: string;
  images: string[];
  title: string;
  description: string;
  tag?: string;
  hasContent: boolean;
  avatars: { src: string; "aria-label"?: string }[];
  link: string;
}

interface ProjectsGridProps {
  projects: ProjectItem[];
  enableFilter?: boolean;
  compact?: boolean;
}

const DOMAIN_ORDER = ["RL Research", "Robotics", "Games", "Systems"];

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  enableFilter = false,
  compact = false,
}) => {
  const [activeTag, setActiveTag] = useState<string>("All");

  const filterTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      if (p.tag) {
        counts.set(p.tag, (counts.get(p.tag) ?? 0) + 1);
      }
    }
    const ordered = Array.from(counts.keys()).sort((a, b) => {
      const idxA = DOMAIN_ORDER.indexOf(a);
      const idxB = DOMAIN_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ordered.map((tag) => ({ tag, count: counts.get(tag) ?? 0 }));
  }, [projects]);

  const visibleProjects = useMemo(() => {
    if (!enableFilter || activeTag === "All") return projects;
    return projects.filter((p) => p.tag === activeTag);
  }, [projects, enableFilter, activeTag]);

  if (compact) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {visibleProjects.map((project) => (
          <Link
            key={project.slug}
            href={project.href}
            className="group flex flex-col gap-2.5 rounded-xl border border-transparent bg-transparent p-3 transition-colors duration-200 hover:bg-neutral-alpha-weak"
          >
            {project.images.length > 0 && (
              <Media
                src={project.images[0]}
                alt={project.title}
                aspectRatio="16 / 9"
                className="w-full rounded-lg"
              />
            )}
            <div className="flex flex-col gap-1 px-0.5">
              {project.tag && (
                <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-fg-subtle">
                  {project.tag}
                </span>
              )}
              <h3 className="font-heading text-sm sm:text-base font-semibold leading-snug text-fg line-clamp-2">
                {project.title}
              </h3>
              {project.description?.trim() && (
                <p className="line-clamp-2 text-xs leading-relaxed text-fg-muted">
                  {project.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5 mb-10">
      {enableFilter && filterTags.length > 0 && (
        <FilterBar
          options={filterTags}
          totalCount={projects.length}
          activeTag={activeTag}
          onSelect={setActiveTag}
          ariaLabel="Filter projects by domain"
        />
      )}

      <div className="flex w-full flex-col gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            priority={index < 2}
            key={project.slug}
            href={project.href}
            images={project.images}
            title={project.title}
            description={project.description}
            tag={project.tag}
            hasContent={project.hasContent}
            avatars={project.avatars}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};
