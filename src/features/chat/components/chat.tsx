import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { conversations } from "../constants/DoctortConversation";
import ConversationRow from "./conversation";



export default function ChatList() {
  return (
    <div className="flex h-full w-full max-w-sm flex-col border-r bg-background">
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <h2 className="text-lg font-semibold text-foreground">Chat</h2>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Filter chats"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for chat, doctor"
            className="rounded-full border-0 bg-muted/70 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1"
          />
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {conversations.map((conversation) => (
          <ConversationRow key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}


