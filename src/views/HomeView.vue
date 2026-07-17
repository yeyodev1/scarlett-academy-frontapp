<script setup lang="ts">
import { onMounted } from 'vue'
import PresaleHero from '@/components/presale/PresaleHero.vue'
import BenefitsSection from '@/components/presale/BenefitsSection.vue'
import MarqueeText from '@/components/ui/MarqueeText.vue'

onMounted(() => {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'ViewContent', {
      content_name: 'Quema Grasa, Construye Músculo',
      content_type: 'product',
    })
  }
})

const marqueeItems = [
  'Quema grasa',
  'Construye músculo',
  'Nutrición sin miedo',
  'Entrena con inteligencia',
  'Ciencia + amor propio',
  'Por Scarlett Cordova',
]
</script>

<template>
  <div class="home">
    <PresaleHero />
    <MarqueeText :items="marqueeItems" theme="green" :speed="42" />
    <BenefitsSection />
    <MarqueeText :items="['Tu proceso es tuyo', 'Sin castigo', 'Sin extremos', 'Resultados sostenibles']" theme="dark" :speed="48" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: block;
  background: var(--bg);
}
</style>
