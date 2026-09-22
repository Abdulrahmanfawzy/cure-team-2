/// <reference types="vite/client" />

/** Typed Vite environment variables. Add every VITE_* key used by the app. */
interface ImportMetaEnv {
  /** Base URL for the centralized Axios instance. */
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
