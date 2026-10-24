import React from "react";
import { getPosts } from "@/utils/utils";
import { ProjectCard } from "@/components/ProjectCard";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
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

  return (
    <div className="flex w-full flex-col gap-10 mb-10">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          tag={typeof post.metadata.tag === "string" ? post.metadata.tag : undefined}
          hasContent={post.content.trim() !== ""}
          avatars={
            post.metadata.team?.map((member) => ({
              src: member.avatar,
              "aria-label": member.name,
            })) || []
          }
          link={post.metadata.link || ""}
        />
      ))}
    </div>
  );
}
