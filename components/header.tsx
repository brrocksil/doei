"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, CircleUserRound, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/contexts/AuthContext'
import { Notifications } from './notifications'
import { NotificationsModal } from './notifications-modal'
import { Gift, SearchIcon, Bell, UserCircle, LogIn, UserPlus, LogOut, MessageSquare } from 'lucide-react'
import { ChatNotifications } from './chat-notifications'

export default function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
  const { isLoggedIn, logout, user } = useAuth()
  const [menuItems, setMenuItems] = useState<any[]>([])

  useEffect(() => {
    const items = [
      { label: 'Doar Item', icon: Gift, action: () => isLoggedIn ? router.push('/donate') : router.push('/login?redirect=/donate') },
      { label: 'Procurar Itens', icon: SearchIcon, action: () => router.push('/browse') },
      ...(isLoggedIn ? [{ label: 'Notificações', icon: Bell, action: () => setIsNotificationsModalOpen(true) }] : []),
      ...(isLoggedIn
        ? [
            { label: 'Meu Perfil', icon: UserCircle, action: () => router.push('/profile') },
            { label: 'Sair', icon: LogOut, action: handleLogout }
          ]
        : [
            { label: 'Entrar', icon: LogIn, action: () => router.push('/login') },
            { label: 'Cadastrar', icon: UserPlus, action: () => router.push('/cadastro') }
          ]
      )
    ]
    setMenuItems(items)
  }, [isLoggedIn, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="text-xl md:text-2xl font-bold text-[#7367F0]">
            Doei
          </Link>

          <form onSubmit={handleSearch} className="flex-grow mx-4 max-w-sm">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Procurar itens para doação..." 
                className="w-full pl-16 pr-4 rounded-full h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#7367F0] rounded-full p-2"
              >
                <Search className="h-4 w-4 text-white"/>
              </Button>
            </div>
          </form>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button 
                size="icon" 
                variant="outline"
                className="rounded-full border border-gray-200 hover:bg-gray-100 h-10 w-10 flex items-center justify-center"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 md:hidden">
              {menuItems.map((item, index) => (
                <DropdownMenuItem key={index} onSelect={item.action}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="hidden md:flex items-center justify-end w-full mt-4 md:mt-0">
          <div className="flex items-center space-x-4">
            <Button 
              className="text-[#7367F0] bg-transparent hover:bg-transparent hover:text-[#564ad4]"
              onClick={() => isLoggedIn ? router.push('/donate') : router.push('/login?redirect=/donate')}
            >
              Doar Item
            </Button>
            <Link href="/browse">
              <Button className="text-white bg-[#7367F0] hover:bg-[#564ad4] hover:text-white">
                Procurar Itens
              </Button>
            </Link>
          </div>
          
          <div className="ml-4 flex items-center space-x-2">
            {isLoggedIn && (
              <>
                <ChatNotifications className="text-[#7367F0]" />
                <Notifications className="text-[#7367F0]" />
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full outline-0 border border-gray-200 h-12 w-[5.4rem]"
                >
                  <div className="flex items-center gap-2">
                    <Menu className="w-10 h-10 text-[#7367F0]" strokeWidth={1.5} />
                    <CircleUserRound className="w-42 h-42 text-[#7367F0]" strokeWidth={1.5} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} onSelect={item.action}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />
    </header>
  )
}

