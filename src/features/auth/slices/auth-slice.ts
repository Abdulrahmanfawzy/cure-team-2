import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/**
 * Auth feature slice (client/global state only).
 *
 * Use Redux here ONLY for non-server UI/session flags, e.g.:
 * - isAuthenticated (optimistic flag)
 * - redirect-after-login path
 *
 * Do NOT store fetched user profiles or API responses here —
 * those belong in React Query (`features/auth/hooks`).
 *
 * Register this slice in `app/store/root-reducer.ts`:
 *   import { authReducer } from '@/features/auth/slices/auth-slice'
 *   combineReducers({ auth: authReducer })
 */
export interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  // TODO: hydrate from storage/session check on app init.
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
    },
    // TODO: add logout / session-expired reducers when implementing auth.
  },
})

export const { setAuthenticated } = authSlice.actions
export const authReducer = authSlice.reducer
