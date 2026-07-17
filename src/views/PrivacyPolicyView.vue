<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <main class="legal">
    <article class="legal__container container container--narrow">
      <header class="legal__header">
        <RouterLink to="/" class="legal__back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M8 3 3 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Volver al sitio
        </RouterLink>
        <h1>Políticas de Privacidad</h1>
        <p class="legal__updated">Última actualización: 10 de mayo de 2026</p>
      </header>

      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          Scarlett Cordova, persona natural con domicilio en Ecuador (datos legales completos:
          <em>[PENDIENTE: nombre legal exacto, RUC/cédula, dirección física]</em>), es responsable del
          tratamiento de los datos personales recogidos a través del sitio
          <strong>sitio oficial de Scarlett Cordova</strong>.
        </p>
        <p>
          Para consultas sobre privacidad puedes escribir a
          <em>[PENDIENTE: email oficial de contacto]</em>.
        </p>
      </section>

      <section>
        <h2>2. Datos que tratamos</h2>
        <ul>
          <li>Nombre y apellido.</li>
          <li>Email.</li>
          <li>Teléfono y país.</li>
          <li>Datos técnicos: dirección IP, navegador, dispositivo, fuente de tráfico.</li>
          <li>Datos publicitarios anonimizados a través de Meta Pixel y la API de Conversiones.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalidades</h2>
        <ul>
          <li>Gestionar tu cuenta y el acceso a los productos digitales de Scarlett Cordova.</li>
          <li>Enviarte información operativa relacionada con tus compras y contenidos.</li>
          <li>Medir y optimizar las campañas publicitarias en plataformas como Meta (Facebook / Instagram).</li>
          <li>Cumplir obligaciones legales o requerimientos de autoridades competentes.</li>
        </ul>
      </section>

      <section>
        <h2>4. Base legal</h2>
        <p>
          La base legal para tratar tus datos es <strong>tu consentimiento</strong>, otorgado al
          enviar cualquier formulario de contacto, así como el interés legítimo en medir el
          rendimiento de las campañas publicitarias.
        </p>
      </section>

      <section>
        <h2>5. Compartir con terceros</h2>
        <p>
          Tus datos pueden compartirse, exclusivamente para las finalidades anteriores, con:
        </p>
        <ul>
          <li>Proveedores tecnológicos (CRM, alojamiento, email).</li>
          <li>Meta Platforms, Inc. para medición publicitaria.</li>
          <li>Autoridades públicas cuando sea legalmente exigible.</li>
        </ul>
      </section>

      <section>
        <h2>6. Plazo de conservación</h2>
        <p>
          Conservaremos tus datos mientras dure tu interés en la comunidad y, una vez finalizado,
          durante el plazo legal aplicable para fines tributarios y de defensa de derechos.
        </p>
      </section>

      <section>
        <h2>7. Tus derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos, así
          como a la portabilidad y a retirar el consentimiento en cualquier momento. Para ejercer
          estos derechos escríbenos a <em>[PENDIENTE: email oficial]</em>.
        </p>
      </section>

      <section>
        <h2>8. Cookies y tecnologías similares</h2>
        <p>
          Usamos cookies propias y de terceros (Meta Pixel) para medir el tráfico y optimizar la
          publicidad. Puedes desactivar las cookies desde tu navegador, aunque algunas funciones
          pueden verse afectadas.
        </p>
      </section>

      <section>
        <h2>9. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios legales u operativos. Publicaremos
          siempre la fecha de la última actualización al inicio del documento.
        </p>
      </section>
    </article>
  </main>
</template>

<style lang="scss" scoped>
.legal {
  background: $lpb-paper;
  color: $lpb-black;
  padding-block: clamp(7rem, 12vh, 9rem) clamp(4rem, 8vw, 6rem);
  min-height: 100vh;
}

.legal__container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.legal__header {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.legal__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: $lpb-green-dark;
  font-family: $font-mono;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  width: max-content;
  transition: color .25s ease, gap .25s ease;

  &:hover {
    color: $lpb-black;
    gap: 0.8rem;
  }
}

h1 {
  font-family: $font-display;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2rem, 4.5vw, 3rem);
  letter-spacing: -0.015em;
  margin: 0.25rem 0 0;
  color: $lpb-black;
}

.legal__updated {
  color: $lpb-muted;
  font-family: $font-mono;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  margin: 0;
}

section {
  border-top: 1px solid rgba($lpb-black, 0.12);
  padding-top: 1.25rem;
}

h2 {
  font-family: $font-display;
  font-style: italic;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0 0 0.75rem;
  color: $lpb-black;
}

p, li {
  color: $lpb-graphite;
  line-height: 1.65;
  font-size: 0.98rem;
}

ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

strong {
  color: $lpb-black;
  font-weight: 600;
}

em {
  background: rgba($lpb-green, 0.12);
  padding: 0.1rem 0.45rem;
  border-radius: 0.25rem;
  font-style: normal;
  color: $lpb-green-deep;
  font-family: $font-mono;
  font-size: 0.85em;
}
</style>
