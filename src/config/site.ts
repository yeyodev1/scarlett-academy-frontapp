// Centralized site config: URLs, copy hub, redes.
// La compra ocurre dentro del sitio (sección #planes). No hay funnel externo.

export const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/'
export const INSTAGRAM_HANDLE = '@scarlettcordova'

/** Ancla de la sección de compra en el home. */
export const CHECKOUT_HASH = '#planes'

/**
 * Destino de cualquier CTA de compra. Apunta a la sección de precio del propio
 * sitio; `placement` se conserva para poder etiquetar el origen del clic.
 */
export const buildCheckoutUrl = (placement?: string): string =>
  placement ? `/${CHECKOUT_HASH}?from=${encodeURIComponent(placement)}` : `/${CHECKOUT_HASH}`

export const CLOUDINARY_CDN = 'https://res.cloudinary.com/kyt3rjjz/image/upload'

/** Helper para URLs de Cloudinary con transformaciones */
export const cld = (
  publicId: string,
  transform = 'q_auto,f_auto',
): string => `${CLOUDINARY_CDN}/${transform}/${publicId}`

export const SITE_COPY = {
  brand: 'Scarlett Cordova',
  brandShort: 'Scarlett',
  tagline: 'Cambia desde adentro. Entrena con ciencia.',
  ctaPrimary: 'Entrar a mi cuenta',
  ctaPrimaryShort: 'Entrar',
  ctaSecondary: 'Crear cuenta',
} as const
