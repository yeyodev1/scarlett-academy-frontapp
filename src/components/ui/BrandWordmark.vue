<script setup lang="ts">
defineProps<{ size?: 'sm' | 'md' | 'lg'; variant?: 'full' | 'mono' }>()
</script>

<template>
  <span class="wordmark" :class="[`wordmark--${size ?? 'md'}`, `wordmark--${variant ?? 'full'}`]" aria-label="Scarlett Cordova">
    <div v-if="variant !== 'mono'" class="wordmark__full">
      <span class="wordmark__name wordmark__name--italic">Scarlett </span>
      <span class="wordmark__name wordmark__name--bold">Cordova</span>
      <div class="wordmark__line" aria-hidden="true" />
    </div>

    <div v-else class="wordmark__mono">
      <span class="wordmark__dot" aria-hidden="true"></span>
      <span class="wordmark__initials">SC</span>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.wordmark {
  display: inline-flex;
  align-items: center;
  color: currentColor;
  white-space: nowrap;
}

.wordmark__full {
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 1;
}

.wordmark__name {
  font-family: $font-display;
  letter-spacing: -0.02em;

  &--italic {
    font-style: italic;
    font-weight: 400;
  }

  &--bold {
    font-weight: 600;
  }
}

.wordmark__line {
  width: 100%;
  height: 1px;
  background: currentColor;
  opacity: 0.3;
  margin-top: 0.2em;
}

.wordmark__mono {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
  gap: 2px;
}

.wordmark__dot {
  width: 0.35em;
  height: 0.35em;
  border-radius: 50%;
  background: $lpb-gold;
}

.wordmark__initials {
  font-family: $font-display;
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.05em;
}

.wordmark--sm {
  .wordmark__name { font-size: 1.1rem; }
  .wordmark__initials { font-size: 1.1rem; }
}

.wordmark--md {
  .wordmark__name { font-size: 1.5rem; }
  .wordmark__initials { font-size: 1.8rem; }
}

.wordmark--lg {
  .wordmark__name { font-size: 2.8rem; }
  .wordmark__initials { font-size: 3.2rem; }
}
</style>
