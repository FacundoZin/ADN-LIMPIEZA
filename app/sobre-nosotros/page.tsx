import { Card, CardContent } from "@/components/ui/card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getAboutImages } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/client"
import { MapPin, Phone, Mail, Clock, Users, Award, Heart } from "lucide-react"

export const metadata = {
  title: "Sobre Nosotros - Limpieza Profesional",
  description: "Conoce nuestra historia, valores y compromiso con la calidad en productos de limpieza.",
}

export default async function SobreNosotrosPage() {
  const aboutImages = await getAboutImages()

  // Convertir imágenes de Sanity
  const images =
    aboutImages.length > 0
      ? aboutImages.map((img) => ({
          src: urlFor(img.image).width(800).height(600).url(),
          alt: img.title || "Nuestro negocio",
        }))
      : [
          { src: "/placeholder.svg?key=team1", alt: "Nuestro equipo" },
          { src: "/placeholder.svg?key=store1", alt: "Nuestras instalaciones" },
          { src: "/placeholder.svg?key=products1", alt: "Nuestros productos" },
        ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 text-pretty">
            Más de 15 años brindando soluciones de limpieza profesional para hogares y negocios
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Nuestra Historia</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6 text-pretty">
                Comenzamos como un pequeño emprendimiento familiar con una misión clara: ofrecer productos de limpieza
                de la más alta calidad que realmente cumplan sus promesas. Lo que empezó en un modesto local, hoy se ha
                convertido en una referencia en el sector.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-pretty">
                Durante más de 15 años, hemos construido relaciones sólidas con nuestros clientes basadas en la
                confianza, la calidad y el servicio excepcional. Cada producto que ofrecemos ha sido cuidadosamente
                seleccionado y probado para garantizar los mejores resultados.
              </p>
              <p className="text-lg leading-relaxed text-pretty">
                Nuestra pasión por la limpieza y el orden nos impulsa a buscar constantemente las mejores soluciones del
                mercado, siempre pensando en las necesidades específicas de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Nuestros Valores</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Award,
                title: "Calidad",
                description:
                  "Seleccionamos únicamente productos que cumplen con los más altos estándares de calidad y efectividad.",
              },
              {
                icon: Users,
                title: "Compromiso",
                description:
                  "Estamos comprometidos con la satisfacción de nuestros clientes y la mejora continua de nuestros servicios.",
              },
              {
                icon: Heart,
                title: "Confianza",
                description:
                  "Construimos relaciones duraderas basadas en la transparencia, honestidad y respeto mutuo.",
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground text-pretty">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Nuestras Instalaciones</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {images.map((image, index) => (
              <div key={index} className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Información de Contacto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: MapPin,
                  title: "Ubicación",
                  content: "Av. Principal 123, Buenos Aires, Argentina",
                },
                {
                  icon: Phone,
                  title: "Teléfono",
                  content: "+54 9 11 1234-5678",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "info@limpiezaprofesional.com",
                },
                {
                  icon: Clock,
                  title: "Horario",
                  content: "Lun - Vie: 9:00 - 18:00\nSáb: 9:00 - 13:00",
                },
              ].map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6 flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Map */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[16/9] bg-muted">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">¿Tienes alguna pregunta?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Estamos aquí para ayudarte. Contáctanos por WhatsApp y te responderemos a la brevedad.
          </p>
          <WhatsAppButton size="lg" />
        </div>
      </section>
    </div>
  )
}
