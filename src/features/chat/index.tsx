import { useState } from "react";
import ChatList from "./components/chat";
import EmptyChatPane from "./components/EmptyChat";
import DoctorChat from "./components/ChatMessages";
import useGetMessages from "./hooks/useGetMessages";
import useGetConversation from "./hooks/getConversation";
import type { Conversation } from "./types";

export default function ChatScreen() {
  const [selectedId, setSelectedId] = useState<string | boolean>(false);
  const { data: conversations } = useGetConversation();

  const conversationId = typeof selectedId === "string" ? selectedId : "";
  const { data: getMessage } = useGetMessages(conversationId);

  const selectedConversation = conversations?.find(
    (c: Conversation) => c.id === selectedId
  );

  return (
    <div className="w-full py-2 sm:py-4">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-[calc(100vh-120px)] min-h-[500px] w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
          {/* Conversation List: full width on mobile if no chat selected; sidebar on md+ */}
          <div
            className={`h-full ${
              selectedId ? "hidden md:flex" : "flex w-full"
            } md:w-80 lg:w-96 md:shrink-0 md:border-r`}
          >
            <ChatList
              setChatUser={(id) => setSelectedId(id)}
              conversations={conversations}
              selectedId={typeof selectedId === "string" ? selectedId : undefined}
            />
          </div>

          {/* Chat Messages / Empty State: full width on mobile if chat selected; flex-1 on md+ */}
          <div
            className={`h-full ${
              selectedId ? "flex w-full flex-1" : "hidden md:flex flex-1"
            } min-w-0 flex-col`}
          >
            {selectedId ? (
              <DoctorChat
                onBack={() => setSelectedId(false)}
                doctorName={selectedConversation?.other_user?.name || "Dr. Robert Lewis"}
                doctorImage={selectedConversation?.other_user?.profile_image}
                {...getMessage}
              />
            ) : (
              <EmptyChatPane />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}