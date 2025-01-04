'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

const dummyDonations = [
  { id: 1, title: 'Sofa', lat: 40.7128, lng: -74.0060 },
  { id: 2, title: 'Bicycle', lat: 34.0522, lng: -118.2437 },
  { id: 3, title: 'Books', lat: 41.8781, lng: -87.6298 },
]

export default function DonationMap() {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {dummyDonations.map((donation) => (
          <Marker
            key={donation.id}
            position={[donation.lat, donation.lng]}
            icon={new Icon({iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})}
          >
            <Popup>{donation.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

