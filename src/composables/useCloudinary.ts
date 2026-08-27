import { CLOUDINARY_CDN } from '@/config/site'

interface ImgOpts {
  w?: number
  h?: number
  /**
   * Relación de aspecto. OJO: combinar `ar` con `w` y `c_fill` devuelve 400 en
   * esta cuenta; usa `w` + `h` explícitos en su lugar.
   */
  ar?: string         // ej. '4:5' '16:9'
  crop?: 'fill' | 'fit' | 'thumb' | 'scale' | 'pad'
  gravity?: 'face' | 'auto' | 'center' | 'east' | 'west'
  /**
   * Relleno para `crop: 'pad'`. `auto:predominant` extiende el color dominante
   * de la foto, lo que continúa un fondo de estudio sin que se note el borde.
   */
  background?: 'auto' | 'auto:predominant' | 'gen_fill'
  quality?: 'auto' | number
  format?: 'auto' | 'avif' | 'webp' | 'jpg'
  dpr?: number | 'auto'
  blur?: number
}

const build = (opts: ImgOpts): string => {
  const parts: string[] = []
  if (opts.w) parts.push(`w_${opts.w}`)
  if (opts.h) parts.push(`h_${opts.h}`)
  if (opts.ar) parts.push(`ar_${opts.ar.replace(':', '_')}`)
  if (opts.crop) parts.push(`c_${opts.crop}`)
  if (opts.gravity) parts.push(`g_${opts.gravity}`)
  if (opts.background) parts.push(`b_${opts.background}`)
  parts.push(`q_${opts.quality ?? 'auto'}`)
  parts.push(`f_${opts.format ?? 'auto'}`)
  if (opts.dpr) parts.push(`dpr_${opts.dpr}`)
  if (opts.blur) parts.push(`e_blur:${opts.blur}`)
  return parts.join(',')
}

export const useCloudinary = () => {
  const img = (publicId: string, opts: ImgOpts = {}) =>
    `${CLOUDINARY_CDN}/${build(opts)}/${publicId}`

  /**
   * Sesión de fotos vigente (carpeta `metodosk/` en Cloudinary), la misma que
   * usa metodosk.ec. Sustituye a la sesión antigua de `scarlett/quema-grasa-*`,
   * donde Scarlett aparecía pelirroja y ya no corresponde a su imagen actual.
   *
   * Quién es quién, según la ficha de equipo del propio metodosk.ec:
   *   Scarlet Córdova (entrenamiento) -> sk-13   @scarlettcordova9
   *   Karen López     (nutrición)     -> sk-05   @nutricionistakarenlopez
   * Toda la serie sk-13..sk-16 es Scarlett en la misma sesión.
   */
  const photos = {
    /** Cuerpo entero sentada, con aire a la izquierda para el titular. */
    heroine: 'sk-13',
    /** Primer plano de rostro: funciona en miniaturas y en recortes 1200x630. */
    portrait: 'sk-14',
    /** Sonriendo, sentada — cálida, para la portada del ebook. */
    warm: 'sk-15',
    /** Retrato de tres cuartos, sobrio — para el lateral de autenticación. */
    editorial: 'sk-16',
    /** Scarlett y Karen juntas. */
    duo: 'sk-18',
    /** Karen López, nutricionista. */
    karen: 'sk-05',
  } as const

  type PhotoKey = keyof typeof photos

  const scarlett = (key: PhotoKey, opts: ImgOpts = {}) =>
    img(`metodosk/${photos[key]}`, opts)

  return { img, scarlett, build, photos }
}

// Fallback estático para SSR-friendly templates: srcSet construido
export const buildSrcSet = (publicId: string, widths: number[], opts: Omit<ImgOpts, 'w'> = {}) =>
  widths
    .map((w) => {
      const t = build({ ...opts, w })
      return `${CLOUDINARY_CDN}/${t}/${publicId} ${w}w`
    })
    .join(', ')
