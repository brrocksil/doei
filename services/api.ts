import { ItemDetails } from "@/types/item"
import { Notification } from "@/types/notification";

// Simulated delay to mimic network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fake database
interface ItemDetails {
  id: number;
  title: string;
  category: string;
  condition: string;
  location: string;
  locationType: string;
  donor: string;
  waitingList: number;
  images: string[];
  description: string;
  coordinates: [number, number];
  donorAccountAge: { years: number; months: number };
  donorTotalDonations: number;
  status: "available" | "collected" | "donated";
  address?: string;
  contactPhone?: string;
  contactEmail?: string;
  rating?: number;
  totalReviews?: number;
  donorId: string;
}

let items: ItemDetails[] = [
  {
    id: 1,
    title: "Sofá de Couro Vintage",
    category: "Móveis",
    condition: "Bom",
    location: "São Paulo, SP",
    locationType: "residence",
    donor: "Maria Silva",
    waitingList: 3,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Image+2"],
    description: "Um lindo sofá de couro vintage em boas condições. Perfeito para uma sala de estar aconchegante.",
    coordinates: [-46.6333, -23.5505],
    donorAccountAge: { years: 2, months: 3 },
    donorTotalDonations: 7,
    status: "available",
    address: "Rua Example, 123, São Paulo, SP",
    contactPhone: "+55 11 98765-4321",
    contactEmail: "maria.silva@example.com",
    rating: 4.8,
    totalReviews: 15,
    donorId: "donor1"
  },
  {
    id: 2,
    title: "Bicicleta de Montanha",
    category: "Esportes",
    condition: "Semi-novo",
    location: "Rio de Janeiro, RJ",
    locationType: "public",
    donor: "João Santos",
    waitingList: 1,
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Bicicleta de montanha de alta qualidade, pouco usada. Ótima para aventuras off-road.",
    coordinates: [-43.2096, -22.9035],
    donorAccountAge: { years: 0, months: 11 },
    donorTotalDonations: 3,
    status: "available",
    rating: 4.5,
    totalReviews: 8,
    donorId: "donor2"
  },
  // New items received as donations
  {
    id: 3,
    title: "Conjunto de Panelas Antiaderentes",
    category: "Cozinha",
    condition: "Bom",
    location: "Belo Horizonte, MG",
    locationType: "residence",
    donor: "Ana Oliveira",
    waitingList: 0,
    images: ["/placeholder.svg?height=400&width=600&text=Panelas"],
    description: "Conjunto de 5 panelas antiaderentes em ótimo estado. Ideal para quem está montando a primeira cozinha.",
    coordinates: [-43.9378, -19.9208],
    donorAccountAge: { years: 1, months: 5 },
    donorTotalDonations: 4,
    status: "collected",
    address: "Av. Afonso Pena, 1000, Belo Horizonte, MG",
    contactPhone: "+55 31 98765-4321",
    contactEmail: "ana.oliveira@example.com",
    rating: 4.9,
    totalReviews: 22,
    donorId: "donor3"
  },
  {
    id: 4,
    title: "Livros de Literatura Brasileira",
    category: "Livros",
    condition: "Usado",
    location: "Porto Alegre, RS",
    locationType: "public",
    donor: "Carlos Machado",
    waitingList: 0,
    images: ["/placeholder.svg?height=400&width=600&text=Livros"],
    description: "Coleção de 10 livros de autores brasileiros clássicos. Ótimo para estudantes de literatura.",
    coordinates: [-51.2177, -30.0346],
    donorAccountAge: { years: 3, months: 2 },
    donorTotalDonations: 12,
    status: "collected",
    rating: 4.7,
    totalReviews: 11,
    donorId: "donor4"
  },
  {
    id: 5,
    title: "Berço Infantil",
    category: "Móveis",
    condition: "Semi-novo",
    location: "Curitiba, PR",
    locationType: "residence",
    donor: "Mariana Costa",
    waitingList: 0,
    images: ["/placeholder.svg?height=400&width=600&text=Berço"],
    description: "Berço infantil em madeira maciça, com colchão incluso. Usado por apenas 1 ano.",
    coordinates: [-49.2671, -25.4276],
    donorAccountAge: { years: 2, months: 8 },
    donorTotalDonations: 6,
    status: "collected",
    address: "Rua das Flores, 500, Curitiba, PR",
    contactPhone: "+55 41 98765-4321",
    contactEmail: "mariana.costa@example.com",
    rating: 4.6,
    totalReviews: 9,
    donorId: "donor5"
  }
];

// Updated notifications data with image URLs
let notifications: Notification[] = [
  { 
    id: 1, 
    message: "Seu item 'Sofá de Couro Vintage' foi solicitado por um usuário.", 
    read: false, 
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    imageUrl: "/placeholder.svg?height=400&width=600&text=Sofá+de+Couro+Vintage"
  },
  { 
    id: 2, 
    message: "O item 'Conjunto de Panelas Antiaderentes' que você solicitou foi aprovado.", 
    read: false, 
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    imageUrl: "/placeholder.svg?height=400&width=600&text=Conjunto+de+Panelas"
  },
  { 
    id: 3, 
    message: "Lembrete: Você tem uma coleta agendada para amanhã.", 
    read: true, 
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    imageUrl: "/placeholder.svg?height=400&width=600&text=Coleta+Agendada"
  },
  { 
    id: 4, 
    message: "Novo item disponível na sua área: 'Bicicleta de Montanha'", 
    read: true, 
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    imageUrl: "/placeholder.svg?height=400&width=600&text=Bicicleta+de+Montanha"
  },
  { 
    id: 5, 
    message: "Parabéns! Seu item 'Livros de Literatura Brasileira' foi doado com sucesso.", 
    read: true, 
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    imageUrl: "/placeholder.svg?height=400&width=600&text=Livros+de+Literatura"
  },
];

// Add this new interface for UserProfile
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

// Adicione esta nova interface no topo do arquivo
interface User {
  id: string;
  name: string;
  email: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
}

interface ChatRoom {
  id: string;
  itemId: number;
  participants: string[];
  messages: ChatMessage[];
}

interface ChatNotification {
  id: string;
  itemId: number;
  itemTitle: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

let chatRooms: ChatRoom[] = [];

let authToken: string | null = null;

export const api = {
  getItems: async (): Promise<ItemDetails[]> => {
    await delay(500);
    return items;
  },

  getItemById: async (id: number): Promise<ItemDetails | undefined> => {
    await delay(300);
    return items.find(item => item.id === id);
  },

  createItem: async (item: Omit<ItemDetails, 'id'>): Promise<ItemDetails> => {
    await delay(700);
    const newItem = { ...item, id: items.length + 1, status: 'available' as const };
    items.push(newItem);
    return newItem;
  },

  updateItem: async (id: number, updates: Partial<ItemDetails>): Promise<ItemDetails | undefined> => {
    await delay(500);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      return items[index];
    }
    return undefined;
  },

  markAsCollected: async (id: number): Promise<ItemDetails | undefined> => {
    await delay(400);
    return api.updateItem(id, { status: 'collected' });
  },

  markAsDonated: async (id: number): Promise<ItemDetails | undefined> => {
    await delay(400);
    return api.updateItem(id, { status: 'collected' });
  },

  getDonationsByUser: async (userId: number): Promise<ItemDetails[]> => {
    await delay(600);
    // In a real app, we'd filter by user ID. For this fake API, we'll just return all available items.
    return items.filter(item => item.status === 'available');
  },

  getReceivedItemsByUser: async (userId: number): Promise<ItemDetails[]> => {
    await delay(600);
    // In a real app, we'd filter by user ID and status. For this fake API, we'll return all collected items.
    return items.filter(item => item.status === 'collected');
  },

  searchItems: async (query: string): Promise<ItemDetails[]> => {
    await delay(300);
    const allItems = await api.getItems();
    const lowercaseQuery = query.toLowerCase();
    return allItems.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  },
  getNotifications: async (): Promise<Notification[]> => {
    await delay(300);
    return notifications;
  },
  markNotificationAsRead: async (id: number): Promise<void> => {
    await delay(200);
    const notificationIndex = notifications.findIndex(n => n.id === id);
    if (notificationIndex !== -1) {
      notifications[notificationIndex].read = true;
    } else {
      throw new Error('Notification not found');
    }
  },

  getUserProfile: async (userId: number): Promise<UserProfile> => {
    await delay(300);
    // Mock user profile data
    return {
      id: userId,
      name: "Maria Silva",
      email: "maria.silva@example.com",
      phone: "+5511987654321",
      address: "Rua das Flores, 123, São Paulo, SP",
      avatar: "/placeholder.svg?height=128&width=128",
      rating: 4.8,
      totalReviews: 27,
      joinDate: "15 de junho de 2022",
      totalDonations: 15,
      totalReceived: 3
    };
  },
  updateUserProfile: async (userId: number, updates: Partial<UserProfile>): Promise<UserProfile> => {
    await delay(500);
    const userProfile = await api.getUserProfile(userId);
    const updatedProfile = { ...userProfile, ...updates };
    // In a real application, you would send this data to your backend
    // For now, we'll just return the updated profile
    return updatedProfile;
  },

  login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
    await delay(500);
    if (email === "user@example.com" && password === "password") {
      const user = {
        id: "1",
        name: "Test User",
        email: "user@example.com"
      };
      const token = "fake-jwt-token-" + Math.random().toString(36).substr(2);
      authToken = token;
      return { user, token };
    }
    return null;
  },

  getCurrentUser: async (token: string): Promise<User | null> => {
    await delay(300);
    if (token === authToken) {
      return {
        id: "1",
        name: "Test User",
        email: "user@example.com"
      };
    }
    return null;
  },

  logout: async (): Promise<void> => {
    await delay(300);
    authToken = null;
  },

  createChatRoom: async (itemId: number, userId: string, donorId: string): Promise<string> => {
    await delay(300);
    const roomId = `room_${Date.now()}`;
    chatRooms.push({
      id: roomId,
      itemId,
      participants: [userId, donorId],
      messages: []
    });
    console.log("Chat room created:", roomId);
    return roomId;
  },

  getChatRoom: async (roomId: string): Promise<ChatRoom | undefined> => {
    await delay(200);
    const room = chatRooms.find(room => room.id === roomId);
    console.log("Retrieved chat room:", room);
    return room;
  },

  sendMessage: async (roomId: string, senderId: string, message: string): Promise<ChatMessage> => {
    await delay(100);
    const room = chatRooms.find(room => room.id === roomId);
    if (!room) {
      throw new Error('Chat room not found');
    }
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId,
      receiverId: room.participants.find(id => id !== senderId) || '',
      message,
      timestamp: new Date()
    };
    room.messages.push(newMessage);
    console.log("Message sent:", newMessage);
    return newMessage;
  },

  // Simula a conexão de socket
  onNewMessage: (roomId: string, callback: (message: ChatMessage) => void) => {
    // Na vida real, isso seria uma conexão de socket real
    // Para o mock, vamos apenas simular mensagens a cada 5 segundos
    const interval = setInterval(() => {
      const room = chatRooms.find(room => room.id === roomId);
      if (room && room.messages.length > 0) {
        const lastMessage = room.messages[room.messages.length - 1];
        callback(lastMessage);
      }
    }, 5000);

    // Retorna uma função para "desconectar" o socket
    return () => clearInterval(interval);
  },

  getChatNotifications: async (): Promise<ChatNotification[]> => {
    await delay(300);
    // This is mock data. In a real application, you would fetch this from your backend.
    return [
      {
        id: 'room_1',
        itemId: 1,
        itemTitle: 'Sofá de Couro Vintage',
        lastMessage: 'Olá, o sofá ainda está disponível?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        unreadCount: 2,
      },
      {
        id: 'room_2',
        itemId: 2,
        itemTitle: 'Mesa de Jantar',
        lastMessage: 'Posso buscar amanhã às 14h?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        unreadCount: 0,
      },
    ];
  },
};

