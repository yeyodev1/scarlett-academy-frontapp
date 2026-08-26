<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { PaymentBoxConfig } from '@/services/paymentService'

declare global {
  interface Window {
    PPaymentButtonBox?: new (config: Record<string, unknown>) => {
      render: (target: string) => void
      destroy?: () => void
    }
  }
}

const props = defineProps<{
  config: PaymentBoxConfig
}>()

const emit = defineEmits<{
  (e: 'error', message: string): void
}>()

const loading = ref(true)
const error = ref('')
const boxContainerId = `pp-button-${Math.random().toString(36).slice(2, 9)}`
let injectedCss: HTMLLinkElement | null = null
let injectedScript: HTMLScriptElement | null = null

const PAYPHONE_CSS_URL = 'https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.css'
const PAYPHONE_JS_URL = 'https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.js'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
    if (existing && existing.dataset.loaded === 'true') {
      resolve()
      return
    }
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('No se pudo cargar el SDK de Payphone')))
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.type = 'module'
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error('No se pudo cargar el SDK de Payphone'))
    document.head.appendChild(script)
    injectedScript = script
  })
}

function loadCss(href: string): void {
  const existing = document.querySelector(`link[href="${href}"]`) as HTMLLinkElement | null
  if (existing) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
  injectedCss = link
}

async function renderBox() {
  try {
    loading.value = true
    error.value = ''

    loadCss(PAYPHONE_CSS_URL)
    await loadScript(PAYPHONE_JS_URL)

    const PPaymentButtonBox = window.PPaymentButtonBox
    if (!PPaymentButtonBox) {
      throw new Error('El SDK de Payphone no está disponible')
    }

    // Parámetros según https://docs.payphone.app/cajita-de-pagos
    const box = new PPaymentButtonBox({
      token: props.config.token,
      storeId: props.config.storeId,
      clientTransactionId: props.config.clientTransactionId,
      amount: props.config.amount,
      amountWithoutTax: props.config.amountWithoutTax,
      amountWithTax: props.config.amountWithTax,
      tax: props.config.tax,
      service: props.config.service,
      tip: props.config.tip,
      currency: props.config.currency,
      reference: props.config.reference,
      responseUrl: props.config.responseUrl,
      lang: props.config.lang,
      timeZone: props.config.timeZone,
      email: props.config.email,
    })

    box.render(boxContainerId)
    loading.value = false
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al cargar la caja de pagos'
    error.value = message
    loading.value = false
    emit('error', message)
  }
}

onMounted(() => {
  renderBox()
})

onUnmounted(() => {
  if (injectedCss && !document.querySelectorAll(`link[href="${injectedCss.href}"]`).length) {
    injectedCss.remove()
  }
  if (injectedScript && !document.querySelectorAll(`script[src="${injectedScript.src}"]`).length) {
    injectedScript.remove()
  }
})
</script>

<template>
  <div class="payphone-box">
    <div v-if="loading" class="payphone-box__loading">
      <i class="fa-solid fa-circle-notch fa-spin" />
      <span>Cargando pasarela de pago…</span>
    </div>
    <div v-else-if="error" class="payphone-box__error">
      <i class="fa-solid fa-triangle-exclamation" />
      <span>{{ error }}</span>
    </div>
    <div :id="boxContainerId" class="payphone-box__container" />
  </div>
</template>

<style lang="scss" scoped>
.payphone-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payphone-box__loading,
.payphone-box__error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: $font-sans;
  font-size: 0.9rem;
  padding: 1rem;
  border-radius: 0.75rem;
  text-align: center;
}

.payphone-box__loading {
  color: $lpb-graphite;
  background: $lpb-cream;
}

.payphone-box__error {
  color: $alert-error;
  background: $alert-error-bg;
}

.payphone-box__container {
  min-height: 48px;
}
</style>
