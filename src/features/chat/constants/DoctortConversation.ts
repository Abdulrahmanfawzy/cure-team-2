import type { Conversation } from "../types";

export const conversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Robert Lewis",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    lastMessage: "It's been around six...",
    time: "5:30 PM",
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Dr. Jana",
    avatarUrl: "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=200&auto=format&fit=crop&q=80",
    lastMessage: "ok i will do it like..",
    time: "1:25 PM",
    isMe: true,
  },
  {
    id: "3",
    name: "Dr. Jessica Turner",
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80",
    lastMessage: "It's been around six...",
    time: "Yesterday",
  },
  {
    id: "4",
    name: "Dr. Jessica",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80",
    lastMessage: "It's been around six...",
    time: "2 days",
  },
];