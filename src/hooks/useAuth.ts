import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface GirlfriendConfig {
  id: string;
  user_id: string;
  girlfriend_name: string;
  user_nickname: string;
  age: number;
  location: string;
  personality_type: string;
  languages: string[];
  emoji_level: string;
  reply_length: string;
  flirt_level: number;
  jealousy_level: number;
  special_traits: string[];
  custom_instructions: string | null;
  created_at: string;
  updated_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [girlfriendConfig, setGirlfriendConfig] = useState<GirlfriendConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Fetch config after auth state change
        if (session?.user) {
          setTimeout(() => {
            fetchGirlfriendConfig(session.user.id);
          }, 0);
        } else {
          setGirlfriendConfig(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        fetchGirlfriendConfig(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchGirlfriendConfig = async (userId: string) => {
    setConfigLoading(true);
    try {
      const { data, error } = await supabase
        .from("girlfriend_config")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching girlfriend config:", error);
      } else {
        setGirlfriendConfig(data as GirlfriendConfig | null);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setConfigLoading(false);
    }
  };

  const refreshConfig = async () => {
    if (user) {
      await fetchGirlfriendConfig(user.id);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setGirlfriendConfig(null);
  };

  return {
    user,
    session,
    loading,
    girlfriendConfig,
    configLoading,
    refreshConfig,
    signOut,
    isAuthenticated: !!user,
    hasConfig: !!girlfriendConfig,
  };
}
