"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProjectRepositoryData } from "@/lib/github";

interface ProjectExplorerProps {
  projects: ProjectRepositoryData[];
}

interface CustomSpecData {
  overview: string;
  goals: string[];
  features: string[];
  architecture: { layer: string; description: string }[];
  contributionGuide: string;
}

export default function ProjectExplorer({ projects = [] }: ProjectExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("recently-updated");

  // State to track the currently expanded project preview
  const [activeProject, setActiveProject] = useState<ProjectRepositoryData | null>(null);
  
  // New States for managing on-demand telemetry fetch
  const [loadedSpecs, setLoadedSpecs] = useState<CustomSpecData | null>(null);
  const [isLoadingSpec, setIsLoadingSpec] = useState(false);

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

  // Handle opening the drawer and fetching data on-demand
  const handleOpenSpecs = async (project: ProjectRepositoryData) => {
    setActiveProject(project);
    setIsLoadingSpec(true);
    setLoadedSpecs(null); // Clear previous drawer context instantly

    try {
      const res = await fetch(`/api/projects/${project.name}/spec`);
      const data = await res.json();
      setLoadedSpecs(data.spec);
    } catch (err) {
      console.error("Failed executing dynamic runtime specification fetch:", err);
    } finally {
      setIsLoadingSpec(false);
    }
  };

  return (
    <section className="relative px-6 md:px-[8%] py-[100px] bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Segment */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[var(--primary)] uppercase px-3 py-1 bg-[var(--glass)] border border-[var(--card-border)] rounded-full inline-block mb-4">
            // MESH_EXPLORER_V5
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--heading)] mb-4">
            Ecosystem Registry
          </h2>
          <p className="text-sm md:text-base text-[var(--subtitle)] font-light leading-relaxed">
            Query, scope, and route directly into individual project parameters. Click any card to open system specs.
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
              <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--disabled)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--card-border)] text-sm font-mono focus:outline-none focus:border-[var(--primary)] text-[var(--text)] transition-all appearance-none cursor-pointer"
              >
                <option value="recently-updated">SORT // RECENTLY UPDATED</option>
                <option value="newest">SORT // NEWEST ARCHITECTURES</option>
                <option value="most-contributors">SORT // MOST CONTRIBUTORS</option>
                <option value="alphabetical">SORT // ALPHABETICAL (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-[var(--card-border)] text-left">
            <div>
              <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase mb-2 tracking-wider">// Status Framework</label>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-medium border transition-all ${
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
              <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase mb-2 tracking-wider">// Stack Scope</label>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-medium border transition-all ${
                      selectedTech === tech
                        ? "bg-[var(--info)] text-white border-transparent shadow-[var(--shadow-sm)]"
                        : "bg-[var(--bg)] text-[var(--subtitle)] border-[var(--card-border)] hover:border-[var(--border)]"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase mb-2 tracking-wider">// Run-Level Difficulty</label>
              <div className="flex flex-wrap gap-1.5">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-medium border transition-all ${
                      selectedDifficulty === diff
                        ? "bg-[var(--logo)] text-white border-transparent shadow-[var(--shadow-sm)]"
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProjects.map((project) => (
              <motion.div
                layout
                key={project.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -5, borderColor: "var(--primary)", boxShadow: "var(--shadow-md)" }}
                onClick={() => handleOpenSpecs(project)} // Trigger on-demand data fetch
                className="p-6 rounded-[var(--radius-md)] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md flex flex-col justify-between items-center text-center group cursor-pointer transition-all duration-[var(--transition-fast)]"
              >
                <div className="w-full flex flex-col items-center">
                  <div className="flex flex-col items-center gap-3 mb-5 w-full">
                    <img
                      src={project.avatarUrl}
                      alt={`${project.name} logo`}
                      className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--card-border)] object-cover shadow-[var(--shadow-sm)]"
                    />
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm border ${
                        project.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        project.status === "Planning" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                        project.status === "Completed" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                        "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-[9px] font-mono text-[var(--disabled)] uppercase bg-[var(--glass)] border border-[var(--card-border)] px-2 py-0.5 rounded-sm">
                        {project.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-[var(--heading)] mb-2 tracking-tight group-hover:text-[var(--primary)] transition-colors w-full truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[var(--subtitle)] font-light leading-relaxed mb-5 line-clamp-2 max-w-xs mx-auto">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1 mb-5 w-full">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-[var(--muted)] px-2 py-0.5 rounded bg-[var(--glass)] border border-[var(--card-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[9px] font-mono text-[var(--disabled)] px-2 py-0.5 rounded bg-[var(--glass)]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <div className="grid grid-cols-3 gap-2 border-t border-[var(--card-border)] pt-4 mb-4 font-mono text-[10px] text-center">
                    <div>
                      <span className="text-[var(--disabled)] block">LANG //</span>
                      <span className="text-[var(--subtitle)] font-bold truncate block">{project.language}</span>
                    </div>
                    <div>
                      <span className="text-[var(--disabled)] block">STARS //</span>
                      <span className="text-[var(--subtitle)] font-bold">{project.stars}</span>
                    </div>
                    <div>
                      <span className="text-[var(--disabled)] block">CONTRB //</span>
                      <span className="text-[var(--subtitle)] font-bold">{project.contributorsCount}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[var(--primary)] tracking-wider block text-center uppercase group-hover:translate-x-1 transition-transform">
                    View System Specs ➔
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAndSortedProjects.length === 0 && (
          <div className="p-16 text-center rounded-[var(--radius-md)] border border-dashed border-[var(--border)] bg-[var(--glass)] font-mono text-xs text-[var(--disabled)] max-w-xl mx-auto mt-6">
            No active repository records found matching the current configuration matrices.
          </div>
        )}

      </div>

      {/* --- Rich Telemetry Drawer Preview Layer --- */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-over Container panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full md:w-[600px] bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-2xl z-50 overflow-y-auto flex flex-col text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-[var(--card-border)] sticky top-0 bg-[var(--card-bg)] backdrop-blur-md z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeProject.avatarUrl}
                    alt={activeProject.name}
                    className="w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--card-border)]"
                  />
                  <div>
                    <h3 className="text-xl font-black text-[var(--heading)] tracking-tight">{activeProject.name}</h3>
                    <div className="flex gap-1.5 mt-1">
                      <span className="text-[8px] font-mono bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded uppercase">
                        {activeProject.status}
                      </span>
                      <span className="text-[8px] font-mono bg-neutral-500/10 text-neutral-400 border border-neutral-500/20 px-1.5 py-0.5 rounded uppercase">
                        {activeProject.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-full hover:bg-[var(--glass)] border border-transparent hover:border-[var(--card-border)] text-[var(--subtitle)] hover:text-white transition-all font-mono text-sm"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Detail Content */}
              <div className="p-6 md:p-8 space-y-8 flex-1">
                
                {/* 1. Overview */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-2">// 01 // Overview</label>
                  {isLoadingSpec ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-full"></div>
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-5/6"></div>
                    </div>
                  ) : (
                    <p className="text-sm font-light leading-relaxed text-[var(--subtitle)]">
                      {loadedSpecs?.overview}
                    </p>
                  )}
                </section>

                {/* 2. Goals */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-3">// 02 // Core Goals</label>
                  {isLoadingSpec ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-2/3"></div>
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-3/4"></div>
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-1/2"></div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {loadedSpecs?.goals.map((goal, idx) => (
                        <li key={idx} className="text-xs font-light text-[var(--text)] flex items-start gap-2">
                          <span className="text-[var(--primary)] font-mono font-bold mt-0.5">✓</span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {/* 3. Features */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-3">// 03 // Key Features</label>
                  {isLoadingSpec ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-3/4"></div>
                      <div className="h-3 bg-[var(--bg)] border border-[var(--card-border)] rounded w-5/6"></div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {loadedSpecs?.features.map((feature, idx) => (
                        <li key={idx} className="text-xs font-light text-[var(--text)] flex items-start gap-2">
                          <span className="text-[var(--info)] font-mono font-bold mt-0.5">➔</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {/* 4. Architecture Layering */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-3">// 04 // Architecture Protocol</label>
                  {isLoadingSpec ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-14 bg-[var(--bg)] border border-[var(--card-border)] rounded w-full"></div>
                      <div className="h-14 bg-[var(--bg)] border border-[var(--card-border)] rounded w-full"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {loadedSpecs?.architecture.map((arch, idx) => (
                        <div key={idx} className="p-3 bg-[var(--bg)] rounded border border-[var(--card-border)] flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-[var(--primary)] font-bold">{arch.layer}</span>
                          <p className="text-xs font-light text-[var(--subtitle)]">{arch.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* 5. Progress Tracker (Instant - uses data from initial server array) */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-2">// 05 // Current Progress</label>
                  <div className="p-4 bg-[var(--glass)] border border-[var(--card-border)] rounded">
                    <div className="flex justify-between font-mono text-[10px] mb-2">
                      <span className="text-[var(--text)] font-bold">{activeProject.currentProgress.phase}</span>
                      <span className="text-[var(--primary)]">{activeProject.currentProgress.percentage}% Complete</span>
                    </div>
                    <div className="w-full bg-[var(--bg)] h-2 rounded overflow-hidden border border-[var(--card-border)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeProject.currentProgress.percentage}%` }}
                        className="bg-[var(--primary)] h-full"
                      />
                    </div>
                  </div>
                </section>

                {/* 6. Open Issues & Telemetry Metrics (Instant) */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-3">// 06 // Open Issues</label>
                  <div className="flex items-center justify-between p-4 bg-[var(--bg)] rounded border border-[var(--card-border)] font-mono text-xs">
                    <span className="text-[var(--subtitle)]">Active Repository Tickets:</span>
                    <a
                      href={`${activeProject.repoUrl}/issues`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 font-bold hover:underline"
                    >
                      {activeProject.openIssuesCount} Open Issues ➔
                    </a>
                  </div>
                </section>

                {/* 7. Contribution Guide */}
                <section>
                  <label className="block font-mono text-[10px] text-[var(--disabled)] uppercase tracking-wider mb-2">// 07 // Contribution Protocol</label>
                  {isLoadingSpec ? (
                    <div className="h-16 bg-[var(--bg)] border border-[var(--card-border)] rounded w-full animate-pulse"></div>
                  ) : (
                    <p className="text-xs font-light leading-relaxed text-[var(--subtitle)] bg-[var(--bg)] p-4 border border-[var(--card-border)] rounded-sm whitespace-pre-line">
                      {loadedSpecs?.contributionGuide}
                    </p>
                  )}
                </section>

                {/* Direct Page Anchor Link CTA */}
                <div className="pt-4 border-t border-[var(--card-border)] text-center">
                  <Link
                    href={`/projects/${activeProject.slug}`}
                    className="w-full block py-4 text-center font-mono text-sm font-black rounded bg-[var(--primary)] hover:bg-opacity-95 text-white transition-all uppercase tracking-wide mb-4 shadow-[var(--shadow-md)] hover:-translate-y-0.5"
                  >
                    Open Full Screen Specs (/projects/{activeProject.slug})
                  </Link>
                </div>

                {/* 8. Repository & 9. Documentation Quick Routing buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 text-center font-mono text-xs font-bold rounded border border-[var(--card-border)] hover:bg-[var(--glass)] hover:text-white transition-all uppercase"
                  >
                    // Code Repository
                  </a>
                  <a
                    href={activeProject.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 text-center font-mono text-xs font-bold rounded border border-[var(--card-border)] hover:bg-[var(--glass)] hover:text-white transition-all uppercase"
                  >
                    // Documentation
                  </a>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}