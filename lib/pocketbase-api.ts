import { pb, COLLECTIONS, handlePBError, type PBUser } from "./pocketbase"

export const PocketBaseApi = {
  // Autenticación
  async signUp(email: string, password: string, name: string, ubicacion?: string) {
    try {
      const userData = {
        email,
        password,
        passwordConfirm: password,
        name,
        ubicacion: ubicacion || "",
      }

      await pb.collection(COLLECTIONS.USERS).create(userData)
      const authData = await pb.collection(COLLECTIONS.USERS).authWithPassword(email, password)

      return {
        user: authData.record as PBUser,
        token: pb.authStore.token,
      }
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async signIn(email: string, password: string) {
    try {
      const authData = await pb.collection(COLLECTIONS.USERS).authWithPassword(email, password)
      return {
        user: authData.record as PBUser,
        token: pb.authStore.token,
      }
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async signOut() {
    try {
      pb.authStore.clear()
      return true
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async getCurrentUser() {
    try {
      if (!pb.authStore.isValid) return null
      const user = await pb.collection(COLLECTIONS.USERS).getOne(pb.authStore.model?.id)
      return user as PBUser
    } catch (error) {
      console.error("Error obteniendo usuario actual:", error)
      return null
    }
  },

  // Temas
  async getTemas() {
    try {
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

  // Verificar conexión
  async verifyConnection() {
    try {
      await pb.health.check()
      return { success: true, message: "Conexión exitosa con PocketBase" }
    } catch (error) {
      return { success: false, message: handlePBError(error) }
    }
  },
}
