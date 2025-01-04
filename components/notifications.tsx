"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { api } from '@/services/api'
import { Notification } from '@/types/notification'
import { useRouter } from 'next/navigation'

export function Notifications({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedNotifications = await api.getNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setError('Failed to load notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: number) => {
    try {
      await api.markNotificationAsRead(id);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' }).format(
      Math.round((timestamp.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const handleViewAllNotifications = () => {
    setOpen(false);
    router.push('/notifications');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className} hover:bg-[#564ad4]/10 h-10 w-10`}>
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-[#7367F0] text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 bg-primary text-primary-foreground">
          <h3 className="font-semibold text-lg">Notificações</h3>
          <p className="text-sm text-primary-foreground/70">
            {unreadCount === 0 ? 'Nenhuma nova notificação' : `${unreadCount} nova${unreadCount > 1 ? 's' : ''}`}
          </p>
        </div>
        <ScrollArea className="h-[400px]">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Carregando notificações...</p>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          {!loading && !error && notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 transition-colors hover:bg-muted/50 ${notification.read ? 'bg-background' : 'bg-muted'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={notification.imageUrl}
                        alt=""
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-[#7367F0] ml-2 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && !error && (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Nenhuma notificação no momento.</p>
              </div>
            )
          )}
        </ScrollArea>
        <Separator />
        <div className="p-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={handleViewAllNotifications}
          >
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

