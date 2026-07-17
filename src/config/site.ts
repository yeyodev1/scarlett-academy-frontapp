// Centralized site config: URLs, copy hub, redes.
// Cualquier CTA hacia el funnel VIP debe usar `buildVipUrl(placement)` para tagging UTM.

export const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin
export const VIP_URL = import.meta.env.VITE_FUNNEL_URL || 'https://scarlettcordova-quemagrasa-cons-musc.netlify.app'
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/'
export const INSTAGRAM_HANDLE = '@scarlettcordova'

export const buildVipUrl = (placement: string): string => {
  const params = new URLSearchParams({
    utm_source: 'site',
    utm_medium: 'cta',
    utm_campaign: 'community',
    utm_content: placement,
  })
  return `${VIP_URL}?${params.toString()}`
}

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
