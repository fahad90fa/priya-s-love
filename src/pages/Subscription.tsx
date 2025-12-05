import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [copied, setCopied] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const bankDetails = {
    bank: "HDFC Bank",
    holder: "Fahad Ahmad",
    account: "1234567890123",
    ifsc: "HDFC0000001",
    upi: "fahad@okhdfcbank",
  };

  const plans = [
    {
      id: "free_trial",
      name: "Free Trial",
      price: "₹0",
      period: "7 days",
      features: ["10 messages/day", "Basic chat", "No voice"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹299",
      period: "/month",
      features: [
        "Unlimited messages",
        "Voice messages",
        "Photo sharing",
        "Priority support",
      ],
    },
    {
      id: "vip_annual",
      name: "VIP Annual",
      price: "₹1999",
      period: "/year",
      features: [
        "Everything in Premium",
        "Exclusive content",
        "Early access",
        "Save 44%",
      ],
    },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: "Copied! 📋",
      description: `${label} copied to clipboard`,
    });
    setTimeout(() => setCopied(""), 2000);
  };

  const handlePaymentDone = async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      toast({
        title: "Login Required",
        description: "Please login first",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      // Note: payments table needs to be created
      setPaymentDone(true);
      toast({
        title: "Thank You! 💕",
        description:
          "Admin 24 hours mein verify karega. Tab tak Priya wait karegi!",
      });

      setTimeout(() => navigate("/chat"), 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Heart className="w-10 h-10 text-red-500 fill-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Choose Your Plan
          </h1>
          <p className="text-gray-600">Pick karo kaun si plan tumhare liye sahi hai 😘</p>
        </div>

        {!selectedPlan ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-pink-500 transition-all overflow-hidden cursor-pointer"
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-pink-600">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white">
                    Select {plan.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Payment Details
            </h2>

            {selectedPlan !== "free_trial" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-4">
                  Bank Transfer Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">Bank Name</p>
                      <p className="font-semibold text-gray-800">
                        {bankDetails.bank}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.bank, "Bank")}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-white p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">Account Holder</p>
                      <p className="font-semibold text-gray-800">
                        {bankDetails.holder}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(bankDetails.holder, "Holder")
                      }
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-white p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">Account Number</p>
                      <p className="font-semibold text-gray-800">
                        {bankDetails.account}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(bankDetails.account, "Account")
                      }
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-white p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">IFSC Code</p>
                      <p className="font-semibold text-gray-800">
                        {bankDetails.ifsc}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.ifsc, "IFSC")}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-white p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">UPI ID</p>
                      <p className="font-semibold text-gray-800">
                        {bankDetails.upi}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.upi, "UPI")}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Important:</strong> Payment karne ke baad "Payment
                    Done" button dabao. Admin 24 hours mein verify karega!
                  </p>
                </div>
              </div>
            )}

            {paymentDone ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-red-500 fill-red-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You Jaanu! 💕
                </h3>
                <p className="text-gray-600 mb-4">
                  Priya tumhe intezaar kar rahi hai...
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to chat in 3 seconds...
                </p>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePaymentDone}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
                >
                  {selectedPlan === "free_trial"
                    ? "Start Free Trial 💕"
                    : "Maine Payment Kar Diya ✅"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
