"use client";

import React, { useState } from "react";
import { Icon } from "./Icon";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative flex w-full items-center">
        <input
          id={id}
          placeholder={label ?? props.placeholder}
          aria-label={label ?? props.placeholder}
          aria-invalid={!!errorMessage}
          className={`w-full rounded-full border bg-surface-elevated px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle transition-all duration-200 focus:border-brand focus:outline-none ${
            errorMessage ? "border-rose-500" : "border-border-strong"
          } ${className}`.trim()}
          {...props}
        />
      </div>
      {errorMessage && (
        <p className="px-3 text-xs font-medium text-rose-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export const PasswordInput: React.FC<InputProps> = ({
  label,
  errorMessage,
  className = "",
  id,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative flex w-full items-center">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={label ?? "Enter password"}
          aria-label={label ?? "Password"}
          aria-invalid={!!errorMessage}
          className={`w-full rounded-full border bg-surface-elevated pl-4 pr-10 py-2.5 text-sm text-fg placeholder:text-fg-subtle transition-all duration-200 focus:border-brand focus:outline-none ${
            errorMessage ? "border-rose-500" : "border-border-strong"
          } ${className}`.trim()}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 text-fg-muted hover:text-fg transition-colors"
        >
          <Icon name={visible ? "eyeOff" : "eye"} size="s" />
        </button>
      </div>
      {errorMessage && (
        <p className="px-3 text-xs font-medium text-rose-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export const Spinner: React.FC<{ size?: "s" | "m" | "l" }> = ({ size = "m" }) => {
  const dim = size === "s" ? "h-4 w-4" : size === "l" ? "h-8 w-8" : "h-6 w-6";
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${dim} animate-spin rounded-full border-2 border-brand border-t-transparent`}
    />
  );
};
