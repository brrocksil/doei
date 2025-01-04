import { notFound } from 'next/navigation'

const dummyDonations = [
  { id: 1, title: 'Sofa', description: 'Comfortable 3-seater sofa', location: 'New York' },
  { id: 2, title: 'Bicycle', description: 'Mountain bike in good condition', location: 'Los Angeles' },
  { id: 3, title: 'Books', description: 'Collection of classic novels', location: 'Chicago' },
]

export default function DonationPage({ params }: { params: { id: string } }) {
  const donation = dummyDonations.find(d => d.id === parseInt(params.id))

  if (!donation) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">TT{donation.title}</h1>
      <p className="text-gray-600 mb-4">{donation.description}</p>
      <p className="text-sm text-gray-500">LocationDD: {donation.location}</p>
    </div>
  )
}

