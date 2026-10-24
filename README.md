# Jeff's Lab — Personal Portfolio & Volleyball Telemetry Platform

A modular, high-performance personal portfolio, blog, and project showcase for **Jeff Madro**, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Architecture & Key Features

- **Zero External UI Kit Lock-In**: Built entirely with modular, strongly-typed React + TypeScript primitives (`src/components/ui/`) and Tailwind CSS (`src/styles/globals.css`).
- **Personalized Volleyball & AI Theme**: Shared vibrant orange (`#FFA500`), neutral gray, and red accent dark/light palette matching the core Jeff Labs brand, interactive cursor-tracking spotlight and court grid background (`BackgroundEffects`), and a live `CourtTelemetry` highlight strip.
- **Full Feature Parity**:
  - **Home (`/`)**: Hero with staggered reveal animations (`RevealFx`), featured project badge, court telemetry highlights, featured case study, latest blog posts, and newsletter signup.
  - **About (`/about`)**: Sticky profile card with volleyball position metadata, live location & languages, interactive left-rail `TableOfContents`, work experience, studies, and expandable skill showcases.
  - **Projects (`/work` & `/work/[slug]`)**: Interactive image/video `Carousel` with full-screen Lightbox, team avatars, and rich MDX case studies.
  - **Blog (`/blog` & `/blog/[slug]`)**: MDX articles with KaTeX math rendering (`$$...$$`), syntax-highlighted `CodeBlock` with copy button, `Table`, `Accordion`, `Feedback` callouts, sticky scroll-spy `HeadingNav`, social `ShareSection`, and RSS feed (`/api/rss`).
  - **Gallery (`/gallery`)**: Responsive masonry grid with hover captions and full-screen Lightbox zoom.
  - **Route Guard & Password Protection**: Toggle routes on/off or password-protect specific URLs in `src/resources/site.config.ts`.
  - **Dynamic SEO & OpenGraph**: Automatic `next/og` social card generation (`/api/og/generate`), `sitemap.xml`, `robots.txt`, and JSON-LD `Schema` structured data.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Type-check the codebase
npm run typecheck
```
