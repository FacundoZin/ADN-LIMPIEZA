import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Limpieza Pro</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 text-pretty leading-relaxed">
              Más de 15 años brindando soluciones de limpieza profesional para hogares y negocios.
            </p>
            <WhatsAppButton
              variant="outline"
              size="sm"
              className="shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Contactar
            </WhatsAppButton>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  → Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  → Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                >
                  → Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="group-hover:text-primary transition-colors">+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="group-hover:text-primary transition-colors">info@limpiezapro.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="group-hover:text-primary transition-colors">
                  Av. Principal 123, Buenos Aires, Argentina
                </span>
              </li>
            </ul>
          </div>

          {/* Hours & Map */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Horario</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <div className="leading-relaxed">
                  <p className="font-medium">Lun - Vie: 9:00 - 18:00</p>
                  <p>Sábados: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
            <Link
              href="/sobre-nosotros#mapa"
              className="text-sm text-primary hover:underline inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
            >
              <MapPin className="h-4 w-4" />
              Ver en mapa
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Limpieza Pro. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors hover:underline">
                Términos
              </Link>
              <Link href="#" className="hover:text-primary transition-colors hover:underline">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed - Compact Layout */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contact Info Column */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-2xl mb-2">Encuéntranos</h3>
                <p className="text-muted-foreground text-sm">
                  Visítanos en nuestra ubicación o contáctanos por cualquiera de estos medios
                </p>
              </div>

              <div className="space-y-4 bg-background p-6 rounded-xl border shadow-sm">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Dirección</p>
                    <p className="text-sm text-muted-foreground">Av. Principal 123, Buenos Aires, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+54 9 11 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-sm text-muted-foreground">info@limpiezapro.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Horarios</p>
                    <p className="text-sm text-muted-foreground">Lun - Vie: 9:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">Sábados: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>

              <WhatsAppButton size="lg" className="w-full shadow-lg">
                Contactar por WhatsApp
              </WhatsAppButton>
            </div>

            {/* Map Column */}
            <div className="h-[400px] rounded-xl overflow-hidden shadow-xl border-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52563.68896911965!2d-58.44534889999999!3d-34.6037389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e10!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del negocio"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
