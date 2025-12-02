import { cn } from "@/lib/utils";
import priyaAvatar from "@/assets/priya-avatar.jpg";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  showAvatar?: boolean;
}

const ChatMessage = ({ message, showAvatar = true }: ChatMessageProps) => {
  const isUser = message.role === "user";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2 animate-message-appear",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isUser && showAvatar && (
        <img
          src={priyaAvatar}
          alt="Priya"
          className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20 flex-shrink-0 mt-1"
        />
      )}
      {!isUser && !showAvatar && <div className="w-8 flex-shrink-0" />}

      <div
        className={cn(
          "max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-soft",
          isUser
            ? "gradient-message text-primary-foreground rounded-br-md"
            : "bg-card border border-border rounded-bl-md"
        )}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <p
          className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
