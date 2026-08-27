// ─────────────────────────────────────────────────────────────────────────────
// Configuración central del sitio de marca: scarlettcordova.com
//
// El sitio es la casa de la marca: PRESENTA los dos productos, pero NO cobra.
// Cada compra ocurre en el funnel propio de cada producto:
//   1. Ebook  — "Quema Grasa, Construye Músculo", $33 pago único.
//               Se compra en ebook.scarlettcordova.com.
//   2. Reto SK — Método SK, 3 meses.
//               Se compra en metodosk.ec.
// El precio del reto se sigue leyendo de GET /api/presale/status solo para
// mostrarlo actualizado; aquí no hay pasarela de pago.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin
export const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/scarlettcordova9/'
export const INSTAGRAM_HANDLE = '@scarlettcordova9'

/** Funnel del ebook — tiene su propio checkout. */
export const EBOOK_URL = import.meta.env.VITE_EBOOK_URL || 'https://ebook.scarlettcordova.com/'

/** Funnel del reto — tiene su propio checkout. */
export const RETO_URL = import.meta.env.VITE_RETO_URL || 'https://metodosk.ec/'

/** Ancla de la sección informativa del reto dentro del home. */
export const RETO_HASH = '#reto'

/** Añade la etiqueta de origen del clic para poder atribuir la venta. */
const withPlacement = (base: string, placement?: string): string => {
  if (!placement) return base
  const url = new URL(base)
  url.searchParams.set('from', placement)
  return url.toString()
}

/** CTA de compra del ebook — sale al funnel del ebook. */
export const buildEbookUrl = (placement?: string): string =>
  withPlacement(EBOOK_URL, placement)

/** CTA de compra del reto — sale al funnel del reto. */
export const buildRetoUrl = (placement?: string): string =>
  withPlacement(RETO_URL, placement)

export const CLOUDINARY_CDN = 'https://res.cloudinary.com/kyt3rjjz/image/upload'

/** Helper para URLs de Cloudinary con transformaciones */
export const cld = (publicId: string, transform = 'q_auto,f_auto'): string =>
  `${CLOUDINARY_CDN}/${transform}/${publicId}`

export const SITE_COPY = {
  brand: 'Scarlett Cordova',
  brandShort: 'Scarlett',
  tagline: 'Cambia desde adentro. Entrena con ciencia.',
  ctaPrimary: 'Entrar a mi cuenta',
  ctaPrimaryShort: 'Entrar',
  ctaSecondary: 'Crear cuenta',
} as const

/** Precio fijo del ebook. El del reto lo manda el backend. */
export const EBOOK_PRICE = 33

export interface ProductCard {
  id: 'ebook' | 'reto'
  /** Etiqueta corta sobre el título. */
  eyebrow: string
  name: string
  claim: string
  description: string
  /** Lo que se lleva, en 4 puntos. */
  includes: string[]
  priceNote: string
  cta: string
  /** Siempre true: la compra ocurre fuera, en el funnel del producto. */
  external: boolean
  href: string
  /** Para quién es — ayuda a elegir sin leer todo. */
  forWho: string
}

export const PRODUCTS: ProductCard[] = [
  {
    id: 'ebook',
    eyebrow: 'Ebook digital · Empieza hoy',
    name: 'Quema Grasa, Construye Músculo',
    claim: 'Entiende tu cuerpo antes de exigirle.',
    description:
      'El manual para dejar de improvisar: déficit sin drama, tus macros calculados y comida que no te da miedo. Lo lees hoy y lo aplicas mañana.',
    includes: [
      'Tu fórmula de macros según tu peso y actividad',
      'Recetas y Scar-Tips para desayuno, almuerzo y cena',
      'Suplementación explicada sin atajos inútiles',
      'Rutinas de lunes a viernes con biseries y dropsets',
    ],
    priceNote: 'Pago único · Acceso inmediato',
    cta: 'Quiero el ebook',
    external: true,
    href: EBOOK_URL,
    forWho: 'Si quieres entender el porqué y arrancar por tu cuenta.',
  },
  {
    id: 'reto',
    eyebrow: 'Reto Método SK · 3 meses',
    name: 'Método SK',
    claim: 'Tu cuerpo cambia cuando el plan tiene método.',
    description:
      'Entrenamiento en casa o en gimnasio y plan de nutrición pensados para 3 meses. Con seguimiento, comunidad y clases en vivo. Sin depender de la motivación.',
    includes: [
      'Plan de entrenamiento de 3 meses, casa o gimnasio',
      'Nutrición por Karen López, nutricionista',
      'Clases en vivo y comunidad de acompañamiento',
      'Acceso a la plataforma con tu progreso y logros',
    ],
    priceNote: 'Acceso 3 meses · Cupos limitados',
    cta: 'Quiero mi cupo',
    external: true,
    href: RETO_URL,
    forWho: 'Si quieres que te lleven de la mano y no soltar a la semana 3.',
  },
]

export const EBOOK = PRODUCTS[0]
export const RETO = PRODUCTS[1]
