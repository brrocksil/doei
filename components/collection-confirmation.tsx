"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ItemDetails } from '@/types/item'

export default function CollectionConfirmation({ item }: { item: ItemDetails }) {
  const [viewState, setViewState] = useState({
    longitude: item.coordinates[0],
    latitude: item.coordinates[1],
    zoom: 13
  });

  const [markerPosition, setMarkerPosition] = useState({
    longitude: item.coordinates[0],
    latitude: item.coordinates[1],
  });

  const handleMarkerDrag = (event) => {
    setMarkerPosition({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  };

  const handleConfirmCollection = () => {
    // Here you would typically send a request to your backend to update the item status
    toast({
      title: "Coleta confirmada!",
      description: "Obrigado por atualizar o status do item.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Confirmar Coleta</h1>
      <p className="mb-4">Arraste o marcador para o local exato onde você coletou o item.</p>
      <div className="h-[400px] w-full mb-4">
        <Map
          mapboxAccessToken="sk.eyJ1IjoiYnJyb2Nrc2lsdmVyIiwiYSI6ImNtNGVqZG05MjBiYXIyaXB2YmcwZnFuMXYifQ._MdqPedTIbwDm0ZQbhTX3Q"
          initialViewState={viewState}
          style={{width: '100%', height: '100%'}}
          mapStyle="mapbox://styles/mapbox/light-v10"
        >
          <Marker 
            longitude={markerPosition.longitude} 
            latitude={markerPosition.latitude} 
            color="#7367F0"
            draggable
            onDragEnd={handleMarkerDrag}
          />
        </Map>
      </div>
      <Button onClick={handleConfirmCollection}>Confirmar Coleta</Button>
    </div>
  )
}

