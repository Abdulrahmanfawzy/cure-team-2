/**
 * Auth feature types.
 *
 * Domain models and DTOs for authentication live here:
 * - User / Session
 * - LoginPayload, RegisterPayload
 * - AuthResponse (tokens, user)
 *
 * Keep these aligned with the API contract; prefer Zod-inferred types
 * for anything that crosses the network boundary.
 *
 * Example:
 *   export interface User { id: string; email: string; name: string }
 */
export interface User {
  id: string
  email: string
  name: string
}

export interface refreshTokenPayload {
  refresh_token: string
}

export interface RefreshTokensResponse {
  access_token: string
  refresh_token?: string
  raw_refresh_token?: string
  access_token_expires_at?: string
  refresh_token_expires_at?: string
}
