import { computed, ref } from 'vue'
import { presaleService, type PresaleStatus } from '@/services/presaleService'

/**
 * Precio vigente del reto. La fuente de verdad es el backend
 * (GET /api/presale/status): el frontend solo lo muestra.
 */
const status = ref<PresaleStatus | null>(null)
const loading = ref(false)
const loaded = ref(false)

const FALLBACK: PresaleStatus = {
  deadline: '2026-09-07T23:59:59-05:00',
  isActive: false,
  currentPrice: 87,
  presalePrice: 67,
  regularPrice: 87,
  accessMonths: 3,
  whatsappNumber: '',
}

export function usePricing() {
  async function load(force = false) {
    if (loading.value || (loaded.value && !force)) return
    loading.value = true
    try {
      const { data } = await presaleService.getStatus()
      status.value = data.data
    } catch {
      status.value = FALLBACK
    } finally {
      loaded.value = true
      loading.value = false
    }
  }

  const pricing = computed(() => status.value ?? FALLBACK)
  const currentPrice = computed(() => pricing.value.currentPrice)
  const regularPrice = computed(() => pricing.value.regularPrice)
  const presalePrice = computed(() => pricing.value.presalePrice)
  const isPresale = computed(() => pricing.value.isActive)
  const accessMonths = computed(() => pricing.value.accessMonths)
  const deadline = computed(() => new Date(pricing.value.deadline))
  /** Ahorro en dólares mientras dure la preventa. */
  const savings = computed(() =>
    isPresale.value ? pricing.value.regularPrice - pricing.value.presalePrice : 0,
  )

  return {
    load,
    loading,
    pricing,
    currentPrice,
    regularPrice,
    presalePrice,
    isPresale,
    accessMonths,
    deadline,
    savings,
  }
}
