"use client";

import React, { useMemo, useState } from "react";
import Post from "./Post";
import { FilterBar } from "@/components/ui/FilterBar";

export interface BlogPostItem {
  slug: string;
  metadata: {
    title: string;
    summary?: string;
    publishedAt: string;
    image?: string;
    tag?: string;
  };
}

interface PostsGridProps {
  posts: BlogPostItem[];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  enableFilter?: boolean;
  compact?: boolean;
}

const CATEGORY_ORDER = ["AI", "Philosophy", "Lessons"] as const;

export const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  columns = "1",
  thumbnail = false,
  direction,
  enableFilter = false,
  compact = false,
}) => {
  const [activeTag, setActiveTag] = useState<string>("All");

  const filterTags = useMemo(() => {
    const counts = new Map<string, number>(
      CATEGORY_ORDER.map((category) => [category, 0]),
    );
    for (const p of posts) {
      const tag = p.metadata.tag;
      if (tag) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    const ordered = Array.from(counts.keys()).sort((a, b) => {
      const idxA = (CATEGORY_ORDER as readonly string[]).indexOf(a);
      const idxB = (CATEGORY_ORDER as readonly string[]).indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ordered.map((tag) => ({ tag, count: counts.get(tag) ?? 0 }));
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (!enableFilter || activeTag === "All") return posts;
    return posts.filter((p) => p.metadata.tag === activeTag);
  }, [posts, enableFilter, activeTag]);

  const gridCols =
    columns === "3"
      ? "grid-cols-1 md:grid-cols-3"
      : columns === "2"
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1";

  if (posts.length === 0) return null;

  if (!enableFilter) {
    return (
      <div className={`grid w-full gap-5 ${gridCols}`}>
        {posts.map((post) => (
          <Post
            key={post.slug}
            post={post}
            thumbnail={thumbnail}
            direction={direction}
            compact={compact}
          />
        ))}
      </div>
    );
  }

  const featuredPost = activeTag === "All" && visiblePosts.length > 1 ? visiblePosts[0] : null;
  const remainingPosts = featuredPost ? visiblePosts.slice(1) : visiblePosts;

  return (
    <div className="flex w-full flex-col gap-5">
      {filterTags.length > 0 && (
        <FilterBar
          options={filterTags}
          totalCount={posts.length}
          activeTag={activeTag}
          onSelect={setActiveTag}
          ariaLabel="Filter blog posts by category"
        />
      )}

      {featuredPost && (
        <Post post={featuredPost} thumbnail={true} direction="row" />
      )}

      {remainingPosts.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {remainingPosts.map((post) => (
            <Post
              key={post.slug}
              post={post}
              thumbnail={true}
              direction="column"
            />
          ))}
        </div>
      )}

      {visiblePosts.length === 0 && (
        <p className="py-8 text-center text-sm text-fg-muted">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
};
