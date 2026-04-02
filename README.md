# Fumi

Personal website built with Next.js, React, TypeScript, and Tailwind CSS. Deployed on Cloudflare Workers.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19
- **TypeScript:** Strict mode
- **Styling:** Tailwind CSS v4
- **Deployment:** Cloudflare Workers via `@opennextjs/cloudflare`
- **Fonts:** Geist Sans, Geist Mono, Geist Pixel Square, Kanit

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview Cloudflare build locally |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run upload` | Build and upload to Cloudflare |
| `npm run cf-typegen` | Generate Cloudflare types |

## Project Structure

```
├── app/                    # Next.js App Router pages and layouts
├── components/             # React components
├── public/                 # Static assets
├── .agents/                # Agent configuration files
├── AGENTS.md               # Agent guidelines
├── GIT_HISTORY.md          # Git commit history
└── AGENTS_HISTORY.md       # Agent action history
```
