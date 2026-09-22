import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../paths'

/**
 * Home page placeholder.
 *
 * Replace with a real feature page or marketing home.
 * Keep pages thin: compose feature components, avoid business logic here.
 */
export function HomePage(): ReactNode {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Starter Architecture</h1>
      <p className="text-muted-foreground">
        React + Vite + TypeScript + Tailwind CSS + shadcn/ui + React Router + Redux Toolkit +
        React Query + React Hook Form + Zod.
      </p>
      <Link
        to={PATHS.dashboard}
        className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
      >
        Preview protected route →
      </Link>
    </section>
  )
}
