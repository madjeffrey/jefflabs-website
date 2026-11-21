import { IconName } from "@/resources/icons";
import { zones } from "tzdata";
import React from "react";

export type IANATimeZone = Extract<keyof typeof zones, string>;

export type ResearchPillar = {
  title: string;
  tag: string;
  description: string;
  topics: string[];
  icon: IconName;
};

export type ResearchProfile = {
  focus: string;
  domains: string[];
  coreStack: string[];
};

export type Person = {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: IANATimeZone;
  languages?: string[];
  locale?: string;
  research?: ResearchProfile;
};

export type Newsletter = {
  display: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
};

export type Social = Array<{
  name: string;
  icon: IconName;
  link: string;
  essential?: boolean;
}>;

export interface BasePageConfig {
  path: `/${string}` | string;
  label: string;
  title: string;
  description: string;
  image?: `/images/${string}` | string;
}

export interface Home extends BasePageConfig {
  image: `/images/${string}` | string;
  headline: React.ReactNode;
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  subline: React.ReactNode;
  researchPillars?: ResearchPillar[];
}

export interface About extends BasePageConfig {
  tableOfContent: {
    display: boolean;
    subItems: boolean;
  };
  avatar: {
    display: boolean;
  };
  calendar: {
    display: boolean;
    link: string;
  };
  intro: {
    display: boolean;
    title: string;
    description: React.ReactNode;
  };
  work: {
    display: boolean;
    title: string;
    experiences: Array<{
      company: string;
      timeframe: string;
      role: string;
      achievements: React.ReactNode[];
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  studies: {
    display: boolean;
    title: string;
    institutions: Array<{
      name: string;
      degree?: string;
      timeframe?: string;
      description: React.ReactNode;
    }>;
  };
  technical: {
    display: boolean;
    title: string;
    skills: Array<{
      title: string;
      description?: React.ReactNode;
      tags?: Array<{
        name: string;
        icon?: IconName;
      }>;
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  awards?: {
    display: boolean;
    title: string;
    items: Array<{
      title: string;
      issuer?: string;
      date?: string;
      description?: React.ReactNode;
    }>;
  };
}

export interface Blog extends BasePageConfig {}
export interface Work extends BasePageConfig {}

export interface Gallery extends BasePageConfig {
  images: Array<{
    src: string;
    alt: string;
    orientation: string;
    caption?: string;
    category?: string;
  }>;
}
