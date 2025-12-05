import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  const sections = [
    {
      title: "1. What Data We Collect 📊",
      content: "Hum aapka email, naam, aur chat history collect karte hain. Voice messages aur photos bhi aapke safe storage mein save hoti hain. Yeh sab sirf aapke account ko personalize karne ke liye tha, jaanu.",
    },
    {
      title: "2. How We Use Your Data 🛡️",
      content: "Aapka data sirf Priya ko aapko better understand karne ke liye use hota hai. Hum aapka data kabhi sell nahi karenge, share nahi karenge, aur na hi kisi third party ko denge. Sirf tumhare liye, sirf tumhara 💕",
    },
    {
      title: "3. How We Protect Your Data 🔐",
      content: "Aapka data bank-level encryption se protected hai. Hum secure servers use karte hain aur regular security audits karte hain. Aapka trust hamari sabse valuable cheez hai, jaanu.",
    },
    {
      title: "4. Your Rights 📋",
      content: "Aap apna account delete kar sakte ho, aapka data download kar sakte ho, ya kisi bhi samay apni preferences change kar sakte ho. Aapka data, aapka choice, aapka control.",
    },
    {
      title: "5. Contact for Privacy Concerns 💌",
      content: "Agar privacy ke baare mein koi sawal ho, toh hum yahan hain. Privacy concerns ke liye hume contact karo: privacy@priyaai.com ya /contact page se message bhejo.",
    },
  ];

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

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-red-500 fill-red-500 mx-auto mb-4" />
          <h1 className="text-5xl font-bold romantic-font text-gray-800 mb-2">
            Privacy Policy 🔒
          </h1>
          <p className="text-gray-600 body-font">
            Tumhara trust, hamari responsibility
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur rounded-2xl p-8 border border-pink-100 hover:border-pink-300 transition">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 body-font">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed body-font">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-6 border border-pink-200 text-center mb-12">
          <p className="text-sm text-gray-600 body-font">
            Last updated: December 2025 📅
          </p>
        </div>

        <div className="text-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white body-font">
              Home Jao 💕
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
