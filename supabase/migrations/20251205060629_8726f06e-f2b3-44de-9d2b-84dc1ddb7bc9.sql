-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create girlfriend_config table
CREATE TABLE public.girlfriend_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  girlfriend_name TEXT NOT NULL DEFAULT 'Priya',
  user_nickname TEXT NOT NULL DEFAULT 'jaanu',
  age INTEGER NOT NULL DEFAULT 22 CHECK (age >= 18 AND age <= 30),
  location TEXT NOT NULL DEFAULT 'Mumbai',
  personality_type TEXT NOT NULL DEFAULT 'mix_of_all',
  languages JSONB NOT NULL DEFAULT '["hinglish"]'::jsonb,
  emoji_level TEXT NOT NULL DEFAULT 'medium',
  reply_length TEXT NOT NULL DEFAULT 'medium',
  flirt_level INTEGER NOT NULL DEFAULT 5 CHECK (flirt_level >= 1 AND flirt_level <= 10),
  jealousy_level INTEGER NOT NULL DEFAULT 5 CHECK (jealousy_level >= 1 AND jealousy_level <= 10),
  special_traits JSONB DEFAULT '[]'::jsonb,
  custom_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.girlfriend_config ENABLE ROW LEVEL SECURITY;

-- Users can only see their own config
CREATE POLICY "Users can view own config"
ON public.girlfriend_config
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own config
CREATE POLICY "Users can insert own config"
ON public.girlfriend_config
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own config
CREATE POLICY "Users can update own config"
ON public.girlfriend_config
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own config
CREATE POLICY "Users can delete own config"
ON public.girlfriend_config
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_girlfriend_config_updated_at
BEFORE UPDATE ON public.girlfriend_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();