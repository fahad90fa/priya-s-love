import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireConfig?: boolean;
}

const ProtectedRoute = ({ children, requireConfig = false }: ProtectedRouteProps) => {
  const { isAuthenticated, hasConfig, loading, configLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || configLoading) return;

    if (!isAuthenticated) {
      toast.error("Pehle login karo jaanu! 💕");
      navigate("/login", { replace: true });
      return;
    }

    if (requireConfig && !hasConfig) {
      toast.info("Pehle apni girlfriend banao! 💖");
      navigate("/create", { replace: true });
      return;
    }
  }, [isAuthenticated, hasConfig, loading, configLoading, navigate, requireConfig, location]);

  if (loading || configLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-pink-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireConfig && !hasConfig) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
