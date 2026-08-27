<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCloudinary } from '@/composables/useCloudinary'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { scarlett } = useCloudinary()
const root = ref<HTMLElement | null>(null)

useScrollReveal(root, { y: 34, stagger: 0.09, start: 'top 95%' })

/**
 * Las fotos rotan con fundido. Sin recortes ni rellenos: Cloudinary solo
 * redimensiona y el encuadre lo decide `object-fit: cover`. Se probaron antes
 * `g_auto` (zoom cerrado al rostro) y lienzos extendidos con
 * `b_auto:predominant` / `b_gen_fill` (inventaban fondo y se veía la costura).
 */
const SLIDE_MS = 6000

const slides = (['heroine', 'editorial', 'portrait', 'warm'] as const).map((key) => ({
  key,
  src: scarlett(key, { w: 1600 }),
  srcset: [
    `${scarlett(key, { w: 760 })} 760w`,
    `${scarlett(key, { w: 1100 })} 1100w`,
    `${scarlett(key, { w: 1600 })} 1600w`,
    `${scarlett(key, { w: 2000 })} 2000w`,
  ].join(', '),
}))

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

/** Respeta a quien pidió menos movimiento: se queda en la primera foto. */
const wantsMotion = () =>
  typeof window === 'undefined' ||
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const start = () => {
  if (timer || slides.length < 2 || !wantsMotion()) return
  timer = setInterval(() => {
    current.value = (current.value + 1) % slides.length
  }, SLIDE_MS)
}

const stop = () => {
  if (!timer) return
  clearInterval(timer)
  timer = null
}

// Con la pestaña en segundo plano no tiene sentido seguir rotando.
const onVisibility = () => (document.hidden ? stop() : start())

onMounted(() => {
  // Las siguientes fotos se calientan en segundo plano antes de empezar a rotar:
  // sin esto el primer fundido puede mostrar un fotograma vacío. La primera no
  // se toca para no competir con el LCP.
  slides.slice(1).forEach((slide) => {
    const img = new Image()
    img.decoding = 'async'
    img.srcset = slide.srcset
    img.sizes = '100vw'
    img.src = slide.src
  })

  start()
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  stop()
  document.removeEventListener('visibilitychange', onVisibility)
})

/** Los tres datos que resumen la oferta antes de que bajen a leer. */
const stats = [
  { value: '2', label: 'caminos para empezar' },
  { value: '3', label: 'meses de plan en el reto' },
  { value: '$33', label: 'para arrancar hoy con el ebook' },
]
</script>

<template>
  <section ref="root" class="hero" data-theme="dark">
    <div class="hero__media">
      <img
        v-for="(slide, i) in slides"
        :key="slide.key"
        class="hero__image"
        :class="{ 'hero__image--active': i === current }"
        :src="slide.src"
        :srcset="slide.srcset"
        sizes="100vw"
        :alt="i === 0 ? 'Scarlett Cordova' : ''"
        :aria-hidden="i === 0 ? undefined : 'true'"
        :loading="i === 0 ? 'eager' : 'lazy'"
        :fetchpriority="i === 0 ? 'high' : 'low'"
        decoding="async"
        width="1600"
        height="2400"
      />
      <div class="hero__veil" aria-hidden="true" />
    </div>

    <div class="hero__inner">
      <span class="hero__eyebrow" data-reveal>
        <span class="hero__dot" aria-hidden="true" />
        Scarlett Cordova · Nutrición + Entrenamiento
      </span>

      <h1 class="hero__title" data-reveal>
        Deja de <em>improvisar</em><br />con tu cuerpo.
      </h1>

      <p class="hero__lead" data-reveal>
        Dos formas de empezar, un mismo método: ciencia, estrategia y cero castigo.
        Elige la que va con el momento en el que estás hoy.
      </p>

      <div class="hero__actions" data-reveal>
        <a class="hero__cta" href="#productos">
          Ver los dos caminos
          <span aria-hidden="true">↓</span>
        </a>
        <RouterLink class="hero__ghost" :to="{ name: 'login' }">
          Entrar a mi cuenta
        </RouterLink>
      </div>

      <dl class="hero__stats" data-reveal>
        <div v-for="stat in stats" :key="stat.label" class="hero__stat">
          <dt class="hero__stat-value">{{ stat.value }}</dt>
          <dd class="hero__stat-label">{{ stat.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-block: clamp(7rem, 15vh, 10rem) clamp(2.5rem, 6vw, 5rem);
  background: $lpb-black;
  color: $lpb-light;
  overflow: hidden;
  isolation: isolate;
  --s-accent: #{$lpb-green};
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: clip;
}

// Las fotos se apilan y solo la activa es visible; el resto espera con
// opacidad 0, así el cambio es un fundido y no un salto.
.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  // La foto es vertical y el hero apaisado: `cover` recorta en altura, así que
  // esto elige qué franja se ve. 14% deja el rostro arriba y el torso al centro.
  object-position: center 14%;
  background-color: $lpb-black;
  opacity: 0;
  transition: opacity 1.4s ease-in-out;

  &--active { opacity: 1; }

  @include mq-down($bp-md) {
    object-position: center 8%;
  }

  @include reduced-motion {
    transition: none;
  }
}

// El titular va abajo a la izquierda: el degradado oscurece esa esquina y deja
// limpia la parte alta, donde queda el rostro.
.hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba($lpb-black, 0.55) 0%, rgba($lpb-black, 0) 28%),
    linear-gradient(0deg, rgba($lpb-black, 0.96) 0%, rgba($lpb-black, 0.75) 26%, rgba($lpb-black, 0) 62%),
    linear-gradient(90deg, rgba($lpb-black, 0.8) 0%, rgba($lpb-black, 0.3) 38%, rgba($lpb-black, 0) 66%);

  @include mq-down($bp-md) {
    background:
      linear-gradient(180deg, rgba($lpb-black, 0.6) 0%, rgba($lpb-black, 0) 26%),
      linear-gradient(0deg, rgba($lpb-black, 0.96) 0%, rgba($lpb-black, 0.7) 32%, rgba($lpb-black, 0) 66%);
  }
}

.hero__inner {
  @include container;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(1rem, 1.8vw, 1.6rem);
}

.hero__eyebrow {
  @include eyebrow($lpb-gold);
  &::before { display: none; }
}

.hero__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $lpb-gold;
  box-shadow: 0 0 0 4px rgba($lpb-gold, 0.22);
  animation: hero-pulse 2s ease-in-out infinite;

  @include reduced-motion { animation: none; }
}

@keyframes hero-pulse {
  50% { box-shadow: 0 0 0 11px rgba($lpb-gold, 0); }
}

.hero__title {
  @include display(2.9rem, 6rem);
  margin: 0;
  color: $lpb-light;
  max-width: 15ch;
  text-wrap: balance;

  em {
    font-style: italic;
    color: $lpb-green;
  }
}

.hero__lead {
  @include body-lg;
  color: rgba($lpb-light, 0.8);
  max-width: 46ch;
  margin: 0;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem 1rem;
  margin-top: clamp(0.5rem, 1.5vw, 1rem);

  @include mq-down($bp-sm) {
    flex-direction: column;
    align-self: stretch;
  }
}

.hero__cta {
  @include btn-primary;
  text-decoration: none;
}

.hero__ghost {
  @include btn-ghost;
  color: $lpb-light;
  border-color: rgba($lpb-light, 0.32);
  text-decoration: none;

  &:hover {
    color: $lpb-gold;
    border-color: $lpb-gold;
  }
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  margin: clamp(1.5rem, 3vw, 2.5rem) 0 0;
  padding-top: clamp(1.25rem, 2.5vw, 2rem);
  border-top: 1px solid rgba($lpb-light, 0.16);
  width: 100%;
  max-width: 640px;
}

.hero__stat {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.hero__stat-value {
  @include display(1.6rem, 2.2rem);
  color: $lpb-light;
  margin: 0;
}

.hero__stat-label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba($lpb-light, 0.55);
  margin: 0;
  max-width: 14ch;
  line-height: 1.35;
}
</style>
