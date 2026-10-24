"use client";

import React, { useState } from "react";
import { Icon } from "./Icon";
import { useToast } from "@/components/Providers";

export interface CodeSnippet {
  code: string;
  language?: string;
  label?: string;
}

export interface CodeBlockProps {
  codes: CodeSnippet[];
  highlight?: string;
  copyButton?: boolean;
  compact?: boolean;
  codeHeight?: number;
  marginBottom?: string;
  marginTop?: string;
  className?: string;
}

function parseHighlightedLines(highlight?: string): Set<number> {
  const set = new Set<number>();
  if (!highlight) return set;
  for (const part of highlight.split(",")) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [start, end] = trimmed.split("-").map(Number);
      if (!Number.isNaN(start) && !Number.isNaN(end)) {
        for (let i = start; i <= end; i++) set.add(i);
      }
    } else {
      const num = Number(trimmed);
      if (!Number.isNaN(num)) set.add(num);
    }
  }
  return set;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  codes = [],
  highlight,
  copyButton = true,
  compact = false,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  if (!codes.length) return null;

  const current = codes[activeTab] ?? codes[0];
  const highlighted = parseHighlightedLines(highlight);
  const lines = String(current.code ?? "").trimEnd().split("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(current.code ?? ""));
      setCopied(true);
      addToast({ variant: "success", message: "Code copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ variant: "danger", message: "Failed to copy code" });
    }
  };

  return (
    <div
      className={`my-4 overflow-hidden rounded-2xl border border-border-strong bg-neutral-950 text-neutral-100 shadow-lg ${className}`.trim()}
    >
      {(!compact || current.label || codes.length > 1) && (
        <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/90 px-4 py-2 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto">
            {codes.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`rounded-md px-2.5 py-1 font-mono transition-colors ${
                  idx === activeTab
                    ? "bg-brand/20 text-brand font-semibold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {item.label || item.language || "code"}
              </button>
            ))}
          </div>
          {copyButton && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy code"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300 hover:border-brand/50 hover:text-white transition-colors"
            >
              <Icon name={copied ? "check" : "copy"} size="xs" className="text-brand" />
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-code text-xs sm:text-sm leading-relaxed">
        <code>
          {lines.map((line, idx) => {
            const lineNumber = idx + 1;
            const isHighlighted = highlighted.has(lineNumber);
            return (
              <div
                key={idx}
                className={`flex items-start px-2 -mx-2 rounded ${
                  isHighlighted ? "bg-brand/15 border-l-2 border-brand" : ""
                }`}
              >
                {!compact && lines.length > 1 && (
                  <span className="mr-4 inline-block w-6 select-none text-right text-neutral-600">
                    {lineNumber}
                  </span>
                )}
                <span className="flex-1 whitespace-pre">{line || " "}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
};

export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="rounded-md border border-border-brand bg-brand-soft px-1.5 py-0.5 font-code text-[0.875em] font-medium text-brand">
    {children}
  </code>
);
