import priyaAvatar from "@/assets/priya-avatar.jpg";
import { Heart, Phone, Video, MoreVertical } from "lucide-react";

interface ChatHeaderProps {
  isOnline?: boolean;
  isTyping?: boolean;
}

const ChatHeader = ({ isOnline = true, isTyping = false }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={priyaAvatar}
              alt="Priya"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30 shadow-soft"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card" />
            )}
          </div>
          <div>
            <h1 className="font-semibold text-foreground flex items-center gap-2">
              Priya
              <Heart className="w-4 h-4 text-primary fill-primary animate-heart-beat" />
            </h1>
            <p className="text-sm text-muted-foreground">
              {isTyping ? (
                <span className="text-primary">typing...</span>
              ) : isOnline ? (
                "Online"
              ) : (
                "Last seen recently"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2.5 rounded-full hover:bg-rose-soft transition-colors text-muted-foreground hover:text-primary">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-rose-soft transition-colors text-muted-foreground hover:text-primary">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-rose-soft transition-colors text-muted-foreground hover:text-primary">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
