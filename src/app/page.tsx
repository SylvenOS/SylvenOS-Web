import Navbar from '@/components/Navbar';
import Hero from '@/components/Homepage/Hero';
import Features from '@/components/Homepage/Features';
import Footer from '@/components/Footer';
import MissionVision from '@/components/Homepage/Mission';
import WhySylvenOS from '@/components/Homepage/Why';
import HowItWorks from '@/components/Homepage/HowItWorks';
import FeaturedProjects from '@/components/Homepage/FeaturedProjects';
import ContributionAreas from '@/components/Homepage/ContributionArea';
import CommunityValues from '@/components/Homepage/Values';
import EcosystemRoadmap from '@/components/Homepage/Roadmap';
import FinalCTA from '@/components/Homepage/CTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MissionVision/>
        <WhySylvenOS/>
        <HowItWorks/>
        <FeaturedProjects/>
        <ContributionAreas/>
        <CommunityValues/>
        <EcosystemRoadmap/>
        <FinalCTA/>
      </main>
      <Footer />
    </>
  );
}