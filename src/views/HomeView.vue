<script setup lang="ts">
import { onMounted } from 'vue'
import BrandHero from '@/components/home/BrandHero.vue'
import ProductsSection from '@/components/home/ProductsSection.vue'
import EbookSection from '@/components/home/EbookSection.vue'
import PlansSection from '@/components/presale/PlansSection.vue'
import AuthoritySection from '@/components/home/AuthoritySection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import FinalCtaSection from '@/components/home/FinalCtaSection.vue'
import StickyCta from '@/components/home/StickyCta.vue'
import MarqueeText from '@/components/ui/MarqueeText.vue'

onMounted(() => {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'ViewContent', {
      content_name: 'Scarlett Cordova — Home',
      content_type: 'product_group',
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

const marqueeClosing = [
  'Tu proceso es tuyo',
  'Sin castigo',
  'Sin extremos',
  'Resultados sostenibles',
]
</script>

<template>
  <div class="home">
    <!-- Marca paraguas: quién es y qué ofrece -->
    <BrandHero />
    <MarqueeText :items="marqueeItems" theme="green" :speed="42" />

    <!-- Los dos servicios, uno al lado del otro -->
    <ProductsSection />

    <!-- Servicio 1: el ebook (cobra en su propio funnel) -->
    <EbookSection />

    <!-- Servicio 2: el reto (se compra aquí dentro) -->
    <PlansSection />

    <MarqueeText :items="marqueeClosing" theme="dark" :speed="48" />

    <!-- Prueba y confianza, comunes a los dos productos -->
    <AuthoritySection />
    <FaqSection />
    <FinalCtaSection />

    <StickyCta />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: block;
  background: var(--bg);
  // Deja aire al final para que la barra fija no tape el footer.
  padding-bottom: 0;
}
</style>
