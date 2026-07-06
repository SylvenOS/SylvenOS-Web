export interface GitHubMember {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface GitHubOrgData {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
  is_verified: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  updated_at: string;
  type: string;
  total_private_repos: number;
  owned_private_repos: number;
  plan?: {
    name: string;
    space: number;
    private_repos: number;
    filled_seats: number;
    seats: number;
  };
  [key: string]: any;
}

export interface GitHubStatsPayload {
  contributors: number;
  repos: number;
  membersData: GitHubMember[];
  orgData: GitHubOrgData;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number; // Rendered straight from the live GitHub sync
  type: string;
  [key: string]: any;
}

export interface TopContributorsProps {
  contributors: GitHubContributor[];
  limit?: number;
}