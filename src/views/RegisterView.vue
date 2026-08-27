<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { buildEbookUrl, buildRetoUrl, EBOOK_PRICE } from '@/config/site'
import AuthLayout from '@/components/auth/AuthLayout.vue'

// El registro abierto queda en pausa: la comunidad todavía no está disponible.
// Mientras tanto la página explica el estado y ofrece los dos productos, en vez
// de dejar un formulario que crearía cuentas sin nada detrás.
</script>

<template>
  <AuthLayout
    title="Pronto podrás crear tu cuenta"
    subtitle="La comunidad todavía no está abierta. Estamos terminando de prepararla para que, cuando entres, tengas todo listo desde el primer día."
  >
    <div class="soon">
      <p class="soon__badge">
        <span class="soon__dot" aria-hidden="true" />
        Registro en pausa
      </p>

      <p class="soon__text">
        Por ahora no es posible registrarse. Si ya tienes una cuenta creada,
        puedes entrar con normalidad.
      </p>

      <RouterLink :to="{ name: 'login' }" class="soon__cta">
        Ya tengo cuenta, quiero entrar
      </RouterLink>

      <div class="soon__divider" role="separator">
        <span>Mientras tanto</span>
      </div>

      <ul class="soon__links">
        <li>
          <a :href="buildRetoUrl('registro-pausa')" target="_blank" rel="noopener noreferrer">
            <strong>Reto Método SK</strong>
            <span>3 meses de plan, entrenamiento y nutrición ↗</span>
          </a>
        </li>
        <li>
          <a :href="buildEbookUrl('registro-pausa')" target="_blank" rel="noopener noreferrer">
            <strong>Ebook Quema Grasa, Construye Músculo</strong>
            <span>Empieza hoy por ${{ EBOOK_PRICE }} ↗</span>
          </a>
        </li>
      </ul>
    </div>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.soon {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.soon__badge {
  @include badge-lime;
  align-self: flex-start;
  margin: 0;
}

.soon__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $lpb-black;
  animation: soon-pulse 2s ease-in-out infinite;

  @include reduced-motion { animation: none; }
}

@keyframes soon-pulse {
  50% { opacity: 0.25; }
}

.soon__text {
  @include body;
  margin: 0;
}

.soon__cta {
  @include btn-primary;
  width: 100%;
  text-decoration: none;
}

.soon__divider {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 0.4rem;

  span {
    font-family: $font-mono;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $lpb-muted;
    white-space: nowrap;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba($lpb-black, 0.12);
  }
}

.soon__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin: 0;
  padding: 0;

  a {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1rem 1.15rem;
    border: 1px solid rgba($lpb-black, 0.12);
    border-radius: $r-md;
    text-decoration: none;
    transition: border-color 0.25s ease, transform 0.35s $ease-out;

    &:hover {
      border-color: $lpb-green;
      transform: translateY(-2px);
    }
  }

  strong {
    font-family: $font-display;
    font-weight: 600;
    font-size: 1.02rem;
    color: $lpb-black;
  }

  span {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-muted;
  }
}
</style>
