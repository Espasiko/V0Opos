import { ConfigChecker } from "@/components/debug/config-checker"

export default function ConfiguracionPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración de Appwrite</h1>

      <div className="grid gap-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Esta página te ayudará a configurar correctamente Appwrite para tu aplicación. Asegúrate de tener una
                cuenta en Appwrite y un proyecto creado.
              </p>
            </div>
          </div>
        </div>

        <ConfigChecker />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instrucciones para configurar Appwrite</h2>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">1. Crear una cuenta en Appwrite</h3>
            <p>
              Si aún no tienes una cuenta en Appwrite, puedes crear una en{" "}
              <a
                href="https://cloud.appwrite.io/register"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                cloud.appwrite.io/register
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">2. Crear un proyecto en Appwrite</h3>
            <p>
              Una vez que hayas iniciado sesión, crea un nuevo proyecto en Appwrite. Anota el ID del proyecto, lo
              necesitarás para configurar tu aplicación.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">3. Configurar las variables de entorno</h3>
            <p>Configura las siguientes variables de entorno en tu archivo .env.local:</p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>
                NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
                {"\n"}
                NEXT_PUBLIC_APPWRITE_PROJECT_ID=tu-id-de-proyecto
                {"\n"}
                NEXT_PUBLIC_APPWRITE_DATABASE_ID=tu-id-de-base-de-datos
                {"\n"}
                NEXT_PUBLIC_APPWRITE_STORAGE_ID=tu-id-de-almacenamiento
                {"\n"}
                NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=tu-id-de-coleccion-usuarios
              </code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">4. Configurar CORS en Appwrite</h3>
            <p>
              Asegúrate de configurar CORS en Appwrite para permitir solicitudes desde tu dominio. Puedes hacerlo en la
              sección de configuración de tu proyecto en Appwrite.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">5. Verificar la configuración</h3>
            <p>
              Utiliza el verificador de configuración en esta página para asegurarte de que todo está configurado
              correctamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
