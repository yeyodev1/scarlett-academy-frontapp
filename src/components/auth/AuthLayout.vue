<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BrandWordmark from '@/components/ui/BrandWordmark.vue'
import { useCloudinary } from '@/composables/useCloudinary'

defineProps<{
  title: string
  subtitle?: string
}>()

const { scarlett } = useCloudinary()
const aside = scarlett('editorial', { w: 1100, h: 1500, crop: 'fill', gravity: 'face' })
const asideSm = scarlett('editorial', { w: 700, h: 950, crop: 'fill', gravity: 'face' })
</script>

<template>
  <section class="auth">
    <!-- Columna editorial: da contexto de marca a quien llega desde un correo -->
    <aside class="auth__aside" aria-hidden="true">
      <img
        class="auth__aside-img"
        :src="aside"
        :srcset="`${asideSm} 700w, ${aside} 1100w`"
        sizes="45vw"
        alt=""
        loading="lazy"
        decoding="async"
        width="1100"
        height="1500"
      />
      <div class="auth__aside-veil" />
      <blockquote class="auth__quote">
        Tu cuerpo cambia cuando el plan <em>tiene método.</em>
      </blockquote>
    </aside>

    <div class="auth__main">
      <div class="auth__card">
        <RouterLink :to="{ name: 'home' }" class="auth__brand">
          <BrandWordmark size="sm" />
        </RouterLink>

        <h1 class="auth__title">{{ title }}</h1>
        <p v-if="subtitle" class="auth__subtitle">{{ subtitle }}</p>

        <slot />
      </div>

      <RouterLink :to="{ name: 'home' }" class="auth__back">← Volver al sitio</RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.auth {
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  background: $lpb-paper;

  @include mq-down($bp-lg) {
    grid-template-columns: 1fr;
  }
}

// ── Columna de imagen ────────────────────────────────────────────────────────
// Por debajo de $bp-lg no se oculta: pasa a ser el fondo de toda la pantalla,
// con la tarjeta del formulario flotando encima. Antes desaparecía y la
// pantalla quedaba sin ninguna foto de marca.
.auth__aside {
  position: relative;
  overflow: hidden;
  background: $lpb-black;

  @include mq-down($bp-lg) {
    position: fixed;
    inset: 0;
    z-index: 0;
  }
}

.auth__aside-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.auth__aside-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba($lpb-black, 0.32) 0%,
    rgba($lpb-black, 0.2) 45%,
    rgba($lpb-black, 0.9) 100%
  );

  @include mq-down($bp-lg) {
    background: linear-gradient(180deg, rgba($lpb-black, 0.55) 0%, rgba($lpb-black, 0.75) 100%);
  }
}

.auth__quote {
  position: absolute;
  inset: auto clamp(2rem, 4vw, 3.5rem) clamp(2.5rem, 5vw, 4rem);
  margin: 0;
  @include display(1.6rem, 2.5rem);
  color: $lpb-light;
  max-width: 16ch;

  em {
    font-style: italic;
    color: $lpb-green;
  }

  @include mq-down($bp-lg) { display: none; }
}

// ── Columna del formulario ───────────────────────────────────────────────────
.auth__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.25rem, 5vw, 3.5rem);

  @include mq-down($bp-lg) {
    position: relative;
    z-index: 1;
  }
}

.auth__card {
  width: 100%;
  max-width: 430px;

  // Sobre la foto necesita superficie propia para que el formulario se lea.
  @include mq-down($bp-lg) {
    background: rgba($lpb-paper, 0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba($lpb-black, 0.08);
    border-radius: $r-lg;
    padding: clamp(1.5rem, 6vw, 2.25rem);
    box-shadow: $shadow-lg;
  }
}

.auth__brand {
  display: inline-flex;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  color: $lpb-black;
}

.auth__title {
  @include display(1.9rem, 2.7rem);
  margin: 0 0 0.6rem;
  color: $lpb-black;
  text-wrap: balance;
}

.auth__subtitle {
  @include body;
  margin: 0 0 1.9rem;
  max-width: 42ch;
}

.auth__back {
  font-family: $font-mono;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $lpb-muted;
  text-decoration: none;

  &:hover { color: $lpb-green; }

  @include mq-down($bp-lg) {
    color: rgba($lpb-light, 0.75);
    &:hover { color: $lpb-gold; }
  }
}
</style>
