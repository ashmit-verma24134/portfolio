/**
 * Mock data for the Competitive Programming & GitHub sections.
 *
 * ⚠️  PLACEHOLDER DATA — connect the real APIs later:
 *   • Codeforces:  https://codeforces.com/apiHelp  (user.info, user.rating, user.status)
 *   • LeetCode:    https://leetcode.com/graphql     (or a community stats API)
 *   • GitHub:      https://api.github.com/users/ashmit-verma24134
 *
 * Every field below is deterministic mock data so the UI renders identically
 * on server and client (no hydration mismatch). Swap these values for live
 * API responses without touching any component.
 */

/* --------------------------- Deterministic RNG ---------------------------- */
// Seeded generator so heatmaps/graphs don't flicker or mismatch on hydration.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* -------------------------------- Heatmap --------------------------------- */
export type HeatCell = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const levelFor = (count: number) =>
  (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4) as HeatCell["level"];

function randomCount(rand: () => number) {
  const r = rand();
  let count = 0;
  // Weight toward active-but-realistic practice patterns.
  if (r > 0.55) count = Math.floor(rand() * 3) + 1;
  if (r > 0.8) count = Math.floor(rand() * 5) + 3;
  if (r > 0.95) count = Math.floor(rand() * 8) + 6;
  return count;
}

export function generateHeatmap(seed = 42, weeks = 26): HeatCell[] {
  const rand = mulberry32(seed);
  const cells: HeatCell[] = [];
  const today = new Date("2026-07-23T00:00:00Z");
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - weeks * 7);
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const count = randomCount(rand);
    cells.push({ date: d.toISOString().slice(0, 10), count, level: levelFor(count) });
  }
  return cells;
}

/**
 * REAL TakeUForward activity — every day this account submitted something,
 * as `YYYY-MM-DD: submissions`.
 *
 * Source (public, no auth):
 *   https://backend-go.takeuforward.org/api/v1/streak/heatmap/ashmit_24134?year=2026
 * The response nests as data.months[month][day].total. Re-run that endpoint
 * and regenerate this map to refresh.
 *
 * Totals below reconcile with the profile page: 106 active days, 266
 * submissions, longest streak 20 days.
 */
export const tufActivity: Record<string, number> = {
  "2026-01-24": 3, "2026-01-26": 1, "2026-01-28": 1,
  "2026-02-03": 1, "2026-02-04": 22, "2026-02-06": 4, "2026-02-07": 1,
  "2026-02-10": 2, "2026-02-11": 2, "2026-02-12": 1, "2026-02-13": 1,
  "2026-02-14": 2, "2026-02-15": 2, "2026-02-16": 2, "2026-02-17": 1,
  "2026-02-18": 1, "2026-02-19": 1, "2026-02-22": 4, "2026-02-23": 3,
  "2026-02-24": 2, "2026-02-25": 1,
  "2026-03-01": 3, "2026-03-02": 1, "2026-03-08": 2, "2026-03-11": 1,
  "2026-03-13": 2, "2026-03-14": 1, "2026-03-15": 1, "2026-03-16": 1,
  "2026-03-18": 2, "2026-03-19": 3, "2026-03-20": 5, "2026-03-21": 2,
  "2026-03-24": 1, "2026-03-25": 1, "2026-03-26": 1,
  "2026-04-04": 2, "2026-04-06": 1, "2026-04-10": 3, "2026-04-11": 6,
  "2026-04-12": 5, "2026-04-13": 2, "2026-04-17": 3, "2026-04-25": 1,
  "2026-05-08": 3, "2026-05-09": 1, "2026-05-10": 4, "2026-05-11": 1,
  "2026-05-13": 2, "2026-05-15": 3, "2026-05-16": 1, "2026-05-17": 1,
  "2026-05-18": 4, "2026-05-19": 1, "2026-05-20": 2, "2026-05-22": 2,
  "2026-05-23": 3, "2026-05-24": 1, "2026-05-27": 3, "2026-05-28": 1,
  "2026-05-29": 5, "2026-05-30": 4,
  "2026-06-08": 1, "2026-06-12": 1, "2026-06-13": 1, "2026-06-14": 8,
  "2026-06-15": 5, "2026-06-16": 4, "2026-06-17": 3, "2026-06-18": 1,
  "2026-06-21": 2, "2026-06-22": 1, "2026-06-23": 3, "2026-06-24": 2,
  "2026-06-25": 1, "2026-06-30": 2,
  "2026-07-02": 5, "2026-07-03": 9, "2026-07-04": 3, "2026-07-05": 3,
  "2026-07-06": 3, "2026-07-07": 1, "2026-07-08": 7, "2026-07-09": 3,
  "2026-07-10": 5, "2026-07-11": 1, "2026-07-12": 3, "2026-07-13": 2,
  "2026-07-14": 1, "2026-07-15": 2, "2026-07-16": 1, "2026-07-17": 4,
  "2026-07-18": 4, "2026-07-19": 3, "2026-07-20": 3, "2026-07-21": 1,
  "2026-07-23": 1, "2026-07-24": 1, "2026-07-25": 1, "2026-07-26": 1,
  "2026-07-27": 3, "2026-07-28": 1, "2026-07-29": 3, "2026-07-30": 2,
  "2026-07-31": 1,
  "2026-08-01": 3,
};

/** Most recent day with recorded TUF activity. */
export function latestTufDay(): string {
  return Object.keys(tufActivity).sort().at(-1)!;
}

/**
 * Calendar-year-to-date grid built from the real activity map (Jan 1 → today,
 * weeks as Sunday-aligned columns). TUF's own profile defaults to a rolling
 * 12 months, but this account has no 2025 activity — that window was four
 * empty months of padding, so the year view shows the same data tighter.
 */
export function buildTufHeatmap(endISO = latestTufDay()): HeatCell[] {
  const end = new Date(`${endISO}T00:00:00Z`);
  // Pad forward to that week's Saturday, so the grid never ends in a stray
  // one-cell column. Deriving the end from the data (rather than from
  // `new Date()`) keeps server and client render identical.
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

  const start = new Date(Date.UTC(end.getUTCFullYear(), 0, 1));
  // Pad back to the preceding Sunday so every column is a clean Sun→Sat week.
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const cells: HeatCell[] = [];
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const iso = d.toISOString().slice(0, 10);
    const count = tufActivity[iso] ?? 0;
    cells.push({ date: iso, count, level: levelFor(count) });
  }
  return cells;
}

/* ------------------------------- Codeforces ------------------------------- */
// Real values pulled live from the Codeforces API (user.info + user.rating)
export const codeforces = {
  handle: "AshmitVerma",
  rank: "Pupil",
  rating: 1306, // live: user.info -> rating
  maxRating: 1306, // live: user.info -> maxRating
  maxRank: "Pupil",
  contribution: 0,
  friends: 1,
  problemsSolved: 250, // résumé: 250+ across Codeforces/LeetCode/TUF/HackerRank
  contests: 9, // real number of rated contests
  color: "#008000", // Pupil green
  // Real rating progression — Codeforces user.rating endpoint
  ratingHistory: [
    { contest: "Round 1071 (Div.3)", rating: 421 },
    { contest: "Good Bye 2025", rating: 746 },
    { contest: "Edu Round 186", rating: 897 },
    { contest: "Hello 2026", rating: 977 },
    { contest: "Round 1072 (Div.3)", rating: 1045 },
    { contest: "Round 1074 (Div.4)", rating: 1128 },
    { contest: "Round 1075 (Div.2)", rating: 1126 },
    { contest: "Round 1076 (Div.3)", rating: 1088 },
    { contest: "Round 1098 (Div.2)", rating: 1306 },
  ],
  // Real recent contests (rank + delta from the rating endpoint)
  recentContests: [
    { name: "Codeforces Round 1098 (Div. 2)", rank: 1027, change: +218, solved: 4 },
    { name: "Codeforces Round 1076 (Div. 3)", rank: 14967, change: -38, solved: 3 },
    { name: "Codeforces Round 1075 (Div. 2)", rank: 9145, change: -2, solved: 3 },
    { name: "Codeforces Round 1074 (Div. 4)", rank: 3073, change: +83, solved: 5 },
  ],
  favoriteProblems: [
    { name: "Two Sets", rating: 1400, tag: "Constructive" },
    { name: "DZY Loves Sequences", rating: 1500, tag: "DP" },
    { name: "Vasya and Robot", rating: 1600, tag: "Binary Search" },
    { name: "Kefa and Dishes", rating: 1700, tag: "Bitmask DP" },
  ],
} as const;

/* -------------------------------- LeetCode -------------------------------- */
// Real values pulled live from the LeetCode GraphQL API (AshmitVerma24134)
export const leetcode = {
  username: "AshmitVerma24134",
  contestRating: null as number | null, // Unrated — no rated LeetCode contests yet
  globalRanking: "2,580,475", // live: profile ranking
  totalSolved: 51, // live
  easy: { solved: 31, total: 895 }, // solved live; total ≈ current LeetCode pool
  medium: { solved: 18, total: 1888 },
  hard: { solved: 2, total: 855 },
  acceptanceRate: 67.6, // live: 73 accepted / 108 total submissions
  streak: 12, // PLACEHOLDER — connect calendar API for live streak
  ranking: "Rising",
  // NOTE: badges below are placeholders — connect the LeetCode badges API
  badges: [
    { name: "DSA Study Plan", icon: "📚" },
    { name: "First Accepted", icon: "✅" },
    { name: "C++ Solver", icon: "⚙️" },
  ],
  // Estimated language spread across 51 solved problems (connect API to refine)
  languages: [
    { name: "C++", solved: 42, percent: 82 },
    { name: "Python", solved: 6, percent: 12 },
    { name: "Java", solved: 3, percent: 6 },
  ],
  // NOTE: recent submissions are illustrative — connect recentAcSubmissions API
  recentSubmissions: [
    { title: "Two Sum", status: "Accepted", lang: "C++", when: "recent", difficulty: "Easy" },
    { title: "Valid Parentheses", status: "Accepted", lang: "C++", when: "recent", difficulty: "Easy" },
    { title: "Merge Two Sorted Lists", status: "Accepted", lang: "C++", when: "recent", difficulty: "Easy" },
    { title: "Longest Substring w/o Repeat", status: "Accepted", lang: "C++", when: "recent", difficulty: "Medium" },
    { title: "Trapping Rain Water", status: "Accepted", lang: "C++", when: "recent", difficulty: "Hard" },
  ],
} as const;

// Real TakeUForward (TUF) profile stats — takeuforward.org/profile/ashmit_24134
export const tuf = {
  username: "ashmit_24134",
  totalSolved: 171,
  totalPool: 1121, // the ring on the TUF profile reads 171 / 1121
  easy: { solved: 91, total: 374 },
  medium: { solved: 61, total: 477 },
  hard: { solved: 19, total: 253 },
  // From the profile's activity panel (last 12 months)
  submissions12mo: 266,
  activeDays: 106,
  maxStreak: 20,
} as const;

/* --------------------------------- GitHub --------------------------------- */
// Real values pulled from https://api.github.com/users/ashmit-verma24134
export const github = {
  username: "ashmit-verma24134",
  bio: "cs with design @ iiitd",
  avatar: "https://avatars.githubusercontent.com/u/197304213?v=4",
  followers: 4, // live from GitHub API
  following: 7, // live from GitHub API
  publicRepos: 14, // live from GitHub API
  totalStars: 2, // sum of real stargazers
  memberSince: "Jan 2025",
  totalContributions: 1287, // PLACEHOLDER — GraphQL contributionsCollection (connect API)
  currentStreak: 21, // PLACEHOLDER
  longestStreak: 63, // PLACEHOLDER
  // Estimated language spread across public repos
  languages: [
    { name: "Java", percent: 24, color: "#b07219" },
    { name: "Python", percent: 22, color: "#3572A5" },
    { name: "JavaScript", percent: 20, color: "#f1e05a" },
    { name: "C++", percent: 18, color: "#f34b7d" },
    { name: "HTML", percent: 16, color: "#e34c26" },
  ],
  // Real repositories from the account, surfaced as "pinned"
  pinnedRepos: [
    {
      name: "agentic-patient-simulator",
      url: "https://github.com/ashmit-verma24134/agentic-patient-simulator",
      description: "Agentic AI patient simulator — LLM-driven clinical scenarios for the CareOS decision-support work.",
      language: "Python",
      color: "#3572A5",
      stars: 0,
      forks: 0,
    },
    {
      name: "RAASHAN",
      url: "https://github.com/ashmit-verma24134/RAASHAN",
      description: "Normalized MySQL supply-chain engine — triggers, stored procedures, batch tracking & ACID guarantees.",
      language: "HTML",
      color: "#e34c26",
      stars: 1,
      forks: 0,
    },
    {
      name: "AP_PROJECT_2025",
      url: "https://github.com/ashmit-verma24134/AP_PROJECT_2025",
      description: "University ERP desktop app in Java (JavaFX) on a secure two-database architecture with RBAC & bcrypt.",
      language: "Java",
      color: "#b07219",
      stars: 0,
      forks: 0,
    },
    {
      name: "CO_Project",
      url: "https://github.com/ashmit-verma24134/CO_Project",
      description: "Two-pass assembler & cycle-accurate simulator for a custom ISA, validated against reference traces.",
      language: "Python",
      color: "#3572A5",
      stars: 0,
      forks: 0,
    },
    {
      name: "osdc-hack",
      url: "https://github.com/ashmit-verma24134/osdc-hack",
      description: "🏆 OSDC Hackathon winner — RAD.YO retro digital radio web app in React with live streaming.",
      language: "JavaScript",
      color: "#f1e05a",
      stars: 0,
      forks: 0,
    },
    {
      name: "cses-problem-set",
      url: "https://github.com/ashmit-verma24134/cses-problem-set",
      description: "Clean C++ solutions to the CSES problem set — part of 250+ solved DSA problems.",
      language: "C++",
      color: "#f34b7d",
      stars: 0,
      forks: 0,
    },
  ],
  activity: [
    { type: "push", repo: "agentic-patient-simulator", detail: "Pushed commits to main", when: "recent" },
    { type: "push", repo: "RAASHAN", detail: "Updated supply-chain schema & procedures", when: "recent" },
    { type: "push", repo: "cses-problem-set", detail: "Added new C++ solutions", when: "recent" },
    { type: "push", repo: "CO_Project", detail: "Refined assembler two-pass resolution", when: "recent" },
  ],
} as const;
