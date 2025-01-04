"use client"

import { useState, useEffect } from 'react'
import { ItemCard } from './item-card'
import { api } from '@/services/api'
import { ItemDetails } from '@/types/item'
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedItems() {
  const [featuredItems, setFeaturedItems] = useState<ItemDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true)
        const items = await api.getItems()
        // Assuming we want to show the first 3 items as featured
        // In a real scenario, you might have a separate API endpoint for featured items
        setFeaturedItems(items.slice(0, 3))
      } catch (err) {
        console.error('Failed to fetch featured items:', err)
        setError('Failed to load featured items. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedItems()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

