"use client"

import type React from "react"

import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWhatsAppLink, BUSINESS_WHATSAPP, WHATSAPP_MESSAGES } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  message?: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({
  message = WHATSAPP_MESSAGES.general,
  variant = "default",
  size = "default",
  className = "",
  children,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    window.open(getWhatsAppLink(BUSINESS_WHATSAPP, message), "_blank")
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn("gap-2 group transition-all duration-300", className)} 
      onClick={handleClick}
    >
      <SendHorizontal className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      {children || "Contactar por WhatsApp"}
    </Button>
  )
}
