import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import {
  CustomMDX,
  ScrollToHash,
  Meta,
  Schema,
  HeadingNav,
  SmartLink,
  Avatar,
  Media,
} from "@/components";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "blog", "posts"]).find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex w-full justify-center gap-10 py-6">
      <section className="flex w-full max-w-2xl flex-col items-center gap-6">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${blog.path}/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.summary}
          datePublished={post.metadata.publishedAt}
          dateModified={post.metadata.publishedAt}
          image={
            post.metadata.image ||
            `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
          }
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        <header className="flex flex-col items-center text-center gap-3">
          <SmartLink href="/blog" prefixIcon="chevronLeft">
            Blog
          </SmartLink>
          <time className="text-xs font-medium text-fg-muted">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </time>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-fg text-balance">
            {post.metadata.title}
          </h1>
          {post.metadata.subtitle && (
            <p className="text-base sm:text-lg italic text-fg-muted">
              {post.metadata.subtitle}
            </p>
          )}
        </header>

        <div className="flex items-center gap-3 py-2">
          <Avatar size="s" src={person.avatar} aria-label={person.name} />
          <span className="text-sm font-semibold text-brand">{person.name}</span>
        </div>

        {post.metadata.image && (
          <Media
            src={post.metadata.image}
            alt={post.metadata.title}
            aspectRatio="16 / 9"
            priority
            enlarge
            className="w-full my-2"
          />
        )}

        <article className="w-full">
          <CustomMDX source={post.content} />
        </article>

        <ShareSection title={post.metadata.title} url={`${baseURL}${blog.path}/${post.slug}`} />

        <div className="mt-8 flex w-full flex-col items-center gap-6 border-t border-border pt-8">
          <h2 id="recent-posts" className="font-heading text-2xl font-bold text-fg">
            Recent articles
          </h2>
          <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
        </div>

        <ScrollToHash />
      </section>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">
          <HeadingNav />
        </div>
      </aside>
    </div>
  );
}
