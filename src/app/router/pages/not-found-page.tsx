import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../paths'

/**
 * 404 page placeholder.
 * Shown for any unmatched route.
 */
export function NotFoundPage(): ReactNode {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <Link
        to={PATHS.home}
        className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
      >
        Back to home →
      </Link>
    </section>
  )
}
