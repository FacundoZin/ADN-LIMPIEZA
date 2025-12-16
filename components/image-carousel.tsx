"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselImage {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  // Auto-play (pauses on hover)
  useEffect(() => {
    if (!emblaApi || isHovered) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi, isHovered])

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-[500px] bg-muted/50 flex items-center justify-center rounded-2xl">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Enhanced */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2",
          "h-12 w-12 rounded-xl",
          "bg-white/90 dark:bg-black/70 backdrop-blur-sm",
          "border border-white/20 shadow-soft-lg",
          "opacity-0 group-hover:opacity-100",
          "translate-x-2 group-hover:translate-x-0",
          "transition-all duration-300",
          "hover:bg-white dark:hover:bg-black hover:scale-105 hover:shadow-glow"
        )}
        onClick={scrollPrev}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2",
          "h-12 w-12 rounded-xl",
          "bg-white/90 dark:bg-black/70 backdrop-blur-sm",
          "border border-white/20 shadow-soft-lg",
          "opacity-0 group-hover:opacity-100",
          "-translate-x-2 group-hover:translate-x-0",
          "transition-all duration-300",
          "hover:bg-white dark:hover:bg-black hover:scale-105 hover:shadow-glow"
        )}
        onClick={scrollNext}
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </Button>

      {/* Pagination Dots - Enhanced */}
      <div className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2",
        "flex gap-2 px-4 py-2.5",
        "bg-black/20 backdrop-blur-md rounded-full"
      )}>
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "rounded-full transition-all duration-300",
              index === selectedIndex
                ? "w-8 h-2 bg-white shadow-lg"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
