/**
 * Auth data hooks (TanStack React Query).
 *
 * Server state for auth belongs here — not in Redux.
 *
 * Expected hooks when auth is implemented:
 * - useLogin()       → useMutation wrapping `api/login`
 * - useRegister()    → useMutation wrapping `api/register`
 * - useVerifyOtp()   → useMutation for OTP verification
 * - useCurrentUser() → useQuery for session/profile (with queryKey factory)
 *
 * Pattern:
 *   export function useLogin() {
 *     return useMutation({ mutationFn: login, ... })
 *   }
 *
 * Keep query keys in `query-keys.ts` next to this file for cache stability.
 */
export {}
