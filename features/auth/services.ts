"use server"
import { cookies } from "next/headers";
  
export const getProfile = async ()=>{
 
   const cookieStore = cookies();
    const token =(await cookieStore).get("token")
    try {
        const res = await fetch(`${process.env.API_URL}/api/auth/me`,{
            credentials:"include",
            headers:{
                "Authorization":`Bearer ${token?.value}`
            },
            cache:"no-cache"

        });
        const data = await res.json();
        return {user:data}
    } catch (error) {
        return {user:null}
        
    }
}
export const logoutUser = async ()=>{
  
   const cookieStore = cookies();
    const token =(await cookieStore).get("token")
    try {
        await fetch(`${process.env.API_URL}/api/auth/logout`,{
            credentials:"include",
            headers:{
                "Authorization":`Bearer ${token?.value}`
            },
            method:"POST"
        });
        return {success:true}
    } catch (error) {
        return {error:true}
        
    }
}

