import { defineStore } from 'pinia'

export interface Lesson {
  id: string
  title: string
  duration: string
  isLocked: boolean
  isCompleted: boolean
  videoUrl?: string
  description: string
}

export interface Course {
  id: string
  title: string
  subtitle: string
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  category: string
  totalDuration: string
  lessons: Lesson[]
}

export interface Comment {
  id: string
  author: string
  avatar: string
  authorPicture: string | null
  content: string
  date: string
  likes: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  iconClass: string
  unlockedAt: string | null
  isLocked: boolean
}

export interface LiveClass {
  id: string
  title: string
  description: string
  type: string
  date: string
  time: string
  duration: string
  coach: string
  isLive: boolean
  zoomUrl?: string
}

export interface ScheduleItem {
  id: string
  day: string
  time: string
  title: string
  type: 'live' | 'qa' | 'workshop' | 'review'
}

export interface Recipe {
  id: string
  title: string
  category: 'desayuno' | 'almuerzo' | 'cena' | 'snack' | 'postre'
  image: string
  calories: number
  protein: number
  carbs: number
  fats: number
  time: string
  servings: number
  ingredients: string[]
  instructions: string[]
  tags: string[]
}

export interface Subscription {
  status: 'none' | 'pending' | 'active'
  plan: 'reto' | 'monthly' | 'annual' | null
  startedAt: string | null
  expiresAt: string | null
  amount: number | null
}

// Sesión vigente (`metodosk/`), la misma de metodosk.ec. La anterior
// (`scarlett/quema-grasa-*`) mostraba a Scarlett pelirroja y quedó obsoleta.
const cloudinaryPhoto = (publicId: string, size: 'course' | 'recipe' = 'course') => {
  const transform = size === 'course'
    ? 'w_800,h_450,c_fill,g_auto,q_auto,f_auto'
    : 'w_800,h_600,c_fill,g_auto,q_auto,f_auto'
  return `https://res.cloudinary.com/kyt3rjjz/image/upload/${transform}/metodosk/${publicId}`
}

function generateLessons(courseId: string, count: number): Lesson[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${courseId}-lesson-${i + 1}`,
    title: `Clase ${i + 1}: ${lessonTitles[courseId]?.[i] ?? `Módulo ${i + 1}`}`,
    duration: `${12 + (i % 5) * 4}:${['30', '45', '00', '15', '20'][i % 5]}`,
    isLocked: i > 2,
    isCompleted: i < 2,
    description: `En esta clase profundizamos en los conceptos clave del módulo ${i + 1} con ejercicios prácticos y material descargable.`,
  }))
}

const lessonTitles: Record<string, string[]> = {
  'course-1': [
    'Fundamentos del cambio',
    'Mindset de resultados',
    'Tu cuerpo, tu aliado',
    'Nutrición sin restricciones',
    'Entrenamiento inteligente',
    'Hábitos que sostienen',
    'Gestión emocional',
    'Planificación semanal',
    'Evolución y ajustes',
    'Cierre de transformación',
  ],
  'course-2': [
    'Reset metabólico',
    'Ayuno e intermitencia',
    'Macros sin obsesión',
    'Recetas de la comunidad',
    'Batch cooking',
    'Comer fuera de casa',
    'Antojos y picos',
    'Hidratación y suplementos',
    'Evaluación de progreso',
    'Protocolo de mantenimiento',
  ],
  'course-3': [
    'Cuerpo funcional',
    'Movilidad diaria',
    'Fuerza en casa',
    'Cardio sin impacto',
    'Core y postura',
    'Rutina express',
    'Descanso activo',
    'Prevención de lesiones',
    'Progresiones',
    'Reto final',
  ],
  'course-4': [
    'Mujer ocupada',
    'Tiempo real',
    'Límites sanos',
    'Energía sostenida',
    'Sueño reparador',
    'Estrés y cortisol',
    'Productividad física',
    'Rituales matutinos',
    'Balance hormonal',
    'Integración total',
  ],
  'course-5': [
    'Comunidad y compromiso',
    'Celebrar cada paso',
    'Mentoría grupal',
    'Preguntas frecuentes',
    'Casos de éxito',
    'Planificación del año',
    'Objetivos claros',
    'Motivación interna',
    'Sistema de recompensas',
    'Tu próximo nivel',
  ],
}

const coursesData: Course[] = [
  {
    id: 'course-1',
    title: 'Transformación Total',
    subtitle: 'El método completo para mujeres que quieren resultados sin sacrificar su vida.',
    thumbnail: cloudinaryPhoto('sk-08'),
    progress: 22,
    totalLessons: 10,
    completedLessons: 2,
    category: 'Fundamentos',
    totalDuration: '5h 20min',
    lessons: generateLessons('course-1', 10),
  },
  {
    id: 'course-2',
    title: 'Nutrición Real',
    subtitle: 'Aprende a comer sin dietas, sin culpa y con resultados duraderos.',
    thumbnail: cloudinaryPhoto('sk-09'),
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Nutrición',
    totalDuration: '4h 50min',
    lessons: generateLessons('course-2', 10),
  },
  {
    id: 'course-3',
    title: 'Entrena en Casa',
    subtitle: 'Rutinas efectivas que puedes hacer sin equipo y en poco tiempo.',
    thumbnail: cloudinaryPhoto('sk-13'),
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Ejercicio',
    totalDuration: '4h 10min',
    lessons: generateLessons('course-3', 10),
  },
  {
    id: 'course-4',
    title: 'Mujer de Alto Rendimiento',
    subtitle: 'Gestiona tu energía, tiempo y bienestar como la dueña de tu vida.',
    thumbnail: cloudinaryPhoto('sk-15'),
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Bienestar',
    totalDuration: '5h 00min',
    lessons: generateLessons('course-4', 10),
  },
  {
    id: 'course-5',
    title: 'Comunidad Anual',
    subtitle: 'Acompañamiento, mentorías y el poder de un grupo que crece junto.',
    thumbnail: cloudinaryPhoto('sk-14'),
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Comunidad',
    totalDuration: '6h 30min',
    lessons: generateLessons('course-5', 10),
  },
]

const commentsData: Comment[] = [
  {
    id: 'c1',
    author: 'María G.',
    avatar: 'MG',
    authorPicture: null,
    content: 'Esta clase me cambió la perspectiva. ¡Gracias Scarlett!',
    date: '2026-06-18T10:30:00Z',
    likes: 12,
  },
  {
    id: 'c2',
    author: 'Ana R.',
    avatar: 'AR',
    authorPicture: null,
    content: '¿Alguien más hizo el ejercicio de la clase 2? Me costó un poco pero valió la pena.',
    date: '2026-06-19T14:15:00Z',
    likes: 8,
  },
  {
    id: 'c3',
    author: 'Carla T.',
    avatar: 'CT',
    authorPicture: null,
    content: 'Me encanta la calidad del contenido. Muy claro y aplicable.',
    date: '2026-06-20T09:00:00Z',
    likes: 5,
  },
]

const achievementsData: Achievement[] = [
  {
    id: 'a1',
    title: 'Primeros pasos',
    description: 'Completaste tu primera clase.',
    iconClass: 'fa-solid fa-shoe-prints',
    unlockedAt: '2026-06-18T10:00:00Z',
    isLocked: false,
  },
  {
    id: 'a2',
    title: 'Constancia',
    description: 'Completaste 5 clases.',
    iconClass: 'fa-solid fa-fire',
    unlockedAt: null,
    isLocked: true,
  },
  {
    id: 'a3',
    title: 'Comunidad',
    description: 'Dejaste tu primer comentario.',
    iconClass: 'fa-solid fa-comments',
    unlockedAt: '2026-06-19T16:00:00Z',
    isLocked: false,
  },
  {
    id: 'a4',
    title: 'En vivo',
    description: 'Asististe a tu primera clase en vivo.',
    iconClass: 'fa-solid fa-video',
    unlockedAt: null,
    isLocked: true,
  },
  {
    id: 'a5',
    title: 'Transformación',
    description: 'Completaste tu primer curso.',
    iconClass: 'fa-solid fa-trophy',
    unlockedAt: null,
    isLocked: true,
  },
]

const liveClassesData: LiveClass[] = [
  {
    id: 'live-1',
    title: 'Q&A con Scarlett: nutrición sin miedo',
    description: 'Sesión de preguntas y respuestas sobre nutrición sin restricciones.',
    type: 'qa',
    date: '2026-06-23',
    time: '19:00',
    duration: '60 min',
    coach: 'Scarlett Cordova',
    isLive: false,
    zoomUrl: '#',
  },
  {
    id: 'live-2',
    title: 'Entrenamiento funcional grupal',
    description: 'Entrenamiento grupal enfocado en funcionalidad y movimiento.',
    type: 'live',
    date: '2026-06-25',
    time: '07:00',
    duration: '45 min',
    coach: 'Scarlett Cordova',
    isLive: false,
    zoomUrl: '#',
  },
  {
    id: 'live-3',
    title: 'Cierre de mes: celebrar resultados',
    description: 'Celebremos juntos los logros del mes y planifiquemos el siguiente.',
    type: 'workshop',
    date: '2026-06-28',
    time: '18:00',
    duration: '90 min',
    coach: 'Scarlett Cordova',
    isLive: false,
    zoomUrl: '#',
  },
]

const scheduleData: ScheduleItem[] = [
  { id: 's1', day: 'Lunes', time: '07:00', title: 'Entrenamiento en vivo', type: 'live' },
  { id: 's2', day: 'Martes', time: '12:00', title: 'Preguntas y respuestas', type: 'qa' },
  { id: 's3', day: 'Miércoles', time: '19:00', title: 'Taller de nutrición', type: 'workshop' },
  { id: 's4', day: 'Jueves', time: '07:00', title: 'Entrenamiento en vivo', type: 'live' },
  { id: 's5', day: 'Viernes', time: '18:00', title: 'Revisión de avances', type: 'review' },
  { id: 's6', day: 'Sábado', time: '09:00', title: 'Mentoría grupal', type: 'workshop' },
]

const recipesData: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Tazón de avena proteica',
    category: 'desayuno',
    image: cloudinaryPhoto('sk-01', 'recipe'),
    calories: 380,
    protein: 28,
    carbs: 42,
    fats: 10,
    time: '10 min',
    servings: 1,
    ingredients: [
      '1/2 taza de avena en hojuelas',
      '1 taza de leche o bebida vegetal',
      '1 scoop de proteína',
      '1/2 plátano en rodajas',
      '1 cucharada de mantequilla de maní',
      'Canela al gusto',
    ],
    instructions: [
      'Calienta la leche en una olla pequeña a fuego medio.',
      'Agrega la avena y cocina por 5 minutos removiendo.',
      'Retira del fuego y mezcla con la proteína.',
      'Sirve en un tazón y decora con plátano, mantequilla de maní y canela.',
    ],
    tags: ['vegetariano', 'alto en proteína'],
  },
  {
    id: 'recipe-2',
    title: 'Pechuga de pollo con vegetales',
    category: 'almuerzo',
    image: cloudinaryPhoto('sk-04', 'recipe'),
    calories: 520,
    protein: 45,
    carbs: 35,
    fats: 18,
    time: '25 min',
    servings: 2,
    ingredients: [
      '2 pechugas de pollo',
      '2 tazas de brócoli',
      '1 taza de zanahoria en rodajas',
      '2 cucharadas de aceite de oliva',
      'Ajo en polvo, sal y pimienta',
      'Jugo de limón',
    ],
    instructions: [
      'Sazona las pechugas con sal, pimienta y ajo en polvo.',
      'Cocina el pollo en una sartén con 1 cucharada de aceite hasta dorar.',
      'En la misma sartén, salta los vegetales con el aceite restante.',
      'Sirve el pollo acompañado de vegetales y rocía jugo de limón.',
    ],
    tags: ['bajo en grasa', 'balanceado'],
  },
  {
    id: 'recipe-3',
    title: 'Ensalada de atún y garbanzos',
    category: 'almuerzo',
    image: cloudinaryPhoto('sk-07', 'recipe'),
    calories: 460,
    protein: 32,
    carbs: 38,
    fats: 16,
    time: '15 min',
    servings: 1,
    ingredients: [
      '1 lata de atún en agua',
      '1/2 taza de garbanzos cocidos',
      '1 tomate picado',
      '1/4 de cebolla morada picada',
      '1 taza de espinaca',
      '1 cucharada de aceite de oliva',
    ],
    instructions: [
      'Escurre el atún y colócalo en un tazón.',
      'Agrega garbanzos, tomate, cebolla y espinaca.',
      'Aliña con aceite de oliva, sal y pimienta.',
      'Mezcla bien y sirve frío.',
    ],
    tags: ['sin cocinar', 'rápido'],
  },
  {
    id: 'recipe-4',
    title: 'Wrap de huevo y aguacate',
    category: 'desayuno',
    image: cloudinaryPhoto('sk-13', 'recipe'),
    calories: 420,
    protein: 22,
    carbs: 36,
    fats: 20,
    time: '10 min',
    servings: 1,
    ingredients: [
      '1 tortilla integral',
      '2 huevos revueltos',
      '1/4 de aguacate en láminas',
      '1/4 taza de frijoles negros',
      'Salsa al gusto',
    ],
    instructions: [
      'Calienta la tortilla.',
      'Coloca los huevos revueltos en el centro.',
      'Agrega aguacate y frijoles.',
      'Envuelve y sirve con salsa.',
    ],
    tags: ['portátil', 'saciante'],
  },
  {
    id: 'recipe-5',
    title: 'Salmón al horno con espárragos',
    category: 'cena',
    image: cloudinaryPhoto('sk-15', 'recipe'),
    calories: 580,
    protein: 40,
    carbs: 12,
    fats: 36,
    time: '30 min',
    servings: 2,
    ingredients: [
      '2 filetes de salmón',
      '1 manojo de espárragos',
      '2 cucharadas de aceite de oliva',
      'Ajo en polvo y eneldo',
      'Sal y pimienta',
      'Rodaja de limón',
    ],
    instructions: [
      'Precalienta el horno a 200°C.',
      'Coloca el salmón y los espárragos en una bandeja.',
      'Rocía con aceite y sazona.',
      'Hornea por 18-20 minutos hasta que el salmón esté cocido.',
    ],
    tags: ['omega-3', 'keto friendly'],
  },
  {
    id: 'recipe-6',
    title: 'Yogur griego con frutos rojos',
    category: 'snack',
    image: cloudinaryPhoto('sk-16', 'recipe'),
    calories: 220,
    protein: 18,
    carbs: 24,
    fats: 6,
    time: '5 min',
    servings: 1,
    ingredients: [
      '1 taza de yogur griego natural',
      '1/2 taza de frutos rojos mixtos',
      '1 cucharada de miel o stevia',
      '1 cucharada de semillas de chía',
    ],
    instructions: [
      'Sirve el yogur en un tazón.',
      'Agrega los frutos rojos por encima.',
      'Rocía con miel y espolvorea las semillas de chía.',
    ],
    tags: ['post-entreno', 'probiótico'],
  },
  {
    id: 'recipe-7',
    title: 'Tacos de pavo con guacamole',
    category: 'cena',
    image: cloudinaryPhoto('sk-10', 'recipe'),
    calories: 490,
    protein: 35,
    carbs: 30,
    fats: 24,
    time: '20 min',
    servings: 2,
    ingredients: [
      '300g de carne molida de pavo',
      '4 tortillas de maíz',
      '1 aguacate maduro',
      'Cilantro picado',
      'Jugo de lima',
      'Sal y pimienta',
    ],
    instructions: [
      'Cocina la carne de pavo en una sartén hasta dorar.',
      'Aplasta el aguacate con lima, cilantro, sal y pimienta.',
      'Calienta las tortillas.',
      'Sirve la carne sobre las tortillas y acompaña con guacamole.',
    ],
    tags: ['sin gluten', 'familiar'],
  },
  {
    id: 'recipe-8',
    title: 'Batido verde detox',
    category: 'snack',
    image: cloudinaryPhoto('sk-17', 'recipe'),
    calories: 180,
    protein: 8,
    carbs: 28,
    fats: 4,
    time: '5 min',
    servings: 1,
    ingredients: [
      '1 taza de espinaca',
      '1/2 pepino',
      '1/2 manzana verde',
      'Jugo de limón',
      'Agua o hielo',
    ],
    instructions: [
      'Lava bien todos los ingredientes.',
      'Colócalos en la licuadora.',
      'Licúa hasta obtener una mezcla homogénea.',
      'Sirve inmediatamente.',
    ],
    tags: ['detox', 'hidrata'],
  },
]

const subscriptionData: Subscription = {
  status: 'active',
  plan: 'annual',
  startedAt: '2026-06-15T00:00:00Z',
  expiresAt: '2027-06-15T23:59:59Z',
  amount: 297,
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    courses: coursesData,
    comments: commentsData,
    achievements: achievementsData,
    liveClasses: liveClassesData,
    schedule: scheduleData,
    recipes: recipesData,
    subscription: subscriptionData,
  }),

  getters: {
    courseById: (state) => {
      return (id: string) => state.courses.find((c) => c.id === id)
    },
    lessonById: (state) => {
      return (courseId: string, lessonId: string) => {
        const course = state.courses.find((c) => c.id === courseId)
        return course?.lessons.find((l) => l.id === lessonId)
      }
    },
    nextLiveClass: (state): LiveClass | null => {
      const now = new Date()
      const upcoming = state.liveClasses
        .map((live) => ({ ...live, dateObj: new Date(`${live.date}T${live.time}`) }))
        .filter((live) => live.dateObj > now)
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
      return upcoming[0] ?? null
    },
    completedAchievements: (state) => state.achievements.filter((a) => !a.isLocked),
    recipeById: (state) => {
      return (id: string) => state.recipes.find((r) => r.id === id)
    },
    recipesByCategory: (state) => {
      return (category: Recipe['category'] | 'todas') => {
        if (category === 'todas') return state.recipes
        return state.recipes.filter((r) => r.category === category)
      }
    },
    totalProgress: (state) => {
      const totalLessons = state.courses.reduce((acc, c) => acc + c.totalLessons, 0)
      const completedLessons = state.courses.reduce((acc, c) => acc + c.completedLessons, 0)
      return totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)
    },
  },

  actions: {
    completeLesson(courseId: string, lessonId: string) {
      const course = this.courses.find((c) => c.id === courseId)
      const lesson = course?.lessons.find((l) => l.id === lessonId)
      if (course && lesson && !lesson.isCompleted) {
        lesson.isCompleted = true
        course.completedLessons += 1
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100)
      }
    },

    addComment(content: string, authorName: string, authorPicture: string | null = null) {
      const initials = authorName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
      this.comments.unshift({
        id: `c-${Date.now()}`,
        author: authorName,
        avatar: initials || 'YO',
        authorPicture,
        content,
        date: new Date().toISOString(),
        likes: 0,
      })
    },
  },
})
