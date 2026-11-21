"use client";

import React from "react";
import Link from "next/link";
import { AvatarGroup } from "@/components/ui/Avatar";
import { Carousel } from "@/components/ui/Carousel";
import { Icon } from "@/components/ui/Icon";
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
    <article className="group relative flex w-full cursor-pointer flex-col gap-5 rounded-[22px] border border-transparent bg-transparent p-1.5 transition-colors duration-200 hover:bg-neutral-alpha-weak">
      {!title && (
        <Link
          href={href}
          aria-label="View project"
          className="absolute inset-0 z-10 rounded-[22px] focus-visible:outline-none"
        />
      )}

      {images.length > 0 && (
        <Carousel
          enlarge={false}
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
      )}

      <div className="flex w-full flex-col gap-6 px-3 pb-3 pt-1 sm:px-4 sm:pb-4 md:flex-row md:items-start md:justify-between">
        {title && (
          <div className="flex flex-col gap-2 md:w-5/12">
            {tag && (
              <span className="w-fit rounded-full border border-border bg-neutral-alpha-weak px-3 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
                {tag}
              </span>
            )}
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-fg transition-colors">
              <Link
                href={href}
                className="after:absolute after:inset-0 after:z-10 after:rounded-[22px] after:content-[''] focus-visible:outline-none"
              >
                {title}
              </Link>
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
                <span className="inline-flex items-center gap-1.5 font-medium text-brand">
                  <span>Read technical write-up</span>
                  <Icon
                    name="arrowRight"
                    size="xs"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              )}
              {link && (
                <SmartLink
                  href={link}
                  suffixIcon="arrowUpRightFromSquare"
                  className="relative z-20"
                >
                  View source
                </SmartLink>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
