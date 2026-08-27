<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCloudinary } from '@/composables/useCloudinary'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { scarlett } = useCloudinary()
const root = ref<HTMLElement | null>(null)

useScrollReveal(root, { y: 34, stagger: 0.09, start: 'top 95%' })

const opts = { crop: 'fill', gravity: 'face' } as const

// Escritorio: recorte apaisado, el retrato ocupa la mitad derecha.
const heroImage = scarlett(11, { w: 1600, h: 2200, ...opts })
const heroImageMd = scarlett(11, { w: 1100, h: 1500, ...opts })
const heroImageLg = scarlett(11, { w: 2000, h: 2600, ...opts })

// Móvil: el contenedor es mucho más estrecho y `cover` recortaba a la altura
// del torso. Se pide a Cloudinary un 9:16 centrado en el rostro.
const heroMobile = scarlett(11, { w: 780, h: 1387, ...opts })
const heroMobileSm = scarlett(11, { w: 520, h: 924, ...opts })

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
      <picture>
        <source
          media="(max-width: 768px)"
          :srcset="`${heroMobileSm} 520w, ${heroMobile} 780w`"
          sizes="100vw"
        />
        <img
          class="hero__image"
          :src="heroImage"
          :srcset="`${heroImageMd} 1100w, ${heroImage} 1600w, ${heroImageLg} 2000w`"
          sizes="100vw"
          alt="Scarlett Cordova"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          width="1600"
          height="2200"
        />
      </picture>
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

.hero__image {
  position: absolute;
  inset: -8% 0;
  width: 100%;
  height: 116%;
  object-fit: cover;
  object-position: 70% 22%;
  background-color: $lpb-black;

  @include mq-down($bp-md) {
    // La fuente 9:16 ya viene encuadrada al rostro: basta anclar arriba.
    object-position: center top;
  }
}

// <picture> es inline por defecto y rompía el posicionado absoluto del <img>.
.hero__media picture {
  display: contents;
}

// Velo en dos capas. La horizontal oscurece SOLO la columna del texto; la
// vertical se corta antes de la mitad derecha (mask) para no sumarse sobre la
// foto y dejarla negra.
.hero__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    95deg,
    rgba($lpb-black, 0.92) 0%,
    rgba($lpb-black, 0.82) 30%,
    rgba($lpb-black, 0.35) 58%,
    rgba($lpb-black, 0) 80%
  );

  // Pie oscuro para empalmar con el marquee, sin ensuciar el retrato.
  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 45%;
    background: linear-gradient(180deg, rgba($lpb-black, 0) 0%, rgba($lpb-black, 0.85) 100%);
  }

  @include mq-down($bp-md) {
    background: linear-gradient(
      180deg,
      rgba($lpb-black, 0.72) 0%,
      rgba($lpb-black, 0.3) 34%,
      rgba($lpb-black, 0.88) 82%
    );

    &::after { display: none; }
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
