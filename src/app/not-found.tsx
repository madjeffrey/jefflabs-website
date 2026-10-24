import React from "react";
import { Button, Icon } from "@/components";

export default function NotFound() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-32 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icon name="volleyball" size="l" />
      </div>
      <span className="font-heading text-6xl font-extrabold text-brand">404</span>
      <h1 className="font-heading text-2xl font-bold text-fg">Out of Bounds — Page Not Found</h1>
      <p className="max-w-md text-sm text-fg-muted">
        That serve landed outside the antenna. The page you are looking for doesn't exist or has
        been rotated out.
      </p>
      <div className="pt-2">
        <Button href="/" variant="primary" prefixIcon="home" label="Back to Home Court" />
      </div>
    </section>
  );
}
