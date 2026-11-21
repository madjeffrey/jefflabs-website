import React from "react";
import { Meta, Schema, Newsletter } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-10 py-6">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <header className="flex flex-col items-start text-left gap-3 border-b border-border pb-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          Blog
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
          {blog.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-fg-muted leading-relaxed">
          {blog.description}
        </p>
      </header>

      <Posts enableFilter />
      <Newsletter />
    </div>
  );
}
