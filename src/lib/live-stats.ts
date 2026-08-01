/**
 * Live stats for the Competitive Programming section.
 *
 * Every request runs on the server with `next: { revalidate: 86400 }`, so
 * Next.js serves a cached render and refreshes it at most once per day. No
 * client-side fetching, no API keys, no loading spinners.
 *
 * Each platform is fetched independently and falls back to the hard-coded
 * snapshot in `mock-data.ts` if it fails — one dead upstream degrades that
 * card only, and never breaks the build or the page.
 */

import {
  codeforces as cfFallback,
  leetcode as lcFallback,
  tuf as tufFallback,
  buildTufHeatmap,
  type HeatCell,
} from "./mock-data";

const DAY_SECONDS = 86_400;
const TIMEOUT_MS = 10_000;

/* ------------------------------- Public types ----------------------------- */

export type CodeforcesStats = {
  handle: string;
  rank: string;
  rating: number;
  maxRating: number;
  contests: number;
  problemsSolved: number;
  color: string;
  ratingHistory: { contest: string; rating: number }[];
  recentContests: { name: string; rank: number; change: number }[];
  favoriteProblems: { name: string; rating: number; tag: string }[];
};

export type LeetCodeStats = {
  username: string;
  totalSolved: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
  acceptanceRate: number;
  streak: number;
  activeDays: number;
  languages: { name: string; solved: number }[];
  recentSubmissions: { title: string; difficulty: string }[];
};

export type TufStats = {
  username: string;
  totalSolved: number;
  totalPool: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
  submissions12mo: number;
  activeDays: number;
  maxStreak: number;
  lastActive: string;
  lastActiveCount: number;
};

export type Stats = {
  codeforces: CodeforcesStats;
  leetcode: LeetCodeStats;
  tuf: TufStats;
  tufHeat: HeatCell[];
  /** Which platforms answered this build. Useful for a "live" badge. */
  live: { codeforces: boolean; leetcode: boolean; tuf: boolean };
};

/* --------------------------------- Helpers -------------------------------- */

async function getJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: DAY_SECONDS },
  });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return (await res.json()) as T;
}

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/** Codeforces rank colours, matching the site's own palette. */
function rankColor(rank: string): string {
  const r = rank.toLowerCase();
  if (r.includes("legendary") || r.includes("international grandmaster") || r.includes("grandmaster"))
    return "#ff0000";
  if (r.includes("master")) return "#ff8c00";
  if (r.includes("candidate")) return "#aa00aa";
  if (r.includes("expert")) return "#0000ff";
  if (r.includes("specialist")) return "#03a89e";
  if (r.includes("pupil")) return "#008000";
  return "#808080";
}

/** "Codeforces Round 1098 (Div. 2)" → "Round 1098 (Div.2)" for the axis. */
const shortenContest = (name: string) =>
  name.replace(/^Codeforces\s+/i, "").replace(/Div\.\s*/g, "Div.").trim();

const levelFor = (count: number) =>
  (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4) as HeatCell["level"];

/* ------------------------------- Codeforces ------------------------------- */

type CfInfo = {
  result: { handle: string; rating: number; maxRating: number; rank: string }[];
};
type CfRating = {
  result: {
    contestName: string;
    rank: number;
    oldRating: number;
    newRating: number;
  }[];
};

async function fetchCodeforces(handle: string): Promise<CodeforcesStats> {
  const [info, rating] = await Promise.all([
    getJSON<CfInfo>(`https://codeforces.com/api/user.info?handles=${handle}`),
    getJSON<CfRating>(`https://codeforces.com/api/user.rating?handle=${handle}`),
  ]);

  const user = info.result[0];
  const history = rating.result;

  return {
    handle: user.handle,
    rank: titleCase(user.rank),
    rating: user.rating,
    maxRating: user.maxRating,
    contests: history.length,
    color: rankColor(user.rank),
    // Résumé-level claim spanning every judge — not derivable from one API.
    problemsSolved: cfFallback.problemsSolved,
    favoriteProblems: [...cfFallback.favoriteProblems],
    ratingHistory: history.map((h) => ({
      contest: shortenContest(h.contestName),
      rating: h.newRating,
    })),
    recentContests: history
      .slice(-4)
      .reverse()
      .map((h) => ({
        name: h.contestName,
        rank: h.rank,
        change: h.newRating - h.oldRating,
      })),
  };
}

/* -------------------------------- LeetCode -------------------------------- */

type LcResponse = {
  data: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: { difficulty: string; count: number; submissions: number }[];
        totalSubmissionNum: { difficulty: string; submissions: number }[];
      };
      languageProblemCount: { languageName: string; problemsSolved: number }[];
      userCalendar: { streak: number; totalActiveDays: number } | null;
    } | null;
    allQuestionsCount: { difficulty: string; count: number }[];
    recentAcSubmissionList: { title: string; titleSlug: string }[];
  };
};

const LC_QUERY = `query stats($u: String!, $limit: Int!) {
  matchedUser(username: $u) {
    username
    submitStats {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty submissions }
    }
    languageProblemCount { languageName problemsSolved }
    userCalendar { streak totalActiveDays }
  }
  allQuestionsCount { difficulty count }
  recentAcSubmissionList(username: $u, limit: $limit) { title titleSlug }
}`;

async function leetcodeGraphQL<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // LeetCode rejects requests without a browser-ish Referer.
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-stats/1.0)",
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: DAY_SECONDS },
  });
  if (!res.ok) throw new Error(`LeetCode GraphQL responded ${res.status}`);
  return (await res.json()) as T;
}

async function fetchLeetCode(username: string): Promise<LeetCodeStats> {
  const json = await leetcodeGraphQL<LcResponse>(LC_QUERY, { u: username, limit: 4 });
  const user = json.data?.matchedUser;
  if (!user) throw new Error(`LeetCode user ${username} not found`);

  const byDifficulty = (
    list: { difficulty: string; count?: number; submissions?: number }[],
    difficulty: string
  ) => list.find((d) => d.difficulty === difficulty);

  const ac = user.submitStats.acSubmissionNum;
  const totals = json.data.allQuestionsCount;

  const solved = (d: string) => byDifficulty(ac, d)?.count ?? 0;
  const poolFor = (d: string) => byDifficulty(totals, d)?.count ?? 0;

  const acceptedSubs = byDifficulty(ac, "All")?.submissions ?? 0;
  const allSubs = byDifficulty(user.submitStats.totalSubmissionNum, "All")?.submissions ?? 0;

  // Difficulty isn't on recentAcSubmissionList, so resolve each slug in one
  // aliased query rather than N round-trips.
  const slugs = json.data.recentAcSubmissionList ?? [];
  let difficulties: Record<string, string> = {};
  if (slugs.length) {
    const aliased = `query d {${slugs
      .map((s, i) => `q${i}: question(titleSlug: "${s.titleSlug}") { difficulty }`)
      .join(" ")}}`;
    try {
      const res = await leetcodeGraphQL<{ data: Record<string, { difficulty: string } | null> }>(
        aliased,
        {}
      );
      difficulties = Object.fromEntries(
        slugs.map((s, i) => [s.titleSlug, res.data?.[`q${i}`]?.difficulty ?? "Easy"])
      );
    } catch {
      // Difficulty labels are cosmetic — fall through with an empty map.
    }
  }

  return {
    username: user.username,
    totalSolved: solved("All"),
    easy: { solved: solved("Easy"), total: poolFor("Easy") },
    medium: { solved: solved("Medium"), total: poolFor("Medium") },
    hard: { solved: solved("Hard"), total: poolFor("Hard") },
    acceptanceRate: allSubs > 0 ? Math.round((acceptedSubs / allSubs) * 1000) / 10 : 0,
    streak: user.userCalendar?.streak ?? 0,
    activeDays: user.userCalendar?.totalActiveDays ?? 0,
    languages: user.languageProblemCount.map((l) => ({
      name: l.languageName,
      solved: l.problemsSolved,
    })),
    recentSubmissions: slugs.map((s) => ({
      title: s.title,
      difficulty: difficulties[s.titleSlug] ?? "Easy",
    })),
  };
}

/* ------------------------------ TakeUForward ------------------------------ */

type TufHeatmapResponse = {
  data: { total: number; months: Record<string, Record<string, { total: number }>> };
};

/**
 * TUF's solved counts are not on a JSON endpoint — they're server-rendered
 * into the profile page's RSC payload. The numbers are stable enough to pull
 * out by key; if the shape ever changes we fall back to the snapshot.
 */
async function fetchTufProgress(username: string) {
  const res = await fetch(`https://takeuforward.org/profile/${username}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-stats/1.0)" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: DAY_SECONDS },
  });
  if (!res.ok) throw new Error(`TUF profile responded ${res.status}`);
  const html = await res.text();

  // Quotes are backslash-escaped inside the payload's JS string literal.
  const num = (key: string) => {
    const m = html.match(new RegExp(`\\\\?"${key}\\\\?":\\s*(\\d+)`));
    return m ? Number(m[1]) : null;
  };
  const bucket = (key: string) => {
    const m = html.match(
      new RegExp(`\\\\?"${key}\\\\?":\\s*\\{\\\\?"total\\\\?":\\s*(\\d+),\\\\?"solved\\\\?":\\s*(\\d+)\\}`)
    );
    return m ? { total: Number(m[1]), solved: Number(m[2]) } : null;
  };

  const totalSolved = num("total_solved");
  const totalPool = num("total_dsa");
  const easy = bucket("easy");
  const medium = bucket("medium");
  const hard = bucket("hard");

  if (totalSolved === null || totalPool === null || !easy || !medium || !hard) {
    throw new Error("TUF profile payload did not contain dsaProgress");
  }
  return { totalSolved, totalPool, easy, medium, hard };
}

async function fetchTuf(username: string): Promise<{ stats: TufStats; heat: HeatCell[] }> {
  const year = new Date().getUTCFullYear();
  const [progress, heatmap] = await Promise.all([
    fetchTufProgress(username),
    getJSON<TufHeatmapResponse>(
      `https://backend-go.takeuforward.org/api/v1/streak/heatmap/${username}?year=${year}`,
      // The API rejects requests without an Origin header (403 FORBIDDEN).
      { headers: { Origin: "https://takeuforward.org" } }
    ),
  ]);

  const activity: Record<string, number> = {};
  for (const [month, days] of Object.entries(heatmap.data.months ?? {})) {
    for (const [day, value] of Object.entries(days)) {
      const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      activity[iso] = value.total;
    }
  }

  const activeDates = Object.keys(activity).sort();
  if (!activeDates.length) throw new Error("TUF heatmap returned no activity");

  let maxStreak = 1;
  let run = 1;
  for (let i = 1; i < activeDates.length; i++) {
    const prev = Date.parse(`${activeDates[i - 1]}T00:00:00Z`);
    const curr = Date.parse(`${activeDates[i]}T00:00:00Z`);
    run = curr - prev === 86_400_000 ? run + 1 : 1;
    if (run > maxStreak) maxStreak = run;
  }

  const lastActive = activeDates[activeDates.length - 1];

  // Same window as the static builder: Jan 1 → the Saturday of the latest
  // active week, so the grid never ends in a stray one-cell column.
  const end = new Date(`${lastActive}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));
  const start = new Date(Date.UTC(end.getUTCFullYear(), 0, 1));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const heat: HeatCell[] = [];
  for (const d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const iso = d.toISOString().slice(0, 10);
    const count = activity[iso] ?? 0;
    heat.push({ date: iso, count, level: levelFor(count) });
  }

  return {
    stats: {
      username,
      totalSolved: progress.totalSolved,
      totalPool: progress.totalPool,
      easy: progress.easy,
      medium: progress.medium,
      hard: progress.hard,
      submissions12mo: heatmap.data.total,
      activeDays: activeDates.length,
      maxStreak,
      lastActive,
      lastActiveCount: activity[lastActive],
    },
    heat,
  };
}

/* --------------------------------- Fallbacks ------------------------------- */

const fallbackCodeforces: CodeforcesStats = {
  handle: cfFallback.handle,
  rank: cfFallback.rank,
  rating: cfFallback.rating,
  maxRating: cfFallback.maxRating,
  contests: cfFallback.contests,
  problemsSolved: cfFallback.problemsSolved,
  color: cfFallback.color,
  ratingHistory: [...cfFallback.ratingHistory],
  recentContests: cfFallback.recentContests.map((c) => ({
    name: c.name,
    rank: c.rank,
    change: c.change,
  })),
  favoriteProblems: [...cfFallback.favoriteProblems],
};

const fallbackLeetCode: LeetCodeStats = {
  username: lcFallback.username,
  totalSolved: lcFallback.totalSolved,
  easy: { ...lcFallback.easy },
  medium: { ...lcFallback.medium },
  hard: { ...lcFallback.hard },
  acceptanceRate: lcFallback.acceptanceRate,
  streak: lcFallback.streak,
  activeDays: 0,
  languages: lcFallback.languages.map((l) => ({ name: l.name, solved: l.solved })),
  recentSubmissions: lcFallback.recentSubmissions
    .slice(0, 4)
    .map((s) => ({ title: s.title, difficulty: s.difficulty })),
};

const fallbackTufHeat = buildTufHeatmap();
const fallbackTuf: TufStats = {
  username: tufFallback.username,
  totalSolved: tufFallback.totalSolved,
  totalPool: tufFallback.totalPool,
  easy: { ...tufFallback.easy },
  medium: { ...tufFallback.medium },
  hard: { ...tufFallback.hard },
  submissions12mo: tufFallback.submissions12mo,
  activeDays: tufFallback.activeDays,
  maxStreak: tufFallback.maxStreak,
  lastActive: fallbackTufHeat.filter((c) => c.count > 0).at(-1)?.date ?? "",
  lastActiveCount: fallbackTufHeat.filter((c) => c.count > 0).at(-1)?.count ?? 0,
};

/* ------------------------------- Entry point ------------------------------ */

/**
 * Fetches all three platforms in parallel. Never throws: any platform that
 * fails logs once and serves its snapshot instead.
 */
export async function getStats(): Promise<Stats> {
  const [cf, lc, tuf] = await Promise.allSettled([
    fetchCodeforces(cfFallback.handle),
    fetchLeetCode(lcFallback.username),
    fetchTuf(tufFallback.username),
  ]);

  if (cf.status === "rejected") console.error("[stats] Codeforces:", cf.reason);
  if (lc.status === "rejected") console.error("[stats] LeetCode:", lc.reason);
  if (tuf.status === "rejected") console.error("[stats] TakeUForward:", tuf.reason);

  return {
    codeforces: cf.status === "fulfilled" ? cf.value : fallbackCodeforces,
    leetcode: lc.status === "fulfilled" ? lc.value : fallbackLeetCode,
    tuf: tuf.status === "fulfilled" ? tuf.value.stats : fallbackTuf,
    tufHeat: tuf.status === "fulfilled" ? tuf.value.heat : fallbackTufHeat,
    live: {
      codeforces: cf.status === "fulfilled",
      leetcode: lc.status === "fulfilled",
      tuf: tuf.status === "fulfilled",
    },
  };
}
