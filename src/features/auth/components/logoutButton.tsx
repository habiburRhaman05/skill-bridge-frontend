import { httpRequest } from "@/config/axios/axios";
import { useRefetchQueries } from "@/lib/react-query";
import axios from "axios";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
 const {refetchQueries} = useRefetchQueries()
  const router = useRouter()
const handleLogout = async () => {
  try {
    setLoading(true)
    // Call your internal Next.js API route
    await axios.post("/api/logout");
refetchQueries("user-profile")

    
    // Refresh or redirect to home/login
    window.location.href="/sign-in"
    router.refresh(); 
  } catch (error) {
    console.error("Logout failed", error);
    
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
