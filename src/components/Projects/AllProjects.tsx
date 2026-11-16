"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ProjectData } from "@/lib/type";


import { avatarSrc } from "@/lib/avatar";
interface ProjectExplorerProps {
  projects: ProjectData[];
}

export default function ProjectExplorer({ projects = [] }: ProjectExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("recently-updated");

  const statuses = ["All", "Active", "Planning", "Completed", "Archived"];
  const technologies = ["All", "React", "Next.js", "Node", "Go", "Python", "Rust"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredAndSortedProjects = useMemo(() => {
    let output = [...projects];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      output = output.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.techStack.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedStatus !== "All") {
      output = output.filter((p) => p.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    if (selectedTech !== "All") {
      output = output.filter((p) =>
        p.techStack.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
      );
    }

    if (selectedDifficulty !== "All") {
      output = output.filter((p) => p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    output.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "most-contributors":
          return b.contributorsCount - a.contributorsCount;
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "recently-updated":
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return output;
  }, [projects, searchQuery, selectedStatus, selectedTech, selectedDifficulty, sortBy]);

  return (
    <section id="projects" className="relative px-6 md:px-[max(8%,calc((100%-80rem)/2))] py-16 md:py-28  overflow-hidden text-[var(--text)]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Segment */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow mb-4">
            MESH_EXPLORER_V5
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-4">
            Ecosystem Registry
          </h2>
          <p className="text-sm md:text-base text-[var(--subtitle)] leading-relaxed">
            Query, scope, and route directly into individual project parameters via repo links or specification files.
          </p>
        </div>

        {/* Filter Controls Panel */}
        <div className="p-6 rounded-[var(--radius-md)] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)] mb-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="relative md:col-span-8">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--card-border)] text-sm font-sans focus:outline-none focus:border-[var(--primary)] text-[var(--text)] placeholder-[var(--disabled)] transition-all"
              />
              <svg aria-hidden="true" focusable="false" className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--disabled)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--card-border)] text-sm font-mono focus:outline-none focus:border-[var(--primary)] text-[var(--text)] transition-all appearance-none cursor-pointer"
              >
                <option value="recently-updated">RECENTLY UPDATED</option>
                <option value="newest">NEWEST ARCHITECTURES</option>
                <option value="most-contributors">MOST CONTRIBUTORS</option>
                <option value="alphabetical">ALPHABETICAL (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-[var(--card-border)] text-left">
            <div>
              <span className="block font-mono text-xs text-[var(--disabled)] uppercase mb-2 tracking-wider">Status Framework</span>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
              aria-pressed={selectedStatus === status}
                    className={`px-3 py-2 min-h-10 rounded text-xs font-mono font-medium border transition-all ${
                      selectedStatus === status
                        ? "bg-[var(--primary)] text-white border-transparent shadow-[var(--shadow-sm)]"
                        : "bg-[var(--bg)] text-[var(--subtitle)] border-[var(--card-border)] hover:border-[var(--border)]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-mono text-xs text-[var(--disabled)] uppercase mb-2 tracking-wider">Stack Scope</span>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
              aria-pressed={selectedTech === tech}
                    className={`px-3 py-2 min-h-10 rounded text-xs font-mono font-medium border transition-all ${
                      selectedTech === tech
                        ? "bg-[var(--primary)] text-white border-transparent shadow-[var(--shadow-sm)]"
                        : "bg-[var(--bg)] text-[var(--subtitle)] border-[var(--card-border)] hover:border-[var(--border)]"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-mono text-xs text-[var(--disabled)] uppercase mb-2 tracking-wider">Run-Level Difficulty</span>
              <div className="flex flex-wrap gap-1.5">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
              aria-pressed={selectedDifficulty === diff}
                    className={`px-3 py-2 min-h-10 rounded text-xs font-mono font-medium border transition-all ${
                      selectedDifficulty === diff
                        ? "bg-[var(--primary)] text-white border-transparent shadow-[var(--shadow-sm)]"
                        : "bg-[var(--bg)] text-[var(--subtitle)] border-[var(--card-border)] hover:border-[var(--border)]"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Card Grid */}
<m.div 
  layout 
  className={`grid gap-6 md:gap-8 items-stretch w-full ${
    filteredAndSortedProjects.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : filteredAndSortedProjects.length === 2
      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  }`}
>
  <AnimatePresence mode="popLayout">
    {filteredAndSortedProjects.map((project) => {
      const statusStyle =
        project.status === "Active"
          ? { chip: "bg-green-500/10 text-green-400 border-green-500/25", dot: "bg-green-400" }
          : project.status === "Planning"
            ? { chip: "bg-blue-500/10 text-blue-400 border-blue-500/25", dot: "bg-blue-400" }
            : project.status === "Completed"
              ? { chip: "bg-purple-500/10 text-purple-400 border-purple-500/25", dot: "bg-purple-400" }
              : { chip: "bg-neutral-500/10 text-neutral-400 border-neutral-500/25", dot: "bg-neutral-400" };

      return (
      <m.article
        layout
        key={project.name}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="surface-card p-6 backdrop-blur-md flex flex-col justify-between group overflow-hidden"
      >
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={avatarSrc(project.avatarUrl, 44)}
              alt={`${project.name} logo`}
              width={44} height={44} decoding="async" loading="lazy"
              className="w-11 h-11 shrink-0 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--card-border)] object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-[var(--heading)] tracking-tight truncate group-hover:text-[var(--accent)] transition-colors">
                {project.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-[11px] font-mono uppercase">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${statusStyle.chip}`}>
                  <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                  {project.status}
                </span>
                <span className="text-[var(--disabled)] truncate">{project.difficulty}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-[var(--subtitle)] leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="Tech stack">
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="text-[11px] font-mono text-[var(--muted)] px-2 py-0.5 rounded-full bg-[var(--glass)] border border-[var(--card-border)]"
              >
                {tech}
              </li>
            ))}
            {project.techStack.length > 4 && (
              <li className="text-[11px] font-mono text-[var(--disabled)] px-2 py-0.5">
                +{project.techStack.length - 4}
              </li>
            )}
          </ul>
        </div>

        <div className="w-full">
          <dl className="grid grid-cols-3 gap-2 border-t border-[var(--card-border)] pt-4 mb-4 font-mono text-xs">
            <div>
              <dt className="text-[var(--disabled)]">LANG</dt>
              <dd className="text-[var(--subtitle)] font-bold truncate">{project.language}</dd>
            </div>
            <div>
              <dt className="text-[var(--disabled)]">STARS</dt>
              <dd className="text-[var(--subtitle)] font-bold tabular">{project.stars}</dd>
            </div>
            <div>
              <dt className="text-[var(--disabled)]">CONTRIB</dt>
              <dd className="text-[var(--subtitle)] font-bold tabular">{project.contributorsCount}</dd>
            </div>
          </dl>

          {/* Actions: one clear primary, quiet secondaries */}
          <div className="flex flex-col gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live site for ${project.name} (opens in a new tab)`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] bg-[linear-gradient(135deg,var(--btn-primary-bg),var(--btn-primary-hover))] text-white ring-1 ring-inset ring-white/15 font-mono text-xs font-bold uppercase tracking-wider shadow-[var(--shadow-sm)] hover:brightness-110 transition-all"
              >
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-70 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-green-300" />
                </span>
                Live demo
                <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
              </a>
            )}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[var(--radius-sm)] border border-[var(--card-border)] bg-[var(--glass)] hover:bg-[var(--hover-bg)] hover:border-[var(--hover-border)] font-mono text-xs font-bold transition-colors"
              >
                <FaGithub aria-hidden="true" className="w-3.5 h-3.5" />
                Repo
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link
                href={`/projects/${project.slug}`}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[var(--radius-sm)] font-mono text-xs font-bold transition-all ${
                  project.liveUrl
                    ? "border border-[var(--card-border)] bg-[var(--glass)] hover:bg-[var(--hover-bg)] hover:border-[var(--hover-border)]"
                    : "bg-[linear-gradient(135deg,var(--btn-primary-bg),var(--btn-primary-hover))] text-white ring-1 ring-inset ring-white/15 hover:brightness-110"
                }`}
              >
                Details
                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </m.article>
      );
    })}
  </AnimatePresence>
</m.div>
        {filteredAndSortedProjects.length === 0 && (
          <div className="p-16 text-center rounded-[var(--radius-md)] border border-dashed border-[var(--border)] bg-[var(--glass)] font-mono text-xs text-[var(--disabled)] max-w-xl mx-auto mt-6">
            No projects match these filters. Try clearing one or two to see more.
          </div>
        )}

      </div>
    </section>
  );
}