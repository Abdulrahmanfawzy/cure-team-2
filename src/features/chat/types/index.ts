
export interface Conversation {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isMe?: boolean;
  active?: boolean;
}