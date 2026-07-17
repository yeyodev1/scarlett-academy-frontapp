<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import BrandWordmark from '@/components/ui/BrandWordmark.vue'
import { useUserStore } from '@/stores/user'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/config/site'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const menuContainer = ref<HTMLElement | null>(null)

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const toggle = () => {
  open.value = !open.value
  document.body.style.overflow = open.value ? 'hidden' : ''
}

const close = () => {
  if (!open.value) return
  open.value = false
  document.body.style.overflow = ''
}

watch(open, async (val) => {
  if (val && window.innerWidth < 880) {
    await nextTick()
    const links = menuContainer.value?.querySelectorAll('.nav__link, .nav__cta, .nav__mobile-footer')
    if (links) {
      gsap.fromTo(links,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'all',
        },
      )
    }
  }
})

watch(() => route.path, close)

const logout = () => {
  userStore.logout()
  router.push({ name: 'home' })
  close()
}
</script>

<template>
  <header
    class="nav"
    :class="{
      'nav--scrolled': scrolled,
      'nav--open': open,
      'nav--legal': route.name !== 'home',
    }"
  >
    <div class="nav__inner">
      <RouterLink :to="{ name: 'home' }" class="nav__brand" @click="close">
        <BrandWordmark size="sm" />
      </RouterLink>

      <div class="nav__backdrop" :class="{ 'nav__backdrop--visible': open }" @click="close" />

      <div
        class="nav__content"
        :class="{ 'nav__content--open': open }"
        ref="menuContainer"
      >
        <div class="nav__content-inner">
          <nav class="nav__links">
            <template v-if="!userStore.isAuthenticated">
              <RouterLink :to="{ name: 'home', hash: '#planes' }" class="nav__link" @click="close">
                <span class="nav__num">01</span> El método
              </RouterLink>
              <RouterLink :to="{ name: 'login' }" class="nav__link" @click="close">
                <span class="nav__num">02</span> Iniciar sesión
              </RouterLink>
              <RouterLink :to="{ name: 'register' }" class="nav__cta" @click="close">
                <span>Registrarse ahora</span>
                <i class="fa-solid fa-arrow-right" />
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink :to="{ name: 'home', hash: '#planes' }" class="nav__link" @click="close">
                <span class="nav__num">01</span> El método
              </RouterLink>
              <RouterLink
                :to="{ name: userStore.role === 'admin' ? 'admin-users' : 'dashboard' }"
                class="nav__link"
                @click="close"
              >
                <span class="nav__num">02</span>
                {{ userStore.role === 'admin' ? 'Admin' : 'Mi cuenta' }}
              </RouterLink>
              <button type="button" class="nav__link nav__link--logout" @click="logout">
                <span class="nav__num">03</span> Cerrar sesión
              </button>
              <RouterLink
                :to="{ name: userStore.role === 'admin' ? 'admin-users' : 'dashboard' }"
                class="nav__cta"
                @click="close"
              >
                <span>{{ userStore.role === 'admin' ? 'Admin' : 'Mi cuenta' }}</span>
                <i class="fa-solid fa-arrow-right" />
              </RouterLink>
            </template>
          </nav>

          <div class="nav__mobile-footer">
            <a :href="INSTAGRAM_URL" target="_blank" rel="noopener" class="nav__social">
              Instagram {{ INSTAGRAM_HANDLE }}
            </a>
            <p class="nav__copy">© {{ new Date().getFullYear() }} Scarlett Cordova</p>
          </div>
        </div>
      </div>

      <button
        class="nav__burger"
        type="button"
        @click="toggle"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding-block: 1.2rem;
  transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: $lpb-black;

  &:not(.nav--scrolled):not(.nav--legal):not(.nav--open) {
    color: $lpb-white;
  }

  &--scrolled,
  &--legal {
    background: rgba($lpb-paper, 0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding-block: 0.8rem;
    border-bottom: 1px solid rgba($lpb-black, 0.06);
  }
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: clamp(1.2rem, 5vw, 2.5rem);
  max-width: 1440px;
  margin: 0 auto;
}

.nav__brand {
  z-index: 1101;
  position: relative;
}

.nav__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 28px;
  height: 28px;
  z-index: 1101;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
    transition: transform 0.35s cubic-bezier(0.2, 0.7, 0, 1), opacity 0.2s ease;
    transform-origin: center;
    flex-shrink: 0;
  }

  .nav--open & span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav--open & span:nth-child(2) { opacity: 0; }
  .nav--open & span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}

.nav__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1049;
  background: rgba($lpb-black, 0.35);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.45s ease, visibility 0.45s ease;

  &--visible {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}

.nav__content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  clip-path: circle(0% at 100% 2.4rem);
  transition: clip-path 0.65s cubic-bezier(0.55, 0, 0.2, 1);

  &--open {
    clip-path: circle(150% at 100% 2.4rem);
  }
}

.nav__content-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem 2.5rem;
  background: $lpb-paper;
}

.nav__links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  max-width: 360px;
  margin: auto;
}

.nav__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: $font-sans;
  font-size: 1.2rem;
  font-weight: 500;
  color: $lpb-graphite;
  text-decoration: none;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 0.875rem;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
  background: none;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: rgba($lpb-green, 0.08);
    color: $lpb-green-deep;
    transform: scale(1.02);
  }

  .nav__num {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: $lpb-green;
    background: rgba($lpb-green, 0.1);
    padding: 0.2rem 0.45rem;
    border-radius: 0.35rem;
    line-height: 1;
  }
}

.nav__link--logout {
  &:hover {
    background: rgba($alert-error, 0.08);
    color: $alert-error;
    transform: scale(1.02);
  }
}

.nav__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $lpb-graphite;
  color: $lpb-white;
  padding: 1rem 1.5rem;
  border-radius: 999px;
  font-family: $font-mono;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin-top: 1rem;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;
  border: none;

  &:hover {
    background: $lpb-green-deep;
    transform: scale(1.02);
  }

  i {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translateX(4px);
  }
}

.nav__mobile-footer {
  margin-top: auto;
  padding-top: 2rem;
  text-align: left;
  font-family: $font-sans;
  font-size: 0.8rem;
  color: $lpb-muted;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  a {
    color: $lpb-black;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.25s ease;

    &::before {
      content: '→';
      font-size: 0.75rem;
      color: $lpb-green;
    }

    &:hover {
      color: $lpb-green-deep;
    }
  }
}

.nav__copy {
  margin: 0;
  font-family: $font-mono;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba($lpb-black, 0.25);
}

@media (min-width: 880px) {
  .nav__inner {
    padding-inline: clamp(2.5rem, 9vw, 9rem);
  }

  .nav__backdrop {
    display: none !important;
  }

  .nav__burger,
  .nav__mobile-footer {
    display: none !important;
  }

  .nav__content {
    position: static;
    clip-path: none !important;
    height: auto;
    width: auto;
    overflow: visible;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .nav__content-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
    padding: 0;
    background: none;
    flex: none;
  }

  .nav__links {
    flex-direction: row;
    max-width: none;
    width: auto;
    gap: 2.5rem;
    align-items: center;
  }

  .nav__link {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 450;
    padding: 0;
    border: none;
    opacity: 0.7;
    gap: 0.4rem;
    width: auto;

    &:hover {
      opacity: 1;
      color: inherit;
    }

    .nav__num {
      font-size: 0.6rem;
      color: inherit;
      opacity: 0.4;
      margin-top: 0;
    }
  }

  .nav__cta {
    background: $lpb-black;
    color: $lpb-white;
    padding: 0.65rem 1.35rem;
    font-size: 0.75rem;
    margin-top: 0;
    gap: 0.5rem;

    .nav:not(.nav--scrolled):not(.nav--legal) & {
      background: $lpb-white;
      color: $lpb-black;
    }

    &:hover {
      background: $lpb-green-dark;
      color: $lpb-white;
      transform: none;
    }
  }
}
</style>
