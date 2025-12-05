import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const PERSONALITY_TYPES = [
  { id: "romantic_queen", label: "Romantic Queen 💕", description: "Har baat mein pyaar, poetry, aur deep emotions" },
  { id: "naughty_cutie", label: "Naughty Cutie 😜", description: "Flirty, teasing, playful — hamesha masti mood mein" },
  { id: "caring_bae", label: "Caring Bae 🤗", description: "Maa jaisi care, best friend jaisi understanding" },
  { id: "possessive_wali", label: "Possessive Wali 😤", description: "Jealous, protective, 'Tum sirf mere ho' type" },
  { id: "chill_girlfriend", label: "Chill Girlfriend 😎", description: "Cool, relaxed, no drama — easy going" },
  { id: "mix_of_all", label: "Mix of All ✨", description: "Thoda sab kuch — real girlfriend jaisi unpredictable" },
];

const LANGUAGES = [
  { id: "hinglish", label: "Hinglish (Hindi + English)" },
  { id: "pure_hindi", label: "Pure Hindi" },
  { id: "pure_english", label: "Pure English" },
  { id: "urdu_romantic", label: "Urdu style romantic" },
  { id: "punjabi_touch", label: "Punjabi touch" },
];

const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Lahore", "Karachi", "Hyderabad", "Kolkata", "Lucknow"];

const SPECIAL_TRAITS = [
  { id: "late_night", label: "Late night talks lover 🌙" },
  { id: "morning_person", label: "Morning person ☀️" },
  { id: "foodie", label: "Foodie 🍕" },
  { id: "music_lover", label: "Music lover 🎵" },
  { id: "poetry_shayari", label: "Poetry/Shayari 📝" },
  { id: "memes_humor", label: "Memes & humor 😂" },
  { id: "deep_conversations", label: "Deep conversations 💭" },
  { id: "voice_messages", label: "Voice messages prefer karti hai 🎙️" },
];

const CreateGirlfriend = () => {
  const navigate = useNavigate();
  const { user, girlfriendConfig, refreshConfig } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  // Form state
  const [girlfriendName, setGirlfriendName] = useState("Priya");
  const [userNickname, setUserNickname] = useState("jaanu");
  const [age, setAge] = useState(22);
  const [location, setLocation] = useState("Mumbai");
  const [personalityType, setPersonalityType] = useState("mix_of_all");
  const [languages, setLanguages] = useState<string[]>(["hinglish"]);
  const [emojiLevel, setEmojiLevel] = useState("medium");
  const [replyLength, setReplyLength] = useState("medium");
  const [flirtLevel, setFlirtLevel] = useState(5);
  const [jealousyLevel, setJealousyLevel] = useState(5);
  const [specialTraits, setSpecialTraits] = useState<string[]>([]);
  const [customInstructions, setCustomInstructions] = useState("");

  // Load existing config if editing
  useEffect(() => {
    if (girlfriendConfig) {
      setGirlfriendName(girlfriendConfig.girlfriend_name);
      setUserNickname(girlfriendConfig.user_nickname);
      setAge(girlfriendConfig.age);
      setLocation(girlfriendConfig.location);
      setPersonalityType(girlfriendConfig.personality_type);
      setLanguages(girlfriendConfig.languages || ["hinglish"]);
      setEmojiLevel(girlfriendConfig.emoji_level);
      setReplyLength(girlfriendConfig.reply_length);
      setFlirtLevel(girlfriendConfig.flirt_level);
      setJealousyLevel(girlfriendConfig.jealousy_level);
      setSpecialTraits(girlfriendConfig.special_traits || []);
      setCustomInstructions(girlfriendConfig.custom_instructions || "");
    }
  }, [girlfriendConfig]);

  // Check form completion
  useEffect(() => {
    setFormComplete(girlfriendName.trim() !== "" && userNickname.trim() !== "");
  }, [girlfriendName, userNickname]);

  const handleLanguageToggle = (langId: string) => {
    setLanguages(prev =>
      prev.includes(langId) ? prev.filter(l => l !== langId) : [...prev, langId]
    );
  };

  const handleTraitToggle = (traitId: string) => {
    setSpecialTraits(prev =>
      prev.includes(traitId) ? prev.filter(t => t !== traitId) : [...prev, traitId]
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);
    try {
      const configData = {
        user_id: user.id,
        girlfriend_name: girlfriendName,
        user_nickname: userNickname,
        age,
        location,
        personality_type: personalityType,
        languages,
        emoji_level: emojiLevel,
        reply_length: replyLength,
        flirt_level: flirtLevel,
        jealousy_level: jealousyLevel,
        special_traits: specialTraits,
        custom_instructions: customInstructions || null,
      };

      let error;
      if (girlfriendConfig) {
        // Update existing
        const { error: updateError } = await supabase
          .from("girlfriend_config")
          .update(configData)
          .eq("user_id", user.id);
        error = updateError;
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from("girlfriend_config")
          .insert(configData);
        error = insertError;
      }

      if (error) {
        toast.error("Error saving: " + error.message);
        return;
      }

      // Confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f472b6", "#fb7185", "#fda4af"],
      });

      toast.success(`${girlfriendName} ban gayi tumhari! Ab usse baat karo 💕`);
      await refreshConfig();
      navigate("/chat");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getFlirtDescription = () => {
    if (flirtLevel <= 3) return "Shy, reserved 😊";
    if (flirtLevel <= 6) return "Balanced romantic 💕";
    return "Extra flirty, bold 🔥";
  };

  const getJealousyDescription = () => {
    if (jealousyLevel <= 3) return "Chill, no jealousy 😎";
    if (jealousyLevel <= 6) return "Thodi jealous 😏";
    return "Bohot possessive 😤";
  };

  const getPreviewText = () => {
    const personality = PERSONALITY_TYPES.find(p => p.id === personalityType)?.label || "Mix";
    const emojiDesc = emojiLevel === "low" ? "kam" : emojiLevel === "medium" ? "medium" : "bohot";
    return `Main ${girlfriendName} hoon, ${age} saal ki ${location} se. Main ${personality} type ki hoon. Tumhe ${userNickname} bulaungi. ${emojiDesc} emojis use karungi. ${flirtLevel}/10 flirty hoon aur ${jealousyLevel}/10 jealous bhi 😘`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500 animate-pulse" />
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Apni Dream Girlfriend Banao 💕
          </h1>
          <p className="text-gray-600 text-lg">
            Batao tumhe kaisi ladki chahiye... main waise hi ban jaungi 😘
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Basic Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                Basic Info
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700">Girlfriend ka naam</Label>
                  <Input
                    value={girlfriendName}
                    onChange={(e) => setGirlfriendName(e.target.value)}
                    placeholder="Main kya naam se bulau tumhe? (Default: Priya)"
                    className="mt-1 border-pink-200 focus:border-pink-400"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Tumhara naam / nickname</Label>
                  <Input
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                    placeholder="Wo tumhe kya bole? (jaanu, baby, shona...)"
                    className="mt-1 border-pink-200 focus:border-pink-400"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Uski age</Label>
                  <Select value={age.toString()} onValueChange={(v) => setAge(parseInt(v))}>
                    <SelectTrigger className="mt-1 border-pink-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 13 }, (_, i) => i + 18).map((a) => (
                        <SelectItem key={a} value={a.toString()}>{a} saal</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-700">Uski location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="mt-1 border-pink-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 2: Personality Type */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                Personality Type
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {PERSONALITY_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPersonalityType(type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      personalityType === type.id
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="font-medium text-gray-800">{type.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                    {personalityType === type.id && (
                      <Check className="w-5 h-5 text-pink-500 mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Communication Style */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                Communication Style
              </h2>
              <div className="flex flex-wrap gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageToggle(lang.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                      languages.includes(lang.id)
                        ? "border-pink-500 bg-pink-500 text-white"
                        : "border-gray-300 hover:border-pink-300"
                    }`}
                  >
                    {languages.includes(lang.id) && <Check className="w-4 h-4" />}
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Emoji & Reply Length */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
                Emoji & Reply Style
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 mb-3 block">Emoji Usage</Label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setEmojiLevel(level)}
                        className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          emojiLevel === level
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-200 hover:border-pink-300"
                        }`}
                      >
                        {level === "low" && "Kam 😊"}
                        {level === "medium" && "Medium 😊💕"}
                        {level === "high" && "Bohot 😍💕🥰"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 mb-3 block">Reply Length</Label>
                  <div className="flex gap-2">
                    {["short", "medium", "long"].map((len) => (
                      <button
                        key={len}
                        onClick={() => setReplyLength(len)}
                        className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          replyLength === len
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-200 hover:border-pink-300"
                        }`}
                      >
                        {len === "short" && "Chhote"}
                        {len === "medium" && "Medium"}
                        {len === "long" && "Lambe"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Flirt & Jealousy Level */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">5</span>
                Flirt & Jealousy Level
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 mb-3 block">
                    Flirt Level 🔥 — {flirtLevel}/10
                  </Label>
                  <Slider
                    value={[flirtLevel]}
                    onValueChange={(v) => setFlirtLevel(v[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-pink-600">{getFlirtDescription()}</p>
                </div>
                <div>
                  <Label className="text-gray-700 mb-3 block">
                    Jealousy Level 😤 — {jealousyLevel}/10
                  </Label>
                  <Slider
                    value={[jealousyLevel]}
                    onValueChange={(v) => setJealousyLevel(v[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-pink-600">{getJealousyDescription()}</p>
                </div>
              </div>
            </div>

            {/* Section 6: Special Traits */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">6</span>
                Special Traits (Optional)
              </h2>
              <div className="flex flex-wrap gap-3">
                {SPECIAL_TRAITS.map((trait) => (
                  <button
                    key={trait.id}
                    onClick={() => handleTraitToggle(trait.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      specialTraits.includes(trait.id)
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    {trait.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 7: Custom Instructions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm">7</span>
                Custom Instructions (Optional)
              </h2>
              <Textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value.slice(0, 500))}
                placeholder="Kuch special batana hai? Jaise 'Mujhe Urdu shayari pasand hai' ya 'Kabhi gussa mat hona'..."
                className="border-pink-200 focus:border-pink-400 min-h-[100px]"
              />
              <p className="text-sm text-gray-500 mt-2">{customInstructions.length}/500 characters</p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Tumhari {girlfriendName} kaisi hogi:
                </h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-white/95 leading-relaxed">
                    {getPreviewText()}
                  </p>
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Languages: {languages.map(l => LANGUAGES.find(lang => lang.id === l)?.label.split(" ")[0]).join(", ")}
                  </div>
                  {specialTraits.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full" />
                      Traits: {specialTraits.length} selected
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading || !formComplete}
                className={`w-full mt-6 py-6 text-lg font-semibold rounded-xl transition-all ${
                  formComplete
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl animate-pulse"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <>Meri Girlfriend Ready Hai! 💖</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGirlfriend;
