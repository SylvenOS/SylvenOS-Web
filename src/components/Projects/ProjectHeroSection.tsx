"use client";

import { m, Variants } from "motion/react";
import Link from "next/link";

export default function HeroSection() {
  // Stagger configurations for standard typography entry
  const textContainerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const textItemVariants:Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 16 },
    },
  };

  // Repository graph nodes
  // Zigzag layout on a 540x405 canvas: two columns, staggered vertically so the
  // four cards never overlap. Positions are percentages so they scale with the canvas.
  const repositories = [
    {
      id: "core",
      name: "SylvenOS-Web/main",
      status: "live",
      lang: "TypeScript, Next.js",
      langColor: "bg-amber-500",
      position: "top-[7%] left-[5%]",
      delay: 0.1,
    },
    {
      id: "ui",
      name: "SylvenOS/G-Secure",
      status: "PLANNED",
      lang: "Kotlin",
      langColor: "bg-blue-500",
      position: "top-[24%] right-[5%]",
      delay: 0.3,
    },
    {
      id: "studio",
      name: "SylvenOS/Github-Studio",
      status: "live",
      lang: "TypeScript",
      langColor: "bg-sky-400",
      position: "bottom-[24%] left-[5%]",
      delay: 0.5,
    },
    {
      id: "cli",
      name: "SylvenOS/Themify",
      status: "PLANNED",
      lang: "TBD",
      langColor: "bg-cyan-400",
      position: "bottom-[7%] right-[5%]",
      delay: 0.7,
    },
  ];

  return (
    <section className="relative px-6 md:px-[max(8%,calc((100%-80rem)/2))] py-16 md:py-28  overflow-hidden text-[var(--text)]">
      
      {/* Pristine Ambient Glow Fields */}
      <div 
        className="absolute top-1/4 right-0 w-[600px] h-[500px] rounded-full filter blur-[140px] opacity-15 pointer-events-none transform translate-x-1/3"
        style={{ backgroundImage: "radial-gradient(circle, var(--primary) 0%, var(--logo) 70%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Messaging */}
          <m.div 
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <m.span
              variants={textItemVariants}
              className="self-start text-xs font-mono font-bold tracking-widest text-[var(--accent)] uppercase px-3 py-1 bg-[var(--glass)] border border-[var(--card-border)] rounded-full mb-6 shadow-[var(--shadow-sm)]"
            >
              Ecosystem Index
            </m.span>
            
            <m.h1
              variants={textItemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--heading)] leading-[1.1] mb-6"
            >
              Explore Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading)] via-[var(--primary)] to-[var(--logo)]">
                Projects
              </span>
            </m.h1>
            
            <m.p
              variants={textItemVariants}
              className="text-base sm:text-lg text-[var(--subtitle)] leading-relaxed max-w-xl mb-10"
            >
              Discover open-source software built by the Sylven OS community. From developer tools to production-ready applications, every project is designed to solve real problems while helping contributors grow.
            </m.p>
            
            <m.div 
              variants={textItemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
             <Link 
    href="#projects"
    className="inline-block px-8 py-4 rounded-[var(--radius-sm)] bg-[var(--primary)] hover:bg-[var(--hover-bg)] text-white font-bold text-sm tracking-wide shadow-[var(--shadow-md)] hover:shadow-[var(--glow-primary)] border border-transparent hover:border-[var(--primary)] transition-all duration-[var(--transition-fast)] text-center"
  >
    Browse Projects
  </Link>

  <Link 
    href="/contributors"
    className="inline-block px-8 py-4 rounded-[var(--radius-sm)] bg-[var(--glass)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--border)] text-[var(--heading)] font-bold text-sm tracking-wide transition-all duration-[var(--transition-fast)] text-center"
  >
    Start Contributing
  </Link>
            </m.div>
          </m.div>

          {/* Right Column: Clean, Structured High-Fidelity Repository Canvas */}
          <div className="lg:col-span-6 w-full flex items-center justify-center relative min-h-[420px] md:min-h-[480px]">
            
            {/* The Outer Graphical Canvas Window */}
            <m.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-[540px] aspect-[4/5] sm:aspect-[4/3] min-h-[320px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--gradient-surface)] shadow-[var(--shadow-lg)] backdrop-blur-md relative overflow-hidden p-6 group"
            >

              {/* Crisp SVG Geometric Connection Paths Overlay */}
              {/* Connectors are drawn in percent space (viewBox 0..100, stretched) so they stay
                  attached to the cards at every canvas aspect ratio. Endpoints sit just inside
                  each card; the lines render behind the cards so the overlap is invisible. */}
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Web -> G-Secure */}
                <path d="M 44 18 L 50 18 L 50 35 L 56 35" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                {/* Web -> Github-Studio */}
                <path d="M 25 28 L 25 56" fill="none" stroke="var(--info)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                {/* Github-Studio -> Themify */}
                <path d="M 44 65 L 50 65 L 50 82 L 56 82" fill="none" stroke="var(--logo)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* Data packets travelling along the connectors (HTML so they never stretch) */}
              <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
                <m.span
                  className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--logo)]"
                  animate={{ left: ["44%", "50%", "50%", "56%"], top: ["18%", "18%", "35%", "35%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <m.span
                  className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--info)]"
                  animate={{ left: ["25%", "25%"], top: ["28%", "56%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                />
                <m.span
                  className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--logo)]"
                  animate={{ left: ["44%", "50%", "50%", "56%"], top: ["65%", "65%", "82%", "82%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                />
              </div>

              {/* Perfectly Rendered Floating Component Cards Layer */}
              <div className="absolute inset-0 z-10 w-full h-full font-sans">
                {repositories.map((repo) => (
                  <m.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: repo.delay, duration: 0.5, type: "spring" }}
                    className={`absolute ${repo.position} w-[43%] max-w-[220px] p-3 sm:p-4 rounded-[var(--radius-sm)] border border-[var(--card-border)] bg-[var(--bg)] shadow-[var(--shadow-sm)] flex flex-col gap-2 transition-colors duration-[var(--transition-fast)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]`}
                  >
                    {/* Component Header Block */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[var(--disabled)]">
                        <svg aria-hidden="true" focusable="false" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                        </svg>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">{repo.status}</span>
                      </div>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          repo.status === "live"
                            ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                            : "bg-amber-400"
                        }`}
                      />
                    </div>

                    {/* Repository Identifier */}
                    <h4 className="text-xs font-bold text-[var(--heading)] tracking-tight truncate">
                      {repo.name}
                    </h4>

                    {/* Meta Language Tag Footprint */}
                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-[var(--card-border)] opacity-80">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span className={`w-2 h-2 shrink-0 rounded-full ${repo.langColor}`} />
                        <span className="truncate text-xs font-mono text-[var(--subtitle)]">{repo.lang}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-3 h-1.5 rounded-sm bg-[var(--card-border)]" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[var(--card-border)]" />
                      </div>
                    </div>
                  </m.div>
                ))}

                {/* Simulated Clean Figma-Style Live Collaborator Cursor */}
                <m.div 
                  initial={{ x: 200, y: 90 }}
                  animate={{ 
                    x: [200, 300, 160, 330, 200], 
                    y: [90, 150, 250, 330, 90] 
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute pointer-events-none flex flex-col gap-1 items-start"
                >
                  {/* Modern Precision Arrow Cursor Vector */}
                  <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0V13L4 9.5L8.5 14L10.5 12L6 7.5L11 6.5L0 0Z" fill="var(--primary)" />
                  </svg>
                  {/* Clean Operator Pill Name */}
                  <div className="bg-[var(--primary)] text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                    open_source
                  </div>
                </m.div>
              </div>
            </m.div>
            
          </div>

        </div>
      </div>
    </section>
  );
}