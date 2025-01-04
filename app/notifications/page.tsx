"use client"

import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import { Notification } from '@/types/notification'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function AllNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' }).format(
      Math.round((timestamp.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todas as Notificações</h1>
      {loading && <p className="text-center">Carregando notificações...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`bg-white shadow rounded-lg p-4 ${notification.read ? '' : 'bg-muted'}`}
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
        </ScrollArea>
      )}
    </div>
  );
}

