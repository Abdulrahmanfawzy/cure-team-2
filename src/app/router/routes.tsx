import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { ProtectedRoute } from './guards/protected-route'
import { RootLayout } from './layouts/root-layout'
import { PATHS } from './paths'
import { DashboardPage } from './pages/dashboard-page'

import { LoginPage } from './pages/login-page'
import { NotFoundPage } from './pages/not-found-page'
import { RegisterPage } from './pages/register-page'
import HomePage from './pages/home-page'

/**
 * Route tree.
 *
 * Structure:
 * - RootLayout wraps every route (global chrome + Toaster + <Outlet />)
 * - Public routes render directly
 * - Protected routes nest under <ProtectedRoute />
 * - Feature routes: import page components from `features/<name>` and
 *   add them here (or compose nested children per feature)
 *
 * Adding routes:
 * 1. Add the path to `paths.ts`
 * 2. Create/reuse a page component
 * 3. Register it below (public, protected, or nested)
 */
const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      // ——— Public routes ———
      { path: PATHS.home, element: <HomePage /> },
      { path: PATHS.login, element: <LoginPage /> },
      { path: PATHS.register, element: <RegisterPage /> },

      // ——— Protected routes ———
      {
        element: <ProtectedRoute />,
        children: [
          { path: PATHS.dashboard, element: <DashboardPage /> },
          // Add nested protected feature routes here:
          // { path: PATHS.settings, element: <SettingsPage /> },
        ],
      },

      // ——— Catch-all ———
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

/** App router instance consumed by <RouterProvider /> in App.tsx. */
export const router = createBrowserRouter(routes)
