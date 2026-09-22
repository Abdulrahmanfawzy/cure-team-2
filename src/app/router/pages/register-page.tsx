import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Register page placeholder (public route).
 *
 * TODO — implement the real registration flow in `features/auth`
 * (same pattern as `login-page.tsx`).
 */
export function RegisterPage(): ReactNode {
  return (
    <section className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Auth UI is not implemented yet — this is a routing placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Build the form in <code>features/auth/components</code> using React Hook Form + Zod +
          Input OTP for verification codes.
        </CardContent>
      </Card>
    </section>
  )
}
