import { createClient } from "@sanity/client"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})

export function urlFor(source: any) {
  if (!source?.asset?._ref) {
    return {
      url: () => "/assorted-cleaning-products.png",
    }
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id"
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

  // Extract image ID from reference
  const [_file, id, dimensions, format] = source.asset._ref.split("-")

  return {
    width: (w: number) => ({
      height: (h: number) => ({
        url: () =>
          `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${w}&h=${h}&fit=crop`,
      }),
      url: () => `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${w}`,
    }),
    height: (h: number) => ({
      url: () => `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?h=${h}`,
    }),
    url: () => `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`,
  }
}
