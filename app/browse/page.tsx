"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ItemCard, ItemCardProps } from '@/components/item-card'

const items: ItemCardProps[] = [
  { 
    id: 1, 
    title: 'Sofá de Couro Vintage', 
    category: 'Móveis', 
    condition: 'Bom', 
    location: 'São Paulo',
    donor: 'Maria Silva',
    waitingList: 3,
    images: [
      '/placeholder.svg?height=200&width=300',
      '/placeholder.svg?height=200&width=300&text=Image+2',
      '/placeholder.svg?height=200&width=300&text=Image+3',
    ]
  },
  { 
    id: 2, 
    title: 'Bicicleta de Montanha', 
    category: 'Esportes', 
    condition: 'Semi-novo', 
    location: 'Rio de Janeiro',
    donor: 'João Santos',
    waitingList: 1,
    images: [
      '/placeholder.svg?height=200&width=300',
      '/placeholder.svg?height=200&width=300&text=Image+2',
    ]
  },
  { id: 3, title: 'Coleção de Literatura Clássica', category: 'Livros', condition: 'Regular', location: 'Belo Horizonte', donor: 'Ana Oliveira', waitingList: 0, images: ['/placeholder.svg?height=200&width=300'] },
  { id: 4, title: 'Laptop', category: 'Eletrônicos', condition: 'Bom', location: 'Porto Alegre', donor: 'Pedro Souza', waitingList: 2, images: ['/placeholder.svg?height=200&width=300'] },
  { id: 5, title: 'Conjunto de Mesa de Jantar', category: 'Móveis', condition: 'Semi-novo', location: 'Brasília', donor: 'Laura Pereira', waitingList: 1, images: ['/placeholder.svg?height=200&width=300'] },
  { id: 6, title: 'Violão', category: 'Música', condition: 'Bom', location: 'Salvador', donor: 'Ricardo Costa', waitingList: 0, images: ['/placeholder.svg?height=200&width=300'] },
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('todas')
  const [conditionFilter, setConditionFilter] = useState('todas')

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'todas' || item.category.toLowerCase() === categoryFilter.toLowerCase()) &&
    (conditionFilter === 'todas' || item.condition?.toLowerCase() === conditionFilter.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Procurar Itens</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Pesquisar itens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={setCategoryFilter} defaultValue="todas">
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as Categorias</SelectItem>
            <SelectItem value="moveis">Móveis</SelectItem>
            <SelectItem value="esportes">Esportes</SelectItem>
            <SelectItem value="livros">Livros</SelectItem>
            <SelectItem value="eletronicos">Eletrônicos</SelectItem>
            <SelectItem value="musica">Música</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setConditionFilter} defaultValue="todas">
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por condição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as Condições</SelectItem>
            <SelectItem value="novo">Novo</SelectItem>
            <SelectItem value="semi-novo">Semi-novo</SelectItem>
            <SelectItem value="bom">Bom</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="ruim">Ruim</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

