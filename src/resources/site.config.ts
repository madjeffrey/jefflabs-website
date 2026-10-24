import {
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  NewsletterFormConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home, person, social } from "./content";
import { Geist, Geist_Mono } from "next/font/google";

const baseURL: string = "https://jefflabs.dev";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
  courtTelemetry: true,
};

const protectedRoutes: ProtectedRoutesConfig = {
  "/work/pro-scouting-playbook-pipeline": true,
};

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

const style: StyleConfig = {
  theme: "system",
  brand: "orange",
  accent: "red",
  rounded: "playful",
  surface: "translucent",
};

const effects: EffectsConfig = {
  mask: {
    cursor: true,
    x: 50,
    y: 10,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 75,
    x: 50,
    y: 20,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "var(--brand-glow)",
    colorEnd: "transparent",
  },
  dots: {
    display: true,
    opacity: 35,
    size: "2",
    color: "var(--brand-primary)",
  },
  grid: {
    display: true,
    opacity: 25,
    color: "var(--border-subtle)",
    width: "3rem",
    height: "3rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "var(--border-subtle)",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const newsletterForm: NewsletterFormConfig = {
  endpointUrl: "",
  embedId: "",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 85,
      x: 50,
      y: 0,
      width: 60,
      height: 60,
      tilt: 0,
      colorStart: "var(--brand-glow)",
      colorEnd: "transparent",
    },
    dots: {
      display: true,
      opacity: 25,
      size: "2",
      color: "var(--brand-primary)",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "var(--border-subtle)",
      width: "1rem",
      height: "1rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "var(--border-subtle)",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: person.name,
  description: home.description,
  email: person.email,
};

const sameAs: SameAsConfig = {
  threads: social.find((s) => s.name === "Threads")?.link ?? "",
  linkedin: social.find((s) => s.name === "LinkedIn")?.link ?? "",
  discord: social.find((s) => s.name === "Discord")?.link ?? "",
  github: social.find((s) => s.name === "GitHub")?.link ?? "",
};

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  newsletterForm,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
};
