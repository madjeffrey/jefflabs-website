"use client";

import React, { useState } from "react";
import { Media } from "./Media";
import { Icon } from "./Icon";

export interface CarouselItem {
  slide: string;
  alt?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  aspectRatio?: string;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  aspectRatio = "16 / 9",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((cur) => (cur === 0 ? items.length - 1 : cur - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((cur) => (cur === items.length - 1 ? 0 : cur + 1));
  };

  return (
    <div className={`group relative w-full overflow-hidden rounded-2xl ${className}`.trim()}>
      <div className="relative w-full">
        <Media
          src={items[activeIndex].slide}
          alt={items[activeIndex].alt ?? `Slide ${activeIndex + 1}`}
          aspectRatio={aspectRatio}
          enlarge
          className="w-full"
        />
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 hover:bg-brand hover:text-neutral-950"
          >
            <Icon name="chevronLeft" size="s" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 hover:bg-brand hover:text-neutral-950"
          >
            <Icon name="chevronRight" size="s" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md border border-white/10">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-5 bg-brand" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
