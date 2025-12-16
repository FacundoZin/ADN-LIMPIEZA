"use client"

import type React from "react"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWhatsAppLink, BUSINESS_WHATSAPP, WHATSAPP_MESSAGES } from "@/lib/whatsapp"

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
    <Button variant={variant} size={size} className={`gap-2 ${className}`} onClick={handleClick}>
      <MessageCircle className="h-5 w-5" />
      {children || "Contactar por WhatsApp"}
    </Button>
  )
}
