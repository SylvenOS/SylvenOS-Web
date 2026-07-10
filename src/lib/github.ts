import { Octokit } from "@octokit/rest";
// Initialize Octokit agent. It safely manages unauthenticated fallbacks if undefined.
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN || undefined,
  });

export async function getGithubStats() {
  const orgName = "SylvenOS";

  if (process.env.NODE_ENV === "development" && !process.env.GITHUB_TOKEN) {
    // Return mock data ONLY if we are in development mode
    // AND the user hasn't provided their own token.
    return {
      contributors: 13,
      repos: 6,
      orgData: {
        login: orgName,
        public_repos: 6,
        followers: 16,
        location: "India",
      },
      membersData: [
        {
          login: "Abhishek3285",
          id: 168811316,
          avatar_url: "https://avatars.githubusercontent.com/u/168811316?v=4",
          html_url: "https://github.com/Abhishek3285",
          name: "Abhishek Kumar",
        }
      ]
    };
  }

  

  // Global pass-through configurations to leverage Next.js native fetch caching layers
  const cacheConfig = {
    request: {
      next: { revalidate: 3600 },
    },
  };

  try {
    // Optimization 1: Parallelize the parent organization data and baseline member list requests
    const [orgResponse, membersResponse] = await Promise.all([
      octokit.orgs.get({ org: orgName, ...cacheConfig }),
      octokit.orgs.listMembers({ org: orgName, per_page: 100, ...cacheConfig }),
    ]);

    const orgData = orgResponse.data;
    const baselineMembers = membersResponse.data;

    // Optimization 2: Concurrent profile resolution array iteration mapping
    const enrichedMembers = await Promise.all(
      baselineMembers.map(async (member) => {
        try {
          const userResponse = await octokit.users.getByUsername({
            username: member.login,
            ...cacheConfig,
          });
          
          return {
            id: member.id,
            login: member.login,
            avatar_url: member.avatar_url,
            html_url: member.html_url,
            name: userResponse.data.name || null, // Resolves official user display name safely
          };
        } catch (err) {
          console.warn(`Could not resolve individual profile metadata for ${member.login}:`, err);
          return {
            id: member.id,
            login: member.login,
            avatar_url: member.avatar_url,
            html_url: member.html_url,
            name: null,
          };
        }
      })
    );

    return {
      repos: orgData.public_repos || 0,
      contributors: enrichedMembers.length,
      orgData,
      membersData: enrichedMembers,
    };
  } catch (error) {
    console.error("Critical failure during Octokit collection handling:", error);
    return { 
      contributors: 0, 
      membersData: [], 
      orgData: { login: orgName, public_repos: 0, followers: 0, location: "Global" }, 
      repos: 0 
    };
  }
}

export async function getEcosystemStats(orgName: string) {
  try {
    // 1. Fetch all public repositories for your organization
    const { data: repos } = await octokit.rest.repos.listForOrg({
      org: orgName,
      type: "public",
      per_page: 100,
    });

    const repoCount = repos.length;
    const uniqueContributors = new Set<string>();

    // 2. Concurrently fetch contributors for every repository
    await Promise.all(
      repos.map(async (repo) => {
        try {
          const { data: contributors } = await octokit.rest.repos.listContributors({
            owner: orgName,
            repo: repo.name,
            per_page: 100,
          });

          for (const contributor of contributors) {
            // Filter out anonymous/bot accounts if necessary
            if (contributor.login && contributor.type === "User") {
              uniqueContributors.add(contributor.login);
            }
          }
        } catch (error) {
          // Soft fail for empty repositories (which throw a 204/404 if there are no commits yet)
          console.warn(`Could not fetch contributors for ${repo.name}:`, error);
        }
      })
    );

    return {
      repositories: repoCount,
      contributors: uniqueContributors.size,
      // You can map GitHub "Projects" or treat your main initiatives as the Project count
      projects: repoCount > 0 ? 1 : 0, 
    };
  } catch (error) {
    console.error("Failed to aggregate GitHub telemetry:", error);
    // Return graceful fallback data so the UI doesn't crash
    return { repositories: 1, contributors: 0, projects: 1 };
  }
}