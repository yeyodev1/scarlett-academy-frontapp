<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { adminService, type AdminVip } from '@/services/adminService'
import { usePricing } from '@/composables/usePricing'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

const { load: loadPricing, accessMonths } = usePricing()

const vips = ref<AdminVip[]>([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref('')
const search = ref('')
const vipToRevoke = ref<AdminVip | null>(null)

const form = reactive({
  name: '',
  lastName: '',
  email: '',
  months: 3,
  note: '',
})

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return vips.value
  return vips.value.filter((vip) =>
    `${vip.name} ${vip.lastName} ${vip.email}`.toLowerCase().includes(term),
  )
})

function formatDate(value: string | null) {
  if (!value) return 'Sin acceso'
  return new Date(value).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function isExpired(value: string | null) {
  return !value || new Date(value) <= new Date()
}

async function loadVips() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await adminService.listVips()
    vips.value = data.data.vips
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'Error al cargar los VIPs'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.name = ''
  form.lastName = ''
  form.email = ''
  form.months = accessMonths.value || 3
  form.note = ''
}

async function grantVip() {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    const { data } = await adminService.grantVip({
      name: form.name.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      months: form.months,
      note: form.note.trim() || undefined,
    })
    success.value = data.data.created
      ? `VIP creada. Se envió la contraseña a ${form.email.trim()}.`
      : `Acceso VIP otorgado a ${form.email.trim()} por ${data.data.months} meses.`
    resetForm()
    await loadVips()
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo otorgar el acceso VIP'
  } finally {
    saving.value = false
  }
}

async function confirmRevoke() {
  const vip = vipToRevoke.value
  if (!vip) return
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    await adminService.revokeVip(vip.id)
    success.value = `Acceso VIP retirado a ${vip.email}.`
    await loadVips()
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'No se pudo retirar el acceso'
  } finally {
    vipToRevoke.value = null
    saving.value = false
  }
}

onMounted(async () => {
  await loadPricing()
  form.months = accessMonths.value || 3
  await loadVips()
})
</script>

<template>
  <div class="vips">
    <header class="vips__header">
      <div>
        <h1 class="vips__title">VIPs</h1>
        <p class="vips__lede">
          Acceso al reto sin pago. Si el correo no existe se crea la cuenta y se le envía su
          contraseña; si ya existe, se le extiende el acceso.
        </p>
      </div>
    </header>

    <p v-if="error" class="vips__alert vips__alert--error">{{ error }}</p>
    <p v-if="success" class="vips__alert vips__alert--success">{{ success }}</p>

    <section class="vips__card">
      <h2 class="vips__card-title">Agregar VIP</h2>
      <form class="vips__form" @submit.prevent="grantVip">
        <label class="vips__field">
          <span>Nombre</span>
          <input v-model="form.name" type="text" required placeholder="Ej. María" />
        </label>
        <label class="vips__field">
          <span>Apellido</span>
          <input v-model="form.lastName" type="text" required placeholder="Ej. Pérez" />
        </label>
        <label class="vips__field vips__field--wide">
          <span>Correo</span>
          <input v-model="form.email" type="email" required placeholder="correo@ejemplo.com" />
        </label>
        <label class="vips__field">
          <span>Meses de acceso</span>
          <input v-model.number="form.months" type="number" min="1" max="36" required />
        </label>
        <label class="vips__field vips__field--wide">
          <span>Nota interna (opcional)</span>
          <input v-model="form.note" type="text" placeholder="Ej. Colaboración, sorteo, prensa" />
        </label>
        <div class="vips__actions">
          <button type="submit" class="vips__btn" :disabled="saving">
            {{ saving ? 'Guardando…' : 'Otorgar acceso VIP' }}
          </button>
        </div>
      </form>
    </section>

    <section class="vips__card">
      <div class="vips__card-head">
        <h2 class="vips__card-title">VIPs activos ({{ vips.length }})</h2>
        <input v-model="search" class="vips__search" type="search" placeholder="Buscar…" />
      </div>

      <p v-if="loading" class="vips__empty">Cargando…</p>
      <p v-else-if="!filtered.length" class="vips__empty">Todavía no hay VIPs.</p>

      <div v-else class="vips__table-wrap">
        <table class="vips__table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acceso hasta</th>
              <th>Nota</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vip in filtered" :key="vip.id">
              <td>{{ vip.name }} {{ vip.lastName }}</td>
              <td>{{ vip.email }}</td>
              <td>
                <span :class="['vips__pill', isExpired(vip.accessUntil) ? 'vips__pill--off' : 'vips__pill--on']">
                  {{ formatDate(vip.accessUntil) }}
                </span>
              </td>
              <td class="vips__note">{{ vip.vipNote || '—' }}</td>
              <td>
                <button type="button" class="vips__link" @click="vipToRevoke = vip">
                  Retirar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <ConfirmModal
      :open="!!vipToRevoke"
      title="Retirar acceso VIP"
      :message="`¿Retirar el acceso de ${vipToRevoke?.email}? Perderá el acceso al reto de inmediato.`"
      action-label="Sí, retirar"
      confirm-text="retirar"
      danger
      @confirm="confirmRevoke"
      @cancel="vipToRevoke = null"
    />
  </div>
</template>

<style lang="scss" scoped>
.vips {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.vips__title {
  font-family: $font-display;
  font-size: 1.75rem;
  margin: 0;
  color: $lpb-black;
}

.vips__lede {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;
  margin: 0.35rem 0 0;
  max-width: 65ch;
}

.vips__alert {
  font-family: $font-sans;
  font-size: 0.9rem;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  margin: 0;

  &--error {
    color: $alert-error;
    background: rgba($alert-error, 0.08);
  }

  &--success {
    color: $lpb-green-dark;
    background: rgba($lpb-green, 0.1);
  }
}

.vips__card {
  background: $lpb-white;
  border: 1px solid rgba($lpb-black, 0.07);
  border-radius: 1.25rem;
  padding: clamp(1.25rem, 3vw, 1.75rem);
}

.vips__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.vips__card-title {
  font-family: $font-display;
  font-size: 1.15rem;
  margin: 0 0 1rem;
  color: $lpb-black;
}

.vips__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.vips__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  span {
    font-family: $font-mono;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $lpb-muted;
  }

  input {
    font-family: $font-sans;
    font-size: 0.95rem;
    padding: 0.75rem 0.9rem;
    border: 1px solid rgba($lpb-black, 0.12);
    border-radius: 0.75rem;
    background: $lpb-paper;

    &:focus {
      outline: none;
      border-color: $lpb-green;
    }
  }

  &--wide {
    grid-column: 1 / -1;
  }
}

.vips__actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.vips__btn {
  font-family: $font-mono;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  border: none;
  background: $lpb-black;
  color: $lpb-white;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: $lpb-green-dark;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.vips__search {
  font-family: $font-sans;
  font-size: 0.9rem;
  padding: 0.6rem 0.9rem;
  border: 1px solid rgba($lpb-black, 0.12);
  border-radius: 999px;
  background: $lpb-paper;
  min-width: 220px;
}

.vips__empty {
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;
  margin: 0;
}

.vips__table-wrap {
  overflow-x: auto;
}

.vips__table {
  width: 100%;
  border-collapse: collapse;
  font-family: $font-sans;
  font-size: 0.9rem;

  th {
    text-align: left;
    font-family: $font-mono;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $lpb-muted;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid rgba($lpb-black, 0.08);
    white-space: nowrap;
  }

  td {
    padding: 0.85rem 0.75rem;
    border-bottom: 1px solid rgba($lpb-black, 0.05);
    color: $lpb-graphite;
    vertical-align: middle;
  }
}

.vips__note {
  color: $lpb-muted;
  max-width: 22ch;
}

.vips__pill {
  display: inline-block;
  font-family: $font-mono;
  font-size: 0.68rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  white-space: nowrap;

  &--on {
    color: $lpb-green-dark;
    background: rgba($lpb-green, 0.12);
  }

  &--off {
    color: $lpb-muted;
    background: rgba($lpb-black, 0.06);
  }
}

.vips__link {
  font-family: $font-mono;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: none;
  border: none;
  color: $alert-error;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}
</style>
