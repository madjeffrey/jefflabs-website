"use client";

import React, { JSX } from "react";
import { IconButton } from "@/components/ui/Button";
import { useToast } from "@/components/Providers";

interface HeadingLinkProps {
  id: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({
  id,
  level = 2,
  as,
  children,
  style,
  className = "",
}) => {
  const { addToast } = useToast();

  const copyURL = (targetId: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${targetId}`;
    navigator.clipboard.writeText(url).then(
      () => {
        addToast({
          variant: "success",
          message: "Section link copied to clipboard.",
        });
      },
      () => {
        addToast({
          variant: "danger",
          message: "Failed to copy section link.",
        });
      },
    );
  };

  const tag = (as ?? `h${level}`) as keyof JSX.IntrinsicElements;

  const sizeMap: Record<string, string> = {
    h1: "text-2xl sm:text-3xl font-bold mt-8 mb-4",
    h2: "text-xl sm:text-2xl font-bold mt-8 mb-3",
    h3: "text-lg sm:text-xl font-semibold mt-6 mb-2.5",
    h4: "text-base sm:text-lg font-semibold mt-5 mb-2",
    h5: "text-sm sm:text-base font-semibold mt-4 mb-1.5",
    h6: "text-sm font-semibold mt-4 mb-1.5",
  };

  const HeadingTag = tag;

  return (
    <div
      style={style}
      onClick={() => copyURL(id)}
      className={`group flex cursor-pointer items-center gap-2 ${sizeMap[tag] ?? sizeMap.h2} ${className}`.trim()}
    >
      <HeadingTag
        id={id}
        className="font-heading tracking-tight text-fg group-hover:underline decoration-brand underline-offset-4"
      >
        {children}
      </HeadingTag>
      <IconButton
        size="s"
        icon="openLink"
        variant="ghost"
        tooltip="Copy link"
        className="opacity-0 scale-90 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100"
      />
    </div>
  );
};
