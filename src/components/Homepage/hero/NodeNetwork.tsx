// src/components/NodeNetwork.tsx
import Image from "next/image";

export function NodeNetwork() {
  return (
    <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center z-10">
      {/* Background Glow */}
      <div className="absolute w-40 h-40 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse" />

      {/* Central Node (The Seed) */}
      <div className="relative z-20 w-24 h-24 bg-[var(--glass)] border-2 border-[var(--primary)] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] backdrop-blur-md">
        <div className="relative w-12 h-12">
          <Image
            src="/IMG_20260628_143818.png"
            alt="Sylven OS Logo"
            fill
            sizes="48px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Node 1: Top Right */}
      <div className="absolute top-[15%] right-[15%] animate-[bounce_4s_infinite_ease-in-out]">
        <div className="w-12 h-12 bg-[var(--glass)] border border-[var(--border)] rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-xl">💻</span>
        </div>
        <div className="absolute top-1/2 right-full w-24 h-px bg-gradient-to-r from-transparent to-[var(--border)] -rotate-[35deg] origin-right opacity-50" />
      </div>

      {/* Node 2: Bottom Right */}
      <div className="absolute bottom-[20%] right-[10%] animate-[bounce_5s_infinite_ease-in-out_reverse]">
        <div className="w-14 h-14 bg-[var(--glass)] border border-[var(--border)] rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-xl">🌿</span>
        </div>
        <div className="absolute bottom-1/2 right-full w-28 h-px bg-gradient-to-r from-transparent to-[var(--border)] rotate-[25deg] origin-right opacity-50" />
      </div>

      {/* Node 3: Bottom Left */}
      <div className="absolute bottom-[15%] left-[15%] animate-[bounce_6s_infinite_ease-in-out]">
        <div className="w-10 h-10 bg-[var(--glass)] border border-[var(--border)] rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-sm">🤝</span>
        </div>
        <div className="absolute top-1/2 left-full w-24 h-px bg-gradient-to-l from-transparent to-[var(--border)] -rotate-[20deg] origin-left opacity-50" />
      </div>

      {/* Node 4: Top Left */}
      <div className="absolute top-[25%] left-[10%] animate-[bounce_4.5s_infinite_ease-in-out_reverse]">
        <div className="w-16 h-16 bg-[var(--glass)] border border-[var(--border)] rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-2xl">📦</span>
        </div>
        <div className="absolute top-1/2 left-full w-20 h-px bg-gradient-to-l from-transparent to-[var(--border)] rotate-[30deg] origin-left opacity-50" />
      </div>
    </div>
  );
}