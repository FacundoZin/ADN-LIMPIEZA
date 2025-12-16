// Función para generar enlaces de WhatsApp
export function getWhatsAppLink(phoneNumber: string, message?: string): string {
  const formattedNumber = phoneNumber.replace(/\D/g, "")
  const encodedMessage = message ? encodeURIComponent(message) : ""

  return `https://wa.me/${formattedNumber}${encodedMessage ? `?text=${encodedMessage}` : ""}`
}

// Número de WhatsApp del negocio (reemplaza con tu número real)
export const BUSINESS_WHATSAPP = "5493564211526" // +54 3564 21-1526

// Mensajes predefinidos
export const WHATSAPP_MESSAGES = {
  general: "Hola! Me gustaría obtener más información sobre sus servicios.",
  product: (productName: string) => `Hola! Me interesa el producto: ${productName}. ¿Podrían darme más información?`,
}
