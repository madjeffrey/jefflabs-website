import React from "react";
import { getPosts } from "@/utils/utils";
import { ProjectsGrid, type ProjectItem } from "@/components/work/ProjectsGrid";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  enableFilter?: boolean;
  compact?: boolean;
}

export function Projects({
  range,
  exclude,
  enableFilter = false,
  compact = false,
}: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  const items: ProjectItem[] = displayedProjects.map((post) => ({
    slug: post.slug,
    href: `/work/${post.slug}`,
    images: post.metadata.images,
    title: post.metadata.title,
    description: post.metadata.summary,
    tag: typeof post.metadata.tag === "string" ? post.metadata.tag : undefined,
    hasContent: post.content.trim() !== "",
    avatars:
      post.metadata.team?.map((member) => ({
        src: member.avatar,
        "aria-label": member.name,
      })) || [],
    link: post.metadata.link || "",
  }));

  return <ProjectsGrid projects={items} enableFilter={enableFilter} compact={compact} />;
}
