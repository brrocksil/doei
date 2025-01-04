"use client"

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ItemCard } from '@/components/item-card'
import { api } from '@/services/api'
import { ItemDetails } from '@/types/item'
import Link from 'next/link'
import UserProfileDetails from '@/components/user-profile-details'

export default function ProfilePage() {
  const [donatedItems, setDonatedItems] = useState<ItemDetails[]>([])
  const [receivedItems, setReceivedItems] = useState<ItemDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const [donated, received] = await Promise.all([
          api.getDonationsByUser(1), // Assuming user ID 1 for now
          api.getReceivedItemsByUser(1) // Assuming user ID 1 for now
        ])
        setDonatedItems(donated)
        setReceivedItems(received)
      } catch (error) {
        console.error("Failed to fetch items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="donated">Itens Doados</TabsTrigger>
          <TabsTrigger value="received">Itens Recebidos</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Seus dados pessoais e estatísticas.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfileDetails />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donated">
          <Card>
            <CardHeader>
              <CardTitle>Itens Doados</CardTitle>
              <CardDescription>Veja todos os itens que você doou.</CardDescription>
            </CardHeader>
            <CardContent>
              {donatedItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {donatedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p>Você ainda não doou nenhum item.</p>
              )}
              <div className="mt-4">
                <Link href="/donate">
                  <Button className="text-white bg-[#7367F0] hover:bg-[#564ad4] hover:text-white">Doar um novo item</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="received">
          <Card>
            <CardHeader>
              <CardTitle>Itens Recebidos</CardTitle>
              <CardDescription>Veja todos os itens que você recebeu de doações.</CardDescription>
            </CardHeader>
            <CardContent>
              {receivedItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {receivedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p>Você ainda não recebeu nenhum item.</p>
              )}
              <div className="mt-4">
                <Link href="/browse">
                  <Button className="text-white bg-[#7367F0] hover:bg-[#564ad4] hover:text-white">Procurar itens disponíveis</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

