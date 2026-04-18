# Agent Guidelines for Fumi

> **Note:** Every time in a different project, if the following AGENTS.md doesn't match the current project structure, update it automatically.

## Project Overview
Fumi is a personal website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. It is deployed on **Vercel**.

---

## General
- Use **Asia/Bangkok** or **GMT+7** timezone as the main timezone for every session
- Always run `git status` to check the current state before summarizing
- When task is done, summarize: 1) Changes made 2) How many commits 3) How many ongoing all commits (local commits not pushed from git status)
- Create necessary tracking files if they don't exist: `GIT_HISTORY.md` for git commits, `AGENTS_HISTORY.md` for agent actions

---

## Build & Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

---

## Code Style Guidelines

### General
- Use **TypeScript** with strict mode enabled
- Use **Tailwind CSS v4** for styling (no arbitrary values unless necessary, use `sm:`, `md:` prefixes for responsive design)
- Use **CSS variables** via inline `style` props for custom values that Tailwind doesn't handle well
- Use **Next.js App Router** conventions (server components by default, `"use client"` for interactivity)

### TypeScript
- Enable strict mode (`strict: true` in tsconfig)
- Use explicit types for function parameters and return values when not inferrable
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any` — use `unknown` when type is truly unknown
- Use `ReactElement` instead of `JSX.Element` for type annotations

### Naming Conventions
- **Components**: PascalCase (e.g., `Navbar`, `Footer`)
- **Functions/Hooks**: camelCase (e.g., `useEffect`, `fetchSocials`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for truly global constants
- **Files**: kebab-case for utilities, PascalCase for components (e.g., `footer.tsx`, `Navbar.tsx`)
- **CSS classes**: kebab-case in Tailwind (e.g., `rounded-[65px]`, `gap-4`)

### Imports
- Group imports: 1) React/Next.js 2) Third-party 3) Internal
- Use absolute imports with `@/` prefix (configured in tsconfig)
- Example:
```typescript
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
```

### Components
- Server components by default, add `"use client"` only when using hooks or browser APIs
- Use **named exports** for components (e.g., `export default function Footer()`)
- Keep components focused — extract logic into custom hooks when complex
- Use `useCallback` and `useMemo` sparingly — only when there's a measurable performance benefit

### Styling
- Prefer Tailwind utility classes over custom CSS
- Use glassmorphism effects with inline styles for blur/border-radius consistency:
```tsx
style={{
  background: "rgba(0, 0, 0, 0.72)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
}}
```
- Use `rounded-[Npx]` for custom border radius (e.g., `rounded-[65px]`)
- Responsive prefix format: `text-xs sm:text-sm`, `px-4 sm:px-6`

### Error Handling
- Use `try/catch` with async/await
- Handle loading and error states in client components
- Validate API responses before using data

### Next.js Conventions
- Use `app/` directory for App Router
- Place API routes in `app/api/`
- Use `generateMetadata()` or `metadata` export for page metadata
- Use `next/image` for images, `next/font` for fonts
- Use `next/link` for client-side navigation

### Fonts Used
- **Geist Sans**: Primary body font (via `geist/font/sans`)
- **Geist Mono**: Navbar and monospace elements (via `geist/font/mono`)
- **Geist Pixel Square**: Accent text (via `geist/font/pixel`)
- **Kanit**: Thai text support (via Google Fonts `next/font/google`)

### API Routes
- Use Route Handlers in `app/api/[route]/route.ts`
- Return JSON with `NextResponse.json()`
- Example:
```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ url: "https://example.com" });
}
```

---

## Testing
This project does not currently have a test suite. If adding tests:
- Use a testing framework compatible with Next.js (e.g., Vitest, Jest)
- Place tests alongside components or in a `__tests__` directory
- Run specific tests with framework CLI (e.g., `npm test -- filename.test.ts`)
- Don't Run dev server automatically.

---

## Deployment
- Primary deployment target: **Vercel**
- Connect GitHub repository to Vercel for automatic deployments

## Git
- Commit with message every time the code or files changed
- Commit message format: "Update: [user message] - Files changed: [list of files]"
- Log every commit in `GIT_HISTORY.md` with timestamp, description, and files changed
- Exception: AGENTS.md, .agents/CLAUDE.md, .agents/GEMINI.md should commit with message and push automatically if changed
- If "git status" shows local commits NOT present with remote, push GIT_HISTORY.md and AGENTS_HISTORY.md

## Agent History
- Log every agent action in `AGENTS_HISTORY.md` with:
  1. Agent used
  2. User requested message
  3. Agent response
  4. Everything the agent does
- Log every git commit in `GIT_HISTORY.md` with timestamp, description, and files changed