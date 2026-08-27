<script setup lang="ts">
import { ref } from 'vue'
import { EBOOK_PRICE, buildEbookUrl } from '@/config/site'
import { useCloudinary } from '@/composables/useCloudinary'
import { useScrollReveal } from '@/composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { y: 40, stagger: 0.07 })

const { scarlett } = useCloudinary()
const cover = scarlett('warm', { w: 900, h: 1200, crop: 'fill', gravity: 'auto' })
const coverSm = scarlett('warm', { w: 560, h: 750, crop: 'fill', gravity: 'auto' })

const ebookHref = buildEbookUrl('home-ebook')

/** Contenido del ebook, tal como está en el funnel. */
const chapters = [
  {
    title: 'Déficit sin drama',
    text: 'Entiende cómo funciona la pérdida de grasa sin pasar hambre ni dañar tu metabolismo.',
  },
  {
    title: 'Tu fórmula de macros',
    text: 'Calcula proteína, carbohidratos y grasas según tu peso y nivel de actividad.',
  },
  {
    title: 'Adiós ansiedad',
    text: 'Aprende a estructurar tus comidas para regular el hambre y mantenerte satisfecha.',
  },
  {
    title: 'Recetas y Scar-Tips',
    text: 'Desayunos, almuerzos, cenas y meriendas con los alimentos que yo misma consumo.',
  },
  {
    title: 'Suplementación inteligente',
    text: 'Proteína, creatina y magnesio explicados sin atajos inútiles ni gastos innecesarios.',
  },
  {
    title: 'Entrenamiento completo',
    text: 'Rutinas de lunes a viernes con biseries y dropsets para conservar masa muscular.',
  },
]

/** La fórmula, en el mismo formato de tira que usa el funnel. */
const macros = [
  { name: 'Proteína', value: '1.6 a 2.2 g/kg', note: 'Protege tu masa muscular.' },
  { name: 'Carbohidratos', value: '2 a 3 g/kg', note: 'Tu fuente real de energía.' },
  { name: 'Grasas', value: '0.8 a 1 g/kg', note: 'Hormonas y saciedad.' },
]
</script>

<template>
  <section id="ebook" ref="root" class="ebook sec sec--dark" data-theme="dark">
    <div class="ebook__inner container">
      <header class="ebook__head">
        <span class="sec__eyebrow" data-reveal>Dentro del ebook</span>
        <h2 class="ebook__title" data-reveal>
          Domina tu proceso.<br /><span class="accent">Sin improvisar.</span>
        </h2>
        <p class="ebook__lead sec__lead" data-reveal>
          Nutrición, hábitos y entrenamiento explicados para que entiendas qué hacer y,
          sobre todo, por qué funciona.
        </p>
      </header>

      <div class="ebook__body">
        <figure class="ebook__figure" data-reveal>
          <img
            class="ebook__img"
            :src="cover"
            :srcset="`${coverSm} 560w, ${cover} 900w`"
            sizes="(max-width: 1024px) 90vw, 40vw"
            alt="Ebook Quema Grasa, Construye Músculo"
            loading="lazy"
            decoding="async"
            width="900"
            height="1200"
          />
          <figcaption class="ebook__tag">Guía paso a paso</figcaption>
        </figure>

        <ol class="ebook__list">
          <li v-for="(ch, i) in chapters" :key="ch.title" class="chapter" data-reveal>
            <span class="chapter__num num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="chapter__body">
              <h3 class="chapter__title">{{ ch.title }}</h3>
              <p class="chapter__text">{{ ch.text }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="macros" data-reveal>
        <div class="macros__label">
          <span class="macros__label-top">Tu fórmula</span>
          <strong class="macros__label-main">Macros sin misterio.</strong>
        </div>
        <div v-for="macro in macros" :key="macro.name" class="macros__item">
          <span class="macros__name">{{ macro.name }}</span>
          <strong class="macros__value">{{ macro.value }}</strong>
          <span class="macros__note">{{ macro.note }}</span>
        </div>
      </div>

      <div class="ebook__cta-row" data-reveal>
        <a class="ebook__cta" :href="ebookHref" target="_blank" rel="noopener noreferrer">
          Quiero mi ebook por ${{ EBOOK_PRICE }}
          <span aria-hidden="true">↗</span>
        </a>
        <p class="ebook__cta-note">Compra digital segura · Pago único · Acceso inmediato</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ebook__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

// Aquí sí va la display en mayúsculas: es la voz del funnel del ebook.
.ebook__title {
  @include display-impact(2.1rem, 4.4rem);
  margin: 0;
  color: var(--s-text);
  text-wrap: balance;
}

.ebook__lead {
  margin: 0;
  max-width: 56ch;
}

.ebook__body {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;

  @include mq-down($bp-lg) {
    grid-template-columns: 1fr;
  }
}

.ebook__figure {
  position: relative;
  margin: 0;
  border-radius: $r-lg;
  overflow: hidden;
  border: 1px solid var(--s-line);

  @include mq-down($bp-lg) {
    max-width: 420px;
    margin-inline: auto;
  }
}

.ebook__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 3 / 4;
}

.ebook__tag {
  @include badge-lime;
  position: absolute;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  white-space: nowrap;
}

.ebook__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.chapter {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem 1.1rem;
  padding-block: clamp(1rem, 2vw, 1.35rem);
  border-bottom: 1px solid var(--s-line);

  &:first-child { padding-top: 0; }
  &:last-child { border-bottom: 0; }
}

.chapter__num {
  @include num;
  line-height: 1.9;
}

.chapter__title {
  font-family: $font-sans;
  font-weight: 700;
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: var(--s-text);
  margin: 0 0 0.3rem;
}

.chapter__text {
  @include body;
  margin: 0;
}

// ── Tira de macros ───────────────────────────────────────────────────────────
.macros {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  border: 1px solid var(--s-line);
  border-radius: $r-md;
  overflow: hidden;

  @include mq-down($bp-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mq-down($bp-sm) {
    grid-template-columns: 1fr;
  }
}

.macros__label,
.macros__item {
  padding: clamp(1.1rem, 2vw, 1.5rem);
  border-right: 1px solid var(--s-line);

  &:last-child { border-right: 0; }

  @include mq-down($bp-lg) {
    border-bottom: 1px solid var(--s-line);
  }
}

.macros__label {
  background: $lpb-green;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-right-color: transparent;
}

.macros__label-top {
  font-family: $font-mono;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba($lpb-white, 0.75);
}

.macros__label-main {
  font-family: $font-display;
  font-size: 1.05rem;
  font-weight: 600;
  color: $lpb-white;
}

.macros__item {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}

.macros__name {
  font-family: $font-mono;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: $lpb-gold;
}

.macros__value {
  font-family: $font-sans;
  font-weight: 700;
  font-size: 1rem;
  color: var(--s-text);
}

.macros__note {
  @include body;
  font-size: 0.85rem;
}

// ── CTA ──────────────────────────────────────────────────────────────────────
.ebook__cta-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
}

.ebook__cta {
  @include btn-primary;
  text-decoration: none;
  padding-inline: clamp(2rem, 5vw, 3.2rem);
}

.ebook__cta-note {
  font-family: $font-mono;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--s-mute);
  margin: 0;
}
</style>
