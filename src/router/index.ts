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
  'https://res.cloudinary.com/kyt3rjjz/image/upload/w_1200,h_630,c_fill,g_face,q_auto,f_auto/scarlett/quema-grasa-construye-musculo/img-9664-jpg.jpg'

const BRAND_TITLE =
  'Método SK | Quema Grasa, Construye Músculo'
const BRAND_DESC =
  'Tu espacio digital para dominar nutrición, macros y entrenamiento con ciencia, estrategia y amor propio.'

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
      title: 'Políticas de Privacidad | Método SK',
      description:
        'Cómo Método SK trata los datos personales recogidos en metodosk.ec.',
      canonical: `${SITE}/politicas-privacidad`,
      ogTitle: 'Políticas de Privacidad | Método SK',
      ogDescription: 'Tratamiento y protección de datos personales en metodosk.ec.',
      ogUrl: `${SITE}/politicas-privacidad`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/aviso-legal',
    name: 'legal-notice',
    component: () => import('@/views/LegalNoticeView.vue'),
    meta: {
      title: 'Aviso Legal | Método SK',
      description: 'Términos de uso del sitio metodosk.ec.',
      canonical: `${SITE}/aviso-legal`,
      ogTitle: 'Aviso Legal | Método SK',
      ogDescription: 'Términos de uso del sitio metodosk.ec.',
      ogUrl: `${SITE}/aviso-legal`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'Iniciar sesión | Método SK',
      description: 'Accede a tu cuenta para unirte a la comunidad anual de transformación corporal.',
      canonical: `${SITE}/login`,
      ogTitle: 'Iniciar sesión | Método SK',
      ogDescription: 'Accede a tu cuenta para unirte a la comunidad anual de transformación corporal.',
      ogUrl: `${SITE}/login`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/registro',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: 'Crear cuenta | Método SK',
      description: 'Crea tu cuenta y asegura tu cupo en la comunidad anual cerrada.',
      canonical: `${SITE}/registro`,
      ogTitle: 'Crear cuenta | Método SK',
      ogDescription: 'Crea tu cuenta y asegura tu cupo en la comunidad anual cerrada.',
      ogUrl: `${SITE}/registro`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/verificar-email',
    name: 'verify-email',
    component: () => import('@/views/VerifyEmailView.vue'),
    meta: {
      title: 'Verificar email | Método SK',
      description: 'Confirma tu correo para activar tu cuenta.',
      canonical: `${SITE}/verificar-email`,
      ogTitle: 'Verificar email | Método SK',
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
      title: 'Recuperar contraseña | Método SK',
      description: 'Recupera el acceso a tu cuenta.',
      canonical: `${SITE}/recuperar-contrasena`,
      ogTitle: 'Recuperar contraseña | Método SK',
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
      title: 'Restablecer contraseña | Método SK',
      description: 'Crea una nueva contraseña para tu cuenta.',
      canonical: `${SITE}/restablecer-contrasena`,
      ogTitle: 'Restablecer contraseña | Método SK',
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
      title: 'Confirmación de pago | Método SK',
      description: 'Resultado de tu pago en la comunidad anual Método SK.',
      canonical: `${SITE}/pago/confirmar`,
      ogTitle: 'Confirmación de pago | Método SK',
      ogDescription: 'Resultado de tu pago en la comunidad anual Método SK.',
      ogUrl: `${SITE}/pago/confirmar`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/pay-response',
    name: 'pay-response',
    component: () => import('@/views/PaymentResultView.vue'),
    meta: {
      title: 'Confirmación de pago | Método SK',
      description: 'Resultado de tu pago en la comunidad anual Método SK.',
      canonical: `${SITE}/pay-response`,
      ogTitle: 'Confirmación de pago | Método SK',
      ogDescription: 'Resultado de tu pago en la comunidad anual Método SK.',
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
          title: 'Mi cuenta | Método SK',
          description: 'Tu espacio personal de aprendizaje y transformación.',
          canonical: `${SITE}/app`,
          ogTitle: 'Mi cuenta | Método SK',
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
          title: 'Mis cursos | Método SK',
          description: 'Todos tus cursos disponibles.',
          canonical: `${SITE}/app/cursos`,
          ogTitle: 'Mis cursos | Método SK',
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
          title: 'Curso | Método SK',
          description: 'Contenido del curso.',
          canonical: `${SITE}/app/cursos`,
          ogTitle: 'Curso | Método SK',
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
          title: 'Clase | Método SK',
          description: 'Clase en reproducción.',
          canonical: `${SITE}/app/cursos`,
          ogTitle: 'Clase | Método SK',
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
          title: 'Clases en vivo | Método SK',
          description: 'Próximas clases en vivo con Luisa.',
          canonical: `${SITE}/app/clases-en-vivo`,
          ogTitle: 'Clases en vivo | Método SK',
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
          title: 'Horario | Método SK',
          description: 'Horario semanal de actividades.',
          canonical: `${SITE}/app/horario`,
          ogTitle: 'Horario | Método SK',
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
          title: 'Recetas | Método SK',
          description: 'Recetas saludables para tu transformación.',
          canonical: `${SITE}/app/recetas`,
          ogTitle: 'Recetas | Método SK',
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
          title: 'Logros | Método SK',
          description: 'Tus logros y reconocimientos.',
          canonical: `${SITE}/app/logros`,
          ogTitle: 'Logros | Método SK',
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
          title: 'Configuración | Método SK',
          description: 'Gestiona tu perfil y suscripción.',
          canonical: `${SITE}/app/configuracion`,
          ogTitle: 'Configuración | Método SK',
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
          title: 'Pagos | Método SK',
          description: 'Gestiona tus pagos y suscripción.',
          canonical: `${SITE}/app/pagos`,
          ogTitle: 'Pagos | Método SK',
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
          title: 'Admin - Usuarios | Método SK',
          description: 'Gestión de usuarios de la academia.',
          canonical: `${SITE}/admin/usuarios`,
          ogTitle: 'Admin - Usuarios | Método SK',
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
          title: 'Admin - Pagos | Método SK',
          description: 'Gestión de pagos manuales de la academia.',
          canonical: `${SITE}/admin/pagos`,
          ogTitle: 'Admin - Pagos | Método SK',
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
      title: 'Sin permiso | Método SK',
      description: 'No tienes permiso para acceder a esta sección.',
      canonical: `${SITE}/no-permiso`,
      ogTitle: 'Sin permiso | Método SK',
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
  const rebrand = (value: string) => value
    .replaceAll('Método SK Academy', 'Método SK')
    .replaceAll('Método SK', 'Método SK')
    .replaceAll('Luisa', 'Scarlett')
    .replaceAll('metodosk.ec', new URL(SITE).hostname)
    .replaceAll('comunidad anual', 'academia digital')
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
