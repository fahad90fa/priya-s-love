import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";
import ChatInput from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { girlfriendConfig, isAuthenticated, hasConfig, loading } = useAuth();
  const { messages, isTyping, sendMessage } = useChat(girlfriendConfig);
  const navigate = useNavigate();

  // Get girlfriend name from config
  const girlfriendName = girlfriendConfig?.girlfriend_name || "Priya";

  return (
    <div className="flex flex-col h-screen bg-background gradient-soft">
      <ChatHeader 
        isOnline={true} 
        isTyping={isTyping} 
        girlfriendName={girlfriendName}
        onSettingsClick={() => navigate("/create")}
      />
      <ChatContainer messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
    </div>
  );
};

export default Index;
