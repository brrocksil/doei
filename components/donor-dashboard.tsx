"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ItemDetails } from '@/types/item'
import Link from 'next/link'

interface DonorDashboardProps {
  donations: ItemDetails[]
  onMarkAsDonated: (itemId: number) => void
}

export default function DonorDashboard({ donations, onMarkAsDonated }: DonorDashboardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {donations.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
              <div className="flex justify-between items-center mb-4">
                <Badge>{item.category}</Badge>
                <Badge variant={item.status === 'available' ? 'success' : item.status === 'collected' ? 'default' : 'destructive'}>
                  {item.status === 'available' ? 'Disponível' : item.status === 'collected' ? 'Coletado' : 'Indisponível'}
                </Badge>
              </div>
              {item.status === 'available' && item.locationType === 'residence' && (
                <Button onClick={() => onMarkAsDonated(item.id)} className="w-full mb-2">
                  Marcar como Doado
                </Button>
              )}
              <Link href={`/item/${item.id}`}>
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
  )
}

