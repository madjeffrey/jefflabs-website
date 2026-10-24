"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import type { IconName } from "@/resources/icons";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "s" | "m" | "l";
  href?: string;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  arrowIcon?: boolean;
  label?: string;
  loading?: boolean;
  fillWidth?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand text-neutral-950 font-semibold border border-brand hover:bg-brand-strong shadow-brand-glow",
  secondary:
    "bg-surface-glass text-fg border border-border-strong hover:border-brand/60 hover:bg-brand-soft backdrop-blur-md",
  outline:
    "bg-transparent text-fg border border-border-strong hover:border-brand hover:text-brand",
  ghost:
    "bg-transparent text-fg-muted hover:text-fg hover:bg-surface-glass border border-transparent",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  s: "px-3 py-1.5 text-xs gap-1.5 rounded-full",
  m: "px-4 py-2 text-sm gap-2 rounded-full",
  l: "px-6 py-3 text-base gap-2.5 rounded-full",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "m",
  href,
  prefixIcon,
  suffixIcon,
  arrowIcon,
  label,
  loading = false,
  fillWidth = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const classes = `group inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
    variantClasses[variant]
  } ${sizeClasses[size]} ${fillWidth ? "w-full" : ""} ${className}`.trim();

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!loading && prefixIcon && <Icon name={prefixIcon} size="s" />}
      {label ? <span>{label}</span> : children}
      {suffixIcon && (
        <Icon
          name={suffixIcon}
          size="s"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
      {arrowIcon && (
        <Icon
          name="chevronRight"
          size="s"
          className="transition-transform duration-200 group-hover:translate-x-1 text-brand"
        />
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  href?: string;
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "ghost";
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  href,
  size = "m",
  variant = "ghost",
  tooltip,
  className = "",
  ...props
}) => {
  const btnSize =
    size === "s" ? "p-2 rounded-full" : size === "l" ? "p-3 rounded-full" : "p-2.5 rounded-full";
  const classes = `group relative inline-flex items-center justify-center transition-all duration-200 active:scale-95 ${
    variantClasses[variant]
  } ${btnSize} ${className}`.trim();

  const inner = (
    <>
      <Icon name={icon} size={size === "l" ? "m" : "s"} />
      {tooltip && (
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-elevated border border-border-strong px-2 py-1 text-[11px] font-medium text-fg opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 z-30">
          {tooltip}
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={props["aria-label"] ?? tooltip ?? icon}
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        aria-label={props["aria-label"] ?? tooltip ?? icon}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={props["aria-label"] ?? tooltip ?? icon}
      className={classes}
      {...props}
    >
      {inner}
    </button>
  );
};

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prefixIcon?: IconName;
  label?: string;
  href?: string;
  selected?: boolean;
  size?: "s" | "m" | "l" | "xl";
  variant?: "ghost" | "outline" | "subtle";
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  prefixIcon,
  label,
  href,
  selected = false,
  className = "",
  ...props
}) => {
  const classes = `inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
    selected
      ? "bg-brand-soft text-brand border border-border-brand shadow-sm"
      : "text-fg-muted hover:text-fg hover:bg-surface border border-transparent"
  } ${className}`.trim();

  const content = (
    <>
      {prefixIcon && (
        <Icon
          name={prefixIcon}
          size="s"
          className={selected ? "text-brand" : "text-current"}
        />
      )}
      {label && <span>{label}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={props["aria-label"] ?? label} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};
