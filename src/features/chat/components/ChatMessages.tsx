import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Video,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import useGetMessages from "../hooks/useGetMessages";

type Message = {
  id: number;
  text: string;
  sender: "me" | "doctor";
  unread?: boolean;
};

const staticMessages: Message[] = [
  {
    id: 1,
    text: "Hi seif it's been a while",
    sender: "doctor",
  },
  {
    id: 2,
    text: "Hi doctor that right",
    sender: "me",
  },
  {
    id: 3,
    text: "i was okey,\nbut now i suffer form issues",
    sender: "me",
  },
  {
    id: 4,
    text: "I feel bad",
    sender: "doctor",
    unread: true,
  },
  {
    id: 5,
    text: "What about you visit me",
    sender: "doctor",
    unread: true,
  },
  {
    id: 6,
    text: "i free tomorrow,\nIt's been around six PM",
    sender: "doctor",
    unread: true,
  },
];

type ChatProps = {
  onBack?: () => void;
  doctorName?: string;
  doctorImage?: string;
  isOnline?: boolean;
};

export default function Chat({
  onBack,
  doctorName = "Dr. Robert Lewis",
  doctorImage = "https://i.pravatar.cc/150?img=12",
  isOnline = true,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(staticMessages);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const { data: Message } = useGetMessages();

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* ================= HEADER ================= */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-3 sm:px-5">
        {/* Doctor Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground md:hidden"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <div className="relative shrink-0">
            <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
              <AvatarImage
                src={doctorImage}
                alt={doctorName}
              />
              <AvatarFallback>
                {doctorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm sm:text-base font-semibold text-foreground">
              {doctorName}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3 text-muted-foreground">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-muted hover:text-primary"
            aria-label="Video Call"
          >
            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-muted hover:text-primary"
            aria-label="Voice Call"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-muted hover:text-foreground"
            aria-label="More options"
          >
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* ================= MESSAGES ================= */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5">
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => {
            const showUnread =
              message.unread &&
              !messages[index - 1]?.unread;

            return (
              <div key={message.id}>
                {/* Unread Divider */}
                {showUnread && (
                  <div className="my-3 -mx-3 sm:-mx-5 flex h-8 items-center justify-center bg-muted/60">
                    <span className="text-xs font-medium text-muted-foreground">
                      Unread messages
                    </span>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`flex ${
                    message.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[500px] break-words whitespace-pre-line px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      message.sender === "me"
                        ? "rounded-2xl rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-2xl rounded-tl-sm bg-muted text-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= INPUT ================= */}
      <div className="shrink-0 border-t bg-background p-3 sm:p-4">
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-muted/70 px-2 py-1.5 focus-within:ring-1 focus-within:ring-ring">
          {/* Input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="h-9 sm:h-10 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
          />

          {/* Attachment */}
          <button
            type="button"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-background hover:text-primary"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Camera */}
          <button
            type="button"
            className="hidden xs:flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-background hover:text-primary"
            aria-label="Take picture"
          >
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Send / Mic */}
          <button
            type="button"
            onClick={handleSendMessage}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90"
            aria-label={input.trim() ? "Send message" : "Voice note"}
          >
            {input.trim() ? (
              <Send className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}