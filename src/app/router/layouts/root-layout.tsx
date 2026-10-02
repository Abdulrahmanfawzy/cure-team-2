import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { PATHS } from '../paths'

const AUTH_PATHS: string[] = [
  PATHS.login,
  PATHS.register,
  PATHS.signIn,
  PATHS.signUp,
  PATHS.codeVerfication,
  PATHS.forgotPassword,
  PATHS.ResetPassword,
]

/**
 * Root layout — matches all routes.
 *
 * Responsibilities:
 * - Global chrome (header, nav, footer) when needed (hidden on auth pages)
 * - Mount global UI (Sonner Toaster)
 * - Nested routes render via <Outlet />
 */
export function RootLayout(): ReactNode {
  const { pathname } = useLocation()
  const isAuthPage = AUTH_PATHS.includes(pathname)

  return (
    <div className="flex min-h-svh flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
      {/* Global toast notifications (Sonner). */}
      <Toaster position="top-right" richColors />
    </div>
  )
}
