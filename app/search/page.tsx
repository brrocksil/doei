"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ItemCard } from '@/components/item-card'
import { api } from '@/services/api'
import { ItemDetails } from '@/types/item'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [searchResults, setSearchResults] = useState<ItemDetails[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      performSearch()
    }
  }, [searchQuery])

  const performSearch = async () => {
    setIsLoading(true)
    try {
      const results = await api.searchItems(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Error performing search:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Buscar Itens</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite sua busca..."
            className="flex-grow"
          />
          <Button type="submit">Buscar</Button>
        </div>
      </form>
      {isLoading ? (
        <p>Carregando resultados...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
      {!isLoading && searchResults.length === 0 && (
        <p>Nenhum resultado encontrado para "{searchQuery}"</p>
      )}
    </div>
  )
}

