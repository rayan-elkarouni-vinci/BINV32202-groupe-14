# Project Guidelines

## Build, test, and lint

Use Node.js 22.14 or newer (Node 24 LTS is recommended) and run commands from the
repository root. Install the locked dependency set with `npm ci`, then initialize local
configuration and demo data with `npm run setup`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the API on `http://localhost:3000` and the Vite client on `http://localhost:5173`. |
| `npm run db:init` | Apply migrations and seed an empty development database. |
| `npm run db:reset` | Recreate the development database and demo data; stop the dev server first. |
| `npm run lint` | Run Oxlint across both workspaces with warnings treated as errors. |
| `npm run typecheck` | Type-check both workspaces. |
| `npm test` | Run all backend and frontend Vitest suites. |
| `npm run build` | Build the backend and frontend. |
| `npm run check` | Run lint, typecheck, tests, and build; use this before significant commits. |

Run one test file with `npm run test -w backend -- tests/offers.test.ts` or
`npm run test -w frontend -- tests/CompaniesPage.test.tsx`. Narrow further with Vitest's
name filter, for example `npm run test -w backend -- tests/offers.test.ts -t "visibilité"`.
Backend tests use an in-memory SQLite database; do not point them at
`backend/data/gesta.db`.

## Architecture

This is an npm-workspaces monorepo:

- `backend/` is an Express API backed by SQLite and `better-sqlite3`.
- `frontend/` is a React 19/Vite application using React Router.
- The Vite dev proxy maps frontend `/api/...` calls to the backend and removes `/api`.
- `docs/architecture.md` describes the complete request flow and should be consulted
  when adding a feature that crosses layers.

Backend requests flow through `controllers -> services -> repositories -> SQLite`.
Controllers validate HTTP input and produce responses; services contain business rules;
repositories contain SQL and return database rows; mappers convert database rows to
domain objects and API DTOs. `app.ts` assembles these layers through factory functions,
which is also how tests construct a complete application.

Authentication is applied before protected controllers. `authenticate` verifies the
session token and reloads the current account, roles, and companies from the database;
`authorize` applies named permission rules. Use `HttpError` for expected failures so
`errorHandler` returns the standard `{ "error": { "code", "message" } }` shape.

The frontend follows the course's MVVM-style flow: `pages -> hooks -> services/utils ->
models`, with reusable presentational components below pages. `App.tsx` is the single
owner of `useAuth`; pass the token and logout/unauthorized callback down rather than
creating a second session flow.

## Conventions

- Keep backend relative imports ending in `.ts`; TypeScript rewrites them to `.js` in
  the build. Frontend imports also follow the existing explicit-extension style.
- The `Authorization` header contains the session token directly, without a `Bearer`
  prefix. The API port is configured with `API_PORT`, not `PORT`.
- Keep authorization and data visibility rules in backend services/permission helpers.
  Frontend permission helpers may control navigation, but must not be the security
  boundary.
- API services validate response JSON with the existing type-guard pattern. Preserve
  the shared error handling and 401 flow that logs the user out through `onUnauthorized`.
- Database constraints belong in SQLite; business rules and status transitions belong in
  services. Status codes are stored in English (for example `PUBLISHED`) and translated
  to French labels in the frontend.
- Never edit an applied migration. Add the next ordered file under
  `backend/src/db/migrations/` (for example `002_description.sql`).
- Use stable identifiers from `backend/src/db/seed/seedIds.ts` in backend tests. Keep
  invalid database cases in the constraint tests and use the test helpers to create an
  in-memory app.
- For frontend tests, use Vitest and Testing Library with the existing fetch mock helper;
  do not call the development API.
- When an API changes, update `backend/API.md` and the relevant files in `backend/http/`.
  For schema or behavior changes, update the related documentation under `docs/`.
- Follow the existing layer-by-layer implementation pattern of the companies and offers
  features, including backend authorization and tests for successful and denied access.
