import React from "react";
import type { Metadata } from "next";

export interface MetaInput {
  title: string;
  description: string;
  baseURL: string;
  path?: string;
  image?: string;
}

export const Meta = {
  generate({ title, description, baseURL, path = "/", image }: MetaInput): Metadata {
    const cleanBase = baseURL.replace(/\/$/, "");
    const url = `${cleanBase}${path.startsWith("/") ? path : `/${path}`}`;
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : `${cleanBase}${image.startsWith("/") ? image : `/${image}`}`
      : `${cleanBase}/api/og/generate?title=${encodeURIComponent(title)}`;

    return {
      title,
      description,
      metadataBase: new URL(cleanBase),
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: title,
        images: [{ url: ogImage, width: 1280, height: 720, alt: title }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  },
};

export interface SchemaProps {
  as: "webPage" | "blogPosting";
  baseURL: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
  };
}

export const Schema: React.FC<SchemaProps> = ({
  as,
  baseURL,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}) => {
  const cleanBase = baseURL.replace(/\/$/, "");
  const fullUrl = `${cleanBase}${path.startsWith("/") ? path : `/${path}`}`;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${cleanBase}${image.startsWith("/") ? image : `/${image}`}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": as === "blogPosting" ? "BlogPosting" : "WebPage",
    headline: title,
    name: title,
    description,
    url: fullUrl,
    ...(fullImage ? { image: fullImage } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(author
      ? {
          author: {
            "@type": "Person",
            name: author.name,
            url: author.url,
            image: author.image,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
