/**
 * Generic API types.
 *
 * Shared response envelopes and pagination shapes. Adjust to match your
 * backend contract before use.
 *
 * Example:
 *   export interface ApiResponse<T> { data: T; message?: string }
 *   export interface PaginatedResponse<T> {
 *     items: T[]
 *     page: number
 *     pageSize: number
 *     total: number
 *   }
 */
export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
}
