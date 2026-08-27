<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { EBOOK_PRICE, buildEbookUrl, buildRetoUrl } from '@/config/site'
import { usePricing } from '@/composables/usePricing'

const { load, currentPrice, regularPrice, isPresale } = usePricing()

const pastHero = ref(false)
/** El footer ya trae sus propios CTA: la barra sobra y taparía los legales. */
const footerVisible = ref(false)
const visible = computed(() => pastHero.value && !footerVisible.value)

/** Qué producto ofrecer: cambia según la sección que el visitante está leyendo. */
const context = ref<'ebook' | 'reto'>('reto')

let onScroll: (() => void) | null = null
let sectionObserver: IntersectionObserver | null = null
let footerObserver: IntersectionObserver | null = null

onMounted(() => {
  load()

  // Aparece recién pasado el hero, para no tapar la primera impresión.
  onScroll = () => {
    pastHero.value = window.scrollY > window.innerHeight * 0.9
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // El CTA sigue a la sección visible: si estás leyendo el ebook, ofrece el ebook.
  const ebookSection = document.getElementById('ebook')
  if (ebookSection) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        context.value = entries.some((entry) => entry.isIntersecting) ? 'ebook' : 'reto'
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sectionObserver.observe(ebookSection)
  }

  const footer = document.querySelector('footer')
  if (footer) {
    footerObserver = new IntersectionObserver(
      (entries) => {
        footerVisible.value = entries.some((entry) => entry.isIntersecting)
      },
      { threshold: 0 },
    )
    footerObserver.observe(footer)
  }
})

onBeforeUnmount(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
  sectionObserver?.disconnect()
  footerObserver?.disconnect()
})

const offer = computed(() =>
  context.value === 'ebook'
    ? {
        label: 'Ebook digital',
        price: EBOOK_PRICE,
        strike: 0,
        note: 'pago único',
        cta: 'Quiero mi ebook',
        href: buildEbookUrl('sticky'),
        external: true,
      }
    : {
        label: 'Reto Método SK',
        price: currentPrice.value,
        strike: isPresale.value && regularPrice.value > currentPrice.value ? regularPrice.value : 0,
        note: '3 meses de plan',
        cta: 'Quiero mi cupo',
        href: buildRetoUrl('sticky'),
        external: true,
      },
)
</script>

<template>
  <Transition name="sticky">
    <aside v-show="visible" class="sticky" aria-label="Comprar">
      <div class="sticky__inner">
        <div class="sticky__offer">
          <span class="sticky__label">{{ offer.label }}</span>
          <span class="sticky__price">
            <span class="sticky__currency">$</span>{{ offer.price }}
          </span>
          <span v-if="offer.strike" class="sticky__strike">${{ offer.strike }}</span>
          <span class="sticky__note">{{ offer.note }}</span>
        </div>

        <a
          class="sticky__cta"
          :href="offer.href"
          :target="offer.external ? '_blank' : undefined"
          :rel="offer.external ? 'noopener noreferrer' : undefined"
        >
          {{ offer.cta }}
          <span aria-hidden="true">{{ offer.external ? '↗' : '→' }}</span>
        </a>
      </div>
    </aside>
  </Transition>
</template>

<style lang="scss" scoped>
.sticky {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 60;
  background: rgba($lpb-black, 0.92);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba($lpb-light, 0.14);
  padding-bottom: env(safe-area-inset-bottom, 0);
  --s-accent: #{$lpb-green};
}

.sticky__inner {
  @include container;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.85rem;
}

.sticky__offer {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
}

.sticky__label {
  font-family: $font-mono;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: $lpb-gold;
}

.sticky__price {
  font-family: $font-display;
  font-weight: 600;
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  line-height: 1;
  color: $lpb-light;
}

.sticky__currency {
  font-size: 0.55em;
  vertical-align: super;
}

.sticky__strike {
  font-family: $font-mono;
  font-size: 0.85rem;
  color: rgba($lpb-light, 0.5);
  text-decoration: line-through;
}

.sticky__note {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: rgba($lpb-light, 0.6);

  @include mq-down($bp-sm) { display: none; }
}

.sticky__cta {
  @include btn-primary;
  text-decoration: none;
  padding: 0.9rem 1.7rem;
  flex: none;
}

// La etiqueta se cae antes que el precio cuando no hay espacio.
@include mq-down($bp-sm) {
  .sticky__inner { padding-block: 0.7rem; }
  .sticky__label { flex-basis: 100%; }
}

.sticky-enter-active,
.sticky-leave-active {
  transition: transform 0.45s $ease-out, opacity 0.3s ease;
}

.sticky-enter-from,
.sticky-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@include reduced-motion {
  .sticky-enter-active,
  .sticky-leave-active { transition: none; }
}
</style>
