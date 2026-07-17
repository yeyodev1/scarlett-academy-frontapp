<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCloudinary } from '@/composables/useCloudinary'

const { scarlett } = useCloudinary()

const heroImage = scarlett(11, { w: 1600, h: 2200, crop: 'fill', gravity: 'face' })
const heroImageSm = scarlett(11, { w: 720, h: 1100, crop: 'fill', gravity: 'face' })
const heroImageMd = scarlett(11, { w: 1100, h: 1500, crop: 'fill', gravity: 'face' })
const heroImageLg = scarlett(11, { w: 2000, h: 2600, crop: 'fill', gravity: 'face' })
</script>

<template>
  <section class="presale-hero" data-theme="dark">
    <div class="presale-hero__media">
      <img
        class="presale-hero__image"
        :src="heroImage"
        :srcset="`${heroImageSm} 720w, ${heroImageMd} 1100w, ${heroImage} 1600w, ${heroImageLg} 2000w`"
        sizes="100vw"
        alt="Scarlett Cordova — Quema Grasa, Construye Músculo"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="1600"
        height="2200"
      />
      <div class="presale-hero__veil" aria-hidden="true" />
    </div>

    <div class="presale-hero__inner">
      <span class="presale-hero__eyebrow eyebrow eyebrow--green">
        <span class="presale-hero__dot" aria-hidden="true" />
        SCARLETT CORDOVA · ACADEMIA DIGITAL
      </span>

      <h1 class="presale-hero__title display-xl">
        Quema Grasa,<br>Construye Músculo
      </h1>

      <p class="presale-hero__lede">
        Tu espacio para aprender nutrición, dominar tus macros y entrenar con ciencia,
        estrategia y amor propio.
      </p>

      <div class="presale-hero__cta-row">
        <RouterLink :to="{ name: 'login' }" class="presale-hero__link">
          Entrar a mi cuenta
        </RouterLink>
        <RouterLink :to="{ name: 'register' }" class="presale-hero__secondary">
          Crear cuenta
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.presale-hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-block: clamp(6.5rem, 14vh, 9rem) clamp(2rem, 6vw, 4.5rem);
  background: $lpb-black;
  color: $lpb-white;
  overflow: hidden;
  isolation: isolate;
}

.presale-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: clip;
}

.presale-hero__image {
  position: absolute;
  inset: -10% 0;
  width: 100%;
  height: 120%;
  object-fit: cover;
  object-position: center 25%;
  background-color: $lpb-black;
}

.presale-hero__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 80% at 50% 110%, rgba($lpb-black, 0.95) 30%, rgba($lpb-black, 0.35) 70%, rgba($lpb-black, 0) 100%),
    linear-gradient(180deg, rgba($lpb-black, 0.65) 0%, rgba($lpb-black, 0.2) 40%, rgba($lpb-black, 0.85) 100%);
}

.presale-hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.6vw, 1.5rem);
  width: 100%;
  padding-inline: clamp(2.5rem, 9vw, 9rem);
  margin-inline: auto;
  max-width: 1440px;

  @media (max-width: 720px) {
    align-items: center;
    text-align: center;
  }
}

.presale-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: $lpb-green;
  width: max-content;

  @media (max-width: 720px) {
    margin-inline: auto;
  }
}

.presale-hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $lpb-green;
  box-shadow: 0 0 0 4px rgba($lpb-green, 0.25);
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  50% { box-shadow: 0 0 0 10px rgba($lpb-green, 0); }
}

.presale-hero__title {
  margin: 0;
  color: $lpb-white;
  max-width: 16ch;

  @media (max-width: 720px) {
    margin-inline: auto;
  }
}

.presale-hero__lede {
  font-family: $font-sans;
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
  line-height: 1.55;
  color: rgba($lpb-white, 0.78);
  max-width: 52ch;
  margin: 0;

  @media (max-width: 720px) {
    margin-inline: auto;
  }
}

.presale-hero__countdown {
  margin-top: 0.5rem;

  @media (max-width: 720px) {
    margin-inline: auto;
  }
}

.presale-hero__countdown-label {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba($lpb-white, 0.7);
  margin: 0 0 0.75rem;
}

.presale-hero__cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
  margin-top: clamp(1rem, 2vw, 1.75rem);

  @media (max-width: 720px) {
    justify-content: center;
    margin-inline: auto;
  }

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.1rem;

    :deep(.btn) {
      width: 100%;
      justify-content: space-between;
    }
  }
}

.presale-hero__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 1.15rem 1.95rem;
  border-radius: 999px;
  background: $lpb-green;
  color: $lpb-black;
  font-family: $font-mono;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: $lpb-green-dark;
    color: $lpb-white;
    transform: translateY(-2px);
  }
}

.presale-hero__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.05rem 1.7rem;
  border: 1px solid rgba($lpb-white, 0.35);
  border-radius: 999px;
  color: $lpb-white;
  font-family: $font-mono;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
