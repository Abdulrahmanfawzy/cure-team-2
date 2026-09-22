# Cure Team 1 — React Starter

Production-oriented React starter with a feature-based architecture.

## Tech Stack

- **React 19** + **Vite** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui**
- **React Router DOM** — routing (public / protected / nested)
- **TanStack React Query** — server state
- **Redux Toolkit** — client/global state only
- **Axios** — centralized HTTP client + interceptors
- **React Hook Form** + **Zod** — forms and validation
- **Sonner** — toast notifications

## Getting Started

```bash
npm install
cp .env.example .env.local   # set VITE_API_BASE_URL
npm run dev
```

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start dev server           |
| `npm run build` | Type-check + production build |
| `npm run lint`  | Lint with oxlint           |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── app/
│   ├── router/        # Route tree, paths, layouts, guards, placeholder pages
│   ├── providers/     # Redux + React Query providers (compose in index.tsx)
│   └── store/         # Store, root reducer, typed hooks
├── components/
│   ├── ui/            # shadcn/ui primitives (do not hand-roll duplicates)
│   └── shared/        # Reusable app-level components
├── features/          # Feature-based modules (auth, ...)
│   └── auth/
│       ├── api/       # Endpoint functions (Axios via services/axios)
│       ├── components/
│       ├── hooks/     # React Query hooks
│       ├── schemas/   # Zod schemas
│       ├── slices/    # Feature Redux slices (client state only)
│       ├── types/
│       ├── pages/
│       └── index.ts   # Public feature API
├── services/
│   ├── api/           # Cross-feature API utilities
│   └── axios/         # Centralized client + interceptors
├── hooks/             # Shared hooks
├── lib/               # cn() and small libraries
├── types/             # Global types + API envelopes
├── utils/             # Pure helpers
├── constants/         # App constants + storage keys
├── assets/
├── App.tsx            # RouterProvider only
├── main.tsx           # AppProviders + render
└── index.css          # Tailwind + shadcn theme
```

## Architecture Rules

1. **Feature-based** — keep feature code inside `features/<name>/`.
2. **Server state** → React Query. **Client/global state** → Redux Toolkit.
3. **Forms** → React Hook Form + `zodResolver`; use shadcn `Form`/`FormField` (wraps RHF `Controller`) for controlled inputs such as Input OTP.
4. **HTTP** → only via `@/services/axios` (`apiClient`). Feature API functions live in `features/<name>/api/`.
5. **Routing** → definitions in `app/router/routes.tsx`; paths in `paths.ts`; guards in `guards/`.
6. **UI** → prefer shadcn/ui in `components/ui`; shared app components in `components/shared`.
7. **TypeScript strict** — no `any`; keep imports via `@/` alias.

## shadcn/ui Components

Installed only: `button`, `input`, `dialog`, `sonner`, `form` (Controller/FormField), `input-otp`, `card`, `pagination` (+ `label`, required by form).

```bash
npx shadcn@3.8.5 add <component>
```

## Adding a Feature

1. Create `src/features/<name>/{api,components,hooks,schemas,types,slices,pages}`.
2. Export the public surface from `features/<name>/index.ts`.
3. Add paths in `app/router/paths.ts` and register routes in `app/router/routes.tsx`.
4. Register any Redux slice in `app/store/root-reducer.ts`.
5. Put server fetches in `hooks/` (React Query), never in Redux.
