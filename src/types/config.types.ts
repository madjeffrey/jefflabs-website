import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export type ThemeMode = "dark" | "light" | "system";
export type BrandScheme = "orange" | "amber" | "sky" | "emerald" | "rose" | "red";

export type DisplayConfig = {
  location: boolean;
  time: boolean;
  themeSwitcher: boolean;
  courtTelemetry?: boolean;
};

export type RoutesConfig = Record<`/${string}`, boolean>;
export type ProtectedRoutesConfig = Record<`/${string}`, boolean>;

export type FontsConfig = {
  heading: NextFontWithVariable;
  body: NextFontWithVariable;
  label: NextFontWithVariable;
  code: NextFontWithVariable;
};

export type StyleConfig = {
  theme: ThemeMode;
  brand: BrandScheme;
  accent: BrandScheme;
  rounded: "playful" | "rounded" | "sharp";
  surface: "translucent" | "solid";
};

export type EffectsConfig = {
  mask: {
    cursor: boolean;
    x: number;
    y: number;
    radius: number;
  };
  gradient: {
    display: boolean;
    opacity: number;
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    colorStart: string;
    colorEnd: string;
  };
  dots: {
    display: boolean;
    opacity: number;
    size: string;
    color: string;
  };
  grid: {
    display: boolean;
    opacity: number;
    color: string;
    width: string;
    height: string;
  };
  lines: {
    display: boolean;
    opacity: number;
    color: string;
    size: string;
    thickness: number;
    angle: number;
  };
};

export type NewsletterFormConfig = {
  endpointUrl: string;
  embedId: string;
  effects: EffectsConfig;
};

export type SchemaConfig = {
  logo: string;
  type: string;
  name: string;
  description: string;
  email: string;
};

export type SameAsConfig = {
  threads: string;
  linkedin: string;
  discord: string;
  github?: string;
};

export type SocialSharingConfig = {
  display: boolean;
  platforms: {
    x: boolean;
    linkedin: boolean;
    facebook: boolean;
    pinterest: boolean;
    whatsapp: boolean;
    reddit: boolean;
    telegram: boolean;
    email: boolean;
    copyLink: boolean;
  };
};

export type SiteConfig = {
  display: DisplayConfig;
  newsletterForm: NewsletterFormConfig;
  routes: RoutesConfig;
  protectedRoutes: ProtectedRoutesConfig;
  baseURL: string;
  fonts: FontsConfig;
  style: StyleConfig;
  schema: SchemaConfig;
  sameAs: SameAsConfig;
  socialSharing: SocialSharingConfig;
  effects: EffectsConfig;
};
