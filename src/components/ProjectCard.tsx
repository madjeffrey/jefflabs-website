"use client";

import React from "react";
import { AvatarGroup } from "@/components/ui/Avatar";
import { Carousel } from "@/components/ui/Carousel";
import { SmartLink } from "@/components/ui/MDXWidgets";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  hasContent: boolean;
  description: string;
  avatars: { src: string; "aria-label"?: string }[];
  link: string;
  tag?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  hasContent,
  description,
  avatars,
  link,
  tag,
}) => {
  return (
    <article className="group flex w-full flex-col gap-6 rounded-2xl border border-border bg-surface/60 p-4 sm:p-5 transition-all duration-300 hover:border-border-brand hover:shadow-card-hover backdrop-blur-sm">
      {images.length > 0 && (
        <Carousel
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
      )}

      <div className="flex w-full flex-col gap-6 px-2 pt-1 pb-2 md:flex-row md:items-start md:justify-between">
        {title && (
          <div className="flex flex-col gap-2 md:w-5/12">
            {tag && (
              <span className="w-fit rounded-full border border-border-brand bg-brand-soft px-3 py-0.5 text-xs font-semibold text-brand">
                {tag}
              </span>
            )}
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-fg group-hover:text-brand transition-colors">
              {title}
            </h2>
          </div>
        )}

        {(avatars?.length > 0 || description?.trim() || hasContent || link) && (
          <div className="flex flex-col gap-4 md:w-7/12">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="s" reverse />}
            {description?.trim() && (
              <p className="text-sm sm:text-base leading-relaxed text-fg-muted">
                {description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-sm">
              {hasContent && (
                <SmartLink href={href} suffixIcon="arrowRight">
                  Read tactical case study
                </SmartLink>
              )}
              {link && (
                <SmartLink href={link} suffixIcon="arrowUpRightFromSquare">
                  Launch live tool
                </SmartLink>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
