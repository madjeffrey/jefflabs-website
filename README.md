# Jeff's Lab — Reinforcement Learning, Robotics & Games

Personal engineering portfolio, blog, and technical archive for **Jeff Madro**, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Architecture & Highlights

- **Research-First Portfolio Structure**: Organized around Reinforcement Learning (RL) & research, with primary focus areas in **Robotics & Control** and **Games & Multi-Agent AI**.
- **Domain Filtering**: Interactive client-side filtering across projects (`/work`) using `RL Research`, `Robotics`, `Games`, and `Systems`, and across blog posts (`/blog`) using `AI`, `Philosophy`, and `Lessons`.
- **Modular UI Primitives**: Custom accessible components in `src/components/ui/` with dark/light mode support, KaTeX math rendering (`<MathBlock />`), syntax-highlighted `CodeBlock`s, `Table`s, `Accordion`s, and lightbox `Media` / `Carousel` previews.
- **SEO & Syndication**: Dynamic `next/og` social image generation (`/api/og/generate`), `sitemap.xml`, `robots.txt`, JSON-LD structured data, and RSS feed (`/api/rss`).

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Type-check and build
npm run typecheck
npm run build
```

## Replacing Template Projects & Blog Posts

The current entries under `src/app/work/projects/` and `src/app/blog/posts/` serve as clean RL, robotics, and game AI templates ready to be replaced with your own work:

1. **Projects (`src/app/work/projects/*.mdx`)**: Add or edit `.mdx` files with frontmatter `title`, `publishedAt`, `summary`, `tag` (`"RL Research"`, `"Robotics"`, `"Games"`, or `"Systems"`), `images`, `team`, and optional `link`.
2. **Blog Posts (`src/app/blog/posts/*.mdx`)**: Add or edit `.mdx` files with `title`, `subtitle`, `publishedAt`, `summary`, `image`, and `tag` (`"AI"`, `"Philosophy"`, or `"Lessons"`).
3. **Profile & Experience (`src/resources/content.tsx`)**: Update bio, experience timeline, technical stack, and gallery captions in one typed file.
4. **Site Configuration (`src/resources/site.config.ts`)**: Toggle routes, background grid effects, and protected routes.
