"use client";

import React from "react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

interface PostProps {
  post: {
    slug: string;
    metadata: {
      title: string;
      summary?: string;
      publishedAt: string;
      image?: string;
      tag?: string;
    };
  };
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction = "row" }: PostProps) {
  const isColumn = direction === "column";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex w-full overflow-hidden rounded-2xl border border-transparent bg-transparent p-1 sm:p-1 transition-colors duration-200 hover:bg-neutral-alpha-weak ${
        isColumn ? "flex-col gap-2" : "flex-col md:flex-row md:items-center gap-5"
      }`}
    >
      {post.metadata.image && thumbnail && (
        <div className={isColumn ? "w-full" : "w-full md:w-5/12 shrink-0"}>
          <Media
            priority
            src={post.metadata.image}
            alt={`Thumbnail of ${post.metadata.title}`}
            aspectRatio="16 / 9"
            className="w-full rounded-xl"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center gap-3 px-2 py-2">
        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <div className="flex items-center gap-2">
            <Avatar src={person.avatar} size="xs" aria-label={person.name} />
            <span className="font-medium text-fg">{person.name}</span>
          </div>
          <span></span>
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt, false)}
          </time>
        </div>

        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-fg transition-colors">
          {post.metadata.title}
        </h3>

        {/* {post.metadata.summary && (
          <p className="line-clamp-2 text-sm text-fg-muted leading-relaxed">
            {post.metadata.summary}
          </p>
        )} */}

        {post.metadata.tag && (
          <span className="text-xs sm:text-sm font-semibold text-fg-subtle">
            {post.metadata.tag}
          </span>
        )}
      </div>
    </Link>
  );
}
