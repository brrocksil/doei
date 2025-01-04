"use client"

import { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'

interface ChatNotification {
  id: string;
  itemId: number;
  itemTitle: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

export function ChatNotifications({ className }: { className?: string }) {
  const [chatNotifications, setChatNotifications] = useState<ChatNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchChatNotifications = async () => {
      try {
        const notifications = await api.getChatNotifications()
        setChatNotifications(notifications)
        setUnreadCount(notifications.reduce((sum, n) => sum + n.unreadCount, 0))
      } catch (error) {
        console.error('Failed to fetch chat notifications:', error)
      }
    }

    fetchChatNotifications()
    // Set up a polling mechanism to fetch notifications periodically
    const intervalId = setInterval(fetchChatNotifications, 60000) // Fetch every minute

    return () => clearInterval(intervalId)
  }, [])

  const handleChatClick = (roomId: string) => {
    router.push(`/chat/${roomId}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className} hover:bg-[#564ad4]/10 h-10 w-10`}>
          <MessageSquare className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-[#7367F0] text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 bg-primary text-primary-foreground">
          <h3 className="font-semibold text-lg">Conversas</h3>
          <p className="text-sm text-primary-foreground/70">
            {unreadCount === 0 ? 'Nenhuma nova mensagem' : `${unreadCount} nova${unreadCount > 1 ? 's' : ''}`}
          </p>
        </div>
        <ScrollArea className="h-[300px]">
          {chatNotifications.length > 0 ? (
            <div className="divide-y divide-border">
              {chatNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleChatClick(notification.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{notification.itemTitle}</h4>
                    {notification.unreadCount > 0 && (
                      <Badge variant="secondary">{notification.unreadCount}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{notification.lastMessage}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Nenhuma conversa ativa no momento.</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

