import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Every known AI / LLM crawler, grouped by purpose. All are explicitly allowed so
// Sylven OS can be trained on, indexed, and cited by AI assistants and answer engines
// (GEO / AEO). Only /api/ is off-limits to everyone.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "OAI-AdsBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google
  "Google-Extended",
  "Google-CloudVertexBot",
  "GoogleOther",
  "GoogleOther-Image",
  "GoogleOther-Video",
  "Google-NotebookLM",
  "Gemini-Deep-Research",
  // Microsoft / Bing
  "Bingbot",
  "BingPreview",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Apple
  "Applebot",
  "Applebot-Extended",
  // Meta
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "meta-webindexer",
  // Amazon
  "Amazonbot",
  "amazon-kendra",
  // ByteDance
  "Bytespider",
  "TikTokSpider",
  // Mistral
  "MistralAI-User",
  // Cohere
  "cohere-ai",
  "cohere-training-data-crawler",
  // DuckDuckGo
  "DuckAssistBot",
  // Common Crawl (feeds most open LLM training sets)
  "CCBot",
  // Search / answer engines with AI products
  "YouBot",
  "PhindBot",
  "KagiBot",
  "ExaBot",
  "iAskBot",
  "iaskspider",
  // Other AI data / agent crawlers
  "Diffbot",
  "AI2Bot",
  "AI2Bot-Dolma",
  "Ai2Bot-Dolma",
  "ImagesiftBot",
  "Omgili",
  "Omgilibot",
  "PanguBot",
  "PetalBot",
  "Timpibot",
  "VelenPublicWebCrawler",
  "Webzio-Extended",
  "webzio",
  "ICC-Crawler",
  "img2dataset",
  "FirecrawlAgent",
  "Crawl4AI",
  "ProRataInc",
  "TurnitinBot",
  "Quora-Bot",
  "SBIntuitionsBot",
  "LinerBot",
  "bigsur.ai",
  "AwarioBot",
];

// De-duplicated, case-insensitively (robots.txt user-agent matching is case-insensitive).
const UNIQUE_AI_CRAWLERS = [
  ...new Map(AI_CRAWLERS.map((ua) => [ua.toLowerCase(), ua])).values(),
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: UNIQUE_AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
