"use client";

import React, { useState } from "react";
import { newsletter, newsletterForm } from "@/resources";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { Icon } from "@/components/ui/Icon";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function subscribe(email: string): Promise<string> {
  if (!newsletterForm.embedId && !newsletterForm.endpointUrl) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return "";
  }
  try {
    const res = await fetch(newsletterForm.endpointUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embedPublicId: newsletterForm.embedId,
        email,
        sourcePath: window.location.pathname,
        referrer: document.referrer || undefined,
      }),
    });
    if (res.ok) return "";
    if (res.status === 400) return "Please enter a valid email address.";
    return "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}

export const Newsletter: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const validate = (value: string): string =>
    value === "" || emailPattern.test(value) ? "" : "Please enter a valid email address.";

  if (newsletter.display === false) return null;

  return (
    <section
      className={`relative my-8 flex w-full flex-col items-center overflow-hidden rounded-2xl border border-border-brand bg-surface px-6 py-12 text-center shadow-glass backdrop-blur-md sm:px-12 ${className}`.trim()}
    >
      <BackgroundEffects effects={newsletterForm.effects} contained />

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-brand bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <Icon name="volleyball" size="xs" />
          <span>Court & Code Dispatch</span>
        </span>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          {newsletter.title}
        </h2>
        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
          {newsletter.description}
        </p>

        {submitted ? (
          <div
            role="status"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-400"
          >
            <Icon name="check" size="s" />
            <span>You're on the roster! Thanks for subscribing.</span>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={async (e) => {
              e.preventDefault();
              const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
              const message = email ? validate(email) : "Please enter your email address.";
              if (message) {
                setError(message);
                return;
              }
              setError("");
              setSending(true);
              const failure = await subscribe(email);
              setSending(false);
              if (failure) setError(failure);
              else setSubmitted(true);
            }}
            className="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-start"
          >
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              label="Enter your email"
              autoComplete="email"
              required
              onChange={(e) => {
                if (error) setError(validate(e.target.value));
              }}
              onBlur={(e) => setError(validate(e.target.value))}
              errorMessage={error}
            />
            <Button type="submit" size="m" loading={sending} disabled={sending} className="shrink-0 py-2.5">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
