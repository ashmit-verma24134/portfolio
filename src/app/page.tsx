import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteChrome } from "@/components/layout/SiteChrome";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { CompetitiveProgramming } from "@/components/sections/CompetitiveProgramming";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { getStats } from "@/lib/live-stats";

/**
 * Rebuild this page at most once a day. Codeforces / LeetCode / TUF are
 * fetched on the server during that rebuild, so visitors always get static
 * HTML with no client-side requests, and the numbers stay current.
 */
export const revalidate = 86400;

export default async function Home() {
  const stats = await getStats();

  return (
    <>
      <Preloader />
      <AnimatedBackground />
      <ScrollProgress />
      <SiteChrome />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CompetitiveProgramming stats={stats} />
        <GitHubSection />
        <Achievements />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
