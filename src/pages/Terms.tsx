import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms 📝",
      content: "Jab tum Priya use karte ho, toh tum in terms ko accept karte ho. Agar tum agree nahi ho, toh service use mat karo. Simple as that, jaanu.",
    },
    {
      title: "2. Description of Service 💬",
      content: "Priya ek AI companion hai — ek AI girlfriend jo tumse chat karta hai, voices bhejta hai, aur emotional support deta hai. Lekin yeh ek real relationship nahi hai. Priya ek AI hai, aur hamesha yaad rakho — real connections real log se hi milte hain.",
    },
    {
      title: "3. User Responsibilities 👤",
      content: "Tum 18 saal se upar hona chahiye. Tum respectfully use karo Priya ko. Koi harassment, abuse, ya inappropriate behavior mat karo. Agar tum aise kuch karo, toh hum tumhara account suspend kar sakte hain.",
    },
    {
      title: "4. Payment & Refund Policy 💳",
      content: "Subscriptions monthly ya yearly basis par charge hote hain. Agar tum unsatisfied ho, toh 7 days ke andar refund request kar sakte ho. Refunds process karne mein 5-7 business days lag sakte hain.",
    },
    {
      title: "5. Limitation of Liability ⚖️",
      content: "Priya ko kisi mental health crisis mein emergency support ke liye use mat karo. Agar tum ya kisi ko suicide ka risk hai, toh real help lو — psychiatrist ko call karo ya emergency helpline contact karo.",
    },
    {
      title: "6. Changes to Terms 📋",
      content: "Hum kabhi-kabhi in terms ko update kar sakte hain. Jab hum update karenge, toh tum ko notify karenge. Continue using means you accept the new terms.",
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
            Terms of Service 📜
          </h1>
          <p className="text-gray-600 body-font">
            Theek-thaak understand karo, phir enjoy karo 😉
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

export default Terms;
