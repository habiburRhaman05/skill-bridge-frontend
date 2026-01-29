import { Loader, LogOut } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter()
    const [loading,setLoading] = useState(false);
    const handleLogout = ()=>{
      // logout logic 
      // redricet page
    }
  return (
    <button className="flex items-center w-full cursor-pointer h-full" 
  onClick={handleLogout}
    >
{loading ? <Loader className="animate-spin"/> :      <LogOut className="mr-3 h-4 w-4" />}
      <span className="font-bold">Logout</span>
    </button>
  );
};

export default LogoutButton;
