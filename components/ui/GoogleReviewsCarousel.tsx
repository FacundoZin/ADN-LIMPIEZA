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
        className="absolute -left-6 top-1/3 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all hidden lg:flex items-center justify-center"
        aria-label="Previous reviews"
      >
        <ChevronLeft size={24} className="text-gray-600" />
      </button>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-0 lg:px-12">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            {/* Star Rating */}
            <div className="mb-4 flex justify-between items-start">
              <div>{renderStars(review.rating)}</div>
              <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                {review.rating}
              </span>
            </div>

            {/* Review Text */}
            <p className="text-gray-800 text-sm mb-6 flex-grow leading-relaxed">{review.text}</p>

            {/* Author Details */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                style={{ backgroundColor: review.avatarColor }}
              >
                {review.initials}
              </div>

              {/* Author Info */}
              <div className="flex-grow">
                <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                <p className="text-gray-500 text-xs">author {review.initials}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute -right-6 top-1/3 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all hidden lg:flex items-center justify-center"
        aria-label="Next reviews"
      >
        <ChevronRight size={24} className="text-gray-600" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-gray-400 w-8 h-2.5" : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
            }`}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}