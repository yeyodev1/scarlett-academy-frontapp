/**
 * Resolución del backend según el origin desde el que se sirve el frontend.
 *
 *   localhost:5173 / 5174          -> http://localhost:8101/api
 *   dev-project-front.bakano.ec    -> https://dev-project-back.bakano.ec/api
 *   *.trycloudflare.com            -> https://dev-project-back.bakano.ec/api
 *   scarlettcordova.com (+ www)    -> https://api.metodosk.ec/api
 *   metodosk.ec / www.metodosk.ec  -> https://api.metodosk.ec/api  (dominio legado)
 *
 * VITE_API_BASE_URL sobreescribe todo (útil para previews de Vercel).
 */

const LOCAL_API = 'http://localhost:8101/api'
const DEV_API = 'https://dev-project-back.bakano.ec/api'
const PROD_API = 'https://api.metodosk.ec/api'

/**
 * Dominios de producción. scarlettcordova.com es el dominio principal;
 * metodosk.ec se mantiene porque sigue resolviendo al mismo frontend.
 */
const PROD_HOSTS = new Set([
  'scarlettcordova.com',
  'www.scarlettcordova.com',
  'metodosk.ec',
  'www.metodosk.ec',
])

/** Normaliza a una URL que siempre termine en /api sin barra final. */
function normalize(raw: string): string {
  const trimmed = raw.replace(/\/+$/, '')
  return trimmed.endsWith('/api') || /\/api\//.test(trimmed) ? trimmed : `${trimmed}/api`
}

export function resolveApiBaseUrl(): string {
  const override = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (override && override.trim()) return normalize(override.trim())

  if (typeof window === 'undefined') return PROD_API

  const { hostname } = window.location

  if (hostname === 'localhost' || hostname === '127.0.0.1') return LOCAL_API
  if (hostname === 'dev-project-front.bakano.ec') return DEV_API
  if (hostname.endsWith('.trycloudflare.com')) return DEV_API
  if (PROD_HOSTS.has(hostname)) return PROD_API

  // Previews de Vercel: usan el backend de producción, pero ese backend
  // detecta el origin *.vercel.app y responde con credenciales de prueba.
  return PROD_API
}

/** true cuando el origin actual usa credenciales de Payphone de pruebas. */
export function isTestEnvironment(): boolean {
  if (typeof window === 'undefined') return false
  const { hostname } = window.location
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === 'dev-project-front.bakano.ec' ||
    hostname.endsWith('.trycloudflare.com') ||
    hostname.endsWith('.vercel.app')
  )
}

export const API_BASE_URL = resolveApiBaseUrl()
