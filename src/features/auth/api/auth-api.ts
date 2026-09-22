/**
 * Auth feature API layer.
 *
 * Define endpoint-specific functions here. Each function should:
 * - Call the centralized `apiClient` from `@/services/axios`
 *   (never raw axios)
 * - Return typed data (validate with Zod at the boundary if useful)
 * - Stay free of React concerns
 *
 * These functions are consumed by React Query hooks in `../hooks`.
 *
 * Example shape (do not implement until the API contract exists):
 *
 *   import { apiClient } from '@/services/axios'
 *
 *   export async function login(payload: LoginPayload) {
 *     const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
 *     return data
 *   }
 */
export {}
