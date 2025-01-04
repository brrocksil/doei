import Link from 'next/link'

const dummyDonations = [
  { id: 1, title: 'Sofa', description: 'Comfortable 3-seater sofa', location: 'New York' },
  { id: 2, title: 'Bicycle', description: 'Mountain bike in good condition', location: 'Los Angeles' },
  { id: 3, title: 'Books', description: 'Collection of classic novels', location: 'Chicago' },
]

export default function DonationList() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Donations</h2>
      <ul className="space-y-4">
        {dummyDonations.map((donation) => (
          <li key={donation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <Link href={`/donation/${donation.id}`}>
              <h3 className="text-xl font-semibold">{donation.title}</h3>
              <p className="text-gray-600">{donation.description}</p>
              <p className="text-sm text-gray-500 mt-2">{donation.location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

