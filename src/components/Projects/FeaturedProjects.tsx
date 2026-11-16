"use client";

import { featuredProjects } from "@/lib/type";
import { m, Variants } from "motion/react";
import Link from "next/link";
import { BookOpen, CircleDot, Clock, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";



import { avatarSrc } from "@/lib/avatar";
const MotionLink = m.create(Link);
interface FeaturedProjectsProps {
  projects: featuredProjects[];
}

export default function FeaturedProjects({
  projects = [],
}: FeaturedProjectsProps) {
  const gridVariants:Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 75, damping: 15 },
    },
  };

  return (
    <section className="relative px-6 md:px-[max(8%,calc((100%-80rem)/2))] py-16 md:py-28  overflow-hidden text-[var(--text)]">
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[140px] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto  relative z-10">
        {/* Header Block - Refactored for Centered Text Alignments */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold tracking-widest text-[var(--accent)] uppercase px-3 py-1 bg-[var(--glass)] border border-[var(--card-border)] rounded-full inline-block mb-4"
          >
            Active Repositories
          </m.span>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-6"
          >
            Featured Projects
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-base md:text-lg text-[var(--subtitle)] leading-relaxed"
          >
            Explore core open-source components built by the community.
            Filtered, optimized, and mapped directly out of our active
            repository logs.
          </m.p>
        </div>

        {/* Dynamic Fallback if Empty */}
        {projects.length === 0 ? (
          <div className="p-12 text-center rounded-[var(--radius-md)] border border-dashed border-[var(--border)] bg-[var(--glass)] font-mono text-xs text-[var(--muted)]">
            Featured projects are being refreshed.{" "}
            <a
              href="https://github.com/orgs/SylvenOS/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent)] underline underline-offset-4"
            >
              Browse every repository on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </div>
        ) : (
          /* Structured Project Layout Grid */
          <m.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch "
            className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8"
          >
            {projects.map((project, idx) => {
              const statusStyle =
                project.status === "Active"
                  ? { chip: "bg-green-500/10 text-green-400 border-green-500/25", dot: "bg-green-400" }
                  : project.status === "Beta"
                    ? { chip: "bg-amber-500/10 text-amber-400 border-amber-500/25", dot: "bg-amber-400" }
                    : { chip: "bg-neutral-500/10 text-neutral-400 border-neutral-500/25", dot: "bg-neutral-400" };
              const visibleTech = project.techStack.slice(0, 4);
              const extraTech = project.techStack.length - visibleTech.length;

              return (
                <m.article
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="relative p-6 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] md:p-7 rounded-[var(--radius-md)] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md flex flex-col justify-between group overflow-hidden transition-[border-color,box-shadow] duration-[var(--transition-fast)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]"
                >
                  {/* Accent edge that lights up on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40 group-hover:opacity-100 transition-opacity"
                  />

                  <div>
                    {/* Header: logo + name + status on one aligned row */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={avatarSrc(project.avatarUrl, 44)}
                        alt={`${project.name} logo`}
                        width={44} height={44} decoding="async" loading="lazy"
                        className="w-11 h-11 shrink-0 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--card-border)] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-[var(--heading)] tracking-tight truncate group-hover:text-[var(--hover-text)] transition-colors">
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

                    {/* Tech stack: capped so cards keep the same rhythm */}
                    <ul className="flex flex-wrap gap-1.5 mb-6" aria-label="Tech stack">
                      {visibleTech.map((tech) => (
                        <li
                          key={tech}
                          className="text-[11px] font-mono text-[var(--muted)] px-2 py-0.5 rounded-full bg-[var(--glass)] border border-[var(--card-border)]"
                        >
                          {tech}
                        </li>
                      ))}
                      {extraTech > 0 && (
                        <li className="text-[11px] font-mono text-[var(--disabled)] px-2 py-0.5 rounded-full">
                          +{extraTech}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    {/* Compact meta strip */}
                    <div className="flex items-center justify-between gap-3 border-t border-[var(--card-border)] pt-4 mb-4 text-xs font-mono text-[var(--subtitle)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock aria-hidden="true" className="w-3.5 h-3.5 text-[var(--disabled)]" />
                        <span className="sr-only">Last updated </span>
                        {project.lastUpdated}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 ${project.openIssues > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}
                      >
                        <CircleDot aria-hidden="true" className="w-3.5 h-3.5" />
                        {project.openIssues} {project.openIssues === 1 ? "issue" : "issues"}
                      </span>
                    </div>

                    {/* Actions: one clear primary, two quiet secondaries */}
                    <div className="flex flex-col gap-2">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live site for ${project.name} (opens in a new tab)`}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] bg-[var(--primary)] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[var(--shadow-sm)] hover:brightness-110 transition-all"
                        >
                          <span className="relative flex w-2 h-2" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-70 animate-ping" />
                            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-300" />
                          </span>
                          Live demo
                          <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                        </a>
                      ) : null}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[var(--radius-sm)] font-mono text-xs font-bold transition-colors ${
                            project.liveUrl
                              ? "border border-[var(--card-border)] bg-[var(--glass)] hover:bg-[var(--surface)] hover:border-[var(--border)]"
                              : "bg-[var(--primary)] text-white hover:brightness-110"
                          }`}
                        >
                          <FaGithub aria-hidden="true" className="w-3.5 h-3.5" />
                          Repository
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <a
                          href={project.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[var(--radius-sm)] border border-[var(--card-border)] bg-[var(--glass)] hover:bg-[var(--surface)] hover:border-[var(--border)] font-mono text-xs font-bold transition-colors"
                        >
                          <BookOpen aria-hidden="true" className="w-3.5 h-3.5" />
                          Docs
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </m.article>
              );
            })}
          </m.div>
        )}
      </div>
      {/* Global Bottom Section CTA Action Button */}
      <div className="relative mt-4 md:mt-8 text-center">
        <MotionLink href="/projects" whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] bg-[var(--btn-primary-bg)] text-white font-semibold shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-colors duration-[var(--transition-fast)] text-[14px] md:text-base hover:bg-[var(--btn-primary-hover)]">
              View All Projects
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </MotionLink>
      </div>
    </section>
  );
}
