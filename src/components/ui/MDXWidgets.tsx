"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import type { IconName } from "@/resources/icons";

export interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  suffixIcon?: IconName;
  prefixIcon?: IconName;
  children: React.ReactNode;
}

export const SmartLink: React.FC<SmartLinkProps> = ({
  href,
  suffixIcon,
  prefixIcon,
  className = "",
  children,
  ...props
}) => {
  const classes = `group inline-flex items-center gap-1.5 font-medium text-brand hover:text-brand-strong underline-offset-4 hover:underline transition-colors ${className}`.trim();
  const content = (
    <>
      {prefixIcon && <Icon name={prefixIcon} size="xs" />}
      <span>{children}</span>
      {suffixIcon && (
        <Icon
          name={suffixIcon}
          size="xs"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
      className={classes}
      {...props}
    >
      {content}
    </a>
  );
};

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border-strong bg-surface">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-fg hover:bg-brand-soft/40 transition-colors"
      >
        <span>{title}</span>
        <Icon
          name="chevronDown"
          size="s"
          className={`text-brand transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-4 py-3.5 text-sm leading-relaxed text-fg-muted">
          {children}
        </div>
      )}
    </div>
  );
};

export const AccordionGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-4 flex flex-col gap-2">{children}</div>
);

export interface TableProps {
  data?: {
    headers: string[];
    rows: (string | number | React.ReactNode)[][];
  };
  children?: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ data, children }) => {
  if (data && data.headers && data.rows) {
    return (
      <div className="my-6 overflow-x-auto rounded-2xl border border-border-strong bg-surface">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-strong bg-brand-soft/40 text-fg">
              {data.headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-surface-elevated/60 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-fg-muted">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border-strong bg-surface">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
};

export interface FeedbackProps {
  title?: string;
  description?: React.ReactNode;
  variant?: "info" | "success" | "warning";
  showIcon?: boolean;
  marginBottom?: string;
  children?: React.ReactNode;
}

export const Feedback: React.FC<FeedbackProps> = ({
  title,
  description,
  showIcon = true,
  children,
}) => {
  return (
    <div className="my-4 flex items-start gap-3 rounded-2xl border border-border-brand bg-brand-soft/60 p-4 text-sm text-fg">
      {showIcon && <Icon name="volleyball" size="m" className="mt-0.5 text-brand shrink-0" />}
      <div className="flex flex-col gap-1">
        {title && <div className="font-semibold text-fg">{title}</div>}
        {description && <div className="text-fg-muted leading-relaxed">{description}</div>}
        {children}
      </div>
    </div>
  );
};
