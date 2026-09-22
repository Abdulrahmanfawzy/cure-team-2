import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { queryClient } from './query-client'

/**
 * React Query Provider wrapper.
 *
 * All server-state hooks (useQuery / useMutation) must be used under this
 * provider. Feature query hooks live in `features/<name>/hooks/`.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
