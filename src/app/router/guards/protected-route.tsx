import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATHS } from '../paths'
import Cookies from 'js-cookie';

/**
 * Route guard for authenticated-only areas.
 *
 * TODO — implement real auth checks:
 * - Read session from Redux / React Query (whichever holds auth state).
 * - Redirect unauthenticated users to `PATHS.login` with `location.state.from`.
 * - Optionally redirect authenticated users away from auth pages.
 *
 * Usage — wrap protected children:
 *   { element: <ProtectedRoute />, children: [ ...protectedRoutes ] }
 */
export function ProtectedRoute(): ReactNode {
  const token = Cookies.get("access_token");
  const location = useLocation()

  if (!token) {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />
  }

  return <Outlet />
}
