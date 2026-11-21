"use client";

import React from "react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

export interface PostProps {
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
  compact?: boolean;
}

export default function Post({
  post,
  thumbnail,
  direction = "row",
  compact = false,
}: PostProps) {
  if (compact) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex w-full flex-col gap-3 rounded-2xl p-4 transition-colors duration-200 hover:bg-neutral-alpha-weak"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <div className="flex items-center gap-2">
            <Avatar src={person.avatar} size="xs" aria-label={person.name} />
            <span className="font-normal text-fg">{person.name}</span>
          </div>
          <time dateTime={post.metadata.publishedAt} className="text-fg-subtle">
            {formatDate(post.metadata.publishedAt, false)}
          </time>
        </div>

        <h3 className="font-heading text-xl font-bold leading-snug tracking-tight text-fg text-balance">
          {post.metadata.title}
        </h3>

        {post.metadata.tag && (
          <span className="pt-1 text-xs font-medium text-fg-muted">
            {post.metadata.tag}
          </span>
        )}
      </Link>
    );
  }

  const isColumn = direction === "column";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex w-full overflow-hidden rounded-2xl border border-transparent bg-transparent p-4 transition-colors duration-200 hover:bg-neutral-alpha-weak ${
        isColumn ? "flex-col gap-3" : "flex-col md:flex-row md:items-center gap-5"
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

      <div className="flex flex-1 flex-col justify-center gap-2.5 px-1 py-1">
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-fg-muted">
          <div className="flex items-center gap-2">
            <Avatar src={person.avatar} size="xs" aria-label={person.name} />
            <span className="font-medium text-fg">{person.name}</span>
          </div>
          <span className="text-border-strong">·</span>
          <time dateTime={post.metadata.publishedAt} className="font-mono text-[11px]">
            {formatDate(post.metadata.publishedAt, false)}
          </time>
          {post.metadata.tag && (
            <>
              <span className="text-border-strong">·</span>
              <span className="rounded-full border border-border bg-neutral-alpha-weak px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
                {post.metadata.tag}
              </span>
            </>
          )}
        </div>

        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-fg transition-colors">
          {post.metadata.title}
        </h3>

        {post.metadata.summary && (
          <p className="line-clamp-2 text-sm text-fg-muted leading-relaxed">
            {post.metadata.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
