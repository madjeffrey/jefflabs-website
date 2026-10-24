import React from "react";
import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { InlineCode } from "@/components/ui/CodeBlock";

const person: Person = {
  firstName: "Jeff",
  lastName: "Madro",
  name: "Jeff Madro",
  role: "AI Engineer & Volleyball Systems Builder",
  avatar: "/images/profile2.jpg",
  email: "jeffmadro@gmail.com",
  location: "Canada/Mountain",
  languages: ["English", "Bahasa"],
  locale: "en",
  volleyball: {
    position: "Setter / Opposite Hitter (RS)",
    playStyle: "Fast-Tempo Side-Out & Computer Vision Rally Analytics",
    favoriteSystem: "5-1 High-Tempo Offense",
    courtMetrics: [
      {
        label: "Rally Tracking FPS",
        value: "120 FPS",
        detail: "Real-time ball & player pose inference",
      },
      {
        label: "Offense System",
        value: "5-1 Tempo",
        detail: "1st-tempo quick & pipe distribution",
      },
      {
        label: "Core Stack",
        value: "Next.js + AI",
        detail: "TypeScript, Tailwind CSS, PyTorch",
      },
    ],
  },
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Court & Code Dispatch</>,
  description: (
    <>
      Weekly breakdowns on AI engineering, volleyball biomechanics, computer vision rally
      analytics, and modern web architecture.
    </>
  ),
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/madjeffrey",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jeff-mad/?isSelfProfile=true",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: "Jeff's Lab – AI Engineering & Volleyball Analytics",
  description: `Portfolio website showcasing ${person.name}'s work in AI engineering, volleyball analytics, and modern web systems.`,
  headline: <>Engineering intelligence from the terminal to the volleyball court</>,
  featured: {
    display: true,
    title: (
      <span className="inline-flex items-center gap-2.5">
        <strong className="text-brand">CourtVision AI</strong>
        <span className="h-3.5 w-px bg-border-brand" />
        <span className="text-fg-muted">Real-time rally & spike telemetry</span>
      </span>
    ),
    href: "/work/courtvision-ai-volleyball-rally-analytics",
  },
  subline: (
    <>
      I'm {person.firstName}, an AI engineer based in Alberta building intelligent web products,{" "}
      <InlineCode>computer vision</InlineCode> pipelines, and tactical volleyball analytics tools.
      When I'm not shipping production code, I'm running a fast-tempo 5-1 offense on the court.
    </>
  ),
  highlights: [
    {
      title: "Vision & Telemetry",
      metric: "120 FPS",
      description: "Automated serve velocity, 3D trajectory, and block-jump tracking from match video.",
      icon: "video",
    },
    {
      title: "Tactical Systems",
      metric: "5-1 Engine",
      description: "Interactive rotation visualizers, pass-rating EPV models, and live tournament brackets.",
      icon: "volleyball",
    },
    {
      title: "Full-Stack AI",
      metric: "TypeScript + ML",
      description: "Modular Next.js, Tailwind CSS, and PyTorch architectures engineered for speed.",
      icon: "bolt",
    },
  ],
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p>
          {person.firstName} is a Mountain-time-based AI engineer and competitive volleyball player
          who loves turning complex data and fast-moving physical systems into intuitive digital
          products. Whether architecting low-latency LLM workflows or analyzing six-rotation
          side-out efficiency, his work focuses on precision, modularity, and human-centered
          performance.
        </p>
        <p>
          Outside of software engineering, {person.firstName} competes in indoor and beach
          volleyball leagues, building open-source court telemetry tools that help coaches and
          athletes visualize setter distribution, serve receive seams, and vertical jump mechanics.
        </p>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work & Court Experience",
    experiences: [
      {
        company: "JeffLabs AI & Sports Telemetry",
        timeframe: "2023 - Present",
        role: "Founder & Lead AI Engineer",
        achievements: [
          <>
            Engineered <strong>CourtVision AI</strong>, a computer vision rally analysis pipeline
            that extracts serve velocity, attack angles, and defensive digging heatmaps from single
            baseline camera feeds.
          </>,
          <>
            Architected modular Next.js, TypeScript, and Tailwind CSS web applications for club
            tournament scheduling, 5-1 rotation training, and live match stat tracking.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "CourtVision AI Rally Analytics Dashboard",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Apex Volley Tech Collective",
        timeframe: "2020 - 2023",
        role: "Full-Stack & Machine Learning Engineer",
        achievements: [
          <>
            Built an expected side-out value (EPV) statistical model correlating 0–3 serve-receive
            pass ratings with first-ball kill percentages across 1,200+ competitive sets.
          </>,
          <>
            Led front-end architecture migration to a modular TypeScript + Tailwind CSS component
            system, cutting bundle size by 38% and improving live scoreboard latency.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies & Certifications",
    institutions: [
      {
        name: "Software Engineering & Machine Learning",
        description: (
          <>
            Focused on computer vision, deep learning architectures, distributed systems, and
            full-stack web engineering.
          </>
        ),
      },
      {
        name: "Volleyball Coaching & Biomechanics Analytics",
        description: (
          <>
            Applied study in 5-1/6-2 offensive systems, approach jump kinematics, and data-driven
            match scouting.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "AI & Computer Vision Telemetry",
        description: (
          <>
            Designing real-time object detection, ball trajectory tracking, and pose estimation
            pipelines for high-speed volleyball rally video analysis.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "PyTorch", icon: "pytorch" },
          { name: "OpenCV", icon: "opencv" },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Volleyball trajectory and court zone heatmaps",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Pose estimation and jump telemetry visualization",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Modern Web Architecture (Next.js, TypeScript & Tailwind)",
        description: (
          <>
            Building modular, accessible, and fast web applications with Next.js App Router, strict
            TypeScript, Tailwind CSS, and real-time Supabase backends.
          </>
        ),
        tags: [
          { name: "TypeScript", icon: "typescript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind CSS", icon: "tailwind" },
          { name: "Supabase", icon: "supabase" },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "SpikeFlow live tournament and rotation interface",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Volleyball Analytics, Court Tactics & AI Engineering",
  description: `Articles and technical breakdowns by ${person.name} on volleyball strategy, sports biomechanics, and software engineering.`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Volleyball & AI Projects – ${person.name}`,
  description: `Volleyball analytics platforms, computer vision pipelines, and web applications built by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Court Gallery",
  title: `Court & Lab Gallery – ${person.name}`,
  description: `Snapshots from tournaments, training sessions, and engineering builds by ${person.name}.`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Championship point rally under arena lights",
      orientation: "horizontal",
      caption: "Championship Finals — High-tempo pipe attack from Zone 6",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Double block timing at the net",
      orientation: "vertical",
      caption: "Closing the seam on a quick middle attack",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "CourtVision AI camera calibration setup",
      orientation: "horizontal",
      caption: "Baseline 120fps camera rig for serve trajectory tracking",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Jump serve toss mechanics",
      orientation: "vertical",
      caption: "Topspin jump serve approach from Zone 1",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Setter hands and quick release training",
      orientation: "vertical",
      caption: "Neutral setter posture for deceptive 1st-tempo distribution",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Beach 2v2 tournament sunset match",
      orientation: "horizontal",
      caption: "Summer 2v2 sand series — reading wind drift on float serves",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "Post-match telemetry review with the squad",
      orientation: "horizontal",
      caption: "Reviewing side-out efficiency and pass ratings between sets",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Libero split-step defensive stance",
      orientation: "vertical",
      caption: "Perimeter defensive read in Zone 5",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
