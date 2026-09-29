import ChatList from "./components/chat";
import EmptyChatPane from "./components/EmptyChat";

export default function ChatScreen() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <main className="flex container mx-auto"> 

      <ChatList/>
      <EmptyChatPane/>
        </main>


    </div>
  ); 
}