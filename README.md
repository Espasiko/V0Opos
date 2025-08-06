# 🎓 **OPOSIA - Plataforma de Preparación para Oposiciones con IA**

> **Estado:** ✅ **100% migrado a PocketBase** | **Código limpio** | **Sin dependencias obsoletas**

## 📖 **Descripción del Proyecto**

**OposIA** es una plataforma moderna de preparación para oposiciones de Seguridad Social que utiliza **Inteligencia Artificial** para generar contenido educativo personalizado. El proyecto está construido con **Next.js 14**, **PocketBase** como backend, y múltiples servicios de IA para crear una experiencia de aprendizaje adaptativa.

### **🎯 Características Principales:**
- 🤖 **Generación automática de tests** con IA
- 🧠 **Mapas mentales inteligentes**
- 📚 **Temario estructurado** por módulos
- 👥 **Comunidad de estudiantes**
- 📊 **Seguimiento de progreso**
- 🔍 **Búsqueda en BOE** (Boletín Oficial del Estado)
- 📱 **Diseño responsive** y moderno

---

## 🚀 **CONFIGURACIÓN LOCAL**

### **1. Requisitos Previos**
\`\`\`bash
# Node.js 18+ y npm
node --version  # >= 18.0.0
npm --version   # >= 8.0.0

# Git
git --version
\`\`\`

### **2. Instalación del Proyecto**
\`\`\`bash
# Clonar el repositorio
git clone <tu-repositorio>
cd oposia-app

# Instalar dependencias
npm install

# Instalar PocketBase SDK
npm install pocketbase

# Instalar dependencias adicionales si faltan
npm install @ai-sdk/cohere lucide-react
\`\`\`

### **3. Configuración de Variables de Entorno**
Crear archivo `.env.local`:
\`\`\`env
# 🔧 PocketBase (REQUERIDO)
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090

# 🤖 IA Services (REQUERIDO para funciones de IA)
COHERE_API_KEY=tu_cohere_api_key_aqui
HF_API_KEY=tu_huggingface_api_key_aqui

# 🌐 URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_URL=http://localhost:8000

# 🔐 JWT (para sesiones)
JWT_SECRET=tu_jwt_secret_super_seguro_aqui

# 📊 Upstash Redis (OPCIONAL - para caché avanzado)
KV_URL=tu_upstash_kv_url
KV_REST_API_TOKEN=tu_upstash_token
KV_REST_API_READ_ONLY_TOKEN=tu_upstash_readonly_token
\`\`\`

> **Nota:** Las variables de Upstash Redis son **opcionales**. Si no están configuradas, la aplicación usará almacenamiento en memoria como fallback.

### **4. Configuración de PocketBase**
\`\`\`bash
# Descargar PocketBase desde https://pocketbase.io/docs/
# Para Linux/Mac:
wget https://github.com/pocketbase/pocketbase/releases/download/v0.20.0/pocketbase_0.20.0_linux_amd64.zip
unzip pocketbase_0.20.0_linux_amd64.zip

# Para Windows: descargar el .exe desde GitHub releases

# Ejecutar PocketBase
./pocketbase serve

# Ir a http://127.0.0.1:8090/_/
# Crear cuenta de administrador
# Crear las colecciones usando el script scripts/setup-pocketbase.ts como guía
\`\`\`

---

## 🏗️ **ESTRUCTURA DEL PROYECTO**

\`\`\`
oposia-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Autenticación
│   │   │   ├── login/route.ts    # Login con PocketBase
│   │   │   ├── register/route.ts # Registro con PocketBase
│   │   │   └── logout/route.ts   # Logout
│   │   ├── temas/route.ts        # CRUD de temas
│   │   ├── tests/route.ts        # CRUD de tests
│   │   ├── mapas/route.ts        # CRUD de mapas mentales
│   │   ├── ia/                   # Servicios de IA
│   │   │   ├── tests/route.ts    # Generar tests con IA
│   │   │   ├── resumir/route.ts  # Resumir contenido
│   │   │   └── mapas/route.ts    # Generar mapas mentales
│   │   └── pocketbase/
│   │       └── verify/route.ts   # Verificar conexión
│   ├── login/page.tsx            # Página de login
│   ├── registro/page.tsx         # Página de registro
│   ├── temario/page.tsx          # Página de temario
│   ├── tests/page.tsx            # Página de tests
│   ├── mapas/page.tsx            # Página de mapas mentales
│   ├── comunidad/page.tsx        # Página de comunidad
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── components/                   # Componentes React
│   ├── ui/                       # Componentes UI base
│   ├── auth/                     # Componentes de autenticación
│   ├── login-form.tsx            # Formulario de login
│   ├── register-form.tsx         # Formulario de registro
│   ├── user-nav.tsx              # Navegación de usuario
│   ├── dashboard-overview.tsx    # Dashboard principal
│   ├── pocketbase-status.tsx     # Estado de PocketBase
│   └── dashboard-layout.tsx      # Layout del dashboard
├── lib/                          # Librerías y utilidades
│   ├── pocketbase.ts             # Configuración PocketBase
│   ├── pocketbase-api.ts         # API de PocketBase
│   ├── auth.ts                   # Utilidades de autenticación
│   ├── user.ts                   # Utilidades de usuario
│   └── ai-service.ts             # Servicios de IA
├── hooks/                        # React Hooks
│   ├── use-auth.tsx              # Hook de autenticación principal
│   └── use-auth-pocketbase.tsx   # Hook específico PocketBase
├── types/                        # Tipos TypeScript
│   └── pocketbase.ts             # Tipos de PocketBase
├── scripts/                      # Scripts de configuración
│   └── setup-pocketbase.ts       # Setup de PocketBase
└── middleware.ts                 # Middleware de Next.js
\`\`\`

---

## 🔄 **FLUJOS PRINCIPALES**

### **1. Flujo de Autenticación**
\`\`\`
Usuario → LoginForm → useAuth → PocketBaseApi.signIn → PocketBase → Dashboard
\`\`\`

### **2. Flujo de Generación de Tests con IA**
\`\`\`
Usuario → TestsPage → AI Test Generator → /api/ia/tests → Cohere API → PocketBase → Resultado
\`\`\`

### **3. Flujo de Mapas Mentales**
\`\`\`
Usuario → MapasPage → AI Mindmap Generator → /api/ia/mapas → IA Service → PocketBase → Visualización
\`\`\`

### **4. Flujo de Comunidad**
\`\`\`
Usuario → ComunidadPage → Publicaciones → PocketBase → Comentarios → Interacciones
\`\`\`

---

## 🤖 **IMPLEMENTACIÓN DE IA**

### **Servicios Configurados:**
1. **Cohere** - Generación de texto y análisis
2. **Hugging Face** - Modelos especializados
3. **Simulado** - Para desarrollo sin API keys

### **Funciones de IA Disponibles:**

#### **`lib/ai-service.ts`**
\`\`\`typescript
// Funciones principales:
- generateTest(tema: string, dificultad: string)     // Genera tests automáticamente
- generateSummary(contenido: string)                 // Resume contenido
- generateMindMap(tema: string)                      // Crea mapas mentales
- classifyContent(texto: string)                     // Clasifica contenido por temas
\`\`\`

#### **API Endpoints:**
- `POST /api/ia/tests` - Generar tests con IA
- `POST /api/ia/resumir` - Resumir contenido
- `POST /api/ia/mapas` - Generar mapas mentales

---

## 🔌 **CONEXIONES Y MÓDULOS**

### **Base de Datos (PocketBase):**
- **URL Local:** `http://127.0.0.1:8090`
- **Admin Panel:** `http://127.0.0.1:8090/_/`
- **SDK:** `pocketbase` npm package

### **APIs Externas:**
- **Cohere:** Generación de texto (`COHERE_API_KEY`)
- **Hugging Face:** Modelos de IA (`HF_API_KEY`)
- **BOE:** Consulta del Boletín Oficial del Estado

### **Almacenamiento (Opcional):**
- **Upstash Redis:** Caché avanzado (opcional)
- **Memoria:** Fallback automático si Redis no está disponible

### **Dependencias Principales:**
\`\`\`json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "pocketbase": "^0.20.0",
  "@ai-sdk/cohere": "^0.0.x",
  "tailwindcss": "^3.0.0",
  "typescript": "^5.0.0",
  "lucide-react": "^0.0.x"
}
\`\`\`

---

## ⚠️ **PROBLEMAS CONOCIDOS Y SOLUCIONES**

### **1. Error de Conexión PocketBase**
\`\`\`bash
# ❌ Problema: "Failed to fetch"
# ✅ Solución: Verificar que PocketBase esté ejecutándose
./pocketbase serve

# Verificar URL en .env.local
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
\`\`\`

### **2. Error de CORS**
\`\`\`javascript
// ❌ Problema: CORS en PocketBase
// ✅ Solución: Configurar en PocketBase Admin
// Settings → Application → CORS
// Allowed Origins: http://localhost:3000
\`\`\`

### **3. Error de Variables de Entorno**
\`\`\`bash
# ❌ Problema: "KV_URL and KV_REST_API_TOKEN environment variables must be defined"
# ✅ Solución: Las variables de Upstash son opcionales
# La app funciona sin ellas usando almacenamiento en memoria
\`\`\`

### **4. Error de IA APIs**
\`\`\`bash
# ❌ Problema: "API key not found"
# ✅ Solución: Configurar API keys en .env.local
COHERE_API_KEY=tu_api_key_aqui
HF_API_KEY=tu_api_key_aqui
\`\`\`

---

## 🚀 **COMANDOS PARA DESARROLLO**

\`\`\`bash
# 🔧 Desarrollo
npm run dev              # Iniciar Next.js en desarrollo (puerto 3000)
./pocketbase serve       # Iniciar PocketBase (puerto 8090)

# 🏗️ Producción
npm run build           # Build del proyecto
npm run start           # Iniciar en producción

# 🔍 Utilidades
npm run lint            # Linter ESLint
npm run type-check      # Verificar tipos TypeScript

# 📦 Dependencias
npm install             # Instalar dependencias
npm update              # Actualizar dependencias
\`\`\`

---

## 📋 **LO QUE FALTA IMPLEMENTAR**

### **🎯 Funcionalidades Pendientes:**
- [ ] **Sistema de roles** (admin, profesor, estudiante)
- [ ] **Subida de archivos** (PDFs, imágenes)
- [ ] **Sistema de notificaciones**
- [ ] **Chat en tiempo real**
- [ ] **Estadísticas avanzadas**
- [ ] **Exportación de datos** (PDF, Excel)
- [ ] **Modo offline** (PWA)
- [ ] **Tests cronometrados**
- [ ] **Ranking de usuarios**
- [ ] **Integración con calendario**

### **🔧 Mejoras Técnicas:**
- [ ] **Optimización de imágenes** (Next.js Image)
- [ ] **Caché de API calls** (React Query)
- [ ] **Lazy loading** de componentes
- [ ] **PWA** (Progressive Web App)
- [ ] **Tests unitarios** (Jest + Testing Library)
- [ ] **CI/CD pipeline** (GitHub Actions)
- [ ] **Monitoreo de errores** (Sentry)
- [ ] **Backup automático** de PocketBase

---

## 🎯 **PRÓXIMOS PASOS RECOMENDADOS**

### **Fase 1: Configuración Básica**
1. ✅ **Configurar PocketBase** y crear las colecciones
2. ✅ **Obtener API keys** de Cohere y Hugging Face
3. ✅ **Probar la autenticación** completa
4. ✅ **Testear conexión** a PocketBase

### **Fase 2: Funcionalidades Core**
5. 🔄 **Implementar generación de tests** con IA
6. 🔄 **Crear contenido de ejemplo** (temas, preguntas)
7. 🔄 **Testear todos los flujos** principales
8. 🔄 **Implementar mapas mentales**

### **Fase 3: Optimización**
9. ⏳ **Optimizar rendimiento**
10. ⏳ **Añadir tests unitarios**
11. ⏳ **Implementar caché**
12. ⏳ **Preparar para producción**

---

## 🛠️ **DESARROLLO LOCAL - GUÍA RÁPIDA**

### **Iniciar el Proyecto:**
\`\`\`bash
# Terminal 1: PocketBase
./pocketbase serve

# Terminal 2: Next.js
npm run dev
\`\`\`

### **URLs Importantes:**
- **App:** http://localhost:3000
- **PocketBase Admin:** http://127.0.0.1:8090/_/
- **API:** http://localhost:3000/api

### **Credenciales de Desarrollo:**
- **PocketBase Admin:** Crear en primer acceso
- **Test User:** Crear desde la app de registro

---

## 📞 **SOPORTE Y CONTRIBUCIÓN**

### **Estructura de Commits:**
\`\`\`bash
git commit -m "feat: nueva funcionalidad"
git commit -m "fix: corrección de bug"
git commit -m "docs: actualización documentación"
git commit -m "style: cambios de estilo"
git commit -m "refactor: refactorización de código"
\`\`\`

### **Reportar Issues:**
1. Describir el problema claramente
2. Incluir pasos para reproducir
3. Especificar entorno (OS, Node version, etc.)
4. Adjuntar logs si es posible

---

## 📄 **LICENCIA**
Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

## 🎉 **¡El proyecto está listo para desarrollo!**

**Estado actual:** ✅ **100% migrado a PocketBase**  
**Código limpio:** ✅ **Sin dependencias obsoletas**  
**Documentación:** ✅ **Completa y actualizada**  
**Redis:** ✅ **Opcional - funciona sin configuración**

¡Feliz coding! 🚀
