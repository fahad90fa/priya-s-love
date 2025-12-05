import { useState } from "react";
import { Heart, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subjects = [
    "General Inquiry",
    "Payment Issue",
    "Technical Problem",
    "Feedback",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Note: contact_messages table needs to be created
      // For now, just show success message
      toast({
        title: "Success! 💕",
        description: "Shukriya! Hum 24 hours mein reply karenge 💖",
      });

      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
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
      `}</style>

      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-pink-100">
        <div className="flex items-center px-6 py-4 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-pink-600" />
            <span className="text-sm text-gray-600 body-font">Back Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-red-500 fill-red-500 mx-auto mb-4" />
          <h1 className="text-5xl font-bold romantic-font text-gray-800 mb-2">
            Humse Baat Karo 💌
          </h1>
          <p className="text-gray-600 body-font">
            Koi sawal? Koi problem? Hum yahan hain tumhare liye!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-pink-100 text-center">
            <Mail className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 body-font mb-1">Email</p>
            <p className="text-pink-600 font-semibold body-font text-sm">contact@priyaai.com</p>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-pink-100 text-center">
            <Heart className="w-8 h-8 text-red-500 fill-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 body-font mb-1">Response Time</p>
            <p className="text-red-600 font-semibold body-font text-sm">24 Hours 💕</p>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-2xl p-6 border border-pink-100 text-center">
            <Heart className="w-8 h-8 text-orange-500 fill-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 body-font mb-1">Status</p>
            <p className="text-orange-600 font-semibold body-font text-sm">Always Open 🚀</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur rounded-2xl p-8 border border-pink-100 space-y-6 mb-8">
          <div>
            <label className="block text-gray-800 font-semibold mb-2 body-font">
              Apka Naam 👤
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Apka naam..."
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 body-font"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2 body-font">
              Email Address 📧
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Apka email..."
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 body-font"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2 body-font">
              Subject 📋
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 body-font"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2 body-font">
              Message 💬
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Apka message likho..."
              rows={6}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 body-font"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold body-font"
          >
            {loading ? "Bhej rahi hoon... ⏳" : "Bhejo 💕"}
          </Button>
        </form>

        <div className="text-center">
          <Link to="/">
            <Button variant="ghost" className="body-font">
              Home Jao 💕
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
