import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Sparkles, Shield, Clock, Award, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ElfsightReviews } from "@/components/elfsight-reviews"
import { HeroImage } from "@/components/hero-image"



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
    description: "Recibi tus productos rapidamente con nuestro servicio de entrega a domicilio",
  },
  {
    icon: Award,
    title: "+20 Años",
    description: "Más de dos décadas brindando soluciones de limpieza profesional.",
  },
]

// Stats for social proof
const stats = [
  { value: "500+", label: "Clientes satisfechos" },
  { value: "150+", label: "Productos" },
  { value: "20", label: "Años de experiencia" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* =========================================================================
          HERO SECTION - Split Layout Premium
          ========================================================================= */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 lg:pb-20 overflow-hidden">
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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center justify-center">

            {/* Left Column - Content */}
            <div className="max-w-xl animate-fade-up">
              {/* Trust Badge */}
              <div className="badge-success mb-6 lg:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span>+20 años de experiencia</span>
              </div>

              {/* Main Headline */}
              <h1 className="display-2xl mb-4 lg:mb-6 text-balance">
                Limpieza que{" "}
                <span className="text-primary">inspira confianza</span>
              </h1>

              {/* Subheadline */}
              <p className="body-lg text-muted-foreground mb-8 lg:mb-10 text-pretty">
                En ADN LIMPIEZA brindamos el asesoramiento necesario para que puedas elegir la mejor combinación de productos y técnicas de limpieza.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8 lg:mb-12">
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
                  className={cn(
                    "h-14 px-8 text-base rounded-xl border-2 transition-all duration-500",
                    "bg-transparent border-border hover:border-primary hover:text-primary hover:bg-primary/5",
                    "dark:border-white/10 dark:hover:border-primary dark:hover:text-primary dark:hover:bg-primary/10",
                    "hover:-translate-y-1 hover:shadow-soft-lg active:scale-95",
                    "shine overflow-hidden"
                  )}
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

              {/* Hero Image / Slider with Aesthetic Border */}
              <div className={cn(
                "relative group/hero shadow-soft-xl rounded-3xl overflow-hidden",
                "border-4 border-white dark:border-white/5",
                "ring-1 ring-black/5 dark:ring-white/10",
                "transition-all duration-500 hover:shadow-glow/20"
              )}>
                <HeroImage />
              </div>

              {/* Floating Card - Premium Quality */}
              <div className={cn(
                "absolute -bottom-4 -left-4 p-4 z-40",
                "bg-card/95 backdrop-blur-xl rounded-2xl",
                "border border-border/50 shadow-soft-lg",
                "animate-float"
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Calidad Premium</div>
                    <div className="text-xs text-muted-foreground">Productos de primera</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Image with Aesthetic Border */}
            <div className={cn(
              "lg:hidden relative rounded-3xl overflow-hidden",
              "border-4 border-white dark:border-white/5",
              "ring-1 ring-black/5 dark:ring-white/10 shadow-soft-xl"
            )}>
              <HeroImage />
              {/* Floating Card - Mobile */}
              <div className={cn(
                "absolute -bottom-2 -left-2 p-3 z-40 scale-75 origin-bottom-left",
                "bg-card/95 backdrop-blur-xl rounded-2xl",
                "border border-border/50 shadow-soft-lg",
                "animate-float"
              )}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-foreground">Calidad Premium</div>
                    <div className="text-[10px] text-muted-foreground whitespace-nowrap">Productos de primera</div>
                  </div>
                </div>
              </div>
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
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 relative overflow-hidden">
                  <Image
                    src="/ADN-Limpieza-logo-redondo.png"
                    alt="ADN Limpieza Calidad"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="heading-xl mb-4">Productos de Calidad</h3>
                <p className="body-md opacity-90 max-w-lg text-pretty">
                  Seleccionamos únicamente productos que cumplen los más altos
                  estándares. Tu satisfacción está garantizada.
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
            <ElfsightReviews />
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
                "hover:bg-white hover:text-primary", 
                "shadow-soft-xl hover:shadow-glow-lg",
                "transition-all duration-300 hover:scale-105 active:scale-95",
                "shine overflow-hidden"
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
