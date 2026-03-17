# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── portfolio/          # React+Vite single-page 3D portfolio website
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Portfolio App (`artifacts/portfolio`)

Single-page cyberpunk/futuristic 3D portfolio for Veerendra Vishwakarma (The Codex).

### Features
- **Loading screen** with progress animation
- **Custom neon cursor** with glow effect
- **Navbar** with smooth scroll and glassmorphism
- **Hero section** with Three.js 3D animated background (particles + orbital rings) + CSS fallback
- **About section** with flip card animation
- **Skills section** with animated progress bars
- **Projects section** with 3D tilt effect cards (CryptoShield, AI Study Platform, College Event Hub)
- **Hackathons section** with animated timeline
- **Contact section** with glowing input fields
- **Footer** with social icon links

### Tech Stack
- React + Vite + Tailwind CSS
- Framer Motion (animations)
- Three.js / React Three Fiber (3D background)
- react-type-animation (typing effect)
- react-icons (social/UI icons)

### Design
- Cyberpunk dark theme
- Neon accents: cyan (#00f5ff), purple (#a855f7), blue (#3b82f6)
- Glassmorphism + soft shadows

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec + Orval config. Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks.

### `scripts` (`@workspace/scripts`)

Utility scripts package.
