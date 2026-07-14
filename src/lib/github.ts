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

export interface FeaturedProjectData {
  name: string;
  description: string;
  avatarUrl: string;
  status: "Active" | "Beta" | "Archived";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  techStack: string[];
  lastUpdated: string;
  openIssues: number;
  repoUrl: string;
  docsUrl: string;
}

export async function getFeaturedProjects(orgName: string): Promise<FeaturedProjectData[]> {
  try {
    // Fetch all repositories sorted by recent updates
    const { data: repos } = await octokit.rest.repos.listForOrg({
      org: orgName,
      type: "public",
      sort: "updated",
      per_page: 20,
    });

    // Filter to only display repositories tagged with the 'featured' topic
    const featuredRepos = repos.filter(repo => repo.topics?.includes("featured")).slice(0, 6);

    return featuredRepos.map((repo) => {
      const topics = repo.topics || [];

      // Parse status out of GitHub topics (e.g., status-active -> Active)
      const statusTopic = topics.find(t => t.startsWith("status-"));
      const status = statusTopic 
        ? (statusTopic.split("-")[1].charAt(0).toUpperCase() + statusTopic.split("-")[1].slice(1)) as any
        : "Active";

      // Parse difficulty out of GitHub topics (e.g., difficulty-intermediate -> Intermediate)
      const diffTopic = topics.find(t => t.startsWith("difficulty-"));
      const difficulty = diffTopic
        ? (diffTopic.split("-")[1].charAt(0).toUpperCase() + diffTopic.split("-")[1].slice(1)) as any
        : "Intermediate";

      // Filter out meta topics to leave pure technical stacks
      const techStack = topics.filter(t => !t.includes("featured") && !t.startsWith("status-") && !t.startsWith("difficulty-"));

      // Format timestamp into clean, friendly text format
      const lastUpdated = new Date(repo.updated_at || "").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      return {
        name: repo.name,
        description: repo.description || "No project description provided yet.",
        avatarUrl: repo.owner.avatar_url,
        status,
        difficulty,
        techStack: techStack.length > 0 ? techStack : ["TypeScript"],
        lastUpdated,
        openIssues: repo.open_issues_count || 0,
        repoUrl: repo.html_url,
        docsUrl: repo.homepage || `${repo.html_url}/wiki`, // Fallback to GitHub Wiki if homepage isn't set
      };
    });
  } catch (error) {
    console.error("Failed to query GitHub repository structures:", error);
    return [];
  }
}

export interface ProjectRepositoryData {
  name: string;
  description: string;
  avatarUrl: string;
  status: "Active" | "Planning" | "Completed" | "Archived";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  techStack: string[];
  language: string;
  stars: number;
  contributorsCount: number;
  license: string;
  createdAt: string;
  updatedAt: string;
  repoUrl: string;
  docsUrl: string;
}

export async function getAllProjects(orgName: string): Promise<ProjectRepositoryData[]> {
  try {
    // 1. Fetch all public repositories from the target GitHub organization
    const { data: repos } = await octokit.rest.repos.listForOrg({
      org: orgName,
      type: "public",
      per_page: 100,
    });

    // 2. Filter: Only retain repositories containing explicit ecosystem management tags
    const taggedRepos = repos.filter((repo) => {
      return repo.topics?.some(
        (topic) =>
          topic.startsWith("status-") ||
          topic.startsWith("difficulty-") ||
          topic === "featured"
      );
    });

    // 3. Map and resolve telemetry payloads concurrently ONLY for tagged repos
    const projectPromises = taggedRepos.map(async (repo) => {
      let contributorsCount = 0;

      try {
        // Fetch contributors to determine active mesh nodes count
        const { data: contributors } = await octokit.rest.repos.listContributors({
          owner: orgName,
          repo: repo.name,
          per_page: 100,
          anon: "false", // Exclude anonymous git commits for statistical integrity
        });
        
        contributorsCount = contributors.filter(c => c.type === "User").length;
      } catch (err) {
        // Empty repositories throw a 204/404 contributor error. Fall back to 0 gracefully.
        console.warn(`Telemetry warning: Skipping contributor index for ${repo.name}`);
      }

      const topics = repo.topics || [];

      // Parse framework running status (e.g. topic: "status-planning" -> Planning)
      const statusTopic = topics.find((t) => t.startsWith("status-"));
      let status: ProjectRepositoryData["status"] = "Active"; 
      if (statusTopic) {
        const structuralStatus = statusTopic.split("-")[1];
        const formattedStatus = structuralStatus.charAt(0).toUpperCase() + structuralStatus.slice(1);
        if (["Active", "Planning", "Completed", "Archived"].includes(formattedStatus)) {
          status = formattedStatus as ProjectRepositoryData["status"];
        }
      }

      // Parse runtime onboarding difficulty (e.g. topic: "difficulty-beginner" -> Beginner)
      const difficultyTopic = topics.find((t) => t.startsWith("difficulty-"));
      let difficulty: ProjectRepositoryData["difficulty"] = "Intermediate"; 
      if (difficultyTopic) {
        const structuralDiff = difficultyTopic.split("-")[1];
        const formattedDiff = structuralDiff.charAt(0).toUpperCase() + structuralDiff.slice(1);
        if (["Beginner", "Intermediate", "Advanced"].includes(formattedDiff)) {
          difficulty = formattedDiff as ProjectRepositoryData["difficulty"];
        }
      }

      // Clean tech stack names by stripping out control configuration metadata topics
      const techStack = topics
        .filter((t) => !t.startsWith("status-") && !t.startsWith("difficulty-") && t !== "featured")
        .map((t) => {
          if (t === "nextjs") return "Next.js";
          if (t === "nodejs") return "Node";
          if (t === "react") return "React";
          return t.charAt(0).toUpperCase() + t.slice(1);
        });

      return {
        name: repo.name,
        description: repo.description || "System framework utility layer under development.",
        avatarUrl: repo.owner.avatar_url,
        status,
        difficulty,
        techStack: techStack.length > 0 ? techStack : [repo.language || "TypeScript"],
        language: repo.language || "Markdown",
        stars: repo.stargazers_count || 0,
        contributorsCount,
        license: repo.license?.spdx_id || "MIT",
        createdAt: repo.created_at || new Date().toISOString(),
        updatedAt: repo.updated_at || new Date().toISOString(),
        repoUrl: repo.html_url,
        docsUrl: repo.homepage || `${repo.html_url}/wiki`, 
      };
    });

    return await Promise.all(projectPromises);
  } catch (error) {
    console.error("Critical Failure: Unable to fetch repository mesh arrays from GitHub:", error);
    return []; 
  }
}