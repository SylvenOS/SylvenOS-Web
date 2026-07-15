"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface Project {
  name: string;
  slug: string;
  techStack: string[];
  status: "Active" | "Planning" | "Completed" | "Archived";
}

interface DynamicTechStackProps {
  projects: Project[];
  // Optional local overrides for rapid prototyping
  localOverrides?: Record<string, string>;
}

// Fallback URL to a centralized open-source tech classification catalog
const REMOTE_TAXONOMY_URL = "https://raw.githubusercontent.com/akshaykurve/tech-taxonomy/main/taxonomy.json"; 

export default function DynamicTechStack({ projects, localOverrides = {} }: DynamicTechStackProps) {
  const [taxonomy, setTaxonomy] = useState<Record<string, string>>(localOverrides);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. Fetch Remote Taxonomy Rules on Mount
  useEffect(() => {
    async function loadTaxonomy() {
      try {
        const response = await fetch(REMOTE_TAXONOMY_URL);
        if (!response.ok) throw new Error("Network response failed");
        const remoteData = await response.json();
        
        // Merge remote rules with any local engineering overrides
        setTaxonomy({ ...remoteData, ...localOverrides });
      } catch (error) {
        console.warn("Taxonomy fetch failed, falling back to basic classification rules.", error);
        // Minimal core fallback to prevent breaking the layout if offline
        setTaxonomy({
          React: "Frontend", "Next.js": "Frontend", TypeScript: "Frontend",
          "Node.js": "Backend", GraphQL: "Backend", PostgreSQL: "Database",
          Docker: "DevOps", Vercel: "DevOps", Figma: "Design", Tailwind: "Design",
          ...localOverrides
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadTaxonomy();
  }, [localOverrides]);

  // 2. Dynamic Pipeline Aggregator
  const aggregatedStats = useMemo(() => {
    const counts: Record<string, number> = {};
    const categories: Record<string, string[]> = {
      Frontend: [],
      Backend: [],
      Database: [],
      DevOps: [],
      Design: [],
      "Uncategorized Engines": [], // Graceful fallback for brand new tools
    };

    projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        counts[tech] = (counts[tech] || 0) + 1;

        // Dynamic lookup against the state-driven taxonomy map
        const category = taxonomy[tech] || "Uncategorized Engines";
        
        // If a new category is introduced in the JSON file dynamically, initialize it
        if (!categories[category]) {
          categories[category] = [];
        }

        if (!categories[category].includes(tech)) {
          categories[category].push(tech);
        }
      });
    });

    // Sort blocks by active usage frequency
    Object.keys(categories).forEach((cat) => {
      categories[cat].sort((a, b) => counts[b] - counts[a]);
    });

    return { counts, categories };
  }, [projects, taxonomy]);

  // Extract categories that contain 1 or more technologies
  const activeCategories = useMemo(() => {
    return Object.keys(aggregatedStats.categories).filter(
      (cat) => aggregatedStats.categories[cat].length > 0
    );
  }, [aggregatedStats]);

  if (isLoading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center font-mono text-xs text-[var(--disabled)]">
        <div className="animate-spin rounded-full h-5 w-5 border border-[var(--primary)] border-t-transparent mb-4" />
        PANEL_INITIALIZATION // RUNNING_TAXONOMY_PARSER...
      </div>
    );
  }

  return (
    <section className="relative px-6 md:px-[8%] py-[100px]  text-[var(--text)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Component Header Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--card-border)] pb-8 mb-12 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-[var(--primary)] uppercase block mb-3">
              // DECOUPLED_TAXONOMY_ROUTING
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[var(--heading)] mb-3">
              System Architecture Matrix
            </h2>
            <p className="text-xs md:text-sm text-[var(--subtitle)] font-light leading-relaxed">
              Real-time core dependency distribution mapped via synchronized engine schemas.
            </p>
          </div>

          {/* Filtering Controller Matrix */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all border ${
                selectedCategory === "ALL"
                  ? "bg-[var(--primary)] text-white border-transparent font-black"
                  : "bg-[var(--glass)] text-[var(--disabled)] border-[var(--card-border)] hover:text-[var(--text)]"
              }`}
            >
              All Modules //
            </button>
            {activeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? "bg-[var(--primary)] text-white border-transparent font-black"
                    : "bg-[var(--glass)] text-[var(--disabled)] border-[var(--card-border)] hover:text-[var(--text)]"
                }`}
              >
                {cat.split(" ")[0]} //
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Matrix Viewports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {activeCategories
            .filter((cat) => selectedCategory === "ALL" || selectedCategory === cat)
            .map((category) => (
              <motion.div
                layout
                key={category}
                className="p-6 rounded-[var(--radius-md)] border border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col justify-between group transition-all duration-300 hover:border-[var(--border)]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3 mb-4">
                    <span className="font-mono text-[10px] font-black tracking-widest text-[var(--heading)] uppercase">
                      // {category}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--disabled)] uppercase bg-[var(--glass)] px-2 py-0.5 rounded border border-[var(--card-border)]">
                      {aggregatedStats.categories[category].length} Nodes
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {aggregatedStats.categories[category].map((tech) => {
                      const frequency = aggregatedStats.counts[tech];
                      return (
                        <div
                          key={tech}
                          className="flex items-center justify-between p-2.5 rounded border border-[var(--card-border)] bg-[var(--glass)] hover:bg-[var(--bg)] transition-colors duration-200 group/item"
                        >
                          <span className="text-xs text-[var(--subtitle)] group-hover/item:text-[var(--text)] font-medium transition-colors">
                            {tech}
                          </span>
                          <div className="flex items-center gap-2 font-mono text-[9px]">
                            <span className="text-[var(--primary)] font-black bg-[var(--primary)]/10 px-1.5 py-0.5 rounded border border-[var(--primary)]/20">
                              {frequency} {frequency === 1 ? "Repo" : "Repos"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--card-border)] font-mono text-[9px] text-[var(--disabled)] flex justify-between items-center">
                  <span>LAYER_STATUS //</span>
                  <span className="text-green-400 uppercase font-bold tracking-wider">● SCHEMA_SYNCED</span>
                </div>
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}