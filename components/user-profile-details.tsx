"use client"

import { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Pencil, Camera } from 'lucide-react'
import { api } from '@/services/api'

interface UserProfile {
  id: number
  name: string
  email: string
  phone: string
  address: string
  avatar: string
  rating: number
  totalReviews: number
  joinDate: string
  totalDonations: number
  totalReceived: number
}

export default function UserProfileDetails() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        const userProfile = await api.getUserProfile(1) // Using ID 1 for demonstration
        setProfile(userProfile)
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  if (loading) {
    return <div>Carregando informações do perfil...</div>
  }

  if (!profile) {
    return <div>Não foi possível carregar as informações do perfil.</div>
  }

  const maskPhoneNumber = (phone: string) => {
    return formatPhoneNumber(phone);
  };

  const toggleEditing = () => {
    if (isEditing) {
      setEditedProfile({});
    } else {
      setEditedProfile({
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await api.updateUserProfile(profile.id, editedProfile)
      setProfile(updatedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update user profile:", error)
    }
  }

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, '');
    const limitedDigits = digits.slice(0, 13);
    
    if (limitedDigits.length <= 2) {
      return `+${limitedDigits}`;
    } else if (limitedDigits.length <= 4) {
      return `+${limitedDigits.slice(0, 2)} (${limitedDigits.slice(2)}`;
    } else if (limitedDigits.length <= 9) {
      return `+${limitedDigits.slice(0, 2)} (${limitedDigits.slice(2, 4)}) ${limitedDigits.slice(4)}`;
    } else {
      return `+${limitedDigits.slice(0, 2)} (${limitedDigits.slice(2, 4)}) ${limitedDigits.slice(4, 9)}-${limitedDigits.slice(9)}`;
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // In a real application, you would upload the file to your server here
        // and get back the new avatar URL. For this example, we'll use a placeholder.
        const newAvatarUrl = URL.createObjectURL(file);
        const updatedProfile = await api.updateUserProfile(profile.id, { avatar: newAvatarUrl });
        setProfile(updatedProfile);
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-20 h-20 cursor-pointer" onClick={handleAvatarClick}>
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-[#7367F0] text-primary-foreground rounded-full p-1 cursor-pointer" onClick={handleAvatarClick}>
            <Camera className="w-4 h-4" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-muted-foreground">Membro desde {profile.joinDate}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Informações de Contato</CardTitle>
              <Button variant="ghost" size="sm" onClick={toggleEditing}>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={editedProfile.email ?? ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone ?? ''}
                    onChange={(e) => {
                      const formattedPhone = formatPhoneNumber(e.target.value);
                      setEditedProfile({ ...editedProfile, phone: formattedPhone });
                    }}
                    placeholder="+55 (11) 98765-4321"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={editedProfile.address ?? ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={toggleEditing}>Cancelar</Button>
                  <Button onClick={handleUpdateProfile}>Salvar</Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Email</Label>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <Label>Telefone</Label>
                  <p>{formatPhoneNumber(profile.phone)}</p>
                </div>
                <div>
                  <Label>Endereço</Label>
                  <p>{profile.address}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold">{profile.rating.toFixed(1)}</span>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(profile.rating) ? 'text-gray-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">({profile.totalReviews} avaliações)</p>
            </div>
            <div>
              <Label>Total de Doações</Label>
              <p className="text-lg font-semibold">{profile.totalDonations} itens</p>
            </div>
            <div>
              <Label>Total de Itens Recebidos</Label>
              <p className="text-lg font-semibold">{profile.totalReceived} itens</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

