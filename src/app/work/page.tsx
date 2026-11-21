import React from "react";
import { Meta, Schema } from "@/components";
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

      <header className="flex flex-col items-start text-left gap-3 border-b border-border pb-6">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          Projects &amp; Systems
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
          {work.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-fg-muted leading-relaxed">
          {work.description}
        </p>
      </header>

      <Projects enableFilter />
    </div>
  );
}
