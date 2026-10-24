import React from "react";
import { iconLibrary, type IconName } from "@/resources/icons";

export interface IconProps {
  name: IconName;
  size?: "xs" | "s" | "m" | "l" | "xl";
  className?: string;
  title?: string;
}

const sizeClasses: Record<NonNullable<IconProps["size"]>, string> = {
  xs: "w-3.5 h-3.5",
  s: "w-4 h-4",
  m: "w-5 h-5",
  l: "w-6 h-6",
  xl: "w-7 h-7",
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = "m",
  className = "",
  title,
}) => {
  const IconComponent = iconLibrary[name];
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`${sizeClasses[size]} shrink-0 ${className}`.trim()}
      title={title}
      aria-hidden={!title}
    />
  );
};
