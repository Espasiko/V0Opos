import { Account, Client, ID } from "appwrite";
import { account as originalAccount } from "./appwrite-client";

// Configuración de Appwrite
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";

// Crear un proxy para el objeto account que proporcione métodos de compatibilidad
const account = new Proxy(originalAccount, {
  get(target, prop) {
    console.log(`Proxy intercepting property access: ${String(prop)}`);

    // Si el método existe en el objeto original, devolverlo
    if (prop in target) {
      console.log(`Property found directly on target: ${String(prop)}`);
      return target[prop as keyof typeof target];
    }

    // Implementar métodos de compatibilidad para versiones anteriores del SDK
    if (prop === "createEmailSession") {
      console.log("Providing compatibility implementation for createEmailSession");
      return async (email: string, password: string) => {
        console.log("Compatibility createEmailSession called with:", email);

        try {
          // Implementación alternativa usando la API REST
          const endpoint = APPWRITE_ENDPOINT;
          const projectId = APPWRITE_PROJECT_ID;

          if (!endpoint || !projectId) {
            throw new Error("Configuración de Appwrite incompleta");
          }

          const response = await fetch(`${endpoint}/account/sessions/email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Appwrite-Project": projectId,
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al iniciar sesión");
          }

          console.log("createEmailSession API call successful");
          return await response.json();
        } catch (error) {
          console.error("Error in compatibility createEmailSession:", error);
          throw error;
        }
      };
    }

    // Si no se encuentra el método, devolver una función que lance un error
    console.warn(`Property ${String(prop)} not found, returning undefined`);
    return undefined;
  },
});
