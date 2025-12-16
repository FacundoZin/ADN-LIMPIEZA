"use client"

import { MessageCircle } from "lucide-react"
import { getWhatsAppLink, BUSINESS_WHATSAPP } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

export function FloatingWhatsApp() {
  const handleClick = () => {
    const message = "Hola! Me gustaría obtener más información sobre sus productos."
    window.open(getWhatsAppLink(BUSINESS_WHATSAPP, message), "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center gap-2",
        "bg-[#25D366] text-white",
        "px-4 py-4 rounded-2xl",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-500 ease-out",
        "hover:px-6 hover:scale-105",
        "group overflow-hidden"
      )}
      aria-label="Contactar por WhatsApp"
    >
      {/* Icon with subtle animation */}
      <MessageCircle className="h-6 w-6 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />

      {/* Expand text on hover */}
      <span className={cn(
        "max-w-0 opacity-0 whitespace-nowrap",
        "text-sm font-semibold overflow-hidden",
        "transition-all duration-500 ease-out",
        "group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-1"
      )}>
        Chatea con nosotros
      </span>

      {/* Pulse ring effect */}
      <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      
      {/* Hover glow */}
      <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  )
}
