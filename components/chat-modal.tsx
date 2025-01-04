import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api } from '@/services/api'

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  currentUserId: string;
}

export function ChatModal({ isOpen, onClose, roomId, currentUserId }: ChatModalProps) {
  console.log("ChatModal rendered. Props:", { isOpen, roomId, currentUserId });
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("ChatModal useEffect triggered. isOpen:", isOpen, "roomId:", roomId);
    const fetchChatRoom = async () => {
      try {
        console.log("Fetching chat room...");
        const room = await api.getChatRoom(roomId);
        if (room) {
          console.log("Chat room fetched successfully:", room);
          setMessages(room.messages);
        } else {
          console.log("No chat room found for roomId:", roomId);
        }
      } catch (error) {
        console.error("Error fetching chat room:", error);
      }
    };

    if (isOpen && roomId) {
      fetchChatRoom();
    }

    const unsubscribe = api.onNewMessage(roomId, (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      console.log("ChatModal useEffect cleanup");
      unsubscribe();
    };
  }, [roomId, isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const sentMessage = await api.sendMessage(roomId, currentUserId, newMessage);
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  console.log("ChatModal rendering. isOpen:", isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${
                message.senderId === currentUserId ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.senderId === currentUserId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.message}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex mt-4">
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
      </DialogContent>
    </Dialog>
  );
}

