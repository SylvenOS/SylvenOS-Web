// config/projectMetadata.ts

export interface CustomMetadata {
  overview: string;
  goals: string[];
  features: string[];
  architecture: { layer: string; description: string }[];
  contributionGuide?: string;
}

export const localProjectRegistry: Record<string, CustomMetadata> = {
  "sylvenos-web": {
    overview: "FocusHub is our flagship performance-monitoring and productivity terminal. It orchestrates real-time process monitoring, system telemetry, and contextual focus metrics directly from your developer workflow.",
    goals: [
      "Optimize local telemetry parsing down to sub-10ms overhead",
      "Develop native cross-platform system trackers for Linux, macOS, and Windows",
      "Achieve deep integration with standard developer terminals and IDE extensions"
    ],
    features: [
      "Dynamic background daemon tracker with zero CPU footprint when idling",
      "Cryptographically secure, localized SQLite database storing user patterns offline",
      "Beautiful built-in Tailwind UI terminal visualizer"
    ],
    architecture: [
      { layer: "Frontend / GUI", description: "Next.js client layer with hyper-optimized Framer Motion state pipelines." },
      { layer: "System Daemon", description: "Rust-compiled background observer interfacing directly with kernel telemetry." },
      { layer: "Local Database", description: "Encrypted SQLite cluster using secure handshake validation protocols." }
    ],
    contributionGuide: "Want to contribute to FocusHub? Check out our issue board for tags labeled 'good first issue'. Make sure your Rust tests pass locally (`cargo test`) before opening a Pull Request."
  },
  
  "mesh-router": {
    overview: "A lightweight, resilient network routing module built to coordinate high-frequency P2P state handshakes across our decentralized node ecosystem.",
    goals: [
      "Reduce state broadcast latency by 35% over poor connections",
      "Establish automated route-healing algorithms when active nodes drop offline"
    ],
    features: [
      "End-to-end encrypted packet wrappers using AES-256-GCM architecture",
      "Up-to-date automatic peer routing tables refreshed dynamically over WebSockets"
    ],
    architecture: [
      { layer: "Protocol Layer", description: "Custom TCP/UDP handshake bindings configured in pure Go." },
      { layer: "Cache Manager", description: "In-memory Redis cache ring optimizing routing tables." }
    ]
  }
  
  // Add more projects here matching their exact GitHub repository names (lowercase)
};