import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

/** Extended config so interceptors can stash per-request metadata. */
export interface RequestConfig extends InternalAxiosRequestConfig {
  /** Skip the auth token for this request (e.g. login/refresh endpoints). */
  skipAuth?: boolean
  /** Skip global error toasts for this request (handled locally). */
  skipErrorToast?: boolean
}

/** Shape of API error payloads — adjust to match your backend contract. */
export interface ApiErrorBody {
  message?: string
  code?: string
  errors?: Record<string, string[]>
}

/**
 * Register Axios interceptors.
 *
 * Called once at app startup (see `services/axios/index.ts`).
 *
 * TODO — implement when auth/API contract is known:
 * - Request: attach `Authorization` header from storage unless `skipAuth`.
 * - Response success: optionally unwrap `response.data` payloads.
 * - Response error: handle 401 (refresh/logout), map errors, fire Sonner toasts.
 */
export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config: RequestConfig) => {
    // TODO: read access token from storage/Redux and set:
    //   config.headers.Authorization = `Bearer ${token}`
    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorBody>) => {
      // TODO: global error handling (401 → refresh/logout, toast via sonner).
      // Respect `config.skipErrorToast` when set on the request.
      return Promise.reject(error)
    },
  )
}
