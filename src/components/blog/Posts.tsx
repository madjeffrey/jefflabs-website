import React from "react";
import { getPosts } from "@/utils/utils";
import { PostsGrid, type BlogPostItem } from "./PostsGrid";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  enableFilter?: boolean;
  compact?: boolean;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  enableFilter = false,
  compact = false,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  if (displayedBlogs.length === 0) return null;

  const items: BlogPostItem[] = displayedBlogs.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      summary: post.metadata.summary,
      publishedAt: post.metadata.publishedAt,
      image: post.metadata.image,
      tag: post.metadata.tag,
    },
  }));

  return (
    <PostsGrid
      posts={items}
      columns={columns}
      thumbnail={thumbnail}
      direction={direction}
      enableFilter={enableFilter}
      compact={compact}
    />
  );
}
