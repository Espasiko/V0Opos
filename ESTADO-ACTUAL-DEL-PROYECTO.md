# 📊 **ESTADO ACTUAL DEL PROYECTO - OPOSIA**

> **Fecha de actualización:** Enero 2025  
> **Estado:** ✅ **DESARROLLO ACTIVO - SIN AUTENTICACIÓN**  
> **Modo:** 🔧 **DESARROLLO LOCAL SIMPLIFICADO**

---

## 🎯 **RESUMEN EJECUTIVO**

**OposIA** es una plataforma de preparación para oposiciones de Seguridad Social que utiliza **Inteligencia Artificial** para generar contenido educativo. El proyecto está construido con **Next.js 14** y actualmente configurado para desarrollo **SIN AUTENTICACIÓN** para facilitar el desarrollo rápido.

### **🚨 ESTADO ACTUAL:**
- ✅ **Autenticación DESHABILITADA** - Acceso libre a toda la aplicación
- ✅ **Datos MOCK** - Todo funciona con datos simulados
- ✅ **Sin dependencias externas** - No requiere bases de datos
- ✅ **Desarrollo simplificado** - Arranque inmediato
- ✅ **APIs simuladas** - Respuestas mock para todas las funciones

---

## 🏗️ **CÓMO SE CREÓ EL PROYECTO**

### **1. Inicialización del Proyecto**
\`\`\`bash
# Creación inicial con Next.js 14
npx create-next-app@latest oposia-app --typescript --tailwind --eslint --app

# Estructura de carpetas configurada manualmente:
# - app/ (App Router de Next.js 14)
# - components/ (Componentes React reutilizables)
# - lib/ (Utilidades y servicios)
# - hooks/ (React Hooks personalizados)
# - types/ (Definiciones TypeScript)
\`\`\`

### **2. Configuración de Tecnologías**
\`\`\`bash
# Instalación de dependencias principales
npm install lucide-react          # Iconos
npm install @radix-ui/react-*     # Componentes UI base
npm install class-variance-authority # Utilidades CSS
npm install clsx tailwind-merge   # Utilidades Tailwind
npm install @ai-sdk/cohere         # IA con Cohere
npm install next-themes           # Tema claro/oscuro
\`\`\`

### **3. Configuración de shadcn/ui**
\`\`\`bash
# Inicialización de shadcn/ui
npx shadcn@latest init

# Instalación de componentes específicos
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add navigation-menu
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add separator
\`\`\`

---

## 📦 **DEPENDENCIAS Y LIBRERÍAS**

### **🔧 Dependencias Principales (package.json)**
\`\`\`json
{
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.3",
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    
    "lucide-react": "^0.294.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0",
    
    "@ai-sdk/cohere": "^0.0.9",
    "next-themes": "^0.2.1",
    
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4"
  }
}
\`\`\`

### **🎨 Herramientas de Desarrollo**
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI accesibles
- **ESLint** - Linter de código
- **Lucide React** - Librería de iconos

### **🤖 Inteligencia Artificial**
- **Cohere API** - Generación de texto y análisis
- **Hugging Face** - Modelos de IA especializados
- **Simulación local** - Para desarrollo sin API keys

---

## 🚀 **CÓMO ARRANCAR EL PROYECTO**

### **1. Requisitos del Sistema**
\`\`\`bash
# Verificar versiones mínimas
node --version    # >= 18.17.0
npm --version     # >= 9.0.0
git --version     # Cualquier versión reciente
\`\`\`

### **2. Clonar y Configurar**
\`\`\`bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd oposia-app

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local
\`\`\`

### **3. Configurar Variables de Entorno**
Crear archivo `.env.local`:
\`\`\`env
# 🌐 URLs de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_URL=http://localhost:3000

# 🤖 APIs de Inteligencia Artificial (OPCIONAL para desarrollo)
COHERE_API_KEY=tu_cohere_api_key_aqui
HF_API_KEY=tu_huggingface_api_key_aqui

# 🔐 Seguridad (para futuras implementaciones)
JWT_SECRET=desarrollo_jwt_secret_123456789

# 📊 Redis/Upstash (OPCIONAL - no necesario para desarrollo)
KV_URL=redis://localhost:6379
KV_REST_API_TOKEN=opcional
KV_REST_API_READ_ONLY_TOKEN=opcional
\`\`\`

### **4. Arrancar la Aplicación**
\`\`\`bash
# Modo desarrollo
npm run dev

# La aplicación estará disponible en:
# http://localhost:3000
\`\`\`

---

## 🔑 **CONTRASEÑAS Y CREDENCIALES**

### **🚨 ESTADO ACTUAL: SIN AUTENTICACIÓN**
- ❌ **No se requieren contraseñas**
- ❌ **No hay sistema de login**
- ❌ **Acceso libre a toda la aplicación**
- ✅ **Usuario mock automático**: "Usuario Desarrollo"

### **🔮 Para Futuras Implementaciones:**
\`\`\`env
# Cuando se reactive la autenticación:
ADMIN_EMAIL=admin@oposia.com
ADMIN_PASSWORD=admin123

# Base de datos (cuando se implemente):
DATABASE_URL=postgresql://usuario:password@localhost:5432/oposia
\`\`\`

---

## 🤖 **INTELIGENCIA ARTIFICIAL CONFIGURADA**

### **1. Cohere API**
- **Propósito:** Generación de tests, resúmenes y análisis de texto
- **Endpoint:** `https://api.cohere.ai/v1/`
- **Funciones:**
  - Generar preguntas de examen
  - Resumir contenido de temas
  - Clasificar texto por categorías
  - Análisis de documentos BOE

### **2. Hugging Face**
- **Propósito:** Modelos especializados de IA
- **Endpoint:** `https://api-inference.huggingface.co/`
- **Funciones:**
  - Generación de mapas mentales
  - Procesamiento de lenguaje natural
  - Modelos específicos de educación

### **3. Simulación Local (Actual)**
- **Propósito:** Desarrollo sin API keys
- **Ubicación:** `lib/ai-service.ts`
- **Funciones:**
  - Datos mock para tests
  - Respuestas simuladas
  - Desarrollo offline

### **🔧 APIs Implementadas:**
\`\`\`typescript
// Endpoints disponibles:
POST /api/ia/tests      // Generar tests con IA
POST /api/ia/resumir    // Resumir contenido
POST /api/ia/mapas      // Generar mapas mentales
POST /api/ia/classify   // Clasificar contenido
\`\`\`

---

## 🌐 **PUERTOS Y SERVICIOS**

### **📊 Puertos Utilizados:**
| Puerto | Servicio | Estado | Descripción |
|--------|----------|--------|-------------|
| **3000** | Next.js | ✅ Activo | Aplicación principal |
| **3001** | Next.js (alt) | 🔄 Backup | Puerto alternativo |
| **8090** | PocketBase | ❌ Deshabilitado | Base de datos (futuro) |
| **6379** | Redis | ❌ Opcional | Caché (futuro) |
| **5432** | PostgreSQL | ❌ Futuro | Base de datos (futuro) |

### **🔗 URLs de Desarrollo:**
- **Aplicación:** http://localhost:3000
- **API Routes:** http://localhost:3000/api/*
- **Documentación:** http://localhost:3000/docs (futuro)

---

## 📁 **ESTRUCTURA COMPLETA DEL PROYECTO**

\`\`\`
oposia-app/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 auth/                 # Autenticación (mock)
│   │   │   ├── login/route.ts       # Login simulado
│   │   │   ├── register/route.ts    # Registro simulado
│   │   │   └── logout/route.ts      # Logout simulado
│   │   ├── 📁 ia/                   # Servicios de IA
│   │   │   ├── tests/route.ts       # Generar tests
│   │   │   ├── resumir/route.ts     # Resumir contenido
│   │   │   ├── mapas/route.ts       # Mapas mentales
│   │   │   └── classify/route.ts    # Clasificar texto
│   │   ├── 📁 boe/                  # Boletín Oficial del Estado
│   │   │   ├── buscar/route.ts      # Búsqueda en BOE
│   │   │   └── sumario/[fecha]/route.ts # Sumario por fecha
│   │   ├── temas/route.ts           # CRUD temas (mock)
│   │   ├── tests/route.ts           # CRUD tests (mock)
│   │   ├── mapas/route.ts           # CRUD mapas (mock)
│   │   └── publicaciones/route.ts   # CRUD publicaciones (mock)
│   ├── 📁 (pages)/                  # Páginas de la aplicación
│   │   ├── page.tsx                 # Dashboard principal
│   │   ├── temario/page.tsx         # Página de temario
│   │   ├── tests/page.tsx           # Página de tests
│   │   ├── mapas/page.tsx           # Página de mapas mentales
│   │   ├── comunidad/page.tsx       # Página de comunidad
│   │   ├── boe/page.tsx             # Página del BOE
│   │   ├── ia/page.tsx              # Página de IA
│   │   ├── perfil/page.tsx          # Página de perfil
│   │   ├── login/page.tsx           # Login (mock)
│   │   └── registro/page.tsx        # Registro (mock)
│   ├── layout.tsx                   # Layout principal
│   ├── globals.css                  # Estilos globales
│   ├── error.tsx                    # Página de error
│   └── not-found.tsx               # Página 404
├── 📁 components/                   # Componentes React
│   ├── 📁 ui/                       # Componentes base (shadcn/ui)
│   │   ├── button.tsx               # Botón
│   │   ├── card.tsx                 # Tarjeta
│   │   ├── input.tsx                # Input
│   │   ├── form.tsx                 # Formulario
│   │   ├── dialog.tsx               # Modal
│   │   ├── dropdown-menu.tsx        # Menú desplegable
│   │   ├── navigation-menu.tsx      # Menú de navegación
│   │   ├── tabs.tsx                 # Pestañas
│   │   ├── badge.tsx                # Etiqueta
│   │   ├── avatar.tsx               # Avatar
│   │   └── separator.tsx            # Separador
│   ├── 📁 auth/                     # Componentes de autenticación
│   │   ├── login-form.tsx           # Formulario de login
│   │   └── register-form.tsx        # Formulario de registro
│   ├── dashboard-layout.tsx         # Layout del dashboard
│   ├── dashboard-overview.tsx       # Vista general del dashboard
│   ├── user-nav.tsx                 # Navegación de usuario
│   ├── mode-toggle.tsx              # Cambio de tema
│   ├── theme-provider.tsx           # Proveedor de tema
│   ├── temario-content.tsx          # Contenido del temario
│   ├── tests-content.tsx            # Contenido de tests
│   ├── mapas-content.tsx            # Contenido de mapas
│   ├── comunidad-content.tsx        # Contenido de comunidad
│   ├── boe-viewer.tsx               # Visor del BOE
│   ├── ai-test-generator.tsx        # Generador de tests con IA
│   ├── ai-summary-generator.tsx     # Generador de resúmenes
│   ├── ai-mindmap-generator.tsx     # Generador de mapas mentales
│   └── mind-map-editor.tsx          # Editor de mapas mentales
├── 📁 lib/                          # Librerías y utilidades
│   ├── utils.ts                     # Utilidades generales
│   ├── ai-service.ts                # Servicios de IA (mock)
│   ├── ai-service-real.ts           # Servicios de IA (real)
│   ├── boe-ai-service.ts            # Servicios de IA para BOE
│   ├── boe-agent-service.ts         # Agente de BOE
│   ├── boe-utils.ts                 # Utilidades del BOE
│   ├── boe-types.ts                 # Tipos del BOE
│   ├── auth.ts                      # Utilidades de autenticación
│   ├── user.ts                      # Utilidades de usuario
│   ├── api.ts                       # Cliente API
│   ├── redis.ts                     # Cliente Redis (opcional)
│   ├── upstash.ts                   # Cliente Upstash (opcional)
│   └── stripe.ts                    # Cliente Stripe (futuro)
├── 📁 hooks/                        # React Hooks personalizados
│   ├── use-auth.tsx                 # Hook de autenticación
│   └── use-auth-pocketbase.tsx      # Hook de PocketBase (deshabilitado)
├── 📁 types/                        # Definiciones TypeScript
│   └── pocketbase.ts                # Tipos de PocketBase (futuro)
├── 📁 scripts/                      # Scripts de configuración
│   └── setup-pocketbase.ts          # Setup de PocketBase (futuro)
├── middleware.ts                    # Middleware de Next.js (deshabilitado)
├── tailwind.config.ts               # Configuración de Tailwind
├── next.config.mjs                  # Configuración de Next.js
├── tsconfig.json                    # Configuración de TypeScript
├── package.json                     # Dependencias del proyecto
├── .env.local                       # Variables de entorno (local)
├── .env.example                     # Ejemplo de variables de entorno
├── .gitignore                       # Archivos ignorados por Git
├── README.md                        # Documentación principal
└── ESTADO-ACTUAL-DEL-PROYECTO.md    # Este archivo
\`\`\`

---

## 🔧 **LO QUE FALTA PARA ARRANCAR EN OTRO ENTORNO**

### **1. Requisitos Mínimos**
\`\`\`bash
# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
\`\`\`

### **2. Clonar y Configurar**
\`\`\`bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd oposia-app

# Instalar dependencias
npm install

# Si hay errores de dependencias:
npm install --legacy-peer-deps
\`\`\`

### **3. Configurar Variables de Entorno**
\`\`\`bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar variables necesarias
nano .env.local
\`\`\`

### **4. Variables de Entorno Mínimas**
\`\`\`env
# OBLIGATORIAS para arrancar:
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_URL=http://localhost:3000
JWT_SECRET=cualquier_string_seguro_123456789

# OPCIONALES para desarrollo:
COHERE_API_KEY=opcional_para_ia_real
HF_API_KEY=opcional_para_ia_real
\`\`\`

### **5. Comandos de Arranque**
\`\`\`bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Verificar funcionamiento
curl http://localhost:3000/api/auth/me
\`\`\`

### **6. Verificación de Funcionamiento**
\`\`\`bash
# Verificar que la app arranca
curl -I http://localhost:3000

# Verificar APIs mock
curl http://localhost:3000/api/temas
curl http://localhost:3000/api/tests
curl http://localhost:3000/api/mapas

# Verificar IA (con datos mock)
curl -X POST http://localhost:3000/api/ia/tests \
  -H "Content-Type: application/json" \
  -d '{"tema":"Seguridad Social","numPreguntas":5}'
\`\`\`

---

## 🚨 **PROBLEMAS CONOCIDOS Y SOLUCIONES**

### **1. Error de Puerto Ocupado**
\`\`\`bash
# Problema: Puerto 3000 ocupado
# Solución: Usar puerto alternativo
npm run dev -- -p 3001
\`\`\`

### **2. Error de Dependencias**
\`\`\`bash
# Problema: Conflictos de versiones
# Solución: Limpiar e instalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
\`\`\`

### **3. Error de Variables de Entorno**
\`\`\`bash
# Problema: Variables no cargadas
# Solución: Verificar archivo .env.local
ls -la .env.local
cat .env.local
\`\`\`

### **4. Error de TypeScript**
\`\`\`bash
# Problema: Errores de tipos
# Solución: Verificar configuración
npx tsc --noEmit
\`\`\`

---

## 🎯 **PRÓXIMOS PASOS PARA DESARROLLO**

### **Fase 1: Verificación (ACTUAL)**
- [x] ✅ Eliminar autenticación
- [x] ✅ Configurar datos mock
- [x] ✅ Simplificar APIs
- [x] ✅ Documentar estado actual

### **Fase 2: Desarrollo de Funcionalidades**
- [ ] 🔄 Mejorar generación de tests con IA
- [ ] 🔄 Implementar editor de mapas mentales
- [ ] 🔄 Crear sistema de temario dinámico
- [ ] 🔄 Desarrollar comunidad de usuarios

### **Fase 3: Integración de IA Real**
- [ ] ⏳ Configurar Cohere API
- [ ] ⏳ Implementar Hugging Face
- [ ] ⏳ Optimizar prompts de IA
- [ ] ⏳ Crear sistema de caché

### **Fase 4: Preparación para Producción**
- [ ] ⏳ Reactivar autenticación
- [ ] ⏳ Configurar base de datos
- [ ] ⏳ Implementar sistema de pagos
- [ ] ⏳ Optimizar rendimiento

---

## 📞 **CONTACTO Y SOPORTE**

### **🛠️ Para Desarrollo:**
- **Documentación:** Este archivo + README.md
- **Logs:** `npm run dev` muestra todos los logs
- **Debug:** Usar DevTools del navegador

### **🐛 Reportar Problemas:**
1. Describir el error específico
2. Incluir logs de consola
3. Especificar sistema operativo
4. Adjuntar archivo .env.local (sin credenciales)

### **📋 Comandos Útiles:**
\`\`\`bash
# Ver logs detallados
npm run dev --verbose

# Limpiar caché
npm run clean
rm -rf .next

# Verificar configuración
npm run build --dry-run
\`\`\`

---

## 🎉 **RESUMEN FINAL**

### **✅ Estado Actual:**
- **Proyecto:** 100% funcional sin autenticación
- **Dependencias:** Todas instaladas y configuradas
- **APIs:** Funcionando con datos mock
- **IA:** Simulada localmente
- **Desarrollo:** Listo para continuar

### **🚀 Para Arrancar:**
\`\`\`bash
git clone <repo>
cd oposia-app
npm install
cp .env.example .env.local
npm run dev
\`\`\`

### **🎯 Resultado:**
- **URL:** http://localhost:3000
- **Estado:** ✅ Funcionando
- **Modo:** 🔧 Desarrollo simplificado
- **Próximo paso:** Desarrollar funcionalidades específicas

---

**¡El proyecto está listo para desarrollo continuo!** 🚀

*Última actualización: Enero 2025*
