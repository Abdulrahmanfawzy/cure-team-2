import { MessageCircle } from "lucide-react";

export default function EmptyChatPane() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 bg-background px-6">
      <MessageCircle className="mb-2 h-10 w-10 text-muted-foreground/40" strokeWidth={1.5} />
      <p className="text-lg font-medium text-foreground">Start your chat</p>
      <p className="text-sm text-muted-foreground">
        Stay in touch with your doctor for easier follow-up
      </p>
    </div>
  );
}