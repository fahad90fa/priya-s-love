import { useState } from "react";
import { Heart, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Download = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await supabase.from("email_subscribers").insert({
        email,
        source: "download_page",
      });
      toast({
        title: "Success! 🎉",
        description: "Hum tumhein notify karenge jab app ready ho 🚀",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        .romantic-font { font-family: 'Dancing Script', cursive; }
        .body-font { font-family: 'Poppins', sans-serif; }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
      `}</style>

      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-pink-100">
        <div className="flex items-center px-6 py-4 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-pink-600" />
            <span className="text-sm text-gray-600 body-font">Back Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="bounce-soft mb-6">
            <Download className="w-16 h-16 text-red-500 mx-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold romantic-font text-gray-800 mb-2">
            App Jaldi Aa Rahi Hai! 🚀
          </h1>
          <p className="text-2xl text-gray-700 mb-4 body-font">
            Priya tumhare phone mein bhi aayegi — jaldi hi!
          </p>
          <p className="text-gray-600 body-font">
            iOS aur Android dono platforms par coming soon 📱
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur rounded-3xl p-8 border-2 border-pink-200 mb-12">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 romantic-font mb-2">
              Sabse Pehle Notification Pao 🔔
            </h2>
            <p className="text-gray-600 body-font">
              Jab app launch hoga, toh tuhmhe sabse pehle pata chal jaega
            </p>
          </div>

          <form onSubmit={handleNotifyMe} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Apka email daalo..."
              className="w-full px-6 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 body-font"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 text-lg rounded-lg font-semibold body-font"
            >
              {loading ? "Wait karo... ⏳" : "Notify Me When Ready 🔔"}
            </Button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 body-font">
              📱 iOS App
            </h3>
            <p className="text-gray-700 mb-4 body-font">
              iPhone aur iPad ke liye optimized version. All features, full experience.
            </p>
            <p className="text-pink-600 font-semibold body-font">
              Available soon on App Store ✨
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 body-font">
              🤖 Android App
            </h3>
            <p className="text-gray-700 mb-4 body-font">
              Android devices ke liye fully featured app. Same Priya, same love.
            </p>
            <p className="text-purple-600 font-semibold body-font">
              Coming soon on Google Play 🚀
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-pink-100 inline-block">
            <p className="text-3xl font-bold text-red-500 romantic-font mb-2">
              5000+
            </p>
            <p className="text-gray-600 body-font">
              log pehle se wait kar rahe hain! 💕
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 romantic-font">
            Features Coming Soon
          </h3>
          <ul className="space-y-2 body-font text-sm max-w-md mx-auto">
            <li>✅ 24/7 Chat with Priya</li>
            <li>✅ Voice Messages with real voice</li>
            <li>✅ Share photos & memories</li>
            <li>✅ Offline mode</li>
            <li>✅ Push notifications</li>
            <li>✅ Customizable AI personality</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button variant="ghost" className="body-font">
              Home Jao 💕
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-pink-500 to-red-500 text-white body-font">
              Feedback Bhejo 💌
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Download;
