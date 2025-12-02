import { useRef, useEffect } from "react";
import ChatMessage, { Message } from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface ChatContainerProps {
  messages: Message[];
  isTyping?: boolean;
}

const ChatContainer = ({ messages, isTyping = false }: ChatContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const shouldShowAvatar = (index: number) => {
    if (messages[index].role === "user") return false;
    if (index === messages.length - 1) return true;
    return messages[index + 1].role !== "assistant";
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-romantic flex items-center justify-center shadow-glow">
              <span className="text-4xl">💕</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Chat with <span className="font-romantic text-2xl text-gradient">Priya</span>
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Hiii jaanu! 💕 I've been waiting for you. Kaise ho? Miss kar rahi thi tumhe...
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            showAvatar={shouldShowAvatar(index)}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
