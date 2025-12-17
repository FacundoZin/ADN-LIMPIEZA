import { ImageCarousel } from "@/components/image-carousel"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getHomeCarouselImages } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/client"
import { Sparkles, Shield, Clock, Award, ArrowRight, Truck, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GoogleReviewsCarousel } from "@/components/ui/GoogleReviewsCarousel"

const mockReviews = [
  {
    id: "1",
    author: "Ana G.",
    initials: "AG",
    rating: 5,
    text: "Excelente calidad en todos los productos, san cimpla!",
    avatarColor: "#3b82f6"
  },
  {
    id: "2",
    author: "Carlos S.",
    initials: "CS",
    rating: 5,
    text: "Excelente calidad en todos mihos, mi hogar estuva tan Funciona muy bien.",
    avatarColor: "#ef4444"
  },
  {
    id: "3",
    author: "Juan P.",
    initials: "JP",
    rating: 4,
    text: "Buenos productos, auarcu el envío tardo mara mi negecio de funcíntouen.",
    avatarColor: "#10b981"
  },
  {
    id: "4",
    author: "Laura M.",
    initials: "LM",
    rating: 4,
    text: "Súper recomnmable. La dejan nuis plisos nuevos. Atención al cliente de priera.",
    avatarColor: "#f59e0b"
  },
];

// Feature data for the bento grid
const features = [
  {
    icon: Sparkles,
    title: "Calidad Superior",
    description: "Productos seleccionados que cumplen los más altos estándares internacionales.",
    highlight: true,
  },
  {
    icon: Shield,
    title: "Seguridad Garantizada",
    description: "Seguros para tu familia y mascotas, con certificaciones de calidad.",
  },
  {
    icon: Clock,
    title: "Entrega Rápida",
    description: "Recibe tus productos en tiempo récord con nuestro servicio express.",
  },
  {
    icon: Award,
    title: "15+ Años",
    description: "Más de una década brindando soluciones de limpieza profesional.",
  },
]

// Stats for social proof
const stats = [
  { value: "500+", label: "Clientes satisfechos" },
  { value: "150+", label: "Productos" },
  { value: "15", label: "Años de experiencia" },
]

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
      
      {/* =========================================================================
          HERO SECTION - Split Layout Premium
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        
        {/* Subtle dot pattern for depth */}
        <div 
          className="absolute inset-0 opacity-[0.03] pattern-dots text-foreground"
          aria-hidden="true" 
        />
        
        {/* Decorative gradient blobs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" aria-hidden="true" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Content */}
            <div className="max-w-xl animate-fade-up">
              {/* Trust Badge */}
              <div className="badge-success mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span>+15 años de experiencia</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="display-2xl mb-6 text-balance">
                Limpieza que{" "}
                <span className="text-primary">inspira confianza</span>
              </h1>
              
              {/* Subheadline */}
              <p className="body-lg text-muted-foreground mb-10 text-pretty">
                Productos profesionales para hogares y negocios que exigen 
                resultados excepcionales. Calidad sin compromisos.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Button 
                  size="lg" 
                  asChild 
                  className="h-14 px-8 text-base rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 group"
                >
                  <Link href="/productos">
                    Ver Catálogo
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <WhatsAppButton
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-xl border-2 hover:border-primary hover:text-primary transition-all duration-300"
                />
              </div>
              
              {/* Social Proof Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="animate-fade-up"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: "200ms" }}>
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl" aria-hidden="true" />
              
              {/* Image Carousel Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border-2 border-white/20 dark:border-white/10">
                <ImageCarousel images={images} />
              </div>
              
              {/* Floating Card - Shipping Info */}
              <div className={cn(
                "absolute -bottom-4 -left-4 p-4",
                "bg-card/95 backdrop-blur-xl rounded-2xl",
                "border border-border/50 shadow-soft-lg",
                "animate-float"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold">Envío a todo el país</div>
                    <div className="text-sm text-muted-foreground">Entrega en 24-72hs</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Card - Satisfaction */}
              <div className={cn(
                "absolute -top-4 -right-4 p-4",
                "bg-card/95 backdrop-blur-xl rounded-2xl",
                "border border-border/50 shadow-soft-lg",
                "animate-float"
              )} style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Satisfacción</div>
                    <div className="text-xs text-muted-foreground">Garantizada</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Carousel */}
            <div className="lg:hidden relative rounded-2xl overflow-hidden shadow-soft-lg">
              <ImageCarousel images={images} />
            </div>
            
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES SECTION - Bento Grid
          ========================================================================= */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="label-text text-muted-foreground">Nuestras fortalezas</span>
              <div className="w-12 h-px bg-border" />
            </div>
            <h2 className="display-lg text-balance">¿Por qué elegirnos?</h2>
          </div>
          
          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto stagger-children">
            
            {/* Featured Card - Spans 2 columns */}
            <div className={cn(
              "lg:col-span-2 p-8 rounded-3xl relative overflow-hidden",
              "bg-gradient-to-br from-primary to-primary/80",
              "text-primary-foreground",
              "shadow-soft-lg"
            )}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="heading-xl mb-4">Productos de Calidad Superior</h3>
                <p className="body-md opacity-90 max-w-lg text-pretty">
                  Seleccionamos únicamente productos que cumplen los más altos 
                  estándares internacionales. Tu satisfacción está garantizada.
                </p>
              </div>
            </div>
            
            {/* Regular Feature Cards */}
            {features.slice(1).map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={cn(
                    "p-8 rounded-3xl",
                    "bg-card border border-border/50",
                    "shadow-soft hover:shadow-soft-lg",
                    "transition-all duration-500 hover:-translate-y-1",
                    "group"
                  )}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="heading-md mb-3">{feature.title}</h3>
                  <p className="body-sm text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </div>
              )
            })}
            
          </div>

          {/* Social Proof - Reviews */}
          <div className="mt-20 stagger-children">
            <GoogleReviewsCarousel reviews={mockReviews} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          CTA SECTION - Gradient Background
          ========================================================================= */}
      <section className="section-padding relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" aria-hidden="true" />
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="display-lg text-primary-foreground mb-6 text-balance">
              ¿Listo para transformar tu espacio?
            </h2>
            <p className="body-lg text-primary-foreground/90 mb-10 text-pretty">
              Contáctanos hoy y descubre cómo nuestros productos pueden hacer 
              la diferencia en tu hogar o negocio.
            </p>
            <WhatsAppButton
              size="lg"
              variant="outline"
              className={cn(
                "h-14 px-8 text-base rounded-xl",
                "bg-white text-primary border-0",
                "hover:bg-white/90",
                "shadow-soft-xl hover:shadow-glow-lg",
                "transition-all duration-300 hover:scale-105"
              )}
            >
              Consultar Ahora
            </WhatsAppButton>
          </div>
        </div>
      </section>
      
    </div>
  )
}
