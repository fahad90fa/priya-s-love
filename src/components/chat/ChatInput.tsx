import { useState, useRef, useEffect } from "react";
import { Send, Smile, Mic, ImageIcon, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-4 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-card border border-border rounded-3xl shadow-soft overflow-hidden"
      >
        <div className="flex items-end gap-2 p-2">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-rose-soft transition-colors text-muted-foreground hover:text-primary flex-shrink-0"
          >
            <Smile className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className={cn(
              "flex-1 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground py-2 px-1 max-h-[120px] text-[15px]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-rose-soft transition-colors text-muted-foreground hover:text-primary"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-rose-soft transition-colors text-muted-foreground hover:text-primary"
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className={cn(
                "p-2.5 rounded-full transition-all duration-300",
                message.trim() && !disabled
                  ? "gradient-romantic text-primary-foreground shadow-message hover:shadow-glow hover:scale-105"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {message.trim() ? (
                <Send className="w-5 h-5" />
              ) : (
                <Heart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-2">
        Made with <Heart className="w-3 h-3 inline text-primary fill-primary" /> by Priya
      </p>
    </div>
  );
};

export default ChatInput;
