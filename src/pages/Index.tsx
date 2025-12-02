import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";
import ChatInput from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, isTyping, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen bg-background gradient-soft">
      <ChatHeader isOnline={true} isTyping={isTyping} />
      <ChatContainer messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
    </div>
  );
};

export default Index;
