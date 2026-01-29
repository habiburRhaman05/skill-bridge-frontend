"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signInPayloadType, signUpPayloadType } from "@/features/auth/types";
import { useApiMutation } from "@/hooks/useApiMutation";


export const useAuthHandlers = () => {
  const router = useRouter();

  

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
    isSigningIn: false,
    isSigningUp: signupMutation.isPending,

  };
};