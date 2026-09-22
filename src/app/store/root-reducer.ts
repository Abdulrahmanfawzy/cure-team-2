import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '@/features/auth/slices/auth-slice'

/**
 * Root reducer
 *
 * Register every feature slice here. Keep feature slices inside their
 * feature folders (e.g. `features/auth/slices/auth-slice.ts`) and only
 * compose them at the store root.
 *
 * Rules:
 * - Redux is ONLY for client/global UI state (session flags, UI preferences, etc.).
 * - Do NOT put server state (API data) in Redux — use TanStack React Query.
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  // Register additional feature slices here as the app grows.
})
