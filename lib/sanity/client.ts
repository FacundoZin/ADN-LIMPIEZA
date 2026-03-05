import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

/** Cliente de solo lectura (CDN) — para el sitio público */
// export const sanityClient = createClient({
//   projectId: projectId ?? "your-project-id",
//   dataset,
//   useCdn: true,
//   apiVersion: "2024-01-01",
// })

/** Cliente con token de escritura — para el panel admin (eliminar, crear, editar) */
// export const sanityAdminClient = createClient({
//   projectId: projectId ?? "your-project-id",
//   dataset,
//   useCdn: false,
//   apiVersion: "2024-01-01",
//   token: process.env.SANITY_API_TOKEN,
// })

/** Construye la URL de imagen de Sanity o devuelve una URL directa si es un string */
export function urlFor(source: any) {
  // Soporte para URLs directas (Prisma/Local)
  if (typeof source === 'string') {
    return {
      width: () => ({
        height: () => ({
          url: () => source
        }),
        url: () => source
      }),
      url: () => source
    } as any;
  }

  if (!source?.asset?._ref) {
    const fallback = "/assorted-cleaning-products.png";
    return {
      width: () => ({
        height: () => ({
          url: () => fallback
        }),
        url: () => fallback
      }),
      url: () => fallback
    } as any;
  }

  // Soporte para rutas locales guardadas en el objeto asset (Prisma/Uploads)
  if (source.asset._ref.startsWith("/")) {
    const localUrl = source.asset._ref;
    return {
      width: () => ({
        height: () => ({
          url: () => localUrl
        }),
        url: () => localUrl
      }),
      url: () => localUrl
    } as any;
  }

  const pId = projectId ?? "your-project-id"
  const [, id, dimensions, format] = source.asset._ref.split("-")
  const baseUrl = `https://cdn.sanity.io/images/${pId}/${dataset}/${id}-${dimensions}.${format}`

  return {
    width: () => ({
      height: () => ({
        url: () => baseUrl
      }),
      url: () => baseUrl
    }),
    url: () => baseUrl
  } as any;
}
