import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

/**
 * Root layout — matches all routes.
 *
 * Responsibilities:
 * - Global chrome (header, nav, footer) when needed
 * - Mount global UI (Sonner Toaster)
 * - Nested routes render via <Outlet />
 */
export function RootLayout(): ReactNode {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Global toast notifications (Sonner). */}
      <Toaster position="top-right" richColors />
    </div>
  )
}
