import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './index'

/**
 * Typed Redux hooks.
 *
 * Use these instead of raw `useDispatch` / `useSelector` so state and
 * dispatch are fully typed app-wide.
 *
 * Example:
 *   const dispatch = useAppDispatch()
 *   const value = useAppSelector((state) => state.someSlice.value)
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
