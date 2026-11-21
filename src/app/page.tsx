import React from "react";
import Link from "next/link";
import {
  Avatar,
  RevealFx,
  Badge,
  Schema,
  Meta,
  Newsletter,
  ResearchPillars,
  SmartLink,
} from "@/components";
import { home, about, person, baseURL, routes, display } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-20 py-6">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className="mx-auto flex w-full max-w-3xl flex-col items-center pt-10 pb-16 text-center sm:pt-16 sm:pb-24">
        {home.featured.display && (
          <RevealFx className="pb-7">
            <Badge href={home.featured.href} showArrow={false}>
              {home.featured.title}
            </Badge>
          </RevealFx>
        )}

        <RevealFx delay={80} className="pb-5">
          <h1 className="font-heading text-5xl font-bold leading-[1.06] tracking-[-0.035em] text-fg text-balance sm:text-6xl md:text-[4.25rem]">
            {home.headline}
          </h1>
        </RevealFx>

        <RevealFx delay={160} className="pb-9">
          <p className="max-w-2xl text-lg leading-[1.55] text-fg-muted text-balance sm:text-xl md:text-[1.35rem]">
            {home.subline}
          </p>
        </RevealFx>

        <RevealFx delay={240}>
          <Link
            id="about"
            href={about.path}
            className={`group inline-flex items-center rounded-full border border-border-strong bg-transparent py-1.5 ${about.avatar.display ? "pl-1.5" : "pl-6"} pr-6 text-[15px] font-normal text-fg backdrop-blur-md transition-all duration-300 ease-out hover:border-fg/25 hover:bg-neutral-alpha-weak hover:pr-4 focus-visible:border-fg/25 focus-visible:bg-neutral-alpha-weak focus-visible:pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50`}
          >
            {about.avatar.display && (
              <Avatar
                src={person.avatar}
                size="s"
                aria-hidden
                className="mr-3.5"
              />
            )}
            <span className="whitespace-nowrap">{about.title}</span>
            <span
              aria-hidden="true"
              className="inline-flex w-0 items-center justify-end overflow-hidden text-fg-muted opacity-0 transition-all duration-300 ease-out group-hover:ml-2.5 group-hover:w-4 group-hover:text-fg group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:w-4 group-focus-visible:text-fg group-focus-visible:opacity-100"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
              >
                <line
                  x1="2"
                  y1="8"
                  x2="13"
                  y2="8"
                  className="[transform-box:fill-box] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <path
                  d="M9 4l4 4-4 4"
                  className="-translate-x-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
                />
              </svg>
            </span>
          </Link>
        </RevealFx>
      </section>

      <RevealFx delay={320} className="w-full">
        <section id="featured-work" className="scroll-mt-24 flex w-full flex-col gap-6">
          <div className="flex items-center border-b border-border pb-3">
            <h2>
              <SmartLink
                href="/work"
                suffixIcon="arrowRight"
                className="font-mono text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-strong"
              >
                Featured Work
              </SmartLink>
            </h2>
          </div>
          <Projects range={[1, 1]} />
        </section>
      </RevealFx>

      {routes["/blog"] && (
        <section className="flex w-full flex-col gap-10">
          <div className="h-px w-3/4 bg-border" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="flex flex-row items-end justify-between gap-4 lg:w-1/4 lg:shrink-0 lg:flex-col lg:items-start lg:justify-start lg:pt-4">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-fg text-balance">
                Latest from the blog
              </h2>
              <SmartLink
                href="/blog"
                suffixIcon="arrowRight"
                className="text-sm text-fg-muted hover:text-fg"
              >
                All posts
              </SmartLink>
            </div>
            <div className="min-w-0 flex-1">
              <Posts range={[1, 2]} columns="2" direction="column" compact />
            </div>
          </div>
          <div className="ml-auto h-px w-3/4 bg-border" />
        </section>
      )}

      {display.researchFocus && (
        <RevealFx delay={400} className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
              Research Focus
            </span>
            <span className="font-mono text-xs text-fg-subtle">
              RL · Robotics · Games
            </span>
          </div>
          <ResearchPillars />
        </RevealFx>
      )}

      <Newsletter />
    </div>
  );
}
