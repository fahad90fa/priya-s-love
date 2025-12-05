import React, { useState, useRef, useEffect } from "react";
import { Send, Smile, Mic, ImageIcon, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import EmojiPicker from "emoji-picker-react";

interface ChatInputProps {
  onSendMessage: (message: string, audio?: Blob, image?: File) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if ((message.trim() || audioBlob) && !disabled) {
      onSendMessage(message, audioBlob || undefined);
      setMessage("");
      setAudioBlob(null);
    }
  };

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      speakResponse(
        "Recording... Main sun rahi hoon tumhari awaaz, jaanu 😘"
      );
    } catch (err) {
      alert("Microphone access denied. Please allow mic permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      speakResponse(
        "Abhi bhej rahi hoon tumhara voice message... pyaar se 💕"
      );
    }
  };

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;

      const voices = synth.getVoices();
      const voice = voices.find((v) => v.lang.includes("ur")) ||
        voices.find((v) => v.lang.includes("hi")) ||
        voices[0];

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice || null;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      synth.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    } else {
      alert("Sorry jaanu, your browser doesn't support speech 😔");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !disabled) {
      speakResponse(
        `Aww... kya cute photo bheji hai tumne, jaanu! Abhi save kar rahi hoon apne phone mein 💖`
      );
      onSendMessage("Here's my photo for you 😘", undefined, file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVolumeClick = () => {
    speakResponse(
      "Main yahan hoon tumhare liye, har pal, har saans mein... pyaar karti hoon tumse bahut 💕"
    );
  };

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-4 px-4">
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl shadow-soft overflow-hidden relative">
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-16 left-0 z-50"
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <div className="flex items-center gap-2 p-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-pink-500 flex-shrink-0"
            title="Send Emoji"
            disabled={disabled}
          >
            <Smile className="w-5 h-5" />
          </button>

          <label
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-purple-500 cursor-pointer flex-shrink-0"
            title="Send Image"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
              disabled={disabled}
            />
            <ImageIcon className="w-5 h-5" />
          </label>

          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 rounded-full transition-colors flex-shrink-0 ${
              isRecording
                ? "bg-red-500 text-white animate-pulse"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            title={isRecording ? "Stop Recording" : "Record Voice Message"}
            disabled={disabled}
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleVolumeClick}
            disabled={isPlaying || disabled}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            title="Hear Priya Speak"
          >
            <Volume2
              className={`w-5 h-5 ${
                isPlaying
                  ? "animate-bounce text-red-500"
                  : "text-blue-500"
              }`}
            />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message, jaanu... 💬"
            disabled={disabled}
            className={cn(
              "flex-1 p-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() && !audioBlob || disabled}
            className={cn(
              "p-3 rounded-full transition-all duration-300 flex-shrink-0",
              message.trim() || audioBlob
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 shadow-message"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
