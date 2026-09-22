import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'

/**
 * App root.
 *
 * Providers are mounted in `main.tsx` (see AppProviders).
 * Routing lives entirely in `src/app/router/` — keep this file thin.
 */
export default function App() {
  return <RouterProvider router={router} />
}
