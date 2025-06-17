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

      const user = await pb.collection(COLLECTIONS.USERS).create(userData)

      // Autenticar automáticamente después del registro
      await pb.collection(COLLECTIONS.USERS).authWithPassword(email, password)

      return {
        user: pb.authStore.model as PBUser,
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
      if (!pb.authStore.isValid) {
        return null
      }

      // Refrescar los datos del usuario
      const user = await pb.collection(COLLECTIONS.USERS).getOne(pb.authStore.model?.id)
      return user as PBUser
    } catch (error) {
      console.error("Error al obtener usuario actual:", error)
      return null
    }
  },

  // Temas
  async getTemas() {
    try {
      const records = await pb.collection(COLLECTIONS.TEMAS).getFullList({
        sort: "-created",
      })
      return records
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async getTema(id: string) {
    try {
      const record = await pb.collection(COLLECTIONS.TEMAS).getOne(id)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async crearTema(data: any) {
    try {
      const record = await pb.collection(COLLECTIONS.TEMAS).create(data)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Tests
  async getTests() {
    try {
      const records = await pb.collection(COLLECTIONS.TESTS).getFullList({
        sort: "-created",
        expand: "usuario",
      })
      return records
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async getTest(id: string) {
    try {
      const record = await pb.collection(COLLECTIONS.TESTS).getOne(id, {
        expand: "preguntas,usuario",
      })
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Mapas Mentales
  async getMapasMentales() {
    try {
      const records = await pb.collection(COLLECTIONS.MAPAS_MENTALES).getFullList({
        sort: "-created",
        expand: "usuario",
      })
      return records
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async getMapaMental(id: string) {
    try {
      const record = await pb.collection(COLLECTIONS.MAPAS_MENTALES).getOne(id, {
        expand: "usuario",
      })
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Publicaciones
  async getPublicaciones() {
    try {
      const records = await pb.collection(COLLECTIONS.PUBLICACIONES).getFullList({
        sort: "-created",
        expand: "usuario",
      })
      return records
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Tests - métodos adicionales
  async crearTest(data: any) {
    try {
      const testData = {
        ...data,
        usuario: pb.authStore.model?.id,
        created: new Date().toISOString(),
      }
      const record = await pb.collection(COLLECTIONS.TESTS).create(testData)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async generarTest(data: any) {
    try {
      // Aquí iría la lógica de generación con IA
      const testData = {
        titulo: data.titulo || "Test Generado",
        descripcion: data.descripcion || "",
        tema_id: data.tema_id,
        preguntas: data.preguntas || [],
        usuario: pb.authStore.model?.id,
        generado_por_ia: true,
        created: new Date().toISOString(),
      }
      const record = await pb.collection(COLLECTIONS.TESTS).create(testData)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Mapas Mentales - métodos adicionales
  async crearMapaMental(data: any) {
    try {
      const mapaData = {
        ...data,
        usuario: pb.authStore.model?.id,
        created: new Date().toISOString(),
      }
      const record = await pb.collection(COLLECTIONS.MAPAS_MENTALES).create(mapaData)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async generarMapaMental(data: any) {
    try {
      // Aquí iría la lógica de generación con IA
      const mapaData = {
        titulo: data.titulo || "Mapa Mental Generado",
        contenido: data.contenido || {},
        tema_id: data.tema_id,
        usuario: pb.authStore.model?.id,
        generado_por_ia: true,
        created: new Date().toISOString(),
      }
      const record = await pb.collection(COLLECTIONS.MAPAS_MENTALES).create(mapaData)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Publicaciones - métodos adicionales
  async crearPublicacion(data: any) {
    try {
      const publicacionData = {
        ...data,
        usuario: pb.authStore.model?.id,
        created: new Date().toISOString(),
      }
      const record = await pb.collection(COLLECTIONS.PUBLICACIONES).create(publicacionData)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async getComentarios(publicacionId: string) {
    try {
      const records = await pb.collection(COLLECTIONS.COMENTARIOS).getFullList({
        filter: `publicacion_id = "${publicacionId}"`,
        sort: "-created",
        expand: "usuario",
      })
      return records
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  async crearComentario(data: any) {
    try {
      const comentarioData = {
        ...data,
        usuario: pb.authStore.model?.id,
        created: new Date().toISOString(),
      }
      const record = await pb.collection(COLLECTIONS.COMENTARIOS).create(comentarioData)
      return record
    } catch (error) {
      throw new Error(handlePBError(error))
    }
  },

  // Verificar conexión
  async verifyConnection() {
    try {
      await pb.health.check()
      return {
        success: true,
        message: "Conexión exitosa con PocketBase",
      }
    } catch (error) {
      return {
        success: false,
        message: handlePBError(error),
      }
    }
  },
}
