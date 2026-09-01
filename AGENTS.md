# Repository Guidelines

## Project Structure & Module Organization

`frontend/` is a Next.js 16/React 19 PWA; routes and styles live in `frontend/src/app/`, and static assets in `frontend/public/`. `backend/` is a NestJS API: keep runtime code in `backend/src/`, Prisma files in `backend/prisma/`, and end-to-end tests in `backend/test/`. Product decisions and task status live in `docs/`. `docker-compose.yml` provisions PostgreSQL with PostGIS.

## Build, Test, and Development Commands

Run commands from the relevant package directory using pnpm.

- `docker compose up -d`: start the local PostGIS database.
- `pnpm install`: install package dependencies.
- `pnpm run dev` (frontend): start Next.js with hot reload.
- `pnpm run start:dev` (backend): start NestJS in watch mode.
- `pnpm run build`: produce a production build.
- `pnpm run lint`: run ESLint in the frontend or Oxlint in the backend.
- `pnpm run test`, `test:cov`, or `test:e2e` (backend): run unit, coverage, or API tests.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, and each package's configured tools. React components use PascalCase, hooks begin with `use`, and NestJS files use `.controller.ts`, `.service.ts`, or `.module.ts`. Each domain needs frontend services, types, reusable hooks, and validation; backend modules separate controllers, services, models, permissions, and history. Do not modify global layout, routing, authentication, shared hooks, base styles, or global components without approval.

## Testing Guidelines

Vitest unit tests follow `*.spec.ts`; API tests follow `*.e2e-spec.ts`. Place them beside source or under `backend/test/`. Validate adjusted modules with backend tests and a manual frontend flow; run the complete module suite before handoff. Frontend automation is not configured, so document manual checks.

## Product, Security & UI Rules

Keep frontend and backend contracts aligned. Homes show at most nine items; change-history lists show three. After creation, return home with a success message; after editing, return to detail. Edit forms submit only real differences and batch relationship additions/removals. Enforce role permissions, server-side validation, input sanitization, auditability, and soft deletion where applicable. Use accessible, responsive UI and actionable Spanish error messages. Document module contracts and behavior within both package trees.

## Commit & Pull Request Guidelines

History follows Conventional Commits in Spanish: `feat(backend): agrega endpoint de incidentes`. Keep commits atomic; do not commit automatically. Pull requests need a concise summary, affected contracts/views, validation performed, linked issues, and screenshots for visible UI changes. Mention migrations, environment variables, risks, and deployment impact when relevant.
