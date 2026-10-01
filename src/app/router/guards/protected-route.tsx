import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATHS } from '../paths'
import { authStorage } from '@/utils/auth-storage'

/**
 * Route guard for authenticated-only areas.
 *
 * Redirects unauthenticated users to `PATHS.signIn` with
 * `location.state.from` so pages can return them after login.
 *
 * Usage — wrap protected children:
 *   { element: <ProtectedRoute />, children: [ ...protectedRoutes ] }
 */
export function ProtectedRoute(): ReactNode {
  const token = authStorage.getAccessToken()
  const location = useLocation()

  if (!token) {
    return <Navigate to={PATHS.signIn} state={{ from: location }} replace />
  }

  return <Outlet />
}
