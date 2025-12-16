"use client"

import { MessageCircle } from "lucide-react"
import { getWhatsAppLink, BUSINESS_WHATSAPP } from "@/lib/whatsapp"

export function FloatingWhatsApp() {
  const handleClick = () => {
    const message = "Hola! Me gustaría obtener más información sobre sus servicios."
    window.open(getWhatsAppLink(BUSINESS_WHATSAPP, message), "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:px-6 group overflow-hidden"
      aria-label="Contactar por WhatsApp"
    >
      {/* Icon */}
      <MessageCircle className="h-6 w-6 flex-shrink-0" />

      <span className="max-w-0 opacity-0 whitespace-nowrap text-sm font-medium overflow-hidden transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-1">
        Chatea con nosotros
      </span>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </button>
  )
}
