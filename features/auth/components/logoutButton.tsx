import { Loader, LogOut } from "lucide-react";
import { useState } from "react";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "/sign-in";
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full cursor-pointer h-full"
    >
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <LogOut className="mr-3 h-4 w-4" />
      )}
      <span className="font-bold ml-2">Logout</span>
    </button>
  );
};

export default LogoutButton;
