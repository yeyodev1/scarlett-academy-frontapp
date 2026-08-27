<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { buildRetoUrl } from '@/config/site'
import { usePricing } from '@/composables/usePricing'
import { useScrollReveal } from '@/composables/useScrollReveal'
import CountdownTimer from './CountdownTimer.vue'

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '593999999999'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { y: 38, stagger: 0.07 })

/** Los cuatro pilares del reto, numerados como en el resto del sitio. */
const features = [
  {
    title: 'Entrenamiento con progresión',
    text: 'Plan de casa o gimnasio con cargas que avanzan cada mes. Sabes qué hacer cada día.',
  },
  {
    title: 'Nutrición por Karen López',
    text: 'Plan flexible armado por nutricionista. Sin dietas imposibles ni alimentos prohibidos.',
  },
  {
    title: 'Clases en vivo y comunidad',
    text: 'Entrenamos juntas y resuelves dudas en vivo. No es un PDF que abres una vez.',
  },
  {
    title: 'Plataforma con tu progreso',
    text: 'Cursos, recetas, horario y logros en un solo lugar, con tu avance guardado.',
  },
]

/** Lo que entra en el precio — versión corta para la tarjeta. */
const included = [
  'Entrenamiento casa o gimnasio',
  'Plan de nutrición flexible',
  'Clases en vivo',
  'Comunidad privada',
  'Acceso completo a la plataforma',
]

// Precio, fecha de fin de preventa y duración vienen del backend
// (GET /api/presale/status). Cuando pasa la fecha, el precio sube solo.
const {
  load,
  currentPrice,
  regularPrice,
  isPresale,
  accessMonths,
  deadline,
  pricing,
} = usePricing()

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Hola, quiero información sobre el reto del Método SK.',
)}`

/** La compra ocurre en metodosk.ec: este sitio solo presenta la oferta. */
const retoUrl = buildRetoUrl('home-reto')

const deadlineLabel = () =>
  deadline.value.toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

onMounted(() => load())

/** Pixel: el clic hacia el funnel es el evento de intención de compra. */
function trackCheckoutIntent() {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      content_name: 'Reto Método SK',
      content_type: 'product',
      value: currentPrice.value,
      currency: 'USD',
    })
  }
}
</script>

<template>
  <section id="reto" ref="root" class="reto sec sec--light">
    <div class="reto__inner container">
      <div class="reto__grid">
        <!-- Columna de contenido -->
        <div class="reto__content">
          <span class="sec__eyebrow" data-reveal>Reto Método SK · {{ accessMonths }} meses</span>

          <h2 class="reto__title sec__title" data-reveal>
            Tu cuerpo cambia cuando el plan <span class="accent">tiene método.</span>
          </h2>

          <p class="reto__lead sec__lead" data-reveal>
            <template v-if="isPresale">
              Entrenamiento en casa o en gimnasio y plan de nutrición pensados para
              {{ accessMonths }} meses. Precio de preventa por tiempo limitado.
            </template>
            <template v-else>
              Entrenamiento en casa o en gimnasio y plan de nutrición pensados para
              {{ accessMonths }} meses. Un solo pago, acceso completo.
            </template>
          </p>

          <ul class="reto__features">
            <li v-for="(feature, i) in features" :key="feature.title" class="feature" data-reveal>
              <span class="feature__num num">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="feature__title">{{ feature.title }}</h3>
                <p class="feature__text">{{ feature.text }}</p>
              </div>
            </li>
          </ul>

          <div v-if="isPresale" class="reto__countdown" data-reveal>
            <span class="reto__countdown-label">
              La preventa termina el {{ deadlineLabel() }} · después sube a USD {{ regularPrice }}
            </span>
            <CountdownTimer :deadline="pricing.deadline" />
          </div>
        </div>

        <!-- Tarjeta de precio -->
        <aside class="reto__aside" data-reveal>
          <div class="price-card">
            <span class="price-card__badge badge-lime">
              {{ isPresale ? 'Preventa activa' : 'Mejor valor' }}
            </span>

            <p class="price-card__name">El reto completo</p>

            <div class="price-card__price">
              <span class="price-card__currency">$</span>
              <span class="price-card__amount">{{ currentPrice }}</span>
            </div>

            <p class="price-card__period">
              Pago único · acceso {{ accessMonths }} meses
            </p>

            <p v-if="isPresale && regularPrice > currentPrice" class="price-card__compare">
              Antes <s>USD {{ regularPrice }}</s> — ahorras USD {{ regularPrice - currentPrice }}
            </p>

            <ul class="price-card__list">
              <li v-for="item in included" :key="item">
                <span class="price-card__check" aria-hidden="true">✦</span>{{ item }}
              </li>
            </ul>

            <a
              class="price-card__cta"
              :href="retoUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click="trackCheckoutIntent"
            >
              Quiero mi cupo
              <span aria-hidden="true">↗</span>
            </a>

            <div class="price-card__links">
              <a :href="whatsappUrl" target="_blank" rel="noopener" class="price-card__link">
                Tengo una pregunta antes de pagar
              </a>
              <RouterLink :to="{ name: 'home', hash: '#productos' }" class="price-card__link">
                Comparar con el ebook
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.reto__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(2.5rem, 6vw, 5.5rem);
  align-items: start;

  @include mq-down($bp-lg) {
    grid-template-columns: 1fr;
  }
}

.reto__content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.reto__title {
  margin: 0;
  text-wrap: balance;
}

.reto__lead {
  margin: 0;
}

// ── Lo que incluye, numerado ─────────────────────────────────────────────────
.reto__features {
  list-style: none;
  margin: clamp(0.75rem, 2vw, 1.5rem) 0 0;
  padding: 0;
}

.feature {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.3rem 1rem;
  padding-block: clamp(0.9rem, 1.8vw, 1.2rem);
  border-bottom: 1px solid var(--s-line);

  &:last-child { border-bottom: 0; }
}

.feature__num { line-height: 1.9; }

.feature__title {
  font-family: $font-display;
  font-weight: 600;
  font-size: clamp(1.05rem, 1.7vw, 1.25rem);
  color: var(--s-text);
  margin: 0 0 0.25rem;
}

.feature__text {
  @include body;
  margin: 0;
}

// ── Countdown ────────────────────────────────────────────────────────────────
.reto__countdown {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: clamp(1rem, 2vw, 1.75rem);
  padding: clamp(1.1rem, 2.5vw, 1.6rem);
  border: 1px solid var(--s-line);
  border-radius: $r-md;
  background: $lpb-cream;
}

.reto__countdown-label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.5;
  color: var(--s-mute);
}

// El contador se diseñó para fondo oscuro; aquí va sobre crema.
.reto__countdown :deep(.countdown__value) { color: $lpb-black; }
.reto__countdown :deep(.countdown__label) { color: $lpb-muted; }

// ── Tarjeta de precio ────────────────────────────────────────────────────────
.reto__aside {
  position: sticky;
  top: clamp(5.5rem, 9vw, 7rem);

  @include mq-down($bp-lg) {
    position: static;
  }
}

.price-card {
  @include surface-dark;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: clamp(1.75rem, 3.5vw, 2.5rem);
  border-radius: $r-lg;
  border: 1px solid rgba($lpb-light, 0.14);
  box-shadow: $shadow-lg;
}

.price-card__badge { align-self: flex-start; }

.price-card__name {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--s-mute);
  margin: 0.4rem 0 0;
}

.price-card__price {
  display: flex;
  align-items: flex-start;
  gap: 0.15rem;
}

.price-card__currency {
  @include display(1.4rem, 1.7rem);
  color: var(--s-text);
  margin-top: 0.35rem;
}

.price-card__amount {
  @include display(3.2rem, 4.6rem);
  color: var(--s-text);
  line-height: 1;
}

.price-card__period {
  font-family: $font-mono;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--s-mute);
  margin: 0;
}

.price-card__compare {
  @include body;
  font-size: 0.88rem;
  margin: 0;

  s { opacity: 0.65; }
}

.price-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin: 0.9rem 0;
  padding: 0.9rem 0 0;
  border-top: 1px solid var(--s-line);

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-family: $font-sans;
    font-size: 0.93rem;
    line-height: 1.5;
    color: var(--s-soft);
  }
}

.price-card__check {
  color: var(--s-accent);
  font-size: 0.7rem;
  line-height: 1.75;
  flex: none;
}

.price-card__cta {
  @include btn-primary;
  width: 100%;
  text-decoration: none;
}

.price-card__error {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $alert-error;
  margin: 0;
  text-align: center;
}

.price-card__links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.3rem;
  text-align: center;
}

.price-card__link {
  font-family: $font-sans;
  font-size: 0.83rem;
  color: var(--s-mute);
  text-decoration: none;

  &:hover {
    color: var(--s-accent);
    text-decoration: underline;
  }
}
</style>
