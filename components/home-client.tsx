"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Shield, Clock, Award, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ElfsightReviews } from "@/components/elfsight-reviews"
import { HeroImage } from "@/components/hero-image"

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

const stats = [
    { value: "500+", label: "Clientes satisfechos" },
    { value: "150+", label: "Productos" },
    { value: "20", label: "Años de experiencia" },
]

export function HomeClient() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<{ _id: string, name: string }[]>([])
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("/api/admin/productos/categorias")
                if (res.ok) {
                    const data = await res.json()
                    setCategories(data)
                }
            } catch (error) {
                console.error("Error fetching categories:", error)
            } finally {
                setLoadingCategories(false)
            }
        }
        fetchCategories()
    }, [])

    const scrollToCategories = () => {
        const element = document.getElementById("categorias")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleNavigate = async (href: string) => {
        setLoading(true)
        try {
            router.push(href)
        } catch (error) {
            console.error("Navigation error:", error)
        } finally {
            setTimeout(() => setLoading(false), 2000)
        }
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-20">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.05),transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.02] pattern-grid text-primary" aria-hidden="true" />

                {/* Floating Shapes */}
                <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-orange-200/10 rounded-full blur-3xl animate-float" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="max-w-2xl animate-fade-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8 shadow-sm">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                                </span>
                                <span className="text-sm font-bold text-primary tracking-wide uppercase">Líderes en Limpieza Profesional</span>
                            </div>

                            <h1 className="display-2xl mb-8 text-balance text-slate-900">
                                Productos que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">transforman</span> tu espacio
                            </h1>

                            <p className="body-lg text-slate-600 mb-12 max-w-lg leading-relaxed">
                                Descubrí la potencia de la limpieza profesional en tu hogar o empresa con ADN LIMPIEZA. Más de 20 años innovando en soluciones efectivas.
                            </p>

                            <div className="flex flex-wrap gap-5 mb-16">
                                <Button
                                    size="lg"
                                    onClick={scrollToCategories}
                                    className="h-16 px-10 text-lg rounded-2xl shadow-soft hover:shadow-glow-lg transition-all duration-500 group bg-primary hover:bg-primary/90 text-white border-0 font-bold"
                                >
                                    Ver categorías
                                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1.5 transition-transform" />
                                </Button>
                                <WhatsAppButton
                                    size="lg"
                                    variant="outline"
                                    className="h-16 px-10 text-lg rounded-2xl border-2 border-orange-100 hover:border-primary hover:bg-orange-50 transition-all duration-300 font-bold text-primary"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="group">
                                        <div className="text-4xl font-extrabold text-slate-900 group-hover:text-primary transition-colors duration-300">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative group perspective-1000 hidden lg:block">
                            <div className="relative z-20 animate-float">
                                <div className="rounded-[2.5rem] bg-gradient-to-br from-white to-orange-50 p-4 shadow-soft-xl border border-white/50 backdrop-blur-sm">
                                    <div className="rounded-[2rem] overflow-hidden bg-white shadow-inner">
                                        <HeroImage />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements behind image */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-3xl blur-2xl -z-10" />
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-slate-100 rounded-full blur-3xl -z-10" />

                            {/* Floating Card - Satisfaction */}
                            <div className={cn(
                                "absolute -bottom-8 -left-8 p-6 z-30",
                                "bg-white/90 backdrop-blur-xl rounded-[2rem]",
                                "border border-orange-100 shadow-soft-xl",
                                "animate-bounce-slow hidden sm:block hover:scale-105 transition-transform duration-500"
                            )}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">Garantía Total</div>
                                        <div className="text-sm font-medium text-slate-500">Satisfacción 100%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden" id="categorias">
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Nuestros Productos</div>
                            <h2 className="display-lg text-slate-900">Explorá por tipos</h2>
                            <p className="body-md text-slate-500 mt-4 max-w-md">Soluciones específicas diseñadas para cada superficie y necesidad.</p>
                        </div>
                        <Link
                            href="/productos"
                            className="inline-flex items-center text-primary font-bold hover:gap-3 transition-all duration-300"
                        >
                            Ver todo el catálogo <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>

                    {loadingCategories ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full shadow-glow" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {categories.length === 0 ? (
                                <p className="col-span-full text-center text-muted-foreground">No hay categorías disponibles aún.</p>
                            ) : (
                                categories.map((cat, idx) => (
                                    <Link
                                        key={cat._id}
                                        href={`/productos?category=${cat._id}`}
                                        className={cn(
                                            "group relative p-10 rounded-[2.5rem] bg-white border border-slate-100",
                                            "shadow-soft hover:shadow-soft-xl hover:border-primary/20",
                                            "transition-all duration-500 hover:-translate-y-3 flex flex-col items-center gap-6",
                                            "overflow-hidden"
                                        )}
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />

                                        <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:shadow-glow shadow-sm">
                                            <Sparkles className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                        </div>

                                        <div className="text-center relative z-10">
                                            <h3 className="font-bold text-2xl text-slate-900 group-hover:text-primary transition-colors">
                                                {cat.name}
                                            </h3>
                                            <p className="text-slate-500 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                Línea profesional
                                            </p>
                                        </div>

                                        <div className="mt-2 py-2 px-6 rounded-full bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                                            Ver productos <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Diferenciales</div>
                        <h2 className="display-lg text-slate-900 mb-6">¿Por qué ADN Limpieza?</h2>
                        <p className="body-md text-slate-500">Nos enfocamos en brindar no solo productos, sino soluciones integrales de higiene con el asesoramiento de expertos.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Main Feature Card - Highlighted */}
                        <div className="lg:col-span-2 p-12 rounded-[3.5rem] bg-gradient-to-br from-primary to-orange-600 text-white shadow-soft-xl relative overflow-hidden flex flex-col md:flex-row gap-10 items-center hover:shadow-glow-lg transition-all duration-700 group">
                            {/* Decorative background circle */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700" />

                            <div className="relative z-10 flex-1 text-center md:text-left">
                                <div className="inline-flex px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold border border-white/20 mb-6">
                                    ESTANDAR SUPERIOR
                                </div>
                                <h3 className="display-md mb-6 text-white font-extrabold">Productos de Calidad Profesional</h3>
                                <p className="body-md text-orange-50 max-w-xl mb-10 leading-relaxed">
                                    Cada fórmula es seleccionada rigurosamente para garantizar resultados impecables cuidando el medio ambiente y a las personas.
                                </p>
                                <Button className="bg-white text-primary hover:bg-orange-50 h-14 px-8 rounded-2xl font-bold shadow-soft group/btn">
                                    Conocer más <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>

                            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 animate-float">
                                <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl animate-pulse-soft" />
                                <div className="relative w-full h-full bg-white/20 backdrop-blur-xl p-4 rounded-[3rem] border border-white/30 shadow-2xl flex items-center justify-center">
                                    <div className="relative w-4/5 h-4/5">
                                        <Image src="/ADN-Limpieza-logo-redondo.png" alt="Logo" fill className="object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Features */}
                        {features.slice(1).map((feature, idx) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title}
                                    className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-soft hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 shadow-sm">
                                        <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="heading-lg mb-4 text-slate-900 flex items-center gap-2">
                                        {feature.title}
                                    </h3>
                                    <p className="body-sm text-slate-500 leading-relaxed">{feature.description}</p>

                                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-3">
                                        <div className="h-0.5 w-6 bg-orange-100 group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-primary tracking-widest uppercase">Expertise</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-28">
                        <ElfsightReviews />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden shadow-soft-xl">
                        {/* Background Decor for CTA */}
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/20 blur-[120px] rounded-full" />

                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <h2 className="display-lg text-white mb-8">¿Listo para transformar tu espacio?</h2>
                            <p className="body-lg text-slate-400 mb-12 max-w-2xl mx-auto">
                                Nuestro equipo de expertos está listo para asesorarte. Contactanos hoy y descubrí la diferencia de una limpieza de alto nivel.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <WhatsAppButton size="lg" className="bg-primary hover:bg-primary/90 text-white h-16 px-10 rounded-2xl font-bold text-lg shadow-glow-lg w-full sm:w-auto transition-transform hover:scale-105 active:scale-95" />
                                <Link
                                    href="/sobre-nosotros"
                                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md h-16 px-10 rounded-2xl font-bold text-lg shadow-soft w-full sm:w-auto inline-flex items-center justify-center transition-all border border-white/10"
                                >
                                    Conocé más
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
