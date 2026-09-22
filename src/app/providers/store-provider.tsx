import { useState, type ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/app/store'

/**
 * Redux Provider wrapper.
 *
 * Creates the store instance and exposes it to the React tree.
 * If you need hot-reloading for slices, swap `store` for a lazily
 * created store here.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  // useState initializer runs once per mount — safe store creation.
  const [storeInstance] = useState(() => store)

  return <ReduxProvider store={storeInstance}>{children}</ReduxProvider>
}
