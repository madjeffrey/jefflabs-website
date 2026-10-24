import React from "react";
import {
  Button,
  Avatar,
  RevealFx,
  Badge,
  Schema,
  Meta,
  Newsletter,
  CourtTelemetry,
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
    <div className="flex w-full max-w-4xl flex-col items-center gap-16 py-6">
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

      <section className="flex w-full max-w-2xl flex-col items-center text-center">
        {home.featured.display && (
          <RevealFx className="pb-6 pt-2">
            <Badge href={home.featured.href} icon="volleyball">
              {home.featured.title}
            </Badge>
          </RevealFx>
        )}

        <RevealFx delay={100} className="pb-5">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-fg sm:text-5xl md:text-6xl text-balance leading-[1.1]">
            {home.headline}
          </h1>
        </RevealFx>

        <RevealFx delay={200} className="pb-8">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-fg-muted text-balance">
            {home.subline}
          </p>
        </RevealFx>

        <RevealFx delay={320} className="flex flex-wrap items-center justify-center gap-4">
          <Button
            id="about"
            href={about.path}
            variant="secondary"
            size="m"
            arrowIcon
          >
            <span className="flex items-center gap-2.5 pr-1">
              {about.avatar.display && (
                <Avatar
                  src={person.avatar}
                  size="xs"
                  aria-hidden
                  className="-ml-1"
                />
              )}
              <span>{about.title}</span>
            </span>
          </Button>
          <Button
            href="/work"
            variant="primary"
            size="m"
            prefixIcon="volleyball"
            label="Explore Volleyball Projects"
          />
        </RevealFx>
      </section>

      {display.courtTelemetry && (
        <RevealFx delay={420} className="w-full">
          <CourtTelemetry />
        </RevealFx>
      )}

      <RevealFx delay={520} className="w-full">
        <Projects range={[1, 1]} />
      </RevealFx>

      {routes["/blog"] && (
        <section className="flex w-full flex-col gap-8">
          <div className="h-px w-full bg-gradient-to-r from-border-brand via-border-strong to-transparent" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="lg:w-1/3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                Court & Code Notes
              </span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-fg text-balance">
                Latest from the playbook
              </h2>
              <p className="mt-2 text-sm text-fg-muted">
                Deep dives into volleyball biomechanics, 5-1 rotations, and AI telemetry.
              </p>
            </div>
            <div className="lg:w-2/3">
              <Posts range={[1, 2]} columns="2" direction="column" />
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-l from-border-brand via-border-strong to-transparent" />
        </section>
      )}

      <section className="w-full">
        <Projects range={[2]} />
      </section>

      <Newsletter />
    </div>
  );
}
