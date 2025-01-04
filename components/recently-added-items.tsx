"use client"

import { useState, useEffect } from 'react'
import { ItemCard } from './item-card'
import { api } from '@/services/api'
import { ItemDetails } from '@/types/item'
import { Skeleton } from "@/components/ui/skeleton"

export default function RecentlyAddedItems() {
  const [recentItems, setRecentItems] = useState<ItemDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        setLoading(true)
        const items = await api.getItems()
        // For demonstration, let's consider the 3 most recent items.
        // In a real application, you'd likely sort by date and limit the results.
        setRecentItems(items.slice(-3).reverse()) // Reverse to show newest first
      } catch (err) {
        console.error('Failed to fetch recent items:', err)
        setError('Failed to load recent items. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentItems()
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
      {recentItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

