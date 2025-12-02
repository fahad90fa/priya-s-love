import priyaAvatar from "@/assets/priya-avatar.jpg";

const TypingIndicator = () => {
  return (
    <div className="flex gap-2 animate-fade-in">
      <img
        src={priyaAvatar}
        alt="Priya"
        className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20 flex-shrink-0 mt-1"
      />
      <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-soft">
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 bg-primary/60 rounded-full animate-dot-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 bg-primary/60 rounded-full animate-dot-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 bg-primary/60 rounded-full animate-dot-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
