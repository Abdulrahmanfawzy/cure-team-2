/**
 * Storage keys.
 *
 * Centralize localStorage/sessionStorage keys to avoid typos and make
 * cleanup easy (e.g. auth tokens, theme preference).
 *
 * Example:
 *   export const STORAGE_KEYS = {
 *     accessToken: 'cure.access_token',
 *     refreshToken: 'cure.refresh_token',
 *   } as const
 */
export const STORAGE_KEYS = {
  accessToken: 'app.access_token',
  refreshToken: 'app.refresh_token',
} as const
