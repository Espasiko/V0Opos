import { pb, COLLECTIONS, handlePBError, checkConnection, type PBUser } from "./pocketbase"

export const PocketBaseApi = {
  // Verificar conexión antes de cualquier operación
  async verifyConnection() {
    return await checkConnection()
  },

  // Autenticación
  async signUp(email: string, password: string, name: string, ubicacion?: string) {
    try {
      console.log("=== INICIANDO REGISTRO ===")
      console.log("Email:", email)
      console.log("Nombre:", name)
      
      // Verificar conexión primero
      const connectionCheck = await this.verifyConnection()
      if (!connectionCheck.success) {
        console.error("Error de conexión en signUp:", connectionCheck.message)
        throw new Error(connectionCheck.message)
      }

      const userData = {
        email,
        password,
        passwordConfirm: password,
        name,
        ubicacion: ubicacion || "",
      }

      console.log("Intentando crear usuario con datos:", { email, name, ubicacion })
      const user = await pb.collection(COLLECTIONS.USERS).create(userData)
      console.log("Usuario creado exitosamente:", user.id)

      // Autenticar automáticamente después del registro
      console.log("Intentando autenticar usuario recién creado...")
      const authData = await pb.collection(COLLECTIONS.USERS).authWithPassword(email, password)
      console.log("Autenticación exitosa para usuario:", authData.record.email)

      return {
        user: authData.record as PBUser,
        token: pb.authStore.token,
      }
    } catch (error) {
      console.error("=== ERROR EN SIGNUP ===")
      console.error("Error completo:", error)
      throw new Error(handlePBError(error))
    }
  },

  async signIn(email: string, password: string) {
    try {
      console.log("=== INICIANDO LOGIN ===")
      console.log("Email:", email)
      console.log("URL PocketBase:", process.env.NEXT_PUBLIC_POCKETBASE_URL)
      
      // Verificar conexión primero
      console.log("Verificando conexión...")
      const connectionCheck = await this.verifyConnection()
      if (!connectionCheck.success) {
        console.error("Error de conexión en signIn:", connectionCheck.message)
        throw new Error(connectionCheck.message)
      }
      console.log("Conexión verificada exitosamente")

      // Verificar que la colección de usuarios existe
      try {
        console.log("Verificando colección de usuarios...")
        const collections = await pb.collections.getFullList()
        const userCollection = collections.find(c => c.name === COLLECTIONS.USERS)
        if (!userCollection) {
          throw new Error(`La colección '${COLLECTIONS.USERS}' no existe en PocketBase. Asegúrate de crearla primero.`)
        }
        console.log("Colección de usuarios encontrada:", userCollection.name)
      } catch (collectionError) {
        console.error("Error verificando colecciones:", collectionError)
        throw new Error("Error verificando la base de datos. Asegúrate de que PocketBase esté configurado correctamente.")
      }

      console.log("Intentando autenticar con PocketBase...")
      const authData = await pb.collection(COLLECTIONS.USERS).authWithPassword(email, password)
      console.log("Autenticación exitosa para:", authData.record.email)
      console.log("Token generado:", !!authData.token)

      return {
        user: authData.record as PBUser,
        token: pb.authStore.token,
      }
    } catch (error) {
      console.error("=== ERROR EN SIGNIN ===")
      console.error("Error completo:", error)
      console.error("Tipo de error:", typeof error)
      console.error("Propiedades del error:", Object.keys(error || {}))
      
      throw new Error(handlePBError(error))
    }
  },

  async signOut() {
    try {
      console.log("=== CERRANDO SESIÓN ===")
      pb.authStore.clear()
      console.log("Sesión cerrada exitosamente")
      return true
    } catch (error) {
      console.error("Error en signOut:", error)
      throw new Error(handlePBError(error))
    }
  },

  async getCurrentUser() {
    try {
      if (!pb.authStore.isValid) {
        console.log("No hay sesión válida")
        return null
      }

      console.log("Obteniendo usuario actual:", pb.authStore.model?.id)
      const user = await pb.collection(COLLECTIONS.USERS).getOne(pb.authStore.model?.id)
      console.log("Usuario obtenido:", user.email)
      return user as PBUser
    } catch (error) {
      console.error("Error obteniendo usuario actual:", error)
      return null
    }
  },

  // Función para crear un usuario de prueba
  async createTestUser() {
    try {
      const testEmail = "test@oposia.com"
      const testPassword = "test123456"
      const testName = "Usuario de Prueba"

      console.log("Creando usuario de prueba...")
      
      // Verificar si ya existe
      try {
        const existingUsers = await pb.collection(COLLECTIONS.USERS).getFullList({
          filter: `email = "${testEmail}"`
        })
        if (existingUsers.length > 0) {
          console.log("Usuario de prueba ya existe")
          return { email: testEmail, password: testPassword }
        }
      } catch (e) {
        // Si hay error, probablemente la colección no existe
        console.log("La colección de usuarios no existe o está vacía")
      }

      const userData = {
        email: testEmail,
        password: testPassword,
        passwordConfirm: testPassword,
        name: testName,
        ubicacion: "España",
      }

      const user = await pb.collection(COLLECTIONS.USERS).create(userData)
      console.log("Usuario de prueba creado:", user.email)
      
      return { email: testEmail, password: testPassword }
    } catch (error) {
      console.error("Error creando usuario de prueba:", error)
      throw new Error(handlePBError(error))
    }
  },

  // Temas
  async getTemas() {
    try {
      const connectionCheck = await this.verifyConnection()
      if (!connectionCheck.success) {
        throw new Error(connectionCheck.message)
      }

      return await pb.collection(COLLECTIONS.TEMAS).getFullList({ sort: "-created" })
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async getTema(id: string) {
    try {
      return await pb.collection(COLLECTIONS.TEMAS).getOne(id)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async crearTema(data: any) {
    try {
      return await pb.collection(COLLECTIONS.TEMAS).create(data)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Tests
  async getTests() {
    try {
      return await pb.collection(COLLECTIONS.TESTS).getFullList({
        sort: "-created",
        expand: "usuario",
      })
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async crearTest(data: any) {
    try {
      const testData = {
        ...data,
        usuario: pb.authStore.model?.id,
      }
      return await pb.collection(COLLECTIONS.TESTS).create(testData)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async generarTest(data: any) {
    try {
      const testData = {
        titulo: data.titulo || "Test Generado",
        descripcion: data.descripcion || "",
        tema_id: data.tema_id,
        preguntas: data.preguntas || [],
        usuario: pb.authStore.model?.id,
        generado_por_ia: true,
      }
      return await pb.collection(COLLECTIONS.TESTS).create(testData)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Mapas Mentales
  async getMapasMentales() {
    try {
      return await pb.collection(COLLECTIONS.MAPAS_MENTALES).getFullList({
        sort: "-created",
        expand: "usuario",
      })
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async crearMapaMental(data: any) {
    try {
      const mapaData = {
        ...data,
        usuario: pb.authStore.model?.id,
      }
      return await pb.collection(COLLECTIONS.MAPAS_MENTALES).create(mapaData)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async generarMapaMental(data: any) {
    try {
      const mapaData = {
        titulo: data.titulo || "Mapa Mental Generado",
        contenido: data.contenido || {},
        tema_id: data.tema_id,
        usuario: pb.authStore.model?.id,
        generado_por_ia: true,
      }
      return await pb.collection(COLLECTIONS.MAPAS_MENTALES).create(mapaData)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Publicaciones
  async getPublicaciones() {
    try {
      return await pb.collection(COLLECTIONS.PUBLICACIONES).getFullList({
        sort: "-created",
        expand: "usuario",
      })
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async crearPublicacion(data: any) {
    try {
      const publicacionData = {
        ...data,
        usuario: pb.authStore.model?.id,
      }
      return await pb.collection(COLLECTIONS.PUBLICACIONES).create(publicacionData)
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },
}
