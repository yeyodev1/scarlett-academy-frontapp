<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PRODUCTS, EBOOK_PRICE, buildEbookUrl, buildRetoUrl } from '@/config/site'
import { usePricing } from '@/composables/usePricing'
import { useScrollReveal } from '@/composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { y: 44, stagger: 0.12 })

const { load, currentPrice, regularPrice, isPresale } = usePricing()
onMounted(() => load())

/** Precio a mostrar por producto: el del ebook es fijo, el del reto lo manda el backend. */
const priceOf = (id: string) => (id === 'ebook' ? EBOOK_PRICE : currentPrice.value)

/** Cada producto se compra en su propio funnel: este sitio no cobra. */
const hrefOf = (id: string) =>
  id === 'ebook' ? buildEbookUrl('home-productos') : buildRetoUrl('home-productos')
</script>

<template>
  <section id="productos" ref="root" class="products sec sec--cream">
    <div class="products__inner container">
      <header class="products__head">
        <span class="products__eyebrow sec__eyebrow" data-reveal>Elige tu camino</span>
        <h2 class="products__title sec__title" data-reveal>
          Dos maneras de empezar.<br /><span class="accent">Un mismo método.</span>
        </h2>
        <p class="products__lead sec__lead" data-reveal>
          No compiten entre sí. El ebook te da el conocimiento para entender qué hacer;
          el reto te da el plan, el seguimiento y la comunidad para sostenerlo tres meses.
        </p>
      </header>

      <div class="products__grid">
        <article
          v-for="(product, i) in PRODUCTS"
          :key="product.id"
          class="card"
          :class="`card--${product.id}`"
          data-reveal
        >
          <div class="card__top">
            <span class="card__num num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span v-if="product.id === 'reto'" class="card__flag badge-lime">Más completo</span>
          </div>

          <p class="card__eyebrow">{{ product.eyebrow }}</p>
          <h3 class="card__name">{{ product.name }}</h3>
          <p class="card__claim">{{ product.claim }}</p>
          <p class="card__desc">{{ product.description }}</p>

          <ul class="card__list">
            <li v-for="item in product.includes" :key="item" class="card__item">
              <span class="card__check" aria-hidden="true">✦</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <p class="card__for">{{ product.forWho }}</p>

          <footer class="card__foot">
            <div class="card__price-block">
              <span class="card__price">
                <span class="card__currency">$</span>{{ priceOf(product.id) }}
              </span>
              <span
                v-if="product.id === 'reto' && isPresale && regularPrice > currentPrice"
                class="card__strike"
              >${{ regularPrice }}</span>
              <span class="card__price-note">{{ product.priceNote }}</span>
            </div>

            <a
              class="card__cta"
              :href="hrefOf(product.id)"
              :target="product.external ? '_blank' : undefined"
              :rel="product.external ? 'noopener noreferrer' : undefined"
            >
              {{ product.cta }}
              <span aria-hidden="true">{{ product.external ? '↗' : '→' }}</span>
            </a>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.products__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.products__title {
  margin: 0;
  text-wrap: balance;
}

.products__lead {
  margin: 0;
  max-width: 62ch;
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.25rem, 2.5vw, 2rem);
  align-items: stretch;

  @include mq-down($bp-lg) {
    grid-template-columns: 1fr;
    max-width: 620px;
    margin-inline: auto;
  }
}

// ── Tarjeta de producto ──────────────────────────────────────────────────────
.card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  border-radius: $r-lg;
  border: 1px solid var(--s-line);
  transition: transform 0.5s $ease-out, box-shadow 0.5s $ease-out;

  &:hover {
    transform: translateY(-6px);
    box-shadow: $shadow-lg;
  }

  @include reduced-motion {
    &:hover { transform: none; }
  }
}

// El ebook hereda el lenguaje oscuro de su propio funnel: reconocible al instante.
.card--ebook {
  @include surface-dark;
  border-color: rgba($lpb-light, 0.14);
}

.card--reto {
  @include surface-light;
  border-color: rgba($lpb-black, 0.12);
  box-shadow: $shadow-sm;
}

.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
}

.card__num { @include num; }

.card__eyebrow {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--s-mute);
  margin: 0;
}

.card__name {
  @include display(1.9rem, 2.9rem);
  margin: 0;
  color: var(--s-text);
  text-wrap: balance;
}

.card__claim {
  @include body-lg;
  color: var(--s-accent);
  font-weight: 600;
  margin: 0;
}

.card__desc {
  @include body;
  margin: 0;
}

.card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0.6rem 0 0;
  padding: 0;
}

.card__item {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--s-soft);
}

.card__check {
  color: var(--s-accent);
  font-size: 0.72rem;
  line-height: 1.7;
  flex: none;
}

.card__for {
  font-family: $font-display;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.45;
  color: var(--s-mute);
  margin: 0.4rem 0 0;
  padding-left: 0.9rem;
  border-left: 2px solid var(--s-accent);
}

.card__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: auto;
  padding-top: clamp(1.4rem, 2.5vw, 2rem);
  border-top: 1px solid var(--s-line);
}

.card__price-block {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card__price {
  @include display(2rem, 2.6rem);
  color: var(--s-text);
  line-height: 1;
}

.card__currency {
  font-size: 0.5em;
  vertical-align: super;
  margin-right: 0.08em;
}

.card__strike {
  font-family: $font-mono;
  font-size: 0.95rem;
  color: var(--s-mute);
  text-decoration: line-through;
}

.card__price-note {
  flex-basis: 100%;
  font-family: $font-mono;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--s-mute);
}

.card__cta {
  @include btn-primary;
  text-decoration: none;
}

@include mq-down($bp-sm) {
  .card__foot { flex-direction: column; align-items: stretch; }
  .card__cta { width: 100%; }
}
</style>
