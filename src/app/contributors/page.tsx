import CommunityOverview from '@/components/Contributors/CommunityOverview'
import ContributionPhilosophy from '@/components/Contributors/ContributionPolicy';
import DynamicCoreTeam from '@/components/Contributors/CoreTeam';
import HeroSection from '@/components/Contributors/HeroSection'
import MainContributors from '@/components/Contributors/MainContributors';
import ContributorRoles from '@/components/Contributors/Roles';
import { getGithubStats } from '@/lib/github';


const Contribute = async() => {
    const stats = await getGithubStats();
    console.log(stats.membersData)
  return (
    <main>
        <HeroSection/>
        <CommunityOverview stats={stats} />
        <ContributionPhilosophy/>
        <ContributorRoles/>
        <DynamicCoreTeam members={stats.membersData} orgDescription={stats.orgData?.description} />
        <MainContributors githubPayload={stats.membersData}/>
    </main>
  )
}

export default Contribute