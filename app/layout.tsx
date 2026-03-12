import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "ADN Limpieza — Productos Profesionales de Limpieza",
    template: "%s | ADN Limpieza"
  },
  description:
    "Venta de productos de limpieza profesional en San Francisco, Córdoba. Más de 20 años brindando calidad garantizada para tu hogar y negocio. Desinfectantes, lavandería y más.",
  keywords: ["limpieza", "productos de limpieza", "San Francisco", "Córdoba", "ADN Limpieza", "desinfectantes", "lavandería", "limpieza profesional"],
  authors: [{ name: "ADN Limpieza" }],
  creator: "ADN Limpieza",
  publisher: "ADN Limpieza",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://adn-limpieza.com"), // Placeholder o real
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ADN Limpieza — Productos Profesionales de Limpieza",
    description: "Calidad garantizada en productos de limpieza para el hogar y la industria en San Francisco, Córdoba.",
    url: "https://adn-limpieza.com",
    siteName: "ADN Limpieza",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/ADN-Limpieza-logo-redondo.png",
        width: 800,
        height: 800,
        alt: "ADN Limpieza Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADN Limpieza — Productos Profesionales de Limpieza",
    description: "Calidad garantizada en productos de limpieza en San Francisco, Córdoba.",
    images: ["/ADN-Limpieza-logo-redondo.png"],
  },
  icons: {
    icon: "/ADN-Limpieza-logo-redondo.png",
    apple: "/ADN-Limpieza-logo-redondo.png",
  },
}

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
