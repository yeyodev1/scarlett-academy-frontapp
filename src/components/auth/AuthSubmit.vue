<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button type="submit" class="auth-submit" :disabled="loading">
    <span v-if="loading" class="auth-submit__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.auth-submit {
  @include btn-primary;
  width: 100%;
}

.auth-submit__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba($lpb-white, 0.3);
  border-top-color: $lpb-white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
