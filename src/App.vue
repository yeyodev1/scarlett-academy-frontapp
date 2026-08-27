<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// import { useUserStore } from '@/stores/user'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import TheNav from '@/components/layout/TheNav.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
// import AppPreloader from '@/components/ui/AppPreloader.vue'

useSmoothScroll()

const route = useRoute()
// const userStore = useUserStore()
// const preloaded = ref(false)

// const showPreloader = computed(
//   () => !userStore.isAuthenticated && route.name === 'home' && !preloaded.value,
// )

const isDashboard = computed(() => route.path.startsWith('/app') || route.path.startsWith('/admin'))

/**
 * Las pantallas de autenticación son de pantalla completa: traen su propia
 * marca, su foto de fondo y su enlace de vuelta. Con el nav y el footer
 * alrededor, la tarjeta quedaba descentrada y la página scrolleaba sin motivo.
 */
const AUTH_ROUTES = new Set([
  'login',
  'register',
  'verify-email',
  'forgot-password',
  'reset-password',
  'payment-result',
  'pay-response',
])
const isStandalone = computed(
  () => isDashboard.value || AUTH_ROUTES.has(String(route.name ?? '')),
)
</script>

<template>
  <div class="app">
    <!-- <AppPreloader v-if="showPreloader" @done="preloaded = true" /> -->
    <TheNav v-if="!isStandalone" />
    <main class="app__main" :class="{ 'app__main--dashboard': isDashboard }">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <TheFooter v-if="!isStandalone" />
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.app__main {
  flex: 1 1 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
