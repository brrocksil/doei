"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Gift, Clock, MapPin, ArrowLeft } from 'lucide-react'
import { getDonorProfile } from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function DonorProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const donorId = parseInt(params.id)
      try {
        const profileData = await getDonorProfile(donorId)
        setProfile(profileData)
      } catch (error) {
        console.error("Failed to fetch donor profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [params.id])

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Perfil do Doador</h1>
          <p className="text-red-500">Não foi possível carregar o perfil do doador. Por favor, tente novamente mais tarde.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Perfil do Doador</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-5 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <span className="text-xl font-semibold text-white mr-2">{profile.rating.toFixed(1)}</span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(profile.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center sm:justify-start mt-2 text-white">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="w-5 h-5 text-purple-500 mr-2" />
                  Conta ativa há
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.accountActiveFor}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Gift className="w-5 h-5 text-pink-500 mr-2" />
                  Total de itens doados
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{profile.totalItemsDonated}</dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Itens para Doação</h3>
            {profile.activeItems.length > 0 ? (
              <ul className="space-y-3">
                {profile.activeItems.map((item: any) => (
                  <li key={item.id} className="flex justify-between items-center bg-purple-50 p-3 rounded-md">
                    <span className="text-purple-700">{item.title}</span>
                    <Badge className="bg-purple-100 text-purple-700">Ativo</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Nenhum item ativo para doação no momento.</p>
            )}
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Histórico de Doações</h3>
            {profile.donatedItems.length > 0 ? (
              <ul className="space-y-4">
                {profile.donatedItems.map((item: any) => (
                  <li key={item.id} className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{item.title}</span>
                      <Badge variant="outline" className="border-pink-300 text-pink-700">Doado</Badge>
                    </div>
                    {item.recipientComment && (
                      <p className="text-sm text-gray-600 mt-1 italic">
                        "{item.recipientComment}"
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Nenhum item doado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

