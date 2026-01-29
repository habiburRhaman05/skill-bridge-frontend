import { Loader, LogOut } from "lucide-react";

import { useAuthHandlers } from "../auth-handler";

const LogoutButton = () => {
   
  const {logoutCurrentUser,logoutLoading} = useAuthHandlers()
   
    const handleLogout = async()=>{
      await logoutCurrentUser()
    }
  return (
    <button className="flex items-center w-full cursor-pointer h-full" 
  onClick={handleLogout}
    >
{logoutLoading ? <Loader className="animate-spin"/> :      <LogOut className="mr-3 h-4 w-4" />}
      <span className="font-bold">Logout</span>
    </button>
  );
};

export default LogoutButton;
