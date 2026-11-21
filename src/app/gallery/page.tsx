import React from "react";
import { Meta, Schema, Icon } from "@/components";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-8 py-6">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <header className="flex flex-col items-start text-left gap-3 border-b border-border pb-6">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          <Icon name="gallery" size="xs" />
          <span>Visual Archive</span>
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
          {gallery.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-fg-muted leading-relaxed">
          {gallery.description}
        </p>
      </header>

      <GalleryView />
    </div>
  );
}
