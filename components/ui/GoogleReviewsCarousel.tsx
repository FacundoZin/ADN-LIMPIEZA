"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Review {
  id: string
  author: string
  initials: string
  rating: number
  text: string
  avatarColor: string
}

interface GoogleReviewsCarouselProps {
  reviews: Review[]
}

export function GoogleReviewsCarousel({ reviews }: GoogleReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [mounted, setMounted] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  useEffect(() => {
    setMounted(true)
    const updateItemsPerPage = () => {
      if (typeof window !== "undefined") {
        setItemsPerPage(window.innerWidth >= 1024 ? 3 : 1)
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(reviews.length / itemsPerPage)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }
  }

  const startIndex = currentIndex * itemsPerPage
  const visibleReviews = reviews.slice(startIndex, startIndex + itemsPerPage)

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}
          />
        ))}
      </div>
    )
  }

  if (!mounted) return null

  return (
    <div 
      className="relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute -left-6 top-1/3 -translate-y-1/2 z-20 bg-card rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-accent transition-all hidden lg:flex items-center justify-center border border-border"
        aria-label="Previous reviews"
      >
        <ChevronLeft size={24} className="text-muted-foreground" />
      </button>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-0 lg:px-12">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-card rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 border border-border/50"
          >
            {/* Star Rating and Google Logo */}
            <div className="mb-4 flex justify-between items-center">
              <div>{renderStars(review.rating)}</div>
              <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-card-foreground text-sm mb-6 flex-grow leading-relaxed">{review.text}</p>

            {/* Author Details */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                style={{ backgroundColor: review.avatarColor }}
              >
                {review.initials}
              </div>

              {/* Author Info */}
              <div className="flex-grow">
                <p className="font-semibold text-foreground text-sm">{review.author}</p>
                <p className="text-muted-foreground text-xs">author {review.initials}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute -right-6 top-1/3 -translate-y-1/2 z-20 bg-card rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-accent transition-all hidden lg:flex items-center justify-center border border-border"
        aria-label="Next reviews"
      >
        <ChevronRight size={24} className="text-muted-foreground" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-primary w-8 h-2.5" : "bg-muted-foreground/30 w-2.5 h-2.5 hover:bg-primary/50"
            }`}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}