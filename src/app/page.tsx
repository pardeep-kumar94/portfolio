import Cover from "@/components/Cover";
import Summary from "@/components/Summary";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import FloatingNav from "@/components/FloatingNav";
import type { Achievement, Role, Skill, CaseStudy, ContactLink, HeroField, HeroStat, SummaryContent, ConfigEntry } from "@/lib/notion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const REVALIDATE = 3600;

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

export default async function Home() {
  const [achievements, roles, skillsData, productStudies, managementStudies, books, contactLinks, hero, heroStats, summaryData, config] =
    await Promise.allSettled([
      fetchJSON<Achievement[]>("/api/portfolio/achievements"),
      fetchJSON<Role[]>("/api/portfolio/roles"),
      fetchJSON<{ skills: Skill[]; competencies: string[] }>("/api/portfolio/skills"),
      fetchJSON<CaseStudy[]>("/api/portfolio/case-studies?type=Product"),
      fetchJSON<CaseStudy[]>("/api/portfolio/case-studies?type=Management"),
      fetchJSON<CaseStudy[]>("/api/portfolio/case-studies"),
      fetchJSON<ContactLink[]>("/api/portfolio/contact"),
      fetchJSON<HeroField[]>("/api/portfolio/hero"),
      fetchJSON<HeroStat[]>("/api/portfolio/hero-stats"),
      fetchJSON<SummaryContent[]>("/api/portfolio/summary"),
      fetchJSON<ConfigEntry[]>("/api/portfolio/config"),
    ]);

  const configEntries = config.status === "fulfilled" ? config.value : [];
  const showDeepDives = configEntries.find((c) => c.key === "deep_dives")?.visible ?? true;

  return (
    <>
      <Cover
        hero={hero.status === "fulfilled" ? hero.value : []}
        heroStats={heroStats.status === "fulfilled" ? heroStats.value : []}
      />
      <Summary content={summaryData.status === "fulfilled" ? summaryData.value : []} />
      <Achievements
        achievements={achievements.status === "fulfilled" ? achievements.value : []}
      />
      <Experience
        roles={roles.status === "fulfilled" ? roles.value : []}
      />
      <CaseStudies
        productCaseStudies={productStudies.status === "fulfilled" ? productStudies.value : []}
        managementCaseStudies={managementStudies.status === "fulfilled" ? managementStudies.value : []}
        books={books.status === "fulfilled" ? books.value : undefined}
        showDeepDives={showDeepDives}
      />
      <Skills
        skills={skillsData.status === "fulfilled" ? skillsData.value.skills : []}
        competencies={skillsData.status === "fulfilled" ? skillsData.value.competencies : []}
      />
      <Education />
      <Contact
        contactLinks={contactLinks.status === "fulfilled" ? contactLinks.value : []}
      />
      <FloatingNav />
    </>
  );
}
