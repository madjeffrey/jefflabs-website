import React from "react";
import { Meta, Schema, Newsletter, Icon } from "@/components";
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

      <header className="flex flex-col gap-2">
        {/* <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border-brand bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <Icon name="volleyball" size="xs" />
          <span>Tactical Playbook & Engineering Blog</span>
        </span> */}
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
          {blog.title}
        </h1>
        {/* <p className="text-sm sm:text-base text-fg-muted">{blog.description}</p> */}
      </header>

      <div className="flex flex-col gap-8">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Newsletter />
        <h2 className="font-heading text-2xl font-bold tracking-tight text-fg pt-2">
          Earlier posts
        </h2>
        <Posts range={[4]} columns="2" direction="column" />
      </div>
    </div>
  );
}
