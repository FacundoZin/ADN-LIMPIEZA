import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getAboutImages } from "@/lib/db/queries"
import {
  MapPin, Phone, Mail, Clock,
  Users, Award, Heart, Sparkles,
  Building, TrendingUp, Handshake
} from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Sobre Nosotros — ADN Limpieza",
  description: "Conoce nuestra historia, valores y compromiso con la calidad en productos de limpieza profesional.",
}

// Timeline milestones
const milestones = [
  {
    title: "El Comienzo",
    description: "Iniciamos como un pequeño emprendimiento familiar con una misión clara: ofrecer productos de limpieza de la más alta calidad.",
    icon: Sparkles,
  },
  {
    title: "Crecimiento Sostenido",
    description: "Expandimos nuestra oferta de productos y establecimos relaciones con los mejores proveedores del mercado.",
    icon: TrendingUp,
  },
  {
    title: "Nuevas Instalaciones",
    description: "Nos mudamos a instalaciones más amplias para mejor atender la creciente demanda de nuestros clientes.",
    icon: Building,
  },
  {
    title: "Líderes del Sector",
    description: "Más de dos décadas brindando soluciones de limpieza profesional.",
    icon: Handshake,
  },
]

// Values
const values = [
  {
    icon: Award,
    title: "Calidad",
    description: "Seleccionamos únicamente productos que cumplen con los más altos estándares de calidad y efectividad.",
  },
  {
    icon: Users,
    title: "Asesoramiento",
    description: "Asesoramos a nuestros clientes para que puedan obtener los mejores resultados con nuestros productos y servicios.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Estamos comprometidos con la satisfacción de nuestros clientes y la mejora continua de nuestros servicios.",
  },
]

// Contact info
const contactInfo = [
  { icon: MapPin, title: "Ubicación", content: "Libertad 1556, X2400 San Francisco, Córdoba" },
  { icon: Phone, title: "Teléfono", content: "+54 9 3564 21-1526" },
  { icon: Mail, title: "Email", content: "limpiezaadn@gmail.com" },
  { icon: Clock, title: "Horario", content: "Lun - Jue: 8:00 – 12:00 y 15:30 – 20:00, Vie: 8:00 – 12:00 y 16:00 – 20:00, Sáb: 8:30 – 12:30" },
]

export default async function SobreNosotrosPage() {
  const aboutImages = await getAboutImages()

  // Mapear imágenes locales
  const images =
    aboutImages.length > 0
      ? aboutImages.map((img) => ({
        src: img.url,
        alt: img.alt || "Nuestro negocio",
      }))
      : [
        { src: "/logo-adn.png", alt: "Local de ADN Limpieza" },
        { src: "/logo-adn.png", alt: "Nuestras instalaciones" },
        { src: "/logo-adn.png", alt: "Nuestros productos" },
      ]


  return (
    <div className="min-h-screen pt-20">

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="section-padding relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/30" />
              <span className="label-text text-white/80">Nuestra historia</span>
              <div className="w-12 h-px bg-white/30" />
            </div>

            <h1 className="display-xl text-primary-foreground mb-6 text-balance">
              Sobre Nosotros
            </h1>
            <p className="body-lg text-primary-foreground/90 text-pretty">
              Más de 20 años brindando soluciones de limpieza profesional
              para hogares y negocios en toda Argentina.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STORY SECTION
          ========================================================================= */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Text content */}
              <div className="animate-fade-up">
                <span className="badge-primary mb-6">Nuestra Historia</span>
                <h2 className="display-lg mb-6">
                  De un sueño familiar a líderes del sector
                </h2>
                <div className="space-y-4 body-md text-muted-foreground">
                  <p className="text-pretty">
                    Comenzamos como un pequeño emprendimiento familiar con una misión clara:
                    ofrecer productos de limpieza de la más alta calidad que realmente
                    cumplan sus promesas.
                  </p>
                  <p className="text-pretty">
                    Durante más de 20 años, hemos construido relaciones sólidas con
                    nuestros clientes basadas en la confianza, la calidad y el servicio
                    excepcional.
                  </p>
                  <p className="text-pretty">
                    Nuestra pasión por la limpieza y el orden nos impulsa a buscar
                    constantemente las mejores soluciones del mercado.
                  </p>
                </div>
              </div>

              {/* Image */}
              {images[0] && (
                <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <div className="relative rounded-3xl overflow-hidden shadow-soft-xl aspect-[4/3]">
                    <Image
                      src={images[0].src}
                      alt={images[0].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIMELINE SECTION
          ========================================================================= */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-16 animate-fade-up">
              <span className="badge-primary mb-6">Nuestra Trayectoria</span>
              <h2 className="display-lg">+20 años de crecimiento</h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                const isEven = index % 2 === 0

                return (
                  <div
                    key={milestone.title}
                    className={cn(
                      "relative flex gap-6 md:gap-12 pb-12 last:pb-0",
                      "md:items-center",
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Content */}
                    <div className={cn(
                      "flex-1 ml-16 md:ml-0",
                      "animate-fade-up"
                    )} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className={cn(
                        "p-6 rounded-2xl bg-card border border-border/50 shadow-soft",
                        "hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300",
                        isEven ? "md:text-right" : "md:text-left"
                      )}>
                        <h3 className="heading-md mb-2">{milestone.title}</h3>
                        <p className="body-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-soft z-10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Spacer for the other side on desktop */}
                    <div className="hidden md:block flex-1" />
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          VALUES SECTION
          ========================================================================= */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="label-text text-muted-foreground">Lo que nos define</span>
              <div className="w-12 h-px bg-border" />
            </div>
            <h2 className="display-lg">Nuestros Valores</h2>
          </div>

          {/* Values grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className={cn(
                    "p-8 rounded-3xl text-center",
                    "bg-card border border-border/50",
                    "shadow-soft hover:shadow-soft-lg",
                    "transition-all duration-500 hover:-translate-y-1",
                    "group"
                  )}
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="heading-lg mb-3">{value.title}</h3>
                  <p className="body-sm text-muted-foreground text-pretty">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>



      {/* =========================================================================
          CONTACT SECTION
          ========================================================================= */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12 animate-fade-up">
              <span className="badge-primary mb-6">Contáctanos</span>
              <h2 className="display-lg">Información de Contacto</h2>
            </div>

            {/* Contact cards grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8 stagger-children">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <div
                    key={info.title}
                    className={cn(
                      "flex items-start gap-4 p-6 rounded-2xl",
                      "bg-card border border-border/50 shadow-soft",
                      "hover:shadow-soft-lg transition-all duration-300",
                      "group"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="text-center animate-fade-up">
              <p className="body-md text-muted-foreground mb-6">
                ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
              </p>
              <WhatsAppButton
                size="lg"
                className="shadow-soft hover:shadow-glow transition-all duration-300"
              >
                Contactar por WhatsApp
              </WhatsAppButton>
            </div>

            {/* Map Section */}
            <div className="mt-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-border/50 aspect-[16/9] md:aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13636.568114227092!2d-62.083!3d-31.433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cb33a208f0a6d5%3A0xc6c42971a8f94d3!2sLibertad+1556%2C+X2400+San+Francisco%2C+C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1718654321234!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
