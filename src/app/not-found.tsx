import React from "react";
import { Button, Icon } from "@/components";

export default function NotFound() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-32 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-brand bg-brand-soft text-brand">
        <Icon name="terminal" size="l" />
      </div>
      <span className="font-mono text-6xl font-extrabold text-brand">404</span>
      <h1 className="font-heading text-2xl font-bold text-fg">Page Not Found</h1>
      <p className="max-w-md text-sm text-fg-muted leading-relaxed">
        The requested route could not be found or has been moved.
      </p>
      <div className="pt-2">
        <Button href="/" variant="primary" prefixIcon="home" label="Return Home" />
      </div>
    </section>
  );
}
