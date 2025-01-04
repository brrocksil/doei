"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ItemDetails } from '@/types/item'
import ItemDetailComponent from '@/components/item-detail-component'
import { api } from '@/services/api'
import { toast } from "@/components/ui/use-toast"

export default function ItemPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<ItemDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'donor' | 'recipient'>('recipient') // This should be determined by user authentication

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {
      setLoading(true)
      const itemId = parseInt(params.id as string)
      const fetchedItem = await api.getItemById(itemId)
      if (fetchedItem) {
        setItem(fetchedItem)
      } else {
        toast({
          title: "Erro",
          description: "Item não encontrado.",
          variant: "destructive",
        })
        router.push('/browse')
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os detalhes do item. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  console.log('fetchedItem 1: ', item)
  const handleStatusChange = async () => {
    await fetchItem() // Refresh the item data after status change
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>
  }

  if (!item) {
    return <div className="container mx-auto px-4 py-8">Item não encontrado.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ItemDetailComponent 
        item={item} 
        userRole={userRole}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

