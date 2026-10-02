import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { authStorage } from '@/utils/auth-storage'
import { refreshToken } from '@/features/auth/api/auth-api'
import type { refreshTokenPayload } from '@/features/auth/types/auth-types'

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
 * Deduplicates concurrent refresh attempts — parallel requests arriving
 * while a refresh is in flight all await the same promise.
 */
let refreshPromise: Promise<void> | null = null

async function refreshAccessToken(refreshTokenValue: string): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const payload: refreshTokenPayload = {
        refresh_token: refreshTokenValue,
      }
      try {
        const { data } = await refreshToken(payload)
        authStorage.setTokens(
          data.access_token,
          data.raw_refresh_token ?? data.refresh_token ?? refreshTokenValue,
          data.refresh_token_expires_at,
          data.access_token_expires_at,
        )
      } catch (error) {
        console.log(error)
      } finally {
        refreshPromise = null
      }
    })()
  }
  return refreshPromise
}

/**
 * Register Axios interceptors.
 *
 * Called once at app startup (see `services/axios/index.ts`).
 *
 * Request:
 * - Proactively refreshes an expired access token before the request is sent.
 * - Attaches `Authorization: Bearer <token>` unless `skipAuth` is set.
 *
 * Response error: 401 handling / toasts — TODO (features using the auth
 * axios instance already refresh reactively on 401 there).
 */
export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use(async (config: RequestConfig) => {
    if (config.skipAuth) {
      return config
    }

    const token = authStorage.getAccessToken()
    const refreshTokenValue = authStorage.getRefreshToken()
    const expireAccessToken = authStorage.getExpireAccessToken()

    if (token && expireAccessToken && refreshTokenValue) {
      const expireAt = new Date(expireAccessToken).getTime()
      if (expireAt <= Date.now()) {
        await refreshAccessToken(refreshTokenValue)
      }
    }

    // Re-read storage — the token may have just been refreshed above.
    const latestToken = authStorage.getAccessToken()
    if (latestToken) {
      config.headers.Authorization = `Bearer ${latestToken}`
    }

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
