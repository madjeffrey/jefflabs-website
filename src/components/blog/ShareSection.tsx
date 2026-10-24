"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/Providers";
import { socialSharing } from "@/resources";
import type { IconName } from "@/resources/icons";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: IconName;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter",
    label: "X",
    generateUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (_, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (_, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    generateUrl: (title, url) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, url) =>
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: (title, url) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this volleyball & engineering post: ${url}`)}`,
  },
};

export function ShareSection({ title, url }: ShareSectionProps) {
  const { addToast } = useToast();

  if (!socialSharing.display) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        variant: "success",
        message: "Article link copied to clipboard",
      });
    } catch {
      addToast({
        variant: "danger",
        message: "Failed to copy link",
      });
    }
  };

  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([key, enabled]) => enabled && key !== "copyLink")
    .map(([platformKey]) => ({ key: platformKey, ...socialPlatforms[platformKey] }))
    .filter((platform) => platform.name);

  return (
    <div className="my-8 flex w-full flex-wrap items-center justify-center gap-4 border-y border-border py-6">
      <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
        Share this playbook:
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {enabledPlatforms.map((platform, index) => (
          <Button
            key={index}
            variant="secondary"
            size="s"
            href={platform.generateUrl(title, url)}
            prefixIcon={platform.icon}
            label={platform.label}
            aria-label={`Share on ${platform.label}`}
          />
        ))}

        {socialSharing.platforms.copyLink && (
          <Button
            variant="secondary"
            size="s"
            onClick={handleCopy}
            prefixIcon="openLink"
            label="Copy Link"
            aria-label="Copy link"
          />
        )}
      </div>
    </div>
  );
}
