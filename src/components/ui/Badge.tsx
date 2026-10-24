import React from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import type { IconName } from "@/resources/icons";

export interface BadgeProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: IconName;
}

export const Badge: React.FC<BadgeProps> = ({ href, children, className = "", icon }) => {
  const baseClasses = `group inline-flex items-center gap-2.5 rounded-full border border-border-brand bg-brand-soft px-4 py-1.5 text-xs font-medium text-fg backdrop-blur-md transition-all duration-300 hover:border-brand hover:shadow-brand-glow ${className}`.trim();

  const content = (
    <>
      {icon && <Icon name={icon} size="s" className="text-brand" />}
      {children}
      {href && (
        <Icon
          name="arrowRight"
          size="xs"
          className="text-brand transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
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
    neutral: "border-border-strong bg-surface text-fg-muted hover:text-fg hover:border-brand/50",
    brand: "border-border-brand bg-brand-soft text-brand",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors duration-200 ${sizeMap[size]} ${variantMap[variant]} ${className}`.trim()}
    >
      {prefixIcon && <Icon name={prefixIcon} size="xs" className="text-brand" />}
      {children}
    </span>
  );
};
