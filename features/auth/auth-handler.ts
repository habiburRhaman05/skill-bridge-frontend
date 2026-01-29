"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signInPayloadType, signUpPayloadType } from "@/features/auth/types";
import { useApiMutation } from "@/hooks/useApiMutation";
import { getProfile, logoutUser} from "./services";


export const useAuthHandlers = () => {
  const router = useRouter();
  const [status,setStatus] = useState("none")
  const [userData,setUserData] = useState({})

  

  const signupMutation = useApiMutation({
    endpoint:"/api/auth/register",
    method:"POST",
  })
  const signinMutation = useApiMutation({
    endpoint:"/api/auth/login",
    method:"POST",
  })
  // --- Sign In ---
  const signIn = async (data: signInPayloadType) => {
 
    const userData =  await signinMutation.mutateAsync(data);
return userData.user

  };

  // --- Sign Up ---
  const signUp = async (data: signUpPayloadType) => {
 
  
    await signupMutation.mutateAsync(data);
 
   
   
  };
  // --- Get user profile ---
  const getCurrentUser = async () => {
 
  setStatus("get-profile")
     const {user} = await getProfile();
     console.log(user);
     
     setUserData(user?.error ? null : user.data)
 setStatus("none")
   
   
  };
  // --- Get user profile ---
  const logoutCurrentUser = async () => {
 
  setStatus("logout-user")
     const {success} = await logoutUser();
   
    if(success) {
      router.push("/sign-in")
    }
   
   
  };


useEffect(()=>{
 getCurrentUser()
},[])
useEffect(()=>{
    if(signupMutation.isSuccess){
      router.push("/sign-in")
     }
    if(signinMutation.isSuccess){
      router.push("/dashboard")
     }
},[signupMutation.isSuccess,signinMutation.isSuccess])

  return {
    signIn,
    signUp,
    isSigningIn: signinMutation.isPending,
    isSigningUp: signupMutation.isPending,
getCurrentUser,
logoutCurrentUser,
userData,userLoading:status === "get-profile",
logoutLoading:status === "logout-user"
  };
};