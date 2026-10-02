import Cookies from "js-cookie";
import { STORAGE_KEYS } from "@/constants/storage-keys";

/**
 * Auth token storage.
 *
 * - Tokens are kept in the same cookies the auth feature already uses
 *   (`access_token` / `refresh_token`), so ProtectedRoute, codeVerification
 *   and the auth axios instance keep working unchanged.
 * - Expiry timestamps are derived from the JWT `exp` claim and mirrored to
 *   localStorage as a fallback for tokens without a decodable claim.
 */

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";
const ACCESS_TOKEN_COOKIE_DAYS = 7;
const REFRESH_TOKEN_COOKIE_DAYS = 30;

const decodeExp = (token: string): string | undefined => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const { exp } = JSON.parse(json) as { exp?: number };
    if (typeof exp === "number") {
      return new Date(exp * 1000).toISOString();
    }
  } catch {
    // Not a decodable JWT — fall back to stored metadata.
  }
  return undefined;
};

export const authStorage = {
  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_COOKIE);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_COOKIE);
  },

  getExpireAccessToken(): string | undefined {
    const token = Cookies.get(ACCESS_TOKEN_COOKIE);
    return (
      (token ? decodeExp(token) : undefined) ||
      localStorage.getItem(STORAGE_KEYS.accessTokenExpiresAt) ||
      undefined
    );
  },

  getExpireRefreshToken(): string | undefined {
    const token = Cookies.get(REFRESH_TOKEN_COOKIE);
    return (
      (token ? decodeExp(token) : undefined) ||
      localStorage.getItem(STORAGE_KEYS.refreshTokenExpiresAt) ||
      undefined
    );
  },

  setTokens(
    accessToken: string,
    refreshToken?: string | null,
    refreshTokenExpiresAt?: string | null,
    accessTokenExpiresAt?: string | null
  ): void {
    if (accessToken) {
      Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
        expires: ACCESS_TOKEN_COOKIE_DAYS,
        secure: true,
        sameSite: "strict",
      });
      const exp = accessTokenExpiresAt ?? decodeExp(accessToken);
      if (exp) {
        localStorage.setItem(STORAGE_KEYS.accessTokenExpiresAt, exp);
      } else {
        localStorage.removeItem(STORAGE_KEYS.accessTokenExpiresAt);
      }
    }

    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        expires: REFRESH_TOKEN_COOKIE_DAYS,
        secure: true,
        sameSite: "strict",
      });
    }

    if (refreshTokenExpiresAt) {
      localStorage.setItem(STORAGE_KEYS.refreshTokenExpiresAt, refreshTokenExpiresAt);
    }
  },

  clear(): void {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);
    localStorage.removeItem(STORAGE_KEYS.accessTokenExpiresAt);
    localStorage.removeItem(STORAGE_KEYS.refreshTokenExpiresAt);
  },
};
