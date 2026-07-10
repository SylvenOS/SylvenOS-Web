import ProjectCategories from "@/components/Projects/Categories";
import HeroSection from "@/components/Projects/ProjectHeroSection";
import ProjectStatistics from "@/components/Projects/ProjectStatistics";
import { getEcosystemStats } from "@/lib/github";
import React from "react";

export default async function Page() {
  // Fetch live stats during build time / on revalidation intervals
  const stats = await getEcosystemStats("sylvenos");
  return (
    <main>
      <HeroSection />
      <ProjectStatistics 
        repoCount={stats.repositories} 
        contributorCount={stats.contributors}
        projectCount={stats.projects}
      />
      <ProjectCategories/>
    </main>
  );
};


