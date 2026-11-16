"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

interface LifecycleStage {
  id: string;
  phase: string;
  badgeText: string;
  colorTheme: {
    text: string;
    bg: string;
    border: string;
    glow: string;
  };
  description: string;
  telemetry: string;
  impact: string;
  apiSurface: string;
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: "idea",
    phase: "01 IDEA",
    badgeText: "Idea",
    colorTheme: {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      glow: "rgba(6, 182, 212, 0.18)",
    },
    description: "Conceptual architectures and preliminary research specs. Open for early architectural debates, RFCs, and foundational community feedback loops.",
    telemetry: "STABILITY // EXPERIMENTAL",
    impact: "CONTRB // ARCHITECTURE DEBATE",
    apiSurface: "MUTABLE_MOCK_DATA"
  },
  {
    id: "planning",
    phase: "02 PLANNING",
    badgeText: "Planning",
    colorTheme: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "rgba(59, 130, 246, 0.18)",
    },
    description: "Scope definition, internal API design mockups, and foundational milestone mapping. Core engineering cells are establishing structural patterns.",
    telemetry: "STABILITY // PRE-ALPHA",
    impact: "CONTRB // INTERFACE DESIGN",
    apiSurface: "SPEC_DRAFT_PENDING"
  },
  {
    id: "development",
    phase: "03 DEVELOPMENT",
    badgeText: "Development",
    colorTheme: {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      glow: "rgba(245, 158, 11, 0.18)",
    },
    description: "Active code generation, aggressive branch syncing, and test suite composition. High engine velocity with frequent breaking changes upstream.",
    telemetry: "STABILITY // UNSTABLE",
    impact: "CONTRB // CORE FEATURE BUILD",
    apiSurface: "FLUID_BREAKING"
  },
  {
    id: "beta",
    phase: "04 BETA",
    badgeText: "Beta",
    colorTheme: {
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      glow: "rgba(168, 85, 247, 0.18)",
    },
    description: "Feature-complete release candidates undergoing localized integration tests. Safe for developer sandboxes and early evaluation architectures.",
    telemetry: "STABILITY // TESTING RCs",
    impact: "CONTRB // EDGE CASE EDGE",
    apiSurface: "LOCKING_STABILIZED"
  },
  {
    id: "stable",
    phase: "05 STABLE",
    badgeText: "Stable",
    colorTheme: {
      text: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      glow: "rgba(34, 197, 94, 0.18)",
    },
    description: "Production-ready, battle-tested runtime environments. Strict semantic versioning rules apply. Backed by automated backward compatibility tests.",
    telemetry: "STABILITY // PRODUCTION SAFE",
    impact: "CONTRB // PLUGINS & EXTENSIONS",
    apiSurface: "IMMUTABLE_SEMVER"
  },
  {
    id: "maintenance",
    phase: "06 MAINTENANCE",
    badgeText: "Maintenance",
    colorTheme: {
      text: "text-zinc-400",
      bg: "bg-zinc-500/10",
      border: "border-zinc-500/20",
      glow: "rgba(113, 113, 122, 0.18)",
    },
    description: "Feature development frozen. The codebase remains highly optimal, receiving priority patches for dependencies and zero-day threat variables.",
    telemetry: "STABILITY // LEGACY SECURE",
    impact: "CONTRB // PATCH LIFECYCLE",
    apiSurface: "DEPRECATION_WARNINGS"
  },
  {
    id: "archived",
    phase: "07 ARCHIVED",
    badgeText: "Archived",
    colorTheme: {
      text: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      glow: "rgba(239, 68, 68, 0.18)",
    },
    description: "Read-only blueprint tracking. The codebase stands frozen as an educational artifact or historical asset. No issues or pull requests will process.",
    telemetry: "STABILITY // DEPRECATED",
    impact: "CONTRB // READ ONLY HUB",
    apiSurface: "TERMINATED_RETIRED"
  }
];

const TOTAL = LIFECYCLE_STAGES.length;
const CARD_MAX_WIDTH = 540;
const CARD_GAP = 32;

/** The content of one stage card, shared by the pinned and swipe layouts. */
function StageBody({ stage }: { stage: LifecycleStage }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-5">
        <div>
          <span className="font-mono text-xs text-[var(--disabled)] tracking-wider sm:tracking-widest block mb-1">
            {stage.phase}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading)] tracking-tight">
            {stage.badgeText}
          </h3>
        </div>
        <span
          className={`text-xs font-mono uppercase px-3 py-1 rounded border font-bold ${stage.colorTheme.text} ${stage.colorTheme.bg} ${stage.colorTheme.border}`}
        >
          {stage.badgeText}
        </span>
      </div>

      <p className="text-sm md:text-base text-[var(--subtitle)] leading-relaxed mb-6">
        {stage.description}
      </p>

      <dl className="grid grid-cols-1 gap-3 border-t border-[var(--card-border)] pt-4 font-mono text-xs">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
          <dt className="text-[var(--disabled)]">STABILITY</dt>
          <dd className="text-[var(--heading)] font-bold break-words">{stage.telemetry.split(" // ")[1]}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
          <dt className="text-[var(--disabled)]">CONTRIBUTION</dt>
          <dd className="text-[var(--heading)] font-bold break-words">{stage.impact.split(" // ")[1]}</dd>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
          <dt className="text-[var(--disabled)]">API SURFACE</dt>
          <dd className={`font-bold break-words ${stage.colorTheme.text}`}>{stage.apiSurface}</dd>
        </div>
      </dl>
    </>
  );
}

/** One card in the pinned track: scales up and brightens as it passes the centre. */
function PinnedCard({
  stage,
  index,
  progress,
  width,
  isActive,
}: {
  stage: LifecycleStage;
  index: number;
  progress: MotionValue<number>;
  width: number;
  isActive: boolean;
}) {
  const center = index / (TOTAL - 1);
  const step = 1 / (TOTAL - 1);
  // Scroll-linked ranges must stay inside 0..1 and ascend, so the first and last
  // cards drop the out-of-range side instead of extending past the ends.
  const isFirst = index === 0;
  const isLast = index === TOTAL - 1;
  const inputRange = isFirst ? [0, step] : isLast ? [1 - step, 1] : [center - step, center, center + step];
  const scaleRange = isFirst ? [1, 0.9] : isLast ? [0.9, 1] : [0.9, 1, 0.9];
  const opacityRange = isFirst ? [1, 0.4] : isLast ? [0.4, 1] : [0.4, 1, 0.4];
  const scale = useTransform(progress, inputRange, scaleRange);
  const opacity = useTransform(progress, inputRange, opacityRange);

  return (
    <m.div
      role="group"
      aria-roledescription="slide"
      aria-label={`Stage ${index + 1} of ${TOTAL}: ${stage.badgeText}`}
      style={{
        width,
        scale,
        opacity,
        boxShadow: isActive ? `0 0 48px ${stage.colorTheme.glow}` : "none",
      }}
      className={`shrink-0 p-6 lg:p-8 rounded-[var(--radius-md)] border bg-[var(--card-bg)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ${
        isActive ? "border-[var(--primary)]" : "border-[var(--card-border)]"
      }`}
    >
      <StageBody stage={stage} />
    </m.div>
  );
}

/**
 * Desktop: the section pins to the viewport and vertical scroll drives a horizontal
 * track through all seven stages. The stepper follows along and is clickable.
 */
function PinnedLifecycle() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1280);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(TOTAL - 1, Math.max(0, Math.round(p * (TOTAL - 1)))));
  });

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 540px on laptops, growing to 720px on very wide screens so cards don't look lost.
  const cardWidth = Math.min(viewportWidth * 0.8, Math.max(CARD_MAX_WIDTH, Math.min(720, viewportWidth * 0.28)));
  const startX = viewportWidth / 2 - cardWidth / 2;
  const endX = startX - (TOTAL - 1) * (cardWidth + CARD_GAP);
  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);

  const goToStage = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const top = wrapper.getBoundingClientRect().top + window.scrollY;
    const distance = wrapper.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (index / (TOTAL - 1)) * distance, behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef} style={{ height: `${(TOTAL - 1) * 70 + 100}vh` }}>
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-hidden pt-20 lg:gap-10"
      >
        {/* Stepper */}
        <nav aria-label="Project lifecycle stages" className="relative w-full max-w-6xl mx-auto px-4 md:px-10">
          <div className="absolute top-[24px] left-10 right-10 h-[1px] bg-[var(--card-border)]" />
          <m.div
            className="absolute top-[24px] left-10 right-10 h-[1px] origin-left bg-[var(--primary)]"
            style={{ scaleX: scrollYProgress }}
          />
          <div className="relative grid grid-cols-7 text-center">
            {LIFECYCLE_STAGES.map((stage, index) => {
              const isSelected = index === active;
              const isPassed = index < active;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goToStage(index)}
                  aria-current={isSelected ? "step" : undefined}
                  aria-label={`Go to stage ${index + 1}: ${stage.badgeText}`}
                  className="group relative flex flex-col items-center"
                >
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-300 ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : isPassed
                          ? "border-[var(--primary)] bg-[var(--bg)] text-[var(--accent)]"
                          : "border-[var(--card-border)] bg-[var(--bg)] text-[var(--disabled)] group-hover:border-[var(--border)] group-hover:text-[var(--text)]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span
                    className={`mt-3 font-mono text-[10px] uppercase tracking-normal transition-colors duration-200 lg:text-xs lg:tracking-wider ${
                      isSelected ? "font-bold text-[var(--heading)]" : "text-[var(--disabled)] group-hover:text-[var(--subtitle)]"
                    }`}
                  >
                    {stage.badgeText}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Horizontal track driven by vertical scroll */}
        <m.div style={{ x, gap: CARD_GAP }} className="flex items-stretch will-change-transform">
          {LIFECYCLE_STAGES.map((stage, index) => (
            <PinnedCard
              key={stage.id}
              stage={stage}
              index={index}
              progress={scrollYProgress}
              width={cardWidth}
              isActive={index === active}
            />
          ))}
        </m.div>

        <p className="text-center font-mono text-xs tracking-widest text-[var(--disabled)]" aria-live="polite">
          <span className="text-[var(--accent)]">{String(active + 1).padStart(2, "0")}</span> / {String(TOTAL).padStart(2, "0")}
          <span className="mx-3" aria-hidden="true">·</span>
          Scroll to move through the lifecycle
        </p>
      </div>
    </div>
  );
}

/**
 * Touch and reduced-motion: a native horizontal swipe carousel with scroll snapping.
 * No scroll-jacking, so the page scrolls normally and users stay in control.
 */
function SwipeLifecycle() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const centre = row.scrollLeft + row.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    Array.from(row.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    setActive(best);
  };

  const goTo = (index: number) => {
    const el = rowRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div>
      <div
        ref={rowRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label="Project lifecycle stages, scroll horizontally"
        className="flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden sm:scroll-px-6 sm:gap-4 sm:px-6 md:scroll-px-10 md:px-10"
      >
        {LIFECYCLE_STAGES.map((stage, index) => (
          <div
            key={stage.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Stage ${index + 1} of ${TOTAL}: ${stage.badgeText}`}
            className={`w-[88%] min-w-[260px] max-w-[440px] shrink-0 snap-center rounded-[var(--radius-md)] border bg-[var(--card-bg)] p-5 transition-colors sm:w-[70%] sm:p-6 md:w-[46%] lg:w-[34%] ${
              index === active ? "border-[var(--primary)]" : "border-[var(--card-border)]"
            }`}
          >
            <StageBody stage={stage} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1" role="group" aria-label="Choose a lifecycle stage">
        {LIFECYCLE_STAGES.map((stage, index) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to stage ${index + 1}: ${stage.badgeText}`}
            aria-current={index === active ? "step" : undefined}
            className="flex h-11 w-7 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-[var(--primary)]" : "w-2 bg-[var(--card-border)]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectLifecycle() {
  const reduceMotion = useReducedMotion();
  const [isWide, setIsWide] = useState(false);

  // Pin-and-scroll only where it fits and feels good: wide AND tall enough, motion allowed.
  // Phones, landscape tablets and short windows get the native swipe carousel instead.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (min-height: 620px)");
    const update = () => setIsWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const pinned = isWide && !reduceMotion;

  return (
    // overflow-x-clip (not overflow-hidden) so the sticky pinned track still works.
    <section className="relative py-16 md:py-28 overflow-x-clip text-[var(--text)]">
      <div className="px-6 md:px-[max(8%,calc((100%-80rem)/2))]">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Block */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-xs font-mono font-bold tracking-widest text-[var(--accent)] uppercase px-3 py-1 bg-[var(--glass)] border border-[var(--card-border)] rounded-full inline-block mb-4">
              OPERATIONAL_MATURITY_MATRIX
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--heading)] mb-4">
              Ecosystem Pipelines
            </h2>
            <p className="text-sm md:text-base text-[var(--subtitle)] leading-relaxed">
              Every library, module, and API in our registry follows strict lifecycle tracking metrics. Evaluate architectural risks contextually at a single glance.
            </p>
          </div>
        </div>
      </div>

      {pinned ? <PinnedLifecycle /> : <SwipeLifecycle />}
    </section>
  );
}
