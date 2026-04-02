export interface Technology {
  name: string;
  description: string;
  category: "framework" | "language" | "library" | "tool" | "deployment" | "font";
}

export const technologies: Technology[] = [
  {
    name: "Next.js",
    description: "React framework for production-grade applications with App Router",
    category: "framework",
  },
  {
    name: "React",
    description: "JavaScript library for building user interfaces",
    category: "library",
  },
  {
    name: "TypeScript",
    description: "Typed superset of JavaScript for robust development",
    category: "language",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid styling",
    category: "library",
  },
  {
    name: "Cloudflare Workers",
    description: "Edge computing platform for deploying serverless functions",
    category: "deployment",
  },
  {
    name: "@opennextjs/cloudflare",
    description: "Adapter for deploying Next.js applications to Cloudflare Workers",
    category: "tool",
  },
  {
    name: "Geist Sans",
    description: "Modern sans-serif font by Vercel",
    category: "font",
  },
  {
    name: "Geist Mono",
    description: "Monospace font by Vercel for code and technical content",
    category: "font",
  },
  {
    name: "Geist Pixel Square",
    description: "Pixel-style font by Vercel for retro aesthetics",
    category: "font",
  },
  {
    name: "Kanit",
    description: "Thai font from Google Fonts with multiple weights",
    category: "font",
  },
];
