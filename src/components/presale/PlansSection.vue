<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { paymentService } from '@/services/paymentService'
import type { PaymentBoxConfig } from '@/services/paymentService'
import { usePricing } from '@/composables/usePricing'
import CountdownTimer from './CountdownTimer.vue'
import CheckoutModal from './CheckoutModal.vue'

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || '593999999999'

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

const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const boxConfig = ref<PaymentBoxConfig | null>(null)

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Hola, quiero información sobre el reto del Método SK.',
)}`

const deadlineLabel = () =>
  deadline.value.toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

onMounted(() => load())

function openCheckout() {
  error.value = ''
  boxConfig.value = null
  showModal.value = true

  // Pixel: AddToCart al abrir el popup de pago
  if (typeof fbq !== 'undefined') {
    fbq('track', 'AddToCart', {
      content_name: 'Academia Método SK',
      content_type: 'product',
      value: currentPrice.value,
      currency: 'USD',
    })
  }
}

function closeCheckout() {
  showModal.value = false
  boxConfig.value = null
}

async function payWithCard(payload: { email: string; name: string; lastName: string }) {
  loading.value = true
  error.value = ''
  try {
    const { data } = await paymentService.prepareBox(payload)
    boxConfig.value = data.data
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al preparar el pago.'
  } finally {
    loading.value = false
  }
}

function onBoxError(message: string) {
  error.value = message
}
</script>

<template>
  <section id="planes" class="plans">
    <div class="plans__inner">
      <span class="eyebrow eyebrow--green">Elige tu compromiso</span>
      <h2 class="plans__title display-lg">Planes de la comunidad</h2>
      <p class="plans__lede">
        <template v-if="isPresale">
          Precio especial de preventa por tiempo limitado. Incluye acceso completo a la comunidad.
        </template>
        <template v-else>
          Un solo pago. Incluye acceso completo a la comunidad.
        </template>
      </p>

      <div v-if="isPresale" class="plans__countdown">
        <span class="plans__countdown-label">
          La preventa termina el {{ deadlineLabel() }} · después el precio sube a USD {{ regularPrice }}
        </span>
        <CountdownTimer :deadline="pricing.deadline" />
      </div>

      <div class="plans__grid plans__grid--single">
        <article class="plan-card plan-card--featured">
          <div class="plan-card__badge">{{ isPresale ? 'Preventa' : 'Mejor valor' }}</div>
          <h3 class="plan-card__name">El reto</h3>
          <p class="plan-card__description">
            {{ accessMonths }} meses completos de acompañamiento. Pagas una vez y aseguras tu transformación.
          </p>
          <div class="plan-card__price">
            <span class="plan-card__currency">$</span>
            <span class="plan-card__amount">{{ currentPrice }}</span>
            <span class="plan-card__period">pago único</span>
          </div>
          <p v-if="isPresale" class="plan-card__compare">
            Antes <s>USD {{ regularPrice }}</s> — ahorras USD {{ regularPrice - currentPrice }}
          </p>
          <ul class="plan-card__features">
            <li><i class="fa-solid fa-check" /> Acceso {{ accessMonths }} meses</li>
            <li><i class="fa-solid fa-check" /> Entrenamientos personalizados</li>
            <li><i class="fa-solid fa-check" /> Plan nutricional flexible</li>
            <li><i class="fa-solid fa-check" /> Comunidad privada</li>
          </ul>
          <button
            type="button"
            class="plan-card__button plan-card__button--primary"
            :disabled="loading"
            @click="openCheckout()"
          >
            <span v-if="loading">Preparando pago...</span>
            <span v-else>Pagar con tarjeta</span>
          </button>
          <a :href="whatsappUrl" target="_blank" rel="noopener" class="plan-card__link">
            Tengo una pregunta antes de pagar
          </a>
          <RouterLink :to="{ name: 'home', hash: '#video' }" class="plan-card__link">
            Saber más sobre el reto
          </RouterLink>
          <p v-if="error" class="plan-card__error">{{ error }}</p>
        </article>
      </div>
    </div>

    <CheckoutModal
      :open="showModal"
      :price="currentPrice"
      :regular-price="regularPrice"
      :is-presale="isPresale"
      :access-months="accessMonths"
      :loading="loading"
      :error="error"
      :box-config="boxConfig"
      @close="closeCheckout"
      @submit="payWithCard"
      @box-error="onBoxError"
    />
  </section>
</template>

<style lang="scss" scoped>
.plans {
  padding-block: clamp(5rem, 12vw, 9rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);
  background: $lpb-paper;
}

.plans__inner {
  max-width: 1100px;
  margin-inline: auto;
  text-align: center;
}

.plans__title {
  margin: 0.75rem 0 0;
  color: $lpb-black;
}

.plans__lede {
  font-family: $font-sans;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: $lpb-muted;
  max-width: 60ch;
  margin: 1rem auto 3rem;
}

.plans__grid--single {
  max-width: 480px;
  margin-inline: auto;
}

.plans__countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 2.5rem;
}

// El contador está pensado para fondo oscuro; aquí va sobre papel claro.
.plans__countdown :deep(.countdown__value) {
  color: $lpb-black;
}

.plans__countdown :deep(.countdown__label) {
  color: $lpb-muted;
}

.plans__countdown-label {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;
  max-width: 46ch;
}

.plan-card__compare {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;
  margin: -0.5rem 0 0;

  s {
    opacity: 0.7;
  }
}

.plans__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

.plan-card {
  position: relative;
  background: $lpb-white;
  border: 1px solid rgba($lpb-black, 0.06);
  border-radius: 1.5rem;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.plan-card--featured {
  border-color: rgba($lpb-green, 0.35);
  box-shadow: 0 24px 70px rgba($lpb-green, 0.1);
}

.plan-card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $lpb-green-dark;
  background: rgba($lpb-green, 0.1);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;

  &--soon {
    color: $lpb-muted;
    background: rgba($lpb-black, 0.06);
  }
}

.plan-card--disabled {
  opacity: 0.85;
  background: rgba($lpb-white, 0.7);
}

.plan-card__name {
  font-family: $font-display;
  font-size: 1.75rem;
  font-weight: 400;
  margin: 0;
  color: $lpb-black;
}

.plan-card__description {
  font-family: $font-sans;
  font-size: 0.95rem;
  line-height: 1.5;
  color: $lpb-muted;
  margin: 0;
}

.plan-card__price {
  display: flex;
  align-items: flex-start;
  gap: 0.15rem;
  margin: 0.5rem 0;
}

.plan-card__currency {
  font-family: $font-display;
  font-size: 1.5rem;
  color: $lpb-black;
  margin-top: 0.25rem;
}

.plan-card__amount {
  font-family: $font-display;
  font-size: clamp(3rem, 7vw, 4rem);
  font-weight: 400;
  line-height: 1;
  color: $lpb-black;
}

.plan-card__period {
  font-family: $font-mono;
  font-size: 0.8rem;
  color: $lpb-muted;
  align-self: flex-end;
  margin-bottom: 0.6rem;
}

.plan-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $lpb-graphite;

    i {
      color: $lpb-green;
      font-size: 0.8rem;
    }
  }
}

.plan-card__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 999px;
  font-family: $font-mono;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
  border: 1px solid transparent;

  &--primary {
    background: $lpb-black;
    color: $lpb-white;

    &:hover:not(:disabled) {
      background: $lpb-green-dark;
      transform: translateY(-2px);
    }
  }

  &--outline {
    background: transparent;
    color: $lpb-black;
    border-color: rgba($lpb-black, 0.15);

    &:hover {
      background: $lpb-black;
      color: $lpb-white;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.plan-card__link {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $lpb-green-deep;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: -0.25rem;

  &:hover {
    text-decoration: underline;
  }
}

.plan-card__error {
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $alert-error;
  margin: 0;
  text-align: center;
}
</style>
