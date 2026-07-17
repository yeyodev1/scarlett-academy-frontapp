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
        <h1>Aviso Legal</h1>
        <p class="legal__updated">Última actualización: 10 de mayo de 2026</p>
      </header>

      <section>
        <h2>1. Titular del sitio</h2>
        <p>
          Este sitio es propiedad de Scarlett Cordova, persona
          natural con domicilio en Ecuador (<em>[PENDIENTE: nombre legal exacto, RUC/cédula, dirección física]</em>).
        </p>
        <p>
          Contacto oficial: <em>[PENDIENTE: email oficial de contacto]</em>.
        </p>
      </section>

      <section>
        <h2>2. Objeto del sitio</h2>
        <p>
          Este es el sitio digital de la marca personal de Scarlett Cordova,
          dirigido a presentar su trabajo como coach de transformación corporal y a invitar a mujeres
          a unirse a su comunidad anual cerrada, cuyo registro de preventa se realiza en
          sus productos y servicios digitales.
        </p>
      </section>

      <section>
        <h2>3. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio (textos, fotografías, gráficos, vídeos, logotipos y marca)
          son propiedad de Scarlett Cordova o se utilizan bajo licencia. Está prohibida su
          reproducción, distribución o transformación sin autorización previa.
        </p>
      </section>

      <section>
        <h2>4. Uso del sitio</h2>
        <p>
          Te comprometes a hacer un uso lícito del sitio, sin realizar conductas que puedan dañarlo o
          impedir su correcto funcionamiento. No se permite el uso del sitio para scraping masivo,
          minería automatizada ni cualquier finalidad que vulnere derechos de terceros.
        </p>
      </section>

      <section>
        <h2>5. Responsabilidad</h2>
        <p>
          Hacemos esfuerzos razonables para mantener la información actualizada y exacta. Sin embargo,
          no garantizamos la inexistencia de errores ni la disponibilidad continua del sitio, y no
          asumimos responsabilidad por daños derivados del uso del mismo.
        </p>
        <p>
          El acceso a los productos digitales de Scarlett Cordova se rige por términos y
          condiciones específicos que se entregan en el momento de la inscripción.
        </p>
      </section>

      <section>
        <h2>6. Enlaces externos</h2>
        <p>
          El sitio puede contener enlaces a sitios externos (por ejemplo, Instagram o
          plataformas externas autorizadas). No nos hacemos responsables del contenido o políticas de esos
          sitios.
        </p>
      </section>

      <section>
        <h2>7. Ley aplicable y jurisdicción</h2>
        <p>
          Este aviso legal se rige por las leyes de la República del Ecuador. Cualquier controversia
          relacionada con el sitio se someterá a la jurisdicción de los jueces competentes en Ecuador,
          renunciando a cualquier otro fuero que pudiera corresponder.
        </p>
      </section>

      <section>
        <h2>8. Modificaciones</h2>
        <p>
          Podemos modificar este aviso legal en cualquier momento. La fecha de la última actualización
          aparece al inicio del documento.
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
