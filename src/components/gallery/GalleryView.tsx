"use client";

import React from "react";
import { Media } from "@/components/ui/Media";
import { gallery } from "@/resources";

export default function GalleryView() {
  return (
    <div className="columns-1 gap-5 space-y-5 sm:columns-2">
      {gallery.images.map((image, index) => (
        <div key={index} className="break-inside-avoid">
          <Media
            enlarge
            priority={index < 6}
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
            caption={image.caption ?? image.alt}
          />
        </div>
      ))}
    </div>
  );
}
