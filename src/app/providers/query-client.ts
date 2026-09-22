import { QueryClient } from '@tanstack/react-query'

/**
 * Shared QueryClient instance.
 *
 * Server state lives here (React Query), NOT in Redux.
 * Tune default options for the whole app; override per query/mutation
 * inside feature hooks when needed.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data is considered fresh before a background refetch.
      staleTime: 5 * 60 * 1000,
      // How long unused data stays in cache.
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})
