# Ashmit Verma — Portfolio

Personal portfolio site. Next.js 15 (App Router), TypeScript, Tailwind CSS,
Framer Motion, and a Three.js particle backdrop.

## Live stats

The Competitive Programming section is not hard-coded. On every rebuild the
server fetches all three platforms in parallel and the page is regenerated at
most once every 24 hours (`export const revalidate = 86400` in
`src/app/page.tsx`). Visitors get static HTML — no client-side requests.

| Platform | Source |
| --- | --- |
| Codeforces | `codeforces.com/api` — `user.info` + `user.rating` |
| LeetCode | `leetcode.com/graphql` — solved counts, acceptance, streak, languages, recent AC |
| TakeUForward | `backend-go.takeuforward.org/api/v1/streak/heatmap/…` for the activity grid, plus `dsaProgress` parsed from the profile payload |

None of these need an API key. Two quirks worth knowing:

- The TUF heatmap endpoint returns `403 FORBIDDEN` without an `Origin` header.
- LeetCode's GraphQL endpoint rejects requests without a `Referer`.

Each platform is fetched independently via `Promise.allSettled`. If one fails
it logs and falls back to the snapshot in `src/lib/mock-data.ts`, so a dead
upstream degrades a single card rather than breaking the build.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/            routes, metadata, global styles
  components/
    common/       reusable primitives (GlowCard, Heatmap, Reveal, …)
    layout/       background, nav, command palette, preloader
    sections/     page sections
  data/resume.ts  résumé content
  lib/
    live-stats.ts fetchers + fallbacks for the three platforms
    mock-data.ts  static snapshots and curated data
```
