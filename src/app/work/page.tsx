import React from "react";
import { Meta, Schema, Icon } from "@/components";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-10 py-6">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <header className="flex flex-col items-center text-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-brand bg-brand-soft px-3.5 py-1 text-xs font-semibold text-brand">
          <Icon name="volleyball" size="xs" />
          <span>Volleyball Systems & AI Builds</span>
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
          {work.title}
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-fg-muted">
          {work.description}
        </p>
      </header>

      <Projects />
    </div>
  );
}
