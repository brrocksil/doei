"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ItemDetails } from '@/types/item'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner"
import { showToast } from "@/lib/toast"

interface ChatRoom {
  id: string;
  itemId: number;
  participants: string[];
  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { roomId } = useParams()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const [item, setItem] = useState<ItemDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchChatRoomAndItem = async () => {
      try {
        console.log("Fetching chat room...");
        const room = await api.getChatRoom(roomId as string);
        if (room) {
          console.log("Chat room fetched successfully:", room);
          setChatRoom(room);

          // Fetch item details
          const itemDetails = await api.getItemById(room.itemId);
          if (itemDetails) {
            console.log("Item details fetched successfully:", itemDetails);
            setItem(itemDetails);
          }
        } else {
          console.log("No chat room found for roomId:", roomId);
        }
      } catch (error) {
        console.error("Error fetching chat room and item:", error);
        showToast.error("Erro ao carregar o chat. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchChatRoomAndItem();
    }

    // Exemplo de mensagens
    const exampleMessages: ChatMessage[] = [
      {
        id: '1',
        senderId: 'donor1',
        message: 'Olá! Vi que você está interessado no sofá que estou doando.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 horas atrás
      },
      {
        id: '2',
        senderId: 'recipient1',
        message: 'Sim, estou! Ele parece estar em ótimo estado. Ainda está disponível?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5) // 1.5 horas atrás
      },
      {
        id: '3',
        senderId: 'donor1',
        message: 'Sim, ainda está disponível. Quando você gostaria de vir buscá-lo?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hora atrás
      },
      {
        id: '4',
        senderId: 'recipient1',
        message: 'Que ótimo! Eu poderia ir amanhã à tarde, por volta das 15h. Isso seria conveniente para você?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
      },
      {
        id: '5',
        senderId: 'donor1',
        message: 'Perfeito! 15h amanhã funciona bem para mim. Vou te enviar o endereço por mensagem privada.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutos atrás
      }
    ];

    setMessages(exampleMessages);

    const unsubscribe = api.onNewMessage(roomId as string, (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      console.log("ChatPage useEffect cleanup");
      unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      try {
        const sentMessage = await api.sendMessage(roomId as string, user.id, newMessage);
        const newMessageWithTimestamp = {
          ...sentMessage,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date()
        };
        setMessages((prevMessages) => [...prevMessages, newMessageWithTimestamp]);
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
        showToast.error('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
      }
    }
  };

  const handleBackClick = () => {
    setIsNavigating(true);
    router.push(`/item/${item?.id}`);
  };

  if (!user) {
    return <div>Por favor, faça login para acessar o chat.</div>;
  }

  if (isLoading || isNavigating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!chatRoom || !item) {
    return <div>Erro ao carregar as informações do chat.</div>;
  }

  const otherParticipant = chatRoom.participants.find(id => id !== user.id);
  const isUserDonor = item.donorId === user.id;

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={isUserDonor ? item.recipientAvatar : item.donorAvatar} />
          <AvatarFallback>{isUserDonor ? item.recipient.charAt(0) : item.donor.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{isUserDonor ? `Chat com ${item.recipient}` : `Chat com ${item.donor}`}</h1>
          <p className="text-sm text-gray-500">Sobre: {item.title}</p>
        </div>
      </div>
      <div className="flex-grow flex flex-col border rounded-lg overflow-hidden bg-white">
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id || `msg_${message.timestamp.getTime()}_${Math.random().toString(36).substr(2, 9)}`}
              className={`mb-2 ${
                message.senderId === user.id ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.senderId === user.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.message}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-grow mr-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

