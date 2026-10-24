import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Media,
  SmartLink,
  ScrollToHash,
  CustomMDX,
} from "@/components";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { Metadata } from "next";
import React from "react";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
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

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((member) => ({
      src: member.avatar,
      "aria-label": member.name,
    })) || [];

  return (
    <section className="flex w-full max-w-3xl flex-col items-center gap-8 py-6">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <header className="flex max-w-2xl flex-col items-center text-center gap-3">
        <SmartLink href="/work" prefixIcon="chevronLeft">
          Projects
        </SmartLink>
        {post.metadata.publishedAt && (
          <time className="text-xs font-medium text-fg-muted">
            {formatDate(post.metadata.publishedAt)}
          </time>
        )}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-fg text-balance">
          {post.metadata.title}
        </h1>
      </header>

      {post.metadata.team && post.metadata.team.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <AvatarGroup reverse avatars={avatars} size="s" />
          <div className="text-sm font-medium text-fg-muted">
            {post.metadata.team.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && <span className="text-fg-subtle">, </span>}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </div>
        </div>
      )}

      {post.metadata.images.length > 0 && (
        <Media
          priority
          enlarge
          aspectRatio="16 / 9"
          alt={post.metadata.title}
          src={post.metadata.images[0]}
          className="w-full"
        />
      )}

      <article className="w-full max-w-2xl">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-10 flex w-full flex-col items-center gap-8 border-t border-border pt-10">
        <h2 className="font-heading text-2xl font-bold text-fg">Related Volleyball Projects</h2>
        <Projects exclude={[post.slug]} range={[2]} />
      </div>

      <ScrollToHash />
    </section>
  );
}
