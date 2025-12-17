// app/studio/layout.tsx
import type React from "react"

/**
 * Este layout SOLO se aplica a la ruta /studio.
 * NO tiene Header, Footer, ni Body, porque Next.js los toma del RootLayout.
 * Solo envuelve el contenido del estudio ({children}).
 */
export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Nota: Aquí no devolvemos <html> ni <body>, solo los hijos
  // (aunque técnicamente en tu caso podrías necesitar las clases de fuente)
  return <>{children}</>
}