"use client"

import { useState, useEffect } from 'react'
import { DonorDashboard } from '@/components/donor-dashboard'
import { ItemDetails } from '@/types/item'
import { api } from '@/services/api'
import { toast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const [donations, setDonations] = useState<ItemDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      setLoading(true)
      const items = await api.getDonationsByUser(1) // Assuming user ID 1 for now
      setDonations(items)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar suas doações. Tente novamente mais tarde.",
        variant: "destructive",
        position: "top-right",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsDonated = async (itemId: number) => {
    try {
      await api.markAsDonated(itemId)
      toast({
        title: "Sucesso",
        description: "Item marcado como doado.",
        position: "top-right",
      })
      fetchDonations() // Refresh the list after updating
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível marcar o item como doado. Tente novamente.",
        variant: "destructive",
        position: "top-right",
      })
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel do Doador</h1>
      <DonorDashboard donations={donations} onMarkAsDonated={handleMarkAsDonated} />
    </div>
  )
}

