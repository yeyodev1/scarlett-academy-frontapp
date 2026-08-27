import { createRouter, createWebHistory, type RouteMeta, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { SITE_URL } from '@/config/site'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    canonical?: string
    ogTitle?: string
    ogDescription?: string
    ogUrl?: string
    ogImage?: string
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}

const SITE = SITE_URL
const OG_IMAGE =
  'https://res.cloudinary.com/kyt3rjjz/image/upload/w_1200,h_630,c_fill,g_face,q_auto,f_jpg/metodosk/sk-14'

const BRAND_TITLE =
  'Scarlett Cordova | Nutrición y entrenamiento con método'
const BRAND_DESC =
  'Dos formas de empezar: el ebook Quema Grasa, Construye Músculo y el Reto Método SK de 3 meses. Ciencia, estrategia y cero castigo.'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: BRAND_TITLE,
      description: BRAND_DESC,
      canonical: `${SITE}/`,
      ogTitle: BRAND_TITLE,
      ogDescription: BRAND_DESC,
      ogUrl: `${SITE}/`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/politicas-privacidad',
    name: 'privacy-policy',
    component: () => import('@/views/PrivacyPolicyView.vue'),
    meta: {
      title: 'Políticas de Privacidad | Scarlett Cordova',
      description:
        'Cómo Scarlett Cordova trata los datos personales recogidos en el sitio.',
      canonical: `${SITE}/politicas-privacidad`,
      ogTitle: 'Políticas de Privacidad | Scarlett Cordova',
      ogDescription: 'Tratamiento y protección de datos personales en scarlettcordova.com.',
      ogUrl: `${SITE}/politicas-privacidad`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/aviso-legal',
    name: 'legal-notice',
    component: () => import('@/views/LegalNoticeView.vue'),
    meta: {
      title: 'Aviso Legal | Scarlett Cordova',
      description: 'Términos de uso del sitio scarlettcordova.com.',
      canonical: `${SITE}/aviso-legal`,
      ogTitle: 'Aviso Legal | Scarlett Cordova',
      ogDescription: 'Términos de uso del sitio scarlettcordova.com.',
      ogUrl: `${SITE}/aviso-legal`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Iniciar sesión | Scarlett Cordova',
      description: 'Accede a tu cuenta del Reto Método SK y continúa con tu proceso.',
      canonical: `${SITE}/login`,
      ogTitle: 'Iniciar sesión | Scarlett Cordova',
      ogDescription: 'Accede a tu cuenta del Reto Método SK y continúa con tu proceso.',
      ogUrl: `${SITE}/login`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/registro',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: 'Registro | Scarlett Cordova',
      description: 'El registro a la comunidad todavía no está abierto. Pronto podrás crear tu cuenta.',
      canonical: `${SITE}/registro`,
      ogTitle: 'Registro | Scarlett Cordova',
      ogDescription: 'El registro a la comunidad todavía no está abierto. Pronto podrás crear tu cuenta.',
      ogUrl: `${SITE}/registro`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/verificar-email',
    name: 'verify-email',
    component: () => import('@/views/VerifyEmailView.vue'),
    meta: {
      title: 'Verificar email | Scarlett Cordova',
      description: 'Confirma tu correo para activar tu cuenta.',
      canonical: `${SITE}/verificar-email`,
      ogTitle: 'Verificar email | Scarlett Cordova',
      ogDescription: 'Confirma tu correo para activar tu cuenta.',
      ogUrl: `${SITE}/verificar-email`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/recuperar-contrasena',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: {
      title: 'Recuperar contraseña | Scarlett Cordova',
      description: 'Recupera el acceso a tu cuenta.',
      canonical: `${SITE}/recuperar-contrasena`,
      ogTitle: 'Recuperar contraseña | Scarlett Cordova',
      ogDescription: 'Recupera el acceso a tu cuenta.',
      ogUrl: `${SITE}/recuperar-contrasena`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/restablecer-contrasena',
    name: 'reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
    meta: {
      title: 'Restablecer contraseña | Scarlett Cordova',
      description: 'Crea una nueva contraseña para tu cuenta.',
      canonical: `${SITE}/restablecer-contrasena`,
      ogTitle: 'Restablecer contraseña | Scarlett Cordova',
      ogDescription: 'Crea una nueva contraseña para tu cuenta.',
      ogUrl: `${SITE}/restablecer-contrasena`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/pago/confirmar',
    name: 'payment-result',
    component: () => import('@/views/PaymentResultView.vue'),
    meta: {
      title: 'Confirmación de pago | Scarlett Cordova',
      description: 'Resultado de tu pago del Reto Método SK.',
      canonical: `${SITE}/pago/confirmar`,
      ogTitle: 'Confirmación de pago | Scarlett Cordova',
      ogDescription: 'Resultado de tu pago del Reto Método SK.',
      ogUrl: `${SITE}/pago/confirmar`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/pay-response',
    name: 'pay-response',
    component: () => import('@/views/PaymentResultView.vue'),
    meta: {
      title: 'Confirmación de pago | Scarlett Cordova',
      description: 'Resultado de tu pago del Reto Método SK.',
      canonical: `${SITE}/pay-response`,
      ogTitle: 'Confirmación de pago | Scarlett Cordova',
      ogDescription: 'Resultado de tu pago del Reto Método SK.',
      ogUrl: `${SITE}/pay-response`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/app',
    component: () => import('@/components/dashboard/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: 'Mi cuenta | Scarlett Cordova',
          description: 'Tu espacio personal de aprendizaje y transformación.',
          canonical: `${SITE}/app`,
          ogTitle: 'Mi cuenta | Scarlett Cordova',
          ogDescription: 'Tu espacio personal de aprendizaje y transformación.',
          ogUrl: `${SITE}/app`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'cursos',
        name: 'courses',
        component: () => import('@/views/dashboard/CoursesView.vue'),
        meta: {
          title: 'Mis cursos | Scarlett Cordova',
          description: 'Todos tus cursos disponibles.',
          canonical: `${SITE}/app/cursos`,
          ogTitle: 'Mis cursos | Scarlett Cordova',
          ogDescription: 'Todos tus cursos disponibles.',
          ogUrl: `${SITE}/app/cursos`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'cursos/:courseId',
        name: 'course-detail',
        component: () => import('@/views/dashboard/CourseDetailView.vue'),
        meta: {
          title: 'Curso | Scarlett Cordova',
          description: 'Contenido del curso.',
          canonical: `${SITE}/app/cursos`,
          ogTitle: 'Curso | Scarlett Cordova',
          ogDescription: 'Contenido del curso.',
          ogUrl: `${SITE}/app/cursos`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'cursos/:courseId/clases/:lessonId',
        name: 'lesson',
        component: () => import('@/views/dashboard/LessonView.vue'),
        meta: {
          title: 'Clase | Scarlett Cordova',
          description: 'Clase en reproducción.',
          canonical: `${SITE}/app/cursos`,
          ogTitle: 'Clase | Scarlett Cordova',
          ogDescription: 'Clase en reproducción.',
          ogUrl: `${SITE}/app/cursos`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'clases-en-vivo',
        name: 'live-classes',
        component: () => import('@/views/dashboard/LiveClassesView.vue'),
        meta: {
          title: 'Clases en vivo | Scarlett Cordova',
          description: 'Próximas clases en vivo con Luisa.',
          canonical: `${SITE}/app/clases-en-vivo`,
          ogTitle: 'Clases en vivo | Scarlett Cordova',
          ogDescription: 'Próximas clases en vivo con Luisa.',
          ogUrl: `${SITE}/app/clases-en-vivo`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'horario',
        name: 'schedule',
        component: () => import('@/views/dashboard/ScheduleView.vue'),
        meta: {
          title: 'Horario | Scarlett Cordova',
          description: 'Horario semanal de actividades.',
          canonical: `${SITE}/app/horario`,
          ogTitle: 'Horario | Scarlett Cordova',
          ogDescription: 'Horario semanal de actividades.',
          ogUrl: `${SITE}/app/horario`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'recetas',
        name: 'recipes',
        component: () => import('@/views/dashboard/RecipesView.vue'),
        meta: {
          title: 'Recetas | Scarlett Cordova',
          description: 'Recetas saludables para tu transformación.',
          canonical: `${SITE}/app/recetas`,
          ogTitle: 'Recetas | Scarlett Cordova',
          ogDescription: 'Recetas saludables para tu transformación.',
          ogUrl: `${SITE}/app/recetas`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'logros',
        name: 'achievements',
        component: () => import('@/views/dashboard/AchievementsView.vue'),
        meta: {
          title: 'Logros | Scarlett Cordova',
          description: 'Tus logros y reconocimientos.',
          canonical: `${SITE}/app/logros`,
          ogTitle: 'Logros | Scarlett Cordova',
          ogDescription: 'Tus logros y reconocimientos.',
          ogUrl: `${SITE}/app/logros`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'configuracion',
        name: 'settings',
        component: () => import('@/views/dashboard/SettingsView/index.vue'),
        meta: {
          title: 'Configuración | Scarlett Cordova',
          description: 'Gestiona tu perfil y suscripción.',
          canonical: `${SITE}/app/configuracion`,
          ogTitle: 'Configuración | Scarlett Cordova',
          ogDescription: 'Gestiona tu perfil y suscripción.',
          ogUrl: `${SITE}/app/configuracion`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'pagos',
        name: 'payments',
        component: () => import('@/views/dashboard/PaymentsView/index.vue'),
        meta: {
          title: 'Pagos | Scarlett Cordova',
          description: 'Gestiona tus pagos y suscripción.',
          canonical: `${SITE}/app/pagos`,
          ogTitle: 'Pagos | Scarlett Cordova',
          ogDescription: 'Gestiona tus pagos y suscripción.',
          ogUrl: `${SITE}/app/pagos`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/components/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: { name: 'admin-users' },
      },
      {
        path: 'usuarios',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsersView/index.vue'),
        meta: {
          title: 'Admin - Usuarios | Scarlett Cordova',
          description: 'Gestión de usuarios de la academia.',
          canonical: `${SITE}/admin/usuarios`,
          ogTitle: 'Admin - Usuarios | Scarlett Cordova',
          ogDescription: 'Gestión de usuarios de la academia.',
          ogUrl: `${SITE}/admin/usuarios`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'vips',
        name: 'admin-vips',
        component: () => import('@/views/admin/AdminVipsView/index.vue'),
        meta: {
          title: 'Admin - VIPs | Metodo SK',
          description: 'Acceso VIP al reto sin pago.',
          canonical: `${SITE}/admin/vips`,
          ogTitle: 'Admin - VIPs | Metodo SK',
          ogDescription: 'Acceso VIP al reto sin pago.',
          ogUrl: `${SITE}/admin/vips`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
      {
        path: 'pagos',
        name: 'admin-payments',
        component: () => import('@/views/admin/AdminPaymentsView/index.vue'),
        meta: {
          title: 'Admin - Pagos | Scarlett Cordova',
          description: 'Gestión de pagos manuales de la academia.',
          canonical: `${SITE}/admin/pagos`,
          ogTitle: 'Admin - Pagos | Scarlett Cordova',
          ogDescription: 'Gestión de pagos manuales de la academia.',
          ogUrl: `${SITE}/admin/pagos`,
          ogImage: OG_IMAGE,
        } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/no-permiso',
    name: 'no-permission',
    component: () => import('@/views/admin/NoPermissionView.vue'),
    meta: {
      title: 'Sin permiso | Scarlett Cordova',
      description: 'No tienes permiso para acceder a esta sección.',
      canonical: `${SITE}/no-permiso`,
      ogTitle: 'Sin permiso | Scarlett Cordova',
      ogDescription: 'No tienes permiso para acceder a esta sección.',
      ogUrl: `${SITE}/no-permiso`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  // 404 → home
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    return { top: 0, behavior: 'instant' }
  },
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.meta.requiresAdmin && userStore.role !== 'admin') {
    return { name: 'no-permission' }
  }

  // El home solo es para no-autenticados; si está logueado redirige.
  if (to.name === 'home' && userStore.isAuthenticated) {
    if (userStore.role === 'admin') return { name: 'admin-users' }
    if (userStore.hasActiveAccess) return { name: 'dashboard' }
    return { name: 'payments' }
  }

  // Los usuarios normales sin acceso activo no deben ver el dashboard /app;
  // se envían a la página de pago dentro de la plataforma.
  if (
    to.name === 'dashboard' &&
    userStore.isAuthenticated &&
    userStore.role !== 'admin' &&
    !userStore.hasActiveAccess
  ) {
    return { name: 'payments' }
  }

  const publicAuthRoutes = ['login', 'register', 'forgot-password', 'reset-password']
  if (publicAuthRoutes.includes(String(to.name)) && userStore.isAuthenticated) {
    if (userStore.role === 'admin') return { name: 'admin-users' }
    if (userStore.hasActiveAccess) return { name: 'dashboard' }
    return { name: 'payments' }
  }
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  // metodosk.ec sigue apuntando a este frontend: normaliza cualquier copy
  // heredado al dominio desde el que se sirve realmente la página.
  const rebrand = (value: string) =>
    value.replaceAll('metodosk.ec', new URL(SITE).hostname)
  document.title = rebrand(meta.title ?? BRAND_TITLE)
  setMeta('description', rebrand(meta.description ?? BRAND_DESC))
  setOgMeta('og:title', rebrand(meta.ogTitle ?? meta.title ?? BRAND_TITLE))
  setOgMeta('og:description', rebrand(meta.ogDescription ?? meta.description ?? BRAND_DESC))
  setOgMeta('og:url', meta.ogUrl ?? SITE)
  setOgMeta('og:image', meta.ogImage ?? OG_IMAGE)
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? BRAND_TITLE)
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? BRAND_DESC)
  setOgMeta('twitter:image', meta.ogImage ?? OG_IMAGE)
  setCanonical(meta.canonical ?? SITE)
})

export default router
