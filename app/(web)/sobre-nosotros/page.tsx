import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getAboutImages } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/client"
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
    year: "2008",
    title: "El Comienzo",
    description: "Iniciamos como un pequeño emprendimiento familiar con una misión clara: ofrecer productos de limpieza de la más alta calidad.",
    icon: Sparkles,
  },
  {
    year: "2012",
    title: "Crecimiento Sostenido",
    description: "Expandimos nuestra oferta de productos y establecimos relaciones con los mejores proveedores del mercado.",
    icon: TrendingUp,
  },
  {
    year: "2018",
    title: "Nuevas Instalaciones",
    description: "Nos mudamos a instalaciones más amplias para mejor atender la creciente demanda de nuestros clientes.",
    icon: Building,
  },
  {
    year: "Hoy",
    title: "Líderes del Sector",
    description: "Más de 500 clientes confían en nosotros para sus necesidades de limpieza profesional.",
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
  { icon: MapPin, title: "Ubicación", content: "Libertad 1556, Buenos Aires" },
  { icon: Phone, title: "Teléfono", content: "+54 9 11 1234-5678" },
  { icon: Mail, title: "Email", content: "info@adnlimpieza.com" },
  { icon: Clock, title: "Horario", content: "Lun - Vie: 9:00 - 18:00" },
]

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
              Más de 15 años brindando soluciones de limpieza profesional 
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
                    Durante más de 15 años, hemos construido relaciones sólidas con 
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
              <h2 className="display-lg">+15 años de crecimiento</h2>
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
                    key={milestone.year}
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
                        <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                        <h3 className="heading-md mt-1 mb-2">{milestone.title}</h3>
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
          GALLERY SECTION
          ========================================================================= */}
      {images.length > 1 && (
        <section className="section-padding bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="display-lg">Nuestras Instalaciones</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto stagger-children">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft group"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.144453306899!2d-58.39121!3d-34.59123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab99a0ed30b%3A0xc3f835f8d689b275!2sLibertad%201556%2C%20C1016ABB%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1718654321234!5m2!1ses-419!2sar"
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
