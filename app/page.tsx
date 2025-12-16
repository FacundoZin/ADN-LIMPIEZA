import { ImageCarousel } from "@/components/image-carousel"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getHomeCarouselImages } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/client"
import { Sparkles, Shield, Clock, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  // Obtener imágenes del carrusel desde Sanity
  const carouselImages = await getHomeCarouselImages()

  // Convertir las imágenes de Sanity al formato esperado por el carrusel
  const images =
    carouselImages.length > 0
      ? carouselImages.map((img) => ({
          src: urlFor(img.image).width(1920).height(1080).url(),
          alt: img.title || "Imagen del negocio de limpieza",
        }))
      : [
          {
            src: "/professional-cleaning-service-team.jpg",
            alt: "Equipo profesional de limpieza",
          },
          {
            src: "/modern-cleaning-products-display.jpg",
            alt: "Productos de limpieza modernos",
          },
          {
            src: "/clean-and-organized-home.jpg",
            alt: "Hogar limpio y organizado",
          },
        ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <ImageCarousel images={images} />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance [text-shadow:_0_4px_12px_rgb(0_0_0_/_60%)]">
                Limpieza Profesional para tu Hogar y Negocio
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-10 text-pretty [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)] leading-relaxed">
                Productos de calidad y servicio excepcional para mantener tus espacios impecables
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  asChild
                  className="text-lg font-semibold shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 px-8 py-6 h-auto"
                >
                  <Link href="/productos">Ver Productos</Link>
                </Button>
                <WhatsAppButton
                  size="lg"
                  variant="outline"
                  className="bg-white/95 hover:bg-white text-foreground text-lg font-semibold shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 border-2 border-white/50 hover:border-white px-8 py-6 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-balance">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Descubre las razones por las que miles de clientes confían en nosotros
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Productos de Calidad",
                description: "Seleccionamos los mejores productos para garantizar resultados excepcionales",
              },
              {
                icon: Shield,
                title: "Seguridad Garantizada",
                description: "Productos seguros para tu familia y mascotas, con certificaciones internacionales",
              },
              {
                icon: Clock,
                title: "Entrega Rápida",
                description: "Recibe tus productos en tiempo récord con nuestro servicio de entrega express",
              },
              {
                icon: Award,
                title: "Años de Experiencia",
                description: "Más de 15 años brindando soluciones de limpieza profesional",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 text-center border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-balance">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-pretty opacity-95 leading-relaxed">
            Contáctanos hoy y descubre cómo nuestros productos pueden hacer la diferencia en tu hogar o negocio
          </p>
          <WhatsAppButton
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 text-lg font-semibold shadow-2xl hover:shadow-white/50 hover:scale-110 transition-all duration-300 border-0 px-8 py-6 h-auto"
          >
            Consultar Ahora
          </WhatsAppButton>
        </div>
      </section>
    </div>
  )
}
