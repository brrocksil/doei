'use client'

import { useState, useEffect } from 'react'
import { Heart, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Cookies from 'js-cookie'

interface DonationPopupProps {
  className?: string
}

export function DonationPopup({ className }: DonationPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkPopupVisibility = () => {
      const popupData = Cookies.get('donationPopup')
      if (popupData) {
        const { count, lastShown } = JSON.parse(popupData)
        const now = new Date()
        const lastShownDate = new Date(lastShown)
        
        // Check if it's a new day
        if (now.toDateString() !== lastShownDate.toDateString()) {
          // Reset count for the new day
          setPopupCookie(0)
          setIsVisible(true)
        } else if (count < 2) {
          setIsVisible(true)
        }
      } else {
        // No cookie set, show popup
        setIsVisible(true)
      }
    }

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      checkPopupVisibility()
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const setPopupCookie = (count: number) => {
    Cookies.set('donationPopup', JSON.stringify({ count, lastShown: new Date() }), { expires: 1 }) // Expires in 1 day
  }

  const handleDisable = () => {
    setIsVisible(false)
    const popupData = Cookies.get('donationPopup')
    if (popupData) {
      const { count } = JSON.parse(popupData)
      setPopupCookie(count + 1)
    } else {
      setPopupCookie(1)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300",
        className
      )}
    >
      <div className="bg-gray-900/95 text-gray-100 rounded-lg shadow-lg p-4 sm:p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisable}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-100"
        >
          <span className="sr-only">Fechar</span>
          <X className="w-5 h-5" />
        </Button>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 max-w-5xl mx-auto">
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 animate-pulse flex-shrink-0" fill="currentColor" />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-semibold text-lg mb-1">Gosta do Doei?</h3>
            <p className="text-gray-300 text-sm">
              Por favor, considere fazer uma <a
                href="https://github.com/sponsors/doei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7367F0] hover:text-[#564ad4] underline"
              >
                doação
              </a>. Isso nos permite continuar criando recursos sem barreiras, garantindo que nosso trabalho permaneça livre e aberto.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisable}
            className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 text-xs text-center w-full sm:w-24"
          >
            Desativar<br />este popup
          </Button>
        </div>
      </div>
    </div>
  )
}

