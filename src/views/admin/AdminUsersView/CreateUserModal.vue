<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import AdminModal from '@/components/admin/AdminModal.vue'

const props = defineProps<{
  open: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: {
    name: string
    lastName: string
    email: string
    role: 'user' | 'admin'
    password?: string
    accessMonths?: number
  }): void
}>()

const form = reactive({
  role: 'user' as 'user' | 'admin',
  name: '',
  lastName: '',
  email: '',
  password: '',
  accessMonths: 1,
})

const accessMonthOptions = [1, 3, 6, 12]
const isStudent = computed(() => form.role === 'user')

function reset() {
  form.role = 'user'
  form.name = ''
  form.lastName = ''
  form.email = ''
  form.password = ''
  form.accessMonths = 1
}

watch(() => props.open, (open) => {
  if (open) reset()
})

function onClose() {
  reset()
  emit('close')
}

function onSubmit() {
  emit('submit', {
    name: form.name,
    lastName: form.lastName,
    email: form.email,
    role: form.role,
    password: form.password || undefined,
    accessMonths: isStudent.value ? form.accessMonths : undefined,
  })
}
</script>

<template>
  <AdminModal
    :open="open"
    title="Crear usuario"
    description="Crea una cuenta nueva. El usuario recibirá un email con sus credenciales y un link de verificación."
    @close="onClose"
  >
    <form class="admin-modal__form" @submit.prevent="onSubmit">
      <div class="admin-modal__grid">
        <label class="admin-modal__field">
          <span class="admin-modal__label">Tipo de cuenta</span>
          <AppSelect
            v-model="form.role"
            :options="[
              { value: 'user', label: 'Alumno' },
              { value: 'admin', label: 'Administrador' },
            ]"
            placeholder="Seleccionar tipo"
          />
        </label>
        <label v-if="isStudent" class="admin-modal__field">
          <span class="admin-modal__label">Duración del acceso</span>
          <AppSelect
            v-model="form.accessMonths"
            :options="accessMonthOptions.map((m) => ({ value: m, label: `${m} ${m === 1 ? 'mes' : 'meses'}` }))"
            placeholder="Seleccionar duración"
          />
        </label>
      </div>
      <div class="admin-modal__grid">
        <label class="admin-modal__field">
          <span class="admin-modal__label">Nombre</span>
          <input v-model="form.name" type="text" class="admin-modal__input" placeholder="Ej. María" required />
        </label>
        <label class="admin-modal__field">
          <span class="admin-modal__label">Apellido</span>
          <input v-model="form.lastName" type="text" class="admin-modal__input" placeholder="Ej. Pérez" required />
        </label>
      </div>
      <label class="admin-modal__field">
        <span class="admin-modal__label">Correo electrónico</span>
        <input v-model="form.email" type="email" class="admin-modal__input" placeholder="usuario@email.com" required />
      </label>
      <label class="admin-modal__field">
        <span class="admin-modal__label">
          Contraseña <span class="admin-modal__optional">(opcional)</span>
        </span>
        <input
          v-model="form.password"
          type="password"
          class="admin-modal__input"
          placeholder="Se genera automáticamente si la dejas vacía"
        />
      </label>
      <div class="admin-modal__actions">
        <button
          type="button"
          class="admin-users__btn admin-users__btn--ghost"
          @click="onClose"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="admin-users__btn admin-users__btn--primary"
          :disabled="loading"
        >
          <i v-if="loading" class="fa-solid fa-circle-notch fa-spin" />
          <i v-else class="fa-solid fa-plus" />
          {{ loading ? 'Creando…' : 'Crear usuario' }}
        </button>
      </div>
    </form>
  </AdminModal>
</template>

<style lang="scss" scoped>
@use '@/styles/admin-shared.scss';
</style>
