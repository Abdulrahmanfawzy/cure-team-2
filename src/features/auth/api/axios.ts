import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://round-13-cure.huma-volve.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor: attach access token ──────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Refresh token logic ───────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// ── Response interceptor: handle 401 → refresh → retry ───────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Only handle 401 and don't retry the refresh call itself
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue subsequent 401s while a refresh is already in progress
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = Cookies.get('refresh_token');

    if (!refreshToken) {
      // No refresh token — force logout
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      window.location.href = '/signIn';
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'https://round-13-cure.huma-volve.com/api/'}auth/refresh`,
        { refresh_token: refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const newAccessToken: string = data?.data?.access_token;
      const newRefreshToken: string | undefined = data?.data?.refresh_token;

      Cookies.set('access_token', newAccessToken, { expires: 7, secure: true, sameSite: 'strict' });
      if (newRefreshToken) {
        Cookies.set('refresh_token', newRefreshToken, { expires: 30, secure: true, sameSite: 'strict' });
      }

      processQueue(null, newAccessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      window.location.href = '/sign-in';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
