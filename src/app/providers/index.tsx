import type { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { StoreProvider } from './store-provider'

/**
 * AppProviders
 *
 * Composes every global provider in one place. Order matters:
 * 1. StoreProvider  — Redux (client/global state)
 * 2. QueryProvider  — TanStack React Query (server state)
 * 3. (Future) ThemeProvider, RouterProvider, etc.
 *
 * Mounted once in `main.tsx`.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <QueryProvider>{children}</QueryProvider>
    </StoreProvider>
  )
}
