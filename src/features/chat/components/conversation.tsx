import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Conversation } from "../types";

function ConversationRow({
  conversation,
  isSelected = false,
  onClick,
}: {
  conversation: Conversation;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const { other_user } = conversation;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
        isSelected
          ? "bg-primary/10 hover:bg-primary/15"
          : "hover:bg-muted/60"
      )}
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarImage src={other_user.profile_image} alt={other_user.name} />
        <AvatarFallback>{other_user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {other_user.name}
          </span>
          <span
            className={cn(
              "shrink-0 text-xs",
              conversation.unread_count
                ? "text-emerald-600 font-medium"
                : "text-muted-foreground",
            )}
          >
            {conversation.last_message.created_at}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-sm text-muted-foreground">
            {conversation.last_message.sender.name && (
              <span className="text-muted-foreground/80">you: </span>
            )}
            {conversation.last_message.content}
          </span>
          {conversation.unread_count ? (
            <Badge className="h-5 min-w-5 shrink-0 justify-center rounded-full bg-emerald-500 p-0 px-1.5 text-[11px] leading-none text-white hover:bg-emerald-500">
              {conversation.unread_count}
            </Badge>
          ) : null}
        </div>
      </div>
    </button>
  );
}
export default ConversationRow;
