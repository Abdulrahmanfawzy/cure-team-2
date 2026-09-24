import axios from 'axios';

export const api = axios.create({
  // بنقرا الرابط من ملف البيئة، ولو مش موجود بيقرا الرابط الاحتياطي
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://round-13-cure.huma-volve.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);