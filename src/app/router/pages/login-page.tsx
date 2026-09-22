import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Login page placeholder (public route).
 *
 * TODO — implement the real auth UI inside `features/auth`:
 * - React Hook Form + zodResolver with schema from `features/auth/schemas`
 * - shadcn Form + Input + Button components
 * - Submit via feature mutation hook from `features/auth/hooks`
 *
 * Then re-export the real page from `features/auth` and wire it here.
 */
export function LoginPage(): ReactNode {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Auth UI is not implemented yet — this is a routing placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Build the form in <code>features/auth/components</code> using React Hook Form + Zod.
        </CardContent>
      </Card>
    </section>
  )
}
