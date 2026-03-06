"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────
interface HeroSlide {
    src: string
    alt: string
}

interface HeroImageProps {
    /**
     * Lista de imágenes para el slider.
     * Si sólo se pasa una imagen se muestra estática (sin controles).
     * Agregar más elementos aquí para habilitar el slider automáticamente.
     */
    slides?: HeroSlide[]
    /** Intervalo de auto-play en milisegundos (por defecto: 5000) */
    autoPlayInterval?: number
    className?: string
}

// ─────────────────────────────────────────────
// Imagen(s) por defecto
// ─────────────────────────────────────────────
const DEFAULT_SLIDES: HeroSlide[] = [
    { src: "/multimax.png", alt: "Jabón Líquido MultiMax – ADN Limpieza" },
    { src: "/Multimax 2.png", alt: "Jabón Líquido MultiMax 2 – ADN Limpieza" },
]

// ─────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────
export function HeroImage({
    slides = DEFAULT_SLIDES,
    autoPlayInterval = 5000,
    className,
}: HeroImageProps) {
    const [current, setCurrent] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const isSlider = slides.length > 1

    const prev = useCallback(() => {
        setCurrent((c) => (c - 1 + slides.length) % slides.length)
    }, [slides.length])

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % slides.length)
    }, [slides.length])

    // Auto-play — sólo activo cuando hay más de una imagen
    useEffect(() => {
        if (!isSlider || isHovered) return
        const timer = setInterval(next, autoPlayInterval)
        return () => clearInterval(timer)
    }, [isSlider, isHovered, next, autoPlayInterval])

    return (
        <div
            className={cn(
                "relative w-full h-full min-h-[400px] md:min-h-[450px] lg:min-h-[550px]",
                "rounded-3xl overflow-hidden",
                "group",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── Slides ── */}
            {slides.map((slide, index) => (
                <div
                    key={slide.src}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-700 ease-in-out",
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                >
                    <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority={index === 0}
                        quality={100}
                    />
                </div>
            ))}

            {/* Sin overlay — queremos ver la imagen al 100% de calidad */}

            {/* ── Controles del slider (visibles sólo con múltiples imágenes) ── */}
            {isSlider && (
                <>
                    {/* Botón anterior */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute left-3 top-1/2 -translate-y-1/2 z-30",
                            "h-11 w-11 rounded-xl",
                            "bg-white/90 dark:bg-black/70 backdrop-blur-sm",
                            "border border-white/20 shadow-md",
                            "opacity-0 group-hover:opacity-100",
                            "translate-x-2 group-hover:translate-x-0",
                            "transition-all duration-300",
                            "hover:bg-white dark:hover:bg-black hover:scale-105"
                        )}
                        onClick={prev}
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="h-5 w-5 text-foreground" />
                    </Button>

                    {/* Botón siguiente */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2 z-30",
                            "h-11 w-11 rounded-xl",
                            "bg-white/90 dark:bg-black/70 backdrop-blur-sm",
                            "border border-white/20 shadow-md",
                            "opacity-0 group-hover:opacity-100",
                            "-translate-x-2 group-hover:translate-x-0",
                            "transition-all duration-300",
                            "hover:bg-white dark:hover:bg-black hover:scale-105"
                        )}
                        onClick={next}
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight className="h-5 w-5 text-foreground" />
                    </Button>

                    {/* Puntos de paginación */}
                    <div
                        className={cn(
                            "absolute bottom-4 left-1/2 -translate-x-1/2 z-30",
                            "flex gap-2 px-3 py-2",
                            "bg-black/20 backdrop-blur-md rounded-full"
                        )}
                    >
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    index === current
                                        ? "w-7 h-2 bg-white shadow-lg"
                                        : "w-2 h-2 bg-white/50 hover:bg-white/80"
                                )}
                                onClick={() => setCurrent(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
