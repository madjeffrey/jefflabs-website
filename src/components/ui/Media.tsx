"use client";

import React, { useState } from "react";
import { Icon } from "./Icon";

export interface MediaProps {
  src: string;
  alt?: string;
  aspectRatio?: string;
  enlarge?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}

export const Media: React.FC<MediaProps> = ({
  src,
  alt = "",
  aspectRatio,
  enlarge = false,
  priority = false,
  className = "",
  caption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  return (
    <>
      <figure
        onClick={() => enlarge && setIsOpen(true)}
        style={aspectRatio ? { aspectRatio } : undefined}
        className={`group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated ${
          enlarge ? "cursor-zoom-in" : ""
        } ${className}`.trim()}
      >
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        )}
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {caption}
          </figcaption>
        )}
      </figure>

      {enlarge && isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close preview"
            className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/50 p-2.5 text-white hover:bg-white/20 transition-colors"
          >
            <Icon name="close" size="m" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
