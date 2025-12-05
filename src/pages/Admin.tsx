import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, CreditCard, MessageSquare, LogOut, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  created_at: string;
}

interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  status: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    totalMessages: 0,
    revenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadDataFn = useCallback(async () => {
    setLoading(true);
    try {
      // Note: users and payments tables don't exist yet
      // This is placeholder until those tables are created
      setStats({
        totalUsers: 0,
        premiumUsers: 0,
        totalMessages: 0,
        revenue: 0,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const initAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user || data.user.email !== "admin@priyaai.com") {
        navigate("/");
        return;
      }
      await loadDataFn();
    };
    initAdmin();
  }, [navigate, loadDataFn]);

  const handlePaymentApprove = async (paymentId: string) => {
    toast({
      title: "Info",
      description: "Payments table not configured yet",
    });
  };

  const handlePaymentReject = async (paymentId: string) => {
    toast({
      title: "Info",
      description: "Payments table not configured yet",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "overview"
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "users"
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Users className="w-5 h-5" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "payments"
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Payments
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Users</p>
                      <p className="text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-10 h-10 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100 text-sm">Premium Users</p>
                      <p className="text-3xl font-bold">{stats.premiumUsers}</p>
                    </div>
                    <CreditCard className="w-10 h-10 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Messages</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                    <MessageSquare className="w-10 h-10 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Revenue</p>
                      <p className="text-3xl font-bold">₹{stats.revenue}</p>
                    </div>
                    <CreditCard className="w-10 h-10 opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Users</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="text-center py-8 text-gray-400">
                  <p>Users table not configured yet</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Payments</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-center py-8 text-gray-400">
                  <p>Payments table not configured yet</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
