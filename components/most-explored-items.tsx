"use client"

import { useState, useEffect } from 'react'
import { ItemCard } from './item-card'
import { api } from '@/services/api'
import { ItemDetails } from '@/types/item'
import { Skeleton } from "@/components/ui/skeleton"

export default function MostExploredItems() {
  const [mostExploredItems, setMostExploredItems] = useState<ItemDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMostExploredItems = async () => {
      try {
        setLoading(true)
        const items = await api.getItems()
        // Sort items by waitingList in descending order and take the top 3
        const sortedItems = items
          .sort((a, b) => b.waitingList - a.waitingList)
          .slice(0, 3)
        setMostExploredItems(sortedItems)
      } catch (err) {
        console.error('Failed to fetch most explored items:', err)
        setError('Failed to load most explored items. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchMostExploredItems()
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
      {mostExploredItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

