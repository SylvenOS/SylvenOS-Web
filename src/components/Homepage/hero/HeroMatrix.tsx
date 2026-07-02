// src/components/HeroMetrics.tsx

interface HeroMetricsProps {
  repos: number;
  contributors: number;
}

export function HeroMetrics({ repos, contributors }: HeroMetricsProps) {
  return (
    <div className="w-full pt-10 border-t border-[var(--border)]/50 z-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        
        {/* Projects */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[var(--text)] mb-2">1</span>
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Projects</span>
          <span className="text-xs text-[var(--primary)] mt-2 font-medium bg-[var(--primary)]/10 px-3 py-1 rounded-full">
            Building our first project
          </span>
        </div>

        {/* Live Contributors */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[var(--text)] mb-2">
            {contributors}
          </span>
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Contributors</span>
        </div>

        {/* Live Repositories */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[var(--text)] mb-2">
            {repos}
          </span>
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Repositories</span>
        </div>

        {/* Technologies */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[var(--text)] mb-2">10+</span>
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Technologies</span>
        </div>

        {/* Countries */}
        <div className="flex flex-col items-center justify-center col-span-2 md:col-span-1">
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-2">
            Future
          </span>
          <span className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Countries</span>
        </div>

      </div>
    </div>
  );
}