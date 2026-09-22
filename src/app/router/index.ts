/**
 * Router barrel.
 *
 * App code should import from `@/app/router` (this file).
 * Route definitions live in `routes.tsx`.
 */
export { router } from './routes'
export { PATHS, type PathKey } from './paths'
export { ProtectedRoute } from './guards/protected-route'
export { RootLayout } from './layouts/root-layout'
