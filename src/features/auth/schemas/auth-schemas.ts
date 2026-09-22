/**
 * Auth form schemas (Zod).
 *
 * Schemas are the single source of truth for form validation and are
 * passed to React Hook Form via `zodResolver(schema)`.
 *
 * Expected schemas when auth is implemented:
 * - loginSchema
 * - registerSchema
 * - forgotPasswordSchema
 * - otpSchema (e.g. z.string().length(6))
 *
 * Example:
 *
 *   import { z } from 'zod'
 *
 *   export const loginSchema = z.object({
 *     email: z.string().email(),
 *     password: z.string().min(8),
 *   })
 *
 *   export type LoginValues = z.infer<typeof loginSchema>
 */
export {}
