import { cache } from 'react'

interface DonorProfile {
  id: number
  name: string
  avatar: string
  rating: number
  accountActiveFor: string
  totalItemsDonated: number
  location: string
  activeItems: ItemDetails[]
  donatedItems: ItemDetails[]
}

interface ItemDetails {
  id: number
  title: string
  status: 'active' | 'donated'
  recipientComment?: string
}

export const getDonorProfile = cache(async (id: number): Promise<DonorProfile | null> => {
  try {
    // In a real application, you would fetch this data from your API
    // For now, we'll return mock data
    const mockProfile: DonorProfile = {
      id: id,
      name: 'Maria Silva',
      avatar: '/placeholder.svg?height=200&width=200',
      rating: 4.5,
      accountActiveFor: '2 anos e 3 meses',
      totalItemsDonated: 15,
      location: 'São Paulo, SP',
      activeItems: [
        { id: 1, title: 'Sofá de 3 lugares', status: 'active' },
        { id: 2, title: 'Mesa de jantar', status: 'active' },
      ],
      donatedItems: [
        { id: 3, title: 'Bicicleta infantil', status: 'donated', recipientComment: 'Ótimo item, muito obrigado!' },
        { id: 4, title: 'Livros didáticos', status: 'donated' },
      ],
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return mockProfile
  } catch (error) {
    console.error('Error fetching donor profile:', error)
    return null
  }
})

