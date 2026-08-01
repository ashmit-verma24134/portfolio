/**
 * Single source of truth for the entire portfolio.
 * Every value here is extracted directly from Ashmit Verma's résumé
 * (and the profile links he provided). Update this file to update the site.
 */

export const profile = {
  name: "Ashmit Verma",
  firstName: "Ashmit",
  lastName: "Verma",
  roll: "2024134",
  dob: "30 July 2005",
  location: "Shahdara, Delhi, India",
  address: "B-13, Mansarovar Park, Shahdara, Delhi, India",
  email: "ashmit24134@iiitd.ac.in",
  altEmail: "ashmitv@acm.org",
  phone: "", // not present on résumé
  photo: "/photo.jpg",
  resume: "/Ashmit_Verma_Resume.pdf",
  tagline: "I build intelligent, production-grade systems.",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Competitive Programmer",
    "AI Enthusiast",
    "Problem Solver",
  ],
  summary:
    "B.Tech Computer Science & Design student at IIIT Delhi (Batch of 2028) who ships production systems end-to-end — from multi-tenant RAG pipelines and agentic AI to clinical ML forecasting and low-level assemblers. Active competitive programmer, hackathon winner, and 250+ DSA problem solver who cares about correctness, latency, and clean architecture.",
  objective:
    "To engineer reliable, intelligent software at scale — combining deep algorithmic foundations with modern AI systems (RAG, agents, vector search) to solve problems that matter, and to keep raising the bar on craftsmanship in everything I build.",
} as const;

export const socials = {
  github: "https://github.com/ashmit-verma24134",
  githubUser: "ashmit-verma24134",
  linkedin: "https://www.linkedin.com/in/ashmit-verma-5a5856308/",
  codeforces: "https://codeforces.com/profile/AshmitVerma",
  codeforcesUser: "AshmitVerma",
  leetcode: "https://leetcode.com/u/AshmitVerma24134/",
  leetcodeUser: "AshmitVerma24134",
  tuf: "https://takeuforward.org/profile/ashmit_24134",
  tufUser: "ashmit_24134",
  email: "ashmit24134@iiitd.ac.in",
} as const;

export type NavItem = { id: string; label: string };
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "competitive", label: "Competitive" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* ---------------------------------- About --------------------------------- */

export const stats = [
  { label: "DSA Problems Solved", value: 250, suffix: "+" },
  { label: "Codeforces Rating", value: 1306, suffix: "" },
  { label: "Production Internships", value: 2, suffix: "" },
  { label: "Hackathon Wins", value: 1, suffix: "" },
];

export const interests = ["Football", "3D CAD Modelling", "UI/UX Design"];

/* --------------------------------- Skills --------------------------------- */

export type SkillCategory = {
  title: string;
  icon: string; // lucide icon name
  accent: string; // tailwind gradient stops
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "Code2",
    accent: "from-blue-500 to-cyan-400",
    skills: [
      { name: "C++", level: 95 },
      { name: "Python", level: 90 },
      { name: "Java", level: 82 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 88 },
      { name: "C", level: 80 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "Boxes",
    accent: "from-violet-500 to-indigo-400",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "React", level: 85 },
      { name: "LangChain", level: 85 },
      { name: "LangGraph", level: 82 },
      { name: "Flask", level: 80 },
      { name: "Node.js", level: 78 },
      { name: "JavaFX", level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    accent: "from-emerald-500 to-teal-400",
    skills: [
      { name: "MongoDB / Atlas", level: 90 },
      { name: "MySQL", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Google Cloud SQL", level: 78 },
      { name: "Qdrant (Vector)", level: 85 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "BrainCircuit",
    accent: "from-fuchsia-500 to-pink-400",
    skills: [
      { name: "RAG Pipelines", level: 90 },
      { name: "Agentic Systems", level: 85 },
      { name: "Atlas Vector Search", level: 88 },
      { name: "XGBoost", level: 84 },
      { name: "BM25 Re-ranking", level: 82 },
    ],
  },
  {
    title: "Developer Tools",
    icon: "Wrench",
    accent: "from-amber-500 to-orange-400",
    skills: [
      { name: "Git", level: 90 },
      { name: "Linux", level: 88 },
      { name: "Vercel", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Power BI", level: 75 },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: "Cloud",
    accent: "from-sky-500 to-blue-400",
    skills: [
      { name: "MongoDB Atlas", level: 88 },
      { name: "Google Cloud SQL", level: 80 },
      { name: "Vercel Serverless", level: 85 },
      { name: "Linux Server Mgmt", level: 84 },
    ],
  },
  {
    title: "Design & CAD",
    icon: "PenTool",
    accent: "from-rose-500 to-red-400",
    skills: [
      { name: "Adobe Illustrator", level: 82 },
      { name: "Photoshop", level: 80 },
      { name: "Fusion 360", level: 78 },
      { name: "UI/UX Design", level: 85 },
    ],
  },
  {
    title: "Competitive Programming",
    icon: "Trophy",
    accent: "from-yellow-500 to-amber-400",
    skills: [
      { name: "Data Structures", level: 92 },
      { name: "Algorithms", level: 90 },
      { name: "Problem Solving", level: 93 },
      { name: "C++ STL", level: 92 },
    ],
  },
];

export const expertiseAreas = [
  "Data Structures & Algorithms",
  "Software Design",
  "Backend Development",
  "Database Design & Query Optimisation",
  "NoSQL & Document Data Modelling",
  "Vector Search",
  "Multi-Tenant Systems",
  "Agentic Systems",
  "Retrieval-Augmented Generation (RAG)",
  "Linux Server Management",
];

export const technicalElectives = [
  "Edge AI in Microcontrollers",
  "DSA (C/C++) — Udemy",
  "Full-Stack Web Development",
  "Python Pro Bootcamp",
];

/* ------------------------------- Experience ------------------------------- */

export type Experience = {
  company: string;
  role: string;
  team: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    company: "Foqal CareOS",
    role: "Software Engineer Intern",
    team: "Foqal Analytics",
    period: "May 2026 – Present",
    summary:
      "CareOS — an AI-powered Clinical Decision Support System for hospital ward monitoring, discharge and billing.",
    highlights: [
      "Drove a billing-critical failure to zero — quoted minimums falling below money already charged, previously 32.4% of estimates — by reframing the model's target so the constraint held by construction, not by post-hoc clamping.",
      "Sharpened forecasts 4× across a stay (105.7% MAPE at admission → 24.2% by day 10) by engineering cumulative clinical-usage features over MIMIC-IV EHR data (7,077+ cardiology admissions, 46K+ daywise records).",
      "Beat the production baseline by 3.1 MAPE points (44.5% → 41.3%) on held-out patients by benchmarking 14 model variants and re-architecting the winner as XGBoost quantile regression over remaining, not total, cost.",
      "Gave nurses one bedside view of deteriorating patients by building a real-time NEWS2 Early Warning System (Vite, JavaScript, FastAPI) with drug–lab interaction alerts, escalation workflows and CCU step-down eligibility.",
      "Made LLM-generated NABH-compliant discharge summaries legally defensible via audit trails and digital physician sign-off, built into the backend RAG pipeline over MedCPT embeddings in Qdrant.",
    ],
    stack: ["XGBoost", "FastAPI", "Vite", "JavaScript", "Qdrant", "RAG", "MIMIC-IV", "MedCPT"],
  },
  {
    company: "Meeting-Aware Persona-Based Instructor Agent",
    role: "Undergraduate Researcher",
    team: "Under Prof. Gautam Shroff",
    period: "Dec 2025 – Apr 2026",
    summary:
      "An AI teammate that sits in your meetings and Slack, then answers questions about them — grounded strictly in what was actually said.",
    highlights: [
      "Made a 4-source knowledge base queryable in natural language by building a RAG pipeline on MongoDB Atlas, modelling transcripts, chunks and embeddings as single documents — no join at query time — with Groq-hosted Llama 3.1 8B.",
      "Turned raw meeting URLs into knowledge with no manual upload by engineering a real-time ingestion pipeline integrating a teammate's ML video-processing API for keyframe-level transcript extraction, normalised alongside live Slack history, PDFs and links into one corpus.",
      "Guaranteed no user can retrieve another tenant's data by enforcing isolation at the Atlas Vector Search index itself — $vectorSearch pre-filters on user and date backed by compound indexes — not post-retrieval filtering.",
      "Lifted recall on ambiguous questions while stopping invented answers by layering BM25 over vector results with overlap re-ranking, then gating every response on lexical/entailment overlap via an LLM verifier that abstains instead of guessing.",
      "Took the system to production in Slack by building a FastAPI server with signature verification, idempotent-upsert ingestion, MongoDB aggregation pipelines for session history and a 9-stage LangGraph state machine routing each query, deployed serverlessly on Vercel.",
      "Made the agent proactive, not reactive, by shipping a cron-scheduled supervisor that rebuilds an evolving goal document on every ingestion and auto-delivers Slack check-ins from goals, recent meetings and prior Q&A — over multi-tenant storage with persistent chat memory.",
    ],
    stack: ["MongoDB Atlas", "LangGraph", "FastAPI", "Vector Search", "BM25", "Llama 3.1", "Vercel", "Slack API"],
  },
];

/* -------------------------------- Projects -------------------------------- */

export type Project = {
  title: string;
  tagline: string;
  description: string;
  team: string;
  period: string;
  stack: string[];
  features: string[];
  challenges: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  award?: string;
  category: string;
};

export const projects: Project[] = [
  {
    title: "RAD.YO — Retro Digital Radio",
    tagline: "OSDC Hackathon Winner · 1st Prize",
    description:
      "A retro digital radio web app in React with live streaming APIs, station switching and hand-crafted UI assets designed in Adobe Illustrator & Photoshop.",
    team: "Team Size · 3",
    period: "Jul 2025",
    stack: ["React", "Streaming APIs", "Adobe Illustrator", "Photoshop", "JavaScript"],
    features: [
      "Live radio streaming with seamless station switching",
      "Hand-crafted retro UI assets designed from scratch",
      "Responsive, tactile analog-inspired interface",
      "Winner of the OSDC Hackathon, July 2025",
    ],
    challenges:
      "Delivering a polished, custom-designed analog aesthetic while wiring live streaming APIs reliably — under hackathon time pressure.",
    github: "https://github.com/ashmit-verma24134",
    featured: true,
    award: "🏆 OSDC Hackathon Winner 2025",
    category: "Frontend / Design",
  },
  {
    title: "University ERP System",
    tagline: "Secure role-based desktop ERP",
    description:
      "Role-based ERP desktop app in Java (JavaFX) with Student / Instructor / Admin dashboards on a secure two-database architecture (Auth + ERP DB).",
    team: "Team Size · 2",
    period: "Sep 2025 – Nov 2025",
    stack: ["Java", "JavaFX", "MySQL", "JUnit", "bcrypt"],
    features: [
      "Separate Student, Instructor and Admin dashboards",
      "Two-database architecture (Auth + ERP DB) with RBAC",
      "bcrypt-hashed passwords & referential constraints",
      "Modular service layer, JUnit-style testing, CSV/PDF export",
    ],
    challenges:
      "Enforcing strict role-based access and referential integrity across two databases while keeping the service layer modular and testable.",
    github: "https://github.com/ashmit-verma24134",
    featured: true,
    category: "Backend / Systems",
  },
  {
    title: "Raashan — Supply Chain Management",
    tagline: "ACID-compliant inventory engine",
    description:
      "Normalized MySQL database modelling end-to-end supply flow — transactions, triggers, stored procedures, indexed batch tracking, automated low-stock reordering and analytical views.",
    team: "Team Size · 3",
    period: "Jan 2026 – Apr 2026",
    stack: ["MySQL", "Stored Procedures", "Triggers", "SQL"],
    features: [
      "End-to-end supply flow modelled in a normalized schema",
      "Triggers & stored procedures for automated reordering",
      "Indexed batch tracking and analytical reporting views",
      "ACID compliance & consistent state under concurrency",
    ],
    challenges:
      "Guaranteeing consistent inventory state under concurrent updates while automating low-stock reordering with triggers and stored procedures.",
    github: "https://github.com/ashmit-verma24134",
    category: "Databases",
  },
  {
    title: "Custom ISA Assembler & Simulator",
    tagline: "Two-pass assembler + cycle simulator",
    description:
      "Python two-pass assembler and execution simulator for a custom ISA — symbol-table resolution, binary encoding, cycle-level tracing and an automated test harness validating against reference traces.",
    team: "Team Size · 3",
    period: "Jan 2025 – Mar 2025",
    stack: ["Python", "Computer Architecture", "Testing"],
    features: [
      "Two-pass assembler with symbol-table resolution",
      "Binary instruction encoding for a custom ISA",
      "Cycle-level execution tracing in the simulator",
      "Automated harness validating against reference traces",
    ],
    challenges:
      "Correctly resolving forward references in two passes and matching cycle-accurate execution traces against a reference implementation.",
    github: "https://github.com/ashmit-verma24134",
    category: "Low-level / Systems",
  },
];

/* ------------------------------ Achievements ------------------------------ */

export type Achievement = {
  title: string;
  detail: string;
  icon: string;
  tag: string;
  accent: string;
};

export const achievements: Achievement[] = [
  {
    title: "Codeforces Competitor",
    detail: "Climbed from 421 to 1306 (Pupil) across 9 rated contests and solved 250+ DSA problems in C++ across Codeforces, LeetCode, TUF and HackerRank.",
    icon: "Swords",
    tag: "Competitive Programming",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Flipkart GRiD 8.0 — Semi-Finalist",
    detail: "Advanced to the semi-finals of Flipkart GRiD 8.0, one of India's largest national engineering campus challenges.",
    icon: "Rocket",
    tag: "Semi-Finalist",
    accent: "from-amber-400 to-orange-500",
  },
  {
    title: "Goldman Sachs India Hackathon",
    detail: "Ranked 26th nationally in the Goldman Sachs India Hackathon.",
    icon: "Medal",
    tag: "Hackathon",
    accent: "from-amber-500 to-yellow-500",
  },
  {
    title: "Google Code Jam — Big Code",
    detail: "Placed in the Top 15,000 globally in Google Code Jam Big Code.",
    icon: "Globe2",
    tag: "Global Contest",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "OSDC Hackathon Winner 2025",
    detail: "1st Prize for RAD.YO — Retro Digital Radio at the OSDC Hackathon.",
    icon: "Trophy",
    tag: "1st Prize",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "CTF Winner (DSA)",
    detail: "Won the DSA Capture-The-Flag challenge at the OSDC Hackathon.",
    icon: "Flag",
    tag: "CTF",
    accent: "from-violet-500 to-indigo-500",
  },
  {
    title: "250+ DSA Problems",
    detail: "Solved 250+ data-structures & algorithms problems in C++ across major judges.",
    icon: "Binary",
    tag: "Problem Solving",
    accent: "from-blue-500 to-sky-500",
  },
];

/* ------------------------ Positions of Responsibility --------------------- */

export type Leadership = {
  role: string;
  org: string;
  extra?: string;
};

export const leadership: Leadership[] = [
  { role: "Events Lead", org: "Odyssey '25, IIIT Delhi", extra: "Unstop" },
  { role: "Operations Lead", org: "TechSpectra, IIIT Delhi" },
  { role: "Events Lead", org: "ACM Student Chapter (SIGCHI), IIIT Delhi", extra: "ashmitv@acm.org" },
];

/* -------------------------------- Education ------------------------------- */

export type Education = {
  institution: string;
  degree: string;
  detail: string;
  period: string;
  score: string;
  scoreLabel: string;
  coursework?: string[];
};

export const education: Education[] = [
  {
    institution: "Indraprastha Institute of Information Technology, Delhi",
    degree: "B.Tech — Computer Science & Design",
    detail: "Batch of 2028",
    period: "2024 – Present",
    score: "7.00",
    scoreLabel: "CGPA",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Architecture",
      "Software Design",
      "Edge AI in Microcontrollers",
      "Full-Stack Web Development",
    ],
  },
  {
    institution: "Arwachin International School, Dilshad Garden, Delhi",
    degree: "CBSE — Class XII (PCM + CS)",
    detail: "Senior Secondary",
    period: "2023 – 2024",
    score: "85.4%",
    scoreLabel: "Percentage",
  },
  {
    institution: "Arwachin International School, Dilshad Garden, Delhi",
    degree: "CBSE — Class X",
    detail: "Secondary",
    period: "2021 – 2022",
    score: "90.4%",
    scoreLabel: "Percentage",
  },
];
