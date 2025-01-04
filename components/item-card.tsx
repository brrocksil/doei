import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Share2, Users, ChevronLeft, ChevronRight, Facebook, Twitter, Linkedin, Home, Building } from 'lucide-react'
import { categoryColors, getColorForCategory } from '@/lib/colors'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

export interface ItemCardProps {
  id: number
  title: string
  category: string
  condition?: string
  location: string
  locationType: 'residence' | 'public'
  donor: string
  waitingList: number
  images: string[]
  status: 'available' | 'collected' | 'unavailable';
}

export function ItemCard({ item }: { item: ItemCardProps }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showControls, setShowControls] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length)
  }

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/item/${item.id}`)
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
      position: "top-right",
    })
  }

  const shareOnSocialMedia = (platform: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement social media sharing logic here
    toast({
      title: `Compartilhado no ${platform}`,
      description: "O item foi compartilhado com sucesso.",
      position: "top-right",
    })
  }

  return (
    <Link href={`/item/${item.id}`}>
      <Card className="group overflow-hidden bg-transparent border-0 shadow-none">
        <CardContent className="p-0">
          <div 
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <Image 
              src={item.images[currentImageIndex]} 
              alt={item.title} 
              fill
              className="object-cover transition-transform group-hover:scale-105" 
            />
            {showControls && (
              <>
                {currentImageIndex > 0 && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                {currentImageIndex < item.images.length - 1 && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
            {item.images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                {item.images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-2">
                <Badge className={`${getColorForCategory(item.category).bg} ${getColorForCategory(item.category).text} ${getColorForCategory(item.category).border}`}>
                  {item.category}
                </Badge>
                {item.condition && (
  <Badge className={`${getColorForCondition(item.condition)}`}>
    {item.condition}
  </Badge>
)}
              </div>
              <div className="flex items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" onClick={(e) => e.preventDefault()}>
                    <div className="grid gap-4">
                      <h3 className="font-medium leading-none">Compartilhar</h3>
                      <div className="flex justify-between">
                        <Button size="icon" variant="outline" onClick={shareOnSocialMedia('Facebook')}>
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={shareOnSocialMedia('Twitter')}>
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={shareOnSocialMedia('LinkedIn')}>
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Input value={`${window.location.origin}/item/${item.id}`} readOnly />
                        <Button onClick={copyLink}>Copiar</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {item.locationType === 'residence' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 text-neutral-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{item.waitingList}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Número de pessoas interessadas neste item</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-1 text-neutral-900">{item.title}</h3>
            <p className="text-sm text-neutral-600 mb-2">{item.donor}</p>
            <div className="flex items-center text-sm text-neutral-600">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>
            <div className="flex items-center text-sm text-neutral-600 mt-1">
              {item.locationType === 'residence' ? (
                <Home className="w-4 h-4 mr-1" />
              ) : (
                <Building className="w-4 h-4 mr-1" />
              )}
              {item.locationType === 'residence' ? 'Residência' : 'Local Público'}
            </div>
            <div className="flex items-center text-sm text-neutral-600 mt-1">
              {item.status === 'available' ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">Disponível</Badge>
              ) : item.status === 'collected' ? (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Coletado</Badge>
              ) : (
                <Badge className="bg-[#d91c50] text-white border-[#d91c50]">Indisponível</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

const getColorForCondition = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'novo':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'semi-novo':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'usado':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'bom':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

