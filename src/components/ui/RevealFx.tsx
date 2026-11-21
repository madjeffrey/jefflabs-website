"use client";

import React from "react";

export interface RevealFxProps {
  children: React.ReactNode;
  delay?: number;
  translateY?: number | string;
  className?: string;
}

export const RevealFx: React.FC<RevealFxProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  return (
    <div
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
        animationFillMode: "both",
      }}
      className={`animate-fade-up ${className}`.trim()}
    >
      {children}
    </div>
  );
};
