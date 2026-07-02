export async function getGithubStats() {
   if (process.env.NODE_ENV === "development" && !process.env.GITHUB_TOKEN) {
    // Return mock data ONLY if we are in development mode
    // AND the user hasn't provided their own token.
    return { repos: 15, contributors: 42 };
  }
  
  const orgName = "SylvenOS";

  // Explicitly type the headers object to satisfy HeadersInit
  const headers: Record<string, string> = {};
 
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const orgRes = await fetch(`https://api.github.com/orgs/${orgName}`, {
      headers, // TypeScript is now perfectly happy with this
      next: { revalidate: 3600 },
    });
    const orgData = await orgRes.json();

    const membersRes = await fetch(
      `https://api.github.com/orgs/${orgName}/members?per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );
    const membersData = await membersRes.json();

    return {
      repos: orgData.public_repos || 0,
      contributors: Array.isArray(membersData) ? membersData.length : 0,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { repos: 0, contributors: 0 };
  }
}
