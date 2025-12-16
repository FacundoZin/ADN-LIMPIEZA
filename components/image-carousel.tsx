"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi])

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-[600px] bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/95 hover:bg-white border-2 border-white/50 shadow-2xl hover:shadow-primary/50 hover:scale-110 hover:border-primary transition-all duration-300"
        onClick={scrollPrev}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-7 w-7 text-primary" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/95 hover:bg-white border-2 border-white/50 shadow-2xl hover:shadow-primary/50 hover:scale-110 hover:border-primary transition-all duration-300"
        onClick={scrollNext}
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-7 w-7 text-primary" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 bg-black/30 backdrop-blur-sm px-4 py-2.5 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-10 bg-white shadow-lg shadow-white/50"
                : "w-2.5 bg-white/60 hover:bg-white/80 hover:w-5"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
