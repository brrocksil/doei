export interface ItemDetails {
  id: number
  title: string
  category: string
  condition: string
  location: string
  locationType: 'residence' | 'public'
  donor: string
  waitingList: number
  images: string[]
  description: string
  coordinates: [number, number]
  donorAccountAge: {
    years: number
    months: number
  }
  donorTotalDonations: number
  status: 'available' | 'collected' | 'unavailable'
}

