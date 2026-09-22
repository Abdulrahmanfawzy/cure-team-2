import { apiClient } from './client'
import { setupInterceptors } from './interceptors'

// Wire interceptors once on module load (idempotent for HMR-safe usage
// in practice; move to an init function if double-registration becomes an issue).
setupInterceptors(apiClient)

export { apiClient }
export type { ApiErrorBody, RequestConfig } from './interceptors'
