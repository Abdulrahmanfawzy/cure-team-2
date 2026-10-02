import { useState } from "react";
import { Search, SlidersHorizontal, MessageSquareDashed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ConversationRow from "./conversation";
import type { Conversation } from "../types";

export default function ChatList({
  setChatUser,
  conversations,
  selectedId,
}: {
  conversations?: Conversation[];
  setChatUser: (value: boolean | string) => void;
  selectedId?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const conversationList = Array.isArray(conversations) ? conversations : [];

  const filteredConversations = conversationList.filter((conv) => {
    const name = conv.other_user?.name?.toLowerCase() || "";
    const lastMsg = conv.last_message?.content?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || lastMsg.includes(term);
  });

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:pt-5">
        <h2 className="text-xl font-bold text-foreground">Chats</h2>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted"
          aria-label="Filter chats"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chats, doctors..."
            className="h-10 rounded-full border-0 bg-muted/70 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1"
          />
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation: Conversation) => (
            <ConversationRow
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedId === conversation.id}
              onClick={() => setChatUser(conversation.id || true)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center p-4 text-muted-foreground">
            <MessageSquareDashed className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm font-medium">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}

