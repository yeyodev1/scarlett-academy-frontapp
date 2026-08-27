<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from '@/composables/useScrollReveal'

const faq = [
  {
    q: '¿Cuál elijo: el ebook o el reto?',
    a: 'El ebook si quieres entender el porqué y avanzar por tu cuenta: macros, recetas, suplementación y rutinas, por $33 de pago único. El Reto Método SK si prefieres que te lleven de la mano tres meses con plan, seguimiento, clases en vivo y comunidad. Muchas empiezan por el ebook y luego entran al reto.',
  },
  {
    q: '¿Puedo comprar los dos?',
    a: 'Sí, y se complementan. El ebook te da la base teórica; el reto te da la ejecución acompañada. No hay contenido duplicado que te haga sentir que pagaste dos veces por lo mismo.',
  },
  {
    q: '¿El reto es en casa o en gimnasio?',
    a: 'Tú eliges. El plan viene en las dos versiones y puedes cambiar de una a otra durante los tres meses si tu rutina cambia.',
  },
  {
    q: '¿Necesito experiencia previa entrenando?',
    a: 'No. Las rutinas explican cada ejercicio y la progresión de cargas arranca desde donde estés hoy. Si ya entrenas, el plan también escala.',
  },
  {
    q: '¿Voy a tener que hacer dieta restrictiva?',
    a: 'No. La nutrición del reto la arma Karen López, nutricionista, con un enfoque flexible: sin alimentos prohibidos y adaptable a lo que comes en tu casa. El ebook sigue la misma lógica.',
  },
  {
    q: '¿Tengo que vivir en Ecuador?',
    a: 'No. Todo funciona online. Participan mujeres desde Ecuador, Latinoamérica, USA y Europa.',
  },
  {
    q: '¿Cuánto dura mi acceso al reto?',
    a: 'Tres meses completos desde que entras, con acceso a la plataforma, las clases en vivo y la comunidad durante todo ese periodo.',
  },
  {
    q: '¿Cómo pago y es seguro?',
    a: 'El reto se paga con tarjeta dentro del sitio mediante Payphone, la pasarela de pagos. El ebook se compra en su propia página de pago. En los dos casos recibes acceso apenas se confirma el cobro.',
  },
]

const openIndex = ref<number | null>(null)
const itemEls = ref<(HTMLElement | null)[]>([])
const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const setItemRef = (el: HTMLElement | null, i: number) => {
  itemEls.value[i] = el
}

const toggle = (i: number) => {
  if (openIndex.value === i) {
    closeItem(i)
    openIndex.value = null
  } else {
    if (openIndex.value !== null) closeItem(openIndex.value)
    openIndex.value = i
    nextTick(() => openItem(i))
  }
}

const openItem = (i: number) => {
  const item = itemEls.value[i]
  if (!item) return
  const answer = item.querySelector('.faq__answer') as HTMLElement
  const inner = item.querySelector('.faq__answer-inner') as HTMLElement
  const icon = item.querySelector('.faq__icon') as HTMLElement
  if (!answer || !inner) return

  const tl = gsap.timeline()
  gsap.set(answer, { display: 'block' })
  tl.fromTo(
    answer,
    { height: 0, overflow: 'hidden' },
    { height: inner.scrollHeight, duration: 0.55, ease: 'power4.out', clearProps: 'overflow' },
  )
  tl.fromTo(inner, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.15')
  if (icon) {
    tl.to(icon, { rotation: 135, duration: 0.45, ease: 'back.out(1.7)' }, 0)
  }
}

const closeItem = (i: number) => {
  const item = itemEls.value[i]
  if (!item) return
  const answer = item.querySelector('.faq__answer') as HTMLElement
  const inner = item.querySelector('.faq__answer-inner') as HTMLElement
  const icon = item.querySelector('.faq__icon') as HTMLElement
  if (!answer || !inner) return

  const tl = gsap.timeline()
  tl.to(inner, { opacity: 0, y: -8, duration: 0.15, ease: 'power2.in' })
  tl.to(
    answer,
    { height: 0, duration: 0.4, ease: 'power4.inOut', overflow: 'hidden' },
    '-=0.05',
  )
  tl.call(() => gsap.set(answer, { display: 'none' }))
  if (icon) {
    tl.to(icon, { rotation: 0, duration: 0.35, ease: 'power3.out' }, 0)
  }
}

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    gsap.from(root.value!.querySelectorAll('.faq__item'), {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.faq__list', start: 'top 80%' },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section class="faq" ref="root">
    <div class="faq__inner">
      <header class="faq__header">
        <span class="eyebrow">Preguntas frecuentes</span>
        <h2 class="faq__title display-md">
          Lo que las decididas <span class="italic-accent">suelen preguntar.</span>
        </h2>
      </header>

      <div class="faq__list">
        <div
          v-for="(item, i) in faq"
          :key="i"
          class="faq__item"
          :class="{ 'faq__item--open': openIndex === i }"
          :ref="(el) => setItemRef(el as HTMLElement | null, i)"
        >
          <button
            class="faq__trigger"
            @click="toggle(i)"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-answer-${i}`"
          >
            <span class="faq__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="faq__q">{{ item.q }}</span>
            <span class="faq__icon" aria-hidden="true">
              <i class="fa-solid fa-plus"></i>
            </span>
          </button>
          <div class="faq__answer" :id="`faq-answer-${i}`" role="region">
            <div class="faq__answer-inner">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq {
  background: $lpb-paper;
  color: $lpb-black;
  padding-block: clamp(5rem, 12vw, 9rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);
  width: 100%;
}

.faq__inner {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4rem);
  width: 100%;
  margin-inline: auto;
  max-width: 1440px;
}

.faq__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  max-width: 1100px;
  margin-inline: auto;
}

.faq__title {
  margin: 0;
  font-style: normal;
}

.faq__list {
  border-top: 1px solid rgba($lpb-black, 0.15);
}

.faq__item {
  position: relative;
  border-bottom: 1px solid rgba($lpb-black, 0.15);

  &::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, $lpb-green, $lpb-gold);
    border-radius: 2px;
    opacity: 0;
    transition: opacity .3s ease;
  }

  &:hover::before,
  &--open::before {
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    &::before { display: none; }
  }
}

.faq__trigger {
  cursor: pointer;
  list-style: none;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding-block: clamp(1.2rem, 2.5vw, 1.75rem);
  min-height: 60px;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  text-align: left;
  color: inherit;
  font: inherit;
  -webkit-appearance: none;
  appearance: none;

  &:focus-visible {
    color: $lpb-green-dark;
    outline: 2px solid $lpb-green-dark;
    outline-offset: 4px;
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    grid-template-columns: 1fr auto;

    .faq__num {
      display: none;
    }
  }
}

.faq__num {
  font-family: $font-mono;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: $lpb-gold;
  font-weight: 600;
}

.faq__q {
  font-family: $font-display;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  line-height: 1.25;
  color: $lpb-black;
  letter-spacing: -0.01em;
  text-wrap: balance;
  transition: color .25s ease;
}

.faq__item:hover .faq__q {
  color: darken($lpb-gold, 8%);
}

.faq__item--open .faq__q {
  color: darken($lpb-gold, 5%);
}

.faq__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba($lpb-green, 0.3);
  color: $lpb-green-dark;
  background: rgba($lpb-green, 0.08);
  transition: background .25s ease, color .25s ease, border-color .3s ease, box-shadow .3s ease;

  &:hover {
    background: $lpb-green-dark;
    color: $lpb-white;
  }
}

.faq__item--open .faq__icon {
  background: linear-gradient(135deg, $lpb-green-dark, $lpb-green);
  color: $lpb-white;
  border-color: $lpb-green;
  box-shadow: 0 0 16px rgba($lpb-green, 0.2);
}

.faq__answer {
  display: none;
  overflow: hidden;
}

.faq__answer-inner {
  padding-left: calc(0.75rem + 2.2rem);
  padding-bottom: 2rem;

  @media (max-width: 480px) {
    padding-left: 0;
  }

  p {
    font-family: $font-sans;
    color: $lpb-graphite;
    line-height: 1.65;
    margin: 0;
    max-width: 75ch;
  }
}
</style>
