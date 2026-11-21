import React from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import type { IconName } from "@/resources/icons";

export interface BadgeProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: IconName;
  showArrow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  href,
  children,
  className = "",
  icon,
  showArrow = false,
}) => {
  const baseClasses =
    `group inline-flex items-center gap-2.5 rounded-full border border-border-brand bg-[var(--featured-bg)] px-4 py-1.5 text-xs sm:text-sm font-medium text-fg backdrop-blur-md transition-all duration-200 hover:bg-[var(--featured-bg-hover)] ${className}`.trim();

  const content = (
    <>
      {icon && <Icon name={icon} size="s" className="text-brand" />}
      {children}
      {href && showArrow && (
        <Icon
          name="arrowRight"
          size="xs"
          className="text-brand transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={baseClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};

export interface TagProps {
  children: React.ReactNode;
  prefixIcon?: IconName;
  size?: "s" | "m" | "l";
  variant?: "neutral" | "brand";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  prefixIcon,
  size = "m",
  variant = "neutral",
  className = "",
}) => {
  const sizeMap = {
    s: "px-2.5 py-0.5 text-xs",
    m: "px-3 py-1 text-xs",
    l: "px-3.5 py-1.5 text-xs",
  };
  const variantMap = {
    neutral: "border-border bg-neutral-alpha-weak text-fg-subtle hover:text-fg",
    brand: "border-border-brand bg-brand-soft text-brand",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border font-medium transition-colors duration-200 ${sizeMap[size]} ${variantMap[variant]} ${className}`.trim()}
    >
      {prefixIcon && (
        <Icon
          name={prefixIcon}
          size="xs"
          className={variant === "brand" ? "text-brand" : "text-fg-subtle"}
        />
      )}
      {children}
    </span>
  );
};
