<script setup lang="ts">
interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  modelValue: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: true,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="auth-input">
    <label :for="id" class="auth-input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      class="auth-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.auth-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.auth-input__label {
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: $lpb-graphite;
}

.auth-input__field {
  font-family: $font-sans;
  font-size: 1rem;
  color: $lpb-black;
  background: $lpb-white;
  border: 1px solid rgba($lpb-black, 0.14);
  border-radius: $r-md;
  padding: 1rem 1.15rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder {
    color: rgba($lpb-muted, 0.6);
  }

  &:focus {
    outline: none;
    border-color: $lpb-green;
    box-shadow: 0 0 0 4px rgba($lpb-green, 0.18);
  }
}
</style>
