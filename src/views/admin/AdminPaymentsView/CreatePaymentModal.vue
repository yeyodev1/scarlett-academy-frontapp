<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import AdminModal from '@/components/admin/AdminModal.vue'
import { usePricing } from '@/composables/usePricing'
import { adminService, type AdminUser } from '@/services/adminService'

const props = defineProps<{
  open: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: FormData): void
}>()

// El precio del reto lo resuelve el backend (preventa vs regular).
const { load: loadPricing, currentPrice, accessMonths } = usePricing()

const error = ref('')
const searchResults = ref<AdminUser[]>([])
const previewUrl = ref<string | null>(null)

const form = reactive({
  userId: '',
  plan: 'reto' as 'reto' | 'monthly' | 'annual',
  amount: 0,
  notes: '',
  receipt: null as File | null,
})

const planOptions = computed(() => [
  {
    value: 'reto',
    label: 'Reto',
    description: `Acceso por ${accessMonths.value} meses`,
  },
])

const selectedStudent = computed(() => searchResults.value.find((s) => s.id === form.userId))

const pendingDays = computed(() => {
  if (!selectedStudent.value?.accessUntil) return 0
  const accessUntil = new Date(selectedStudent.value.accessUntil)
  const now = new Date()
  if (Number.isNaN(accessUntil.getTime()) || accessUntil <= now) return 0
  const diffMs = accessUntil.getTime() - now.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function reset() {
  form.userId = ''
  form.plan = 'reto'
  form.amount = currentPrice.value
  form.notes = ''
  form.receipt = null
  searchResults.value = []
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  error.value = ''
}

watch(() => props.open, async (open) => {
  if (!open) return
  await loadPricing()
  reset()
})

async function searchStudents(query: string) {
  if (!query.trim()) {
    searchResults.value = []
    return []
  }
  try {
    const { data } = await adminService.listUsers({
      role: 'user',
      search: query.trim(),
      limit: 20,
    })
    searchResults.value = data.data.users
    return data.data.users.map((s) => ({
      value: s.id,
      label: `${s.name} ${s.lastName} — ${s.email}`,
      raw: s,
    }))
  } catch (err: unknown) {
    const e = err as { message?: string }
    error.value = e.message || 'Error al buscar alumnos'
    searchResults.value = []
    return []
  }
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  form.receipt = file
  if (file) {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = URL.createObjectURL(file)
  }
}

function removeFile() {
  form.receipt = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
}

function getSelectedFileName() {
  return form.receipt?.name || 'Ningún archivo seleccionado'
}

function onClose() {
  reset()
  emit('close')
}

async function onSubmit() {
  if (!form.userId) {
    error.value = 'Selecciona un alumno'
    return
  }
  if (!form.receipt) {
    error.value = 'Adjunta el comprobante de pago'
    return
  }

  error.value = ''

  const payload = new FormData()
  payload.append('userId', form.userId)
  payload.append('plan', form.plan)
  payload.append('amount', String(form.amount))
  payload.append('notes', form.notes)
  payload.append('receipt', form.receipt)

  emit('submit', payload)
}
</script>

<template>
  <AdminModal
    :open="open"
    title="Registrar pago manual"
    description="Sube el comprobante y activa el acceso del alumno de inmediato."
    @close="onClose"
  >
    <form class="admin-modal__form" @submit.prevent="onSubmit">
      <label class="admin-modal__field">
        <span class="admin-modal__label">Alumno</span>
        <AppSelect
          v-model="form.userId"
          :options="[]"
          placeholder="Busca por nombre o correo…"
          remote
          :search-fn="searchStudents"
        />
      </label>

      <Transition name="slide-down">
        <div v-if="selectedStudent" class="admin-payments__student-info">
          <div class="admin-payments__student-info-header">
            <span class="admin-payments__student-info-name">
              {{ selectedStudent.name }} {{ selectedStudent.lastName }}
            </span>
            <span class="admin-payments__student-info-email">{{ selectedStudent.email }}</span>
          </div>
          <div class="admin-payments__student-info-row">
            <span class="admin-payments__student-info-label">Acceso actual hasta:</span>
            <span class="admin-payments__student-info-value">
              {{ selectedStudent.accessUntil ? formatDate(selectedStudent.accessUntil) : 'Sin acceso activo' }}
            </span>
          </div>
          <div v-if="pendingDays > 0" class="admin-payments__pending-days">
            <i class="fa-solid fa-circle-info" />
            <span>
              El alumno tiene <strong>{{ pendingDays }} días</strong> de acceso pendientes.
              Al registrar este pago, esos días se sumarán a los nuevos.
            </span>
          </div>
        </div>
      </Transition>

      <div class="admin-payments__plan-options">
        <button
          v-for="opt in planOptions"
          :key="opt.value"
          type="button"
          class="admin-payments__plan-option"
          :class="{ 'admin-payments__plan-option--active': form.plan === opt.value }"
          @click="form.plan = opt.value as 'reto' | 'monthly' | 'annual'"
        >
          <span class="admin-payments__plan-option-name">{{ opt.label }}</span>
          <span class="admin-payments__plan-option-desc">{{ opt.description }}</span>
          <span class="admin-payments__plan-option-price">
            USD {{ currentPrice }}
          </span>
        </button>
      </div>

      <label class="admin-modal__field">
        <span class="admin-modal__label">Monto (USD)</span>
        <input v-model.number="form.amount" type="number" class="admin-modal__input" min="1" required />
      </label>

      <label class="admin-modal__field">
        <span class="admin-modal__label">Notas</span>
        <textarea v-model="form.notes" class="admin-modal__input" rows="3" placeholder="Referencia, banco, etc." />
      </label>

      <div class="admin-modal__field">
        <span class="admin-modal__label">Comprobante de pago</span>
        <Transition name="fade" mode="out-in">
          <div v-if="form.receipt && previewUrl" key="preview" class="admin-payments__preview">
            <img
              :src="previewUrl"
              alt="Vista previa del comprobante"
              class="admin-payments__preview-image"
            />
            <div class="admin-payments__preview-info">
              <span class="admin-payments__preview-name">{{ getSelectedFileName() }}</span>
              <button
                type="button"
                class="admin-payments__preview-remove"
                @click="removeFile"
              >
                <i class="fa-solid fa-xmark" />
                Quitar
              </button>
            </div>
          </div>
          <label v-else key="upload" class="admin-payments__file">
            <input
              type="file"
              accept="image/*"
              class="admin-payments__file-input"
              @change="onFileChange"
            />
            <span class="admin-payments__file-label">
              <i class="fa-solid fa-cloud-arrow-up" />
              Subir imagen
            </span>
            <span class="admin-payments__file-name">JPG, PNG, WEBP</span>
          </label>
        </Transition>
      </div>

      <div v-if="error" class="admin-payments__error">
        <i class="fa-solid fa-circle-exclamation" />
        {{ error }}
      </div>

      <div class="admin-modal__actions">
        <button
          type="button"
          class="admin-payments__btn admin-payments__btn--ghost"
          @click="onClose"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="admin-payments__btn admin-payments__btn--primary"
          :disabled="props.loading"
        >
          <i v-if="props.loading" class="fa-solid fa-circle-notch fa-spin" />
          <i v-else class="fa-solid fa-check" />
          {{ props.loading ? 'Registrando…' : 'Registrar y activar' }}
        </button>
      </div>
    </form>
  </AdminModal>
</template>

<style lang="scss" scoped>
@use '@/styles/admin-shared.scss';
@use './_payment-modal.scss';
</style>
