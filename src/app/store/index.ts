import { configureStore }from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'

/**
 * Application Redux store.
 *
 * Configure middleware, enhancers, and slice registration here.
 * Feature slices are registered in `root-reducer.ts`.
 */
export const store = configureStore({
  reducer: rootReducer,
  // Extend middleware if you need serializability checks, logging, etc.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.DEV,
})

/** Application-wide state type derived from the store. */
export type RootState = ReturnType<typeof store.getState>

/** Typed dispatch for use outside React (sagas, thunks, etc.). */
export type AppDispatch = typeof store.dispatch
