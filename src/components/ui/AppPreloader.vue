<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits<{
  done: []
}>()

const progress = ref(0)
const isHiding = ref(false)
const isHidden = ref(false)

const minDuration = 2200
const startTime = ref(0)
let progressInterval: ReturnType<typeof setInterval> | null = null
let loadFired = false

const finish = () => {
  if (loadFired) return
  loadFired = true
  progress.value = 100

  const elapsed = Date.now() - startTime.value
  const remaining = Math.max(0, minDuration - elapsed)

  setTimeout(() => {
    isHiding.value = true
    setTimeout(() => {
      isHidden.value = true
      document.body.style.overflow = ''
      emit('done')
    }, 1500)
  }, remaining + 450)
}

onMounted(() => {
  startTime.value = Date.now()
  document.body.style.overflow = 'hidden'

  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime.value
    const target = loadFired ? 100 : Math.min(88, (elapsed / minDuration) * 88)
    progress.value = Math.max(progress.value, Math.round(target))
  }, 70)

  if (document.readyState === 'complete') {
    finish()
  } else {
    window.addEventListener('load', finish)
  }
})

onBeforeUnmount(() => {
  if (progressInterval) clearInterval(progressInterval)
  window.removeEventListener('load', finish)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    v-if="!isHidden"
    class="preloader"
    :class="{ 'preloader--hiding': isHiding }"
    aria-hidden="true"
  >
    <div class="preloader__stage">
      <p class="preloader__label">Scarlett Cordova</p>
      <h1 class="preloader__title">Comunidad anual de transformación</h1>
    </div>

    <div class="preloader__footer">
      <span class="preloader__status">Cargando experiencia</span>
      <div class="preloader__track">
        <div class="preloader__bar" :style="{ width: `${progress}%` }" />
      </div>
      <span class="preloader__percent">{{ progress }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $lpb-black;
  color: $lpb-white;
  clip-path: inset(0 0 0 0);
  transform: scale(1);
  transition:
    clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1),
    opacity 0.7s ease 0.35s,
    transform 0.7s ease 0.35s;

  &--hiding {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
    transform: scale(1.02);
    pointer-events: none;
  }
}

.preloader__stage,
.preloader__footer {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.preloader--hiding .preloader__stage,
.preloader--hiding .preloader__footer {
  opacity: 0;
  transform: translateY(-12px);
}

.preloader__stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 2rem;
}

.preloader__label {
  font-family: $font-mono;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: $lpb-green;
  margin: 0;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.8s ease 0.1s forwards;
}

.preloader__title {
  font-family: $font-display;
  font-size: clamp(2rem, 6.5vw, 4.5rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
  max-width: 14ch;
  opacity: 0;
  transform: translateY(24px);
  animation: fadeIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
}

.preloader__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(2.5rem, 9vw, 9rem);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.5s forwards;
}

.preloader__status {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba($lpb-white, 0.45);
  white-space: nowrap;
}

.preloader__track {
  flex: 1 1 auto;
  height: 1px;
  background: rgba($lpb-white, 0.1);
  overflow: hidden;
}

.preloader__bar {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, $lpb-green 0%, $lpb-gold 100%);
  transition: width 0.2s ease-out;
}

.preloader__percent {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: rgba($lpb-white, 0.55);
  min-width: 2ch;
  text-align: right;

  &::after {
    content: '%';
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
