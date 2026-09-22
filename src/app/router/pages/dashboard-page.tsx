import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Dashboard page placeholder (protected route target).
 *
 * Replace with the real dashboard feature. This exists so the
 * protected-route wiring can be verified out of the box.
 */
export function DashboardPage(): ReactNode {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Protected area — only rendered when <code>ProtectedRoute</code> allows access.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Implement real dashboard features in <code>features/</code>.
        </CardContent>
      </Card>
    </section>
  )
}
