import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "../types";




function ConversationRow({ conversation }: { conversation: Conversation }) {
  const { name, avatarUrl, lastMessage, time, unreadCount, isMe } = conversation;

  return (
    <button
      type="button"
      className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/60"
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {name}
          </span>
          <span
            className={cn(
              "shrink-0 text-xs",
              unreadCount ? "text-emerald-600 font-medium" : "text-muted-foreground"
            )}
          >
            {time}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-sm text-muted-foreground">
            {isMe && <span className="text-muted-foreground/80">you: </span>}
            {lastMessage}
          </span>
          {unreadCount ? (
            <Badge className="h-5 min-w-5 shrink-0 justify-center rounded-full bg-emerald-500 p-0 px-1.5 text-[11px] leading-none text-white hover:bg-emerald-500">
              {unreadCount}
            </Badge>
          ) : null}
        </div>
      </div>
    </button>
  );
}
export default ConversationRow;