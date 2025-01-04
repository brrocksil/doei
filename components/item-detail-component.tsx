"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Heart, Facebook, Twitter, Linkedin, PhoneIcon as WhatsApp, Users, MapPin, Home, Building, Phone, Mail, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { showToast } from "@/lib/toast"
import { ItemDetails } from '@/types/item'
import { api } from "@/services/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface ItemDetailComponentProps {
  item: ItemDetails;
  userRole: 'donor' | 'recipient';
  onStatusChange: () => void;
}

export default function ItemDetailComponent({ item, userRole, onStatusChange }: ItemDetailComponentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [viewState, setViewState] = useState({
    longitude: item.coordinates[0],
    latitude: item.coordinates[1],
    zoom: 16
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    showToast.success("O link foi copiado para a área de transferência.")
  }

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira este item no Doei: ${item.title}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  }

  const handleRequestItem = async () => {
    if (!user) {
      console.log("User not logged in, cannot request item");
      showToast.error("Você precisa estar logado para solicitar um item.");
      return;
    }

    try {
      console.log("Requesting item...");
      setIsRequesting(true);
      await api.updateItem(item.id, { waitingList: item.waitingList + 1 });
      console.log("Item updated, creating chat room...");
      const roomId = await api.createChatRoom(item.id, user.id, item.donorId);
      console.log("Chat room created, roomId:", roomId);
      showToast.success("O doador foi notificado do seu interesse. Redirecionando para o chat...");
      onStatusChange();
      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error("Error requesting item:", error);
      showToast.error("Não foi possível solicitar o item. Tente novamente.");
    } finally {
      setIsRequesting(false);
    }
  };

  const handleMarkAsCollected = async () => {
    try {
      await api.markAsCollected(item.id);
      showToast.success("O status do item foi atualizado.");
      onStatusChange();
    } catch (error) {
      showToast.error("Não foi possível marcar o item como coletado. Tente novamente.");
    }
  }

  const handleMarkAsDonated = async () => {
    try {
      await api.markAsDonated(item.id);
      showToast.success("O status do item foi atualizado.");
      onStatusChange();
    } catch (error) {
      showToast.error("Não foi possível marcar o item como doado. Tente novamente.");
    }
  }

  const formatAccountAge = (age: { years: number, months: number }) => {
    if (age.years === 0) {
      return `${age.months} ${age.months === 1 ? 'mês' : 'meses'}`
    }
    return `${age.years} ${age.years === 1 ? 'ano' : 'anos'} e ${age.months} ${age.months === 1 ? 'mês' : 'meses'}`
  }

  if (item.status === 'collected') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Este item já foi coletado</h1>
        <p>O item que você está procurando não está mais disponível para doação.</p>
      </div>
    )
  }

  if (item.status === 'unavailable') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Este item não está mais disponível</h1>
        <p>O item que você está procurando foi removido ou não está mais disponível para doação.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="relative">
          <div className="relative h-[400px] w-full">
            <Image 
              src={item.images[currentImageIndex]} 
              alt={item.title} 
              fill
              className="object-cover rounded-lg"
            />
            {item.images.length > 1 && (
              <>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {item.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white/100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white/100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <div className="absolute top-2 right-2 flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <h3 className="font-medium leading-none">Compartilhar</h3>
                    <div className="flex justify-between">
                      <Button size="icon" variant="outline">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={shareOnWhatsApp}>
                        <WhatsApp className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Input value={window.location.href} readOnly />
                      <Button onClick={copyLink}>Copiar</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button 
                size="icon" 
                variant="secondary" 
                onClick={toggleFavorite}
                className={`transition-colors ${isFavorite ? 'text-red-500' : ''}`}
              >
                <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Badge>{item.category}</Badge>
              <Badge variant="outline">{item.condition}</Badge>
            </div>
            <p className="text-lg">{item.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Localização: {item.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {item.locationType === 'residence' ? (
                <Home className="w-4 h-4 mr-1" />
              ) : (
                <Building className="w-4 h-4 mr-1" />
              )}
              <span>Tipo de local: {item.locationType === 'residence' ? 'Residência' : 'Local Público'}</span>
            </div>
            {userRole === 'donor' && item.locationType === 'residence' && item.status === 'available' && (
              <Button onClick={handleMarkAsDonated}>Marcar como Doado</Button>
            )}
            <div 
              className="border-t pt-4"
              onClick={() => router.push(`/donor/${item.donorId}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="bg-white rounded-lg py-4">
                <div className="flex items-center justify-around">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.donorAvatar} alt={item.donor} />
                      <AvatarFallback>{item.donor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Doador: {item.donor}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatAccountAge(item.donorAccountAge)} doando
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-semibold">{item.rating}</span>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-gray-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Link href="#reviews" className="text-2xl font-semibold text-primary hover:underline">
                      {item.totalReviews}
                    </Link>
                    <span className="text-sm">avaliações</span>
                  </div>
                </div>
              </div>
            </div>
            {userRole === 'recipient' && item.locationType === 'public' && item.status === 'available' && (
              <Button size="lg" onClick={handleMarkAsCollected} className="mt-4 text-white bg-[#7367F0] hover:bg-[#564ad4] hover:text-white">Marcar como Coletado</Button>
            )}
            {userRole === 'recipient' && item.locationType === 'residence' && item.status === 'available' && (
              <Button 
                size="lg" 
                onClick={handleRequestItem} 
                className="text-white bg-[#7367F0] hover:bg-[#564ad4] hover:text-white"
                disabled={isRequesting}
              >
                {isRequesting ? "Solicitando..." : "Solicitar Item"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {userRole === 'recipient' && item.locationType === 'public' && item.status === 'available' && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Local de Retirada</h2>
          <div className="h-[300px] w-full mb-4 rounded-lg overflow-hidden md:h-[400px] lg:h-[500px]">
            <Map
              mapboxAccessToken="pk.eyJ1IjoiYnJyb2Nrc2lsdmVyIiwiYSI6ImNtNGVnbWZyMDB5bHMyanEwNG1xaHJnMWMifQ.wQcQRwr0hklRjfvlf5shwQ"
              initialViewState={viewState}
              style={{width: '100%', height: '100%'}}
              mapStyle="mapbox://styles/mapbox/light-v11"
            >
              <Marker longitude={item.coordinates[0]} latitude={item.coordinates[1]} color="#7367F0" />
            </Map>
          </div>
        </div>
      )}
    </div>
  )
}

