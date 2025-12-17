// app/(web)/layout.tsx
import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

/**
 * Este layout SOLO se aplica a las rutas dentro de la carpeta (web),
 * como la página principal, productos, contacto, etc.
 * Aquí colocamos el Header, Footer y WhatsApp.
 */
export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      {/* Analytics lo dejamos en el RootLayout porque es global */}
    </>
  )
}