import React from "react";
import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Jeff",
  lastName: "Madro",
  name: "Jeff Madro",
  role: "Senior AI & Reinforcement Learning Engineer",
  avatar: "/images/profile2.jpg",
  email: "jeffmadro@gmail.com",
  location: "Canada/Mountain",
  languages: ["English", "French"],
  locale: "en",
  research: {
    focus: "Reinforcement Learning & Autonomous Decision Systems",
    domains: ["Reinforcement Learning", "Robotics & Control", "Games & Multi-Agent AI"],
    coreStack: ["PyTorch", "JAX", "C++", "MuJoCo", "Isaac Lab", "ROS 2", "CUDA", "TypeScript"],
  },
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to new posts</>,
  description: (
    <>
      Occasional essays and reflections on AI, philosophy, and lessons learned — straight to your
      inbox.
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
    link: "https://www.linkedin.com/in/jeff-mad/",
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
  title: "Jeff's Lab",
  description: `Portfolio and blog of ${person.name}, Senior AI Engineer specializing in reinforcement learning, robotics control, and game AI systems.`,
  headline: <>Reinforcement learning for robotics and games</>,
  featured: {
    display: true,
    title: (
      <span className="inline-flex items-center gap-3">
        <span className="font-medium text-fg">Sim-to-Real RL</span>
        <span className="h-3.5 w-px bg-border-brand" />
        <span className="text-brand">Featured work</span>
      </span>
    ),
    href: "/work",
  },
  subline: (
    <>
      I&apos;m {person.firstName}, a senior AI engineer researching{" "}
      <strong className="font-semibold text-fg">reinforcement learning</strong>,{" "}
      <strong className="font-semibold text-fg">robotics</strong>, and{" "}
      <strong className="font-semibold text-fg">games</strong> — building scalable
      control and decision systems.
    </>
  ),
  researchPillars: [
    {
      title: "Reinforcement Learning",
      tag: "CORE RESEARCH",
      icon: "brain",
      description:
        "Policy optimization, sample-efficient world models, reward design, and high-throughput distributed training.",
      topics: ["PPO / SAC", "World Models", "Offline RL"],
    },
    {
      title: "Robotics & Control",
      tag: "SIM-TO-REAL",
      icon: "robot",
      description:
        "Whole-body legged locomotion, contact-rich manipulation, GPU physics simulation, and zero-shot hardware transfer.",
      topics: ["MuJoCo", "Isaac Lab", "Domain Randomization"],
    },
    {
      title: "Games & Decision AI",
      tag: "MULTI-AGENT",
      icon: "gamepad",
      description:
        "Self-play training, batched MCTS planning, opponent modeling, and adaptive agents in imperfect-information games.",
      topics: ["MCTS / AlphaZero", "Self-Play", "MARL"],
    },
  ],
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} focused on reinforcement learning, robotics, and games.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  // Enable after adding a personal scheduling URL
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p>
          {person.firstName} is a senior AI and reinforcement learning engineer focused on building
          autonomous decision-making systems that operate reliably under physical and strategic
          uncertainty. His work spans policy optimization, learned world models, and scalable
          distributed simulation for continuous control and multi-agent environments.
        </p>
        <p>
          Across robotics and games, he builds end-to-end training and evaluation infrastructure —
          from vectorized GPU physics rollouts and sim-to-real system identification to batched
          Monte Carlo Tree Search engines and reproducible experiment benchmarks.
        </p>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Jeff's Lab — Independent RL Research & Systems",
        timeframe: "2023 - Present",
        role: "Senior AI & Reinforcement Learning Engineer",
        achievements: [
          <>
            Designed GPU-accelerated reinforcement learning pipelines and asymmetric actor-critic
            policies for legged locomotion and contact-rich manipulation tasks with zero-shot
            sim-to-real transfer.
          </>,
          <>
            Engineered distributed self-play and batched tree-search evaluation harnesses in
            Python, JAX, and C++ to benchmark policy robustness against adaptive agents.
          </>,
        ],
        images: [],
      },
      {
        company: "Autonomous Systems & ML Engineering",
        timeframe: "2020 - 2023",
        role: "Machine Learning Systems Engineer",
        achievements: [
          <>
            Built low-latency perception, state estimation, and real-time inference services
            integrating PyTorch models with C++ runtime pipelines and ROS 2 control loops.
          </>,
          <>
            Architected reproducible experiment tracking, automated regression suites, and
            full-stack visualization interfaces for inspecting policy rollouts and reward
            diagnostics.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Machine Learning & Reinforcement Learning",
        description: (
          <>
            Policy gradient methods, off-policy actor-critic architectures, model-based planning,
            and multi-agent self-play dynamics.
          </>
        ),
      },
      {
        name: "Robotics, Control & Simulation Systems",
        description: (
          <>
            Rigid-body physics simulation, state estimation, domain randomization, and real-time
            embedded inference for hardware deployment.
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
        title: "Reinforcement Learning & Deep Learning",
        description: (
          <>
            Implementing vectorized training loops, custom policy/value architectures, latent world
            models, and GPU-accelerated tree search pipelines.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "PyTorch", icon: "pytorch" },
          { name: "CUDA / NVIDIA", icon: "nvidia" },
        ],
        images: [],
      },
      {
        title: "Robotics Simulation & Control",
        description: (
          <>
            Developing high-frequency control loops, physics environments, visual state estimation,
            and sim-to-real deployment pipelines.
          </>
        ),
        tags: [
          { name: "C++", icon: "cplusplus" },
          { name: "ROS 2", icon: "ros" },
          { name: "OpenCV", icon: "opencv" },
          { name: "Linux", icon: "linux" },
        ],
        images: [],
      },
      {
        title: "Systems, Tooling & Web",
        description: (
          <>
            Building reproducible containerized workloads, high-throughput telemetry backends, and
            clean interactive research dashboards.
          </>
        ),
        tags: [
          { name: "TypeScript", icon: "typescript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Docker", icon: "docker" },
          { name: "Rust", icon: "rust" },
        ],
        images: [],
      },
    ],
  },
  awards: {
    display: true,
    title: "Awards",
    items: [
      {
        title: "Best Paper / Outstanding Project Recognition",
        issuer: "Reinforcement Learning & Robotics Symposium",
        date: "2024",
        description: (
          <>
            Recognized for sim-to-real locomotion transfer and high-throughput GPU physics
            benchmarking.
          </>
        ),
      },
      {
        title: "Dean's Honor List / Academic Distinction",
        issuer: "Faculty of Engineering & Computer Science",
        date: "2022",
        description: (
          <>
            Awarded for top academic standing in machine learning, control systems, and software
            engineering coursework.
          </>
        ),
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Thoughts & Notes",
  description:
    "Things I am thinking about — essays, reflections, and notes on AI, philosophy, and lessons learned along the way.",
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: "Projects & Systems",
  description:
    "Selected reinforcement learning research, robotics control architectures, and game-playing agent systems.",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Lab & Visual Archive",
  description: `Selected simulation renders, hardware experiments, and visual system benchmarks by ${person.name}.`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Quadruped locomotion policy rollout across uneven terrain",
      orientation: "horizontal",
      caption: "Sim-to-Real Locomotion — Rough-terrain traversal benchmark",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Dexterous robotic gripper contact sequence",
      orientation: "vertical",
      caption: "Contact-Rich Manipulation — Tactile grasp stabilization",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Distributed rollout cluster and telemetry monitor",
      orientation: "horizontal",
      caption: "Vectorized Physics — Multi-GPU environment throughput bench",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Actuator torque response calibration rig",
      orientation: "vertical",
      caption: "System Identification — Motor delay and friction sweep",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Vision-based pose estimation camera mount",
      orientation: "vertical",
      caption: "Perception Pipeline — High-frequency state estimation setup",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Multi-agent strategy evaluation arena",
      orientation: "horizontal",
      caption: "Self-Play Evaluation — Batched MCTS policy tournament",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "Reward shaping and policy convergence review",
      orientation: "horizontal",
      caption: "Experiment Diagnostics — Comparing value-head calibration",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Embedded edge inference hardware module",
      orientation: "vertical",
      caption: "Edge Deployment — Real-time TensorRT policy runtime",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
