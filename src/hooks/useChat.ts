import { useState, useCallback, useEffect } from "react";
import { Message } from "@/components/chat/ChatMessage";
import { supabase } from "@/integrations/supabase/client";
import { GirlfriendConfig } from "@/hooks/useAuth";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

type ChatMessage = { role: "user" | "assistant"; content: string };

async function streamChat({
  messages,
  config,
  onDelta,
  onDone,
  onError,
}: {
  messages: ChatMessage[];
  config?: GirlfriendConfig | null;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, config }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: "Failed to connect" }));
      onError(errorData.error || "Something went wrong");
      return;
    }

    if (!resp.body) {
      onError("No response body");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    onError("Connection failed. Please try again.");
  }
}

export function useChat(config?: GirlfriendConfig | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(
    async (content: string, audio?: Blob, image?: File) => {
      let messageContent = content;

      if (audio) {
        messageContent = "[Voice message received]";
      }
      if (image) {
        messageContent = "[Image sent]";
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        content: messageContent,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Save to conversations table
      await supabase.from("conversations").insert({
        role: "user",
        content: content || messageContent,
      });

      const chatHistory: ChatMessage[] = [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: content || messageContent },
      ];

      let assistantContent = "";

      const upsertAssistant = (chunk: string) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [
            ...prev,
            {
              id: crypto.randomUUID(),
              content: assistantContent,
              role: "assistant" as const,
              timestamp: new Date(),
            },
          ];
        });
      };

      await streamChat({
        messages: chatHistory,
        config,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: async () => {
          setIsTyping(false);
          if (assistantContent) {
            await supabase.from("conversations").insert({
              role: "assistant",
              content: assistantContent,
            });
          }
        },
        onError: (error) => {
          setIsTyping(false);
          const gfName = config?.girlfriend_name || "Priya";
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              content: `Oops jaanu 🥺 ${error}. Try again na?`,
              role: "assistant",
              timestamp: new Date(),
            },
          ]);
        },
      });
    },
    [messages, config]
  );

  return { messages, isTyping, sendMessage };
}
