import Cover from "@/components/Cover";
import Summary from "@/components/Summary";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import FloatingNav from "@/components/FloatingNav";
import {
  getAchievements,
  getRoles,
  getSkills,
  getCaseStudies,
  getContact,
  getHero,
  getHeroStats,
  getSummary,
  getConfig,
} from "@/lib/notion";

export const revalidate = 3600;

export default async function Home() {
  const [achievements, roles, skillsData, productStudies, managementStudies, books, contactLinks, hero, heroStats, summaryData, config] =
    await Promise.allSettled([
      getAchievements(),
      getRoles(),
      getSkills(),
      getCaseStudies("Product"),
      getCaseStudies("Management"),
      getCaseStudies(),
      getContact(),
      getHero(),
      getHeroStats(),
      getSummary(),
      getConfig(),
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
