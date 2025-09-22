import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { clearSession, getAccessToken, getUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If your backend reads token from header (optional)
          Authorization: `Bearer ${getAccessToken() ?? ""}`,
        },
        credentials: "include",
      });
    } catch (_) {
      // ignore network error here; we still clear local session
    } finally {
      clearSession();
      toast({ title: "Signed out", description: "You have been logged out." });
      navigate("/signin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          {user ? `Logged in as ${user.email}` : "Session active"}
        </p>
        <Button className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
