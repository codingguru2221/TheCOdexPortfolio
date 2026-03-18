import { useEffect, useState } from "react";

export type PortfolioProject = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  liveDemo?: string;
  gradient: string;
  border: string;
  glow: string;
  icon: string;
  accentColor: string;
  updatedAt: string;
  stars: number;
  forks: number;
};

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const PROJECT_STYLES = [
  {
    gradient: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(59,130,246,0.1))",
    border: "rgba(0,245,255,0.3)",
    glow: "rgba(0,245,255,0.15)",
    icon: "01",
    accentColor: "#00f5ff",
  },
  {
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))",
    border: "rgba(168,85,247,0.3)",
    glow: "rgba(168,85,247,0.15)",
    icon: "02",
    accentColor: "#a855f7",
  },
  {
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,197,94,0.1))",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.15)",
    icon: "03",
    accentColor: "#3b82f6",
  },
  {
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.16), rgba(249,115,22,0.1))",
    border: "rgba(251,191,36,0.3)",
    glow: "rgba(249,115,22,0.18)",
    icon: "04",
    accentColor: "#f59e0b",
  },
];

function formatRepoName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildTechStack(repo: GithubRepo) {
  const values = [repo.language, ...(repo.topics ?? [])]
    .filter((value): value is string => Boolean(value))
    .slice(0, 5);

  return values.length > 0 ? values : ["GitHub", "Open Source"];
}

function mapRepoToProject(repo: GithubRepo, index: number): PortfolioProject {
  const style = PROJECT_STYLES[index % PROJECT_STYLES.length];

  return {
    id: repo.id,
    title: formatRepoName(repo.name),
    subtitle: repo.language ? `${repo.language} Repository` : "GitHub Repository",
    description:
      repo.description?.trim() ||
      "Freshly synced from GitHub. Add a proper repository description there and it will appear here automatically.",
    tech: buildTechStack(repo),
    github: repo.html_url,
    liveDemo: repo.homepage?.trim() || undefined,
    gradient: style.gradient,
    border: style.border,
    glow: style.glow,
    icon: style.icon,
    accentColor: style.accentColor,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
}

export function useGithubProjects(username = "codingguru2221") {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub sync failed with status ${response.status}`);
        }

        const repos = (await response.json()) as GithubRepo[];
        const mappedProjects = repos
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map(mapRepoToProject);

        setProjects(mappedProjects);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Unable to sync GitHub projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();

    return () => controller.abort();
  }, [username]);

  return { projects, loading, error };
}
