import Cover from "@/components/Cover";
import Summary from "@/components/Summary";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import OtherProjects from "@/components/OtherProjects";
import OtherAchievements from "@/components/OtherAchievements";
import Contact from "@/components/Contact";
import FloatingNav from "@/components/FloatingNav";
import {
  getAchievements,
  getOtherAchievements,
  getRoles,
  getSkills,
  getCaseStudies,
  getContact,
  getHero,
  getHeroStats,
  getSummary,
  getConfig,
  getOtherProjects,
} from "@/lib/notion";

export const revalidate = 3600;

export default async function Home() {
  const [achievements, roles, skillsData, productStudies, managementStudies, books, contactLinks, hero, heroStats, summaryData, config, otherAchievements, otherProjects] =
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
      getOtherAchievements(),
      getOtherProjects(),
    ]);

  const configEntries = config.status === "fulfilled" ? config.value : [];
  const showDeepDives = configEntries.find((c) => c.key === "deep_dives")?.visible ?? true;

  const otherProjectsData = otherProjects.status === "fulfilled" ? otherProjects.value : [];
  const otherAchievementsData = otherAchievements.status === "fulfilled" ? otherAchievements.value : [];

  // Calculate section numbers dynamically — skip sections that won't render
  let n = 1;
  const nums = {
    achievements: n++,
    experience: n++,
    otherProjects: otherProjectsData.length > 0 ? n++ : null,
    caseStudies: showDeepDives ? n++ : null,
    skills: n++,
    otherAchievements: otherAchievementsData.length > 0 ? n++ : null,
    education: n++,
  };

  return (
    <>
      <Cover
        hero={hero.status === "fulfilled" ? hero.value : []}
        heroStats={heroStats.status === "fulfilled" ? heroStats.value : []}
      />
      <Summary content={summaryData.status === "fulfilled" ? summaryData.value : []} />
      <Achievements
        achievements={achievements.status === "fulfilled" ? achievements.value : []}
        sectionNumber={nums.achievements}
      />
      <Experience
        roles={roles.status === "fulfilled" ? roles.value : []}
        sectionNumber={nums.experience}
      />
      <OtherProjects projects={otherProjectsData} sectionNumber={nums.otherProjects ?? 3} />
      <CaseStudies
        productCaseStudies={productStudies.status === "fulfilled" ? productStudies.value : []}
        managementCaseStudies={managementStudies.status === "fulfilled" ? managementStudies.value : []}
        books={books.status === "fulfilled" ? books.value : undefined}
        showDeepDives={showDeepDives}
        sectionNumber={nums.caseStudies ?? nums.skills - 1}
      />
      <Skills
        skills={skillsData.status === "fulfilled" ? skillsData.value.skills : []}
        competencies={skillsData.status === "fulfilled" ? skillsData.value.competencies : []}
        sectionNumber={nums.skills}
      />
      <OtherAchievements items={otherAchievementsData} sectionNumber={nums.otherAchievements ?? nums.skills + 1} />
      <Education sectionNumber={nums.education} />
      <Contact
        contactLinks={contactLinks.status === "fulfilled" ? contactLinks.value : []}
      />
      <FloatingNav />
    </>
  );
}
