"use client";

import { AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Loader2 } from "lucide-react";


const UserLists = () => {
 
  const {data:user,isLoading} = useApiQuery<{
    data:any
  }>(["fetch-users"],"/api/admin/users")

  
if(isLoading){
  return <tr className="w-full p-10 flex items-center justify-center">
   Loading...
  </tr>
}

  return (
    <AnimatePresence mode="popLayout">
                {user?.data?.map((user:any) => (
         <UserCard user={user} key={user.id}/>
                ))}
              </AnimatePresence>
  )
}

export default UserLists 