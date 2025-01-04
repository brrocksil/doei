"use client"

import { useState, useRef } from 'react'
import { Sofa, Laptop, Book, Shirt, Music, Dumbbell, Baby, Bike, PawPrint, Utensils, Palette, Gift, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const categories = [
  { icon: Sofa, label: 'Móveis', href: '/browse?category=moveis' },
  { icon: Laptop, label: 'Eletrônicos', href: '/browse?category=eletronicos' },
  { icon: Book, label: 'Livros', href: '/browse?category=livros' },
  { icon: Shirt, label: 'Roupas', href: '/browse?category=roupas' },
  { icon: Music, label: 'Música', href: '/browse?category=musica' },
  { icon: Dumbbell, label: 'Esportes', href: '/browse?category=esportes' },
  { icon: Baby, label: 'Infantil', href: '/browse?category=infantil' },
  { icon: Bike, label: 'Transporte', href: '/browse?category=transporte' },
  { icon: PawPrint, label: 'Pets', href: '/browse?category=pets' },
  { icon: Utensils, label: 'Cozinha', href: '/browse?category=cozinha' },
  { icon: Palette, label: 'Arte', href: '/browse?category=arte' },
  { icon: Gift, label: 'Outros', href: '/browse?category=outros' },
]

export default function CategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    )
  }

  return (
    <div className="w-full bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 relative">
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-950/80 shadow-md"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Button>
        )}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto py-2 scrollbar-hide mx-8"
        >
          <div className="flex space-x-12 mx-auto">
            {categories.map((category) => (
              <a
                key={`${category.label}-${category.href}`}
                href={category.href}
                className="flex flex-col items-center group min-w-[64px]"
              >
                <div className="p-3 rounded-lg group-hover:bg-secondary transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <span className=" text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {category.label}
                </span>
              </a>
            ))}
          </div>
        </div>
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-950/80 shadow-md"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </Button>
        )}
      </div>
    </div>
  )
}

