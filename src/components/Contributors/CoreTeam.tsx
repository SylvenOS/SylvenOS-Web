"use client";

import { GitHubMember } from "@/lib/type";
import { motion } from "framer-motion";


interface DynamicCoreTeamProps {
  members: GitHubMember[];
  orgDescription: string | null;
}

export default function DynamicCoreTeam({ members, orgDescription }: DynamicCoreTeamProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  // Safe baseline tech array mapping strategy for dynamic user profiles
  const fallbackTechStacks: Record<string, string[]> = {
    Abhishek3285: ["Go", "Kubernetes", "AWS", "GitHub Actions"],
    akshaykurve: ["Node.js", "System Design", "React", "Next.js", "SQL"],
  };

  return (
    <section className="relative px-6 md:px-[8%] py-[100px] bg-[var(--bg)] border-t border-[var(--card-border)] text-[var(--text)]">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[var(--info)] uppercase px-3 py-1 bg-[var(--glass)] border border-[var(--card-border)] rounded-full inline-block mb-4">
            // Active Cluster Identities
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--heading)] mb-4">
            Core Maintainers
          </h2>
          <p className="text-sm md:text-base text-[var(--subtitle)] font-light leading-relaxed">
            {orgDescription || "Verified operational nodes synced directly from the organization registry pipeline."}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center"
        >
          {members.map((member) => {
            const dynamicTech = fallbackTechStacks[member.login] || ["TypeScript", "Next.js", "Open Source"];
            const inferredRole =  "Core Maintainer";

            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover={{ y: -4, borderColor: "var(--info)", backgroundColor: "var(--gradient-surface)" }}
                className="p-6 md:p-8 rounded-[var(--radius-md)] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md flex flex-col justify-between transition-all duration-[var(--transition-fast)] group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={member.avatar_url} 
                      alt={`${member.login} GitHub verification portrait`} 
                      className="w-12 h-12 rounded-full border border-[var(--card-border)] bg-[var(--bg)] grayscale group-hover:grayscale-0 transition-all object-cover"
                    />
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-[var(--heading)] truncate">
                        {member.login}
                      </h3>
                      <p className="text-xs font-mono text-[var(--info)] tracking-wide font-semibold">
                        {inferredRole}
                      </p>
                    </div>
                  </div>

                  {/* <p className="text-xs md:text-sm text-[var(--subtitle)] font-light leading-relaxed mb-6">
                    Active developer node authenticated via standard OAuth secure access controls.
                  </p> */}

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {dynamicTech.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--glass)] border border-[var(--card-border)] text-[var(--muted)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--card-border)] pt-4 mt-auto">
                  <span className="text-[9px] font-mono text-[var(--disabled)] uppercase tracking-wider">
                    Node ID // {member.node_id}
                  </span>
                  <a 
                    href={member.html_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[var(--muted)] hover:text-[var(--heading)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}