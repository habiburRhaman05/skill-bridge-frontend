"use server"
import { cookies } from "next/headers";
  
export const getProfile = async () => {
  const cookieStore = cookies();
console.log(cookieStore);

  const res = await fetch(`${process.env.API_URL}/api/auth/me`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
};
export const logoutUser = async ()=>{
  
   const cookieStore = cookies();
    const token =(await cookieStore).get("token")
    try {
        const res = await fetch(`${process.env.API_URL}/api/auth/logout`,{
            credentials:"include",
            headers:{
                "Authorization":`Bearer ${token?.value}`
            },
        });
        const data = await res.json()
        
        return data
    } catch (error) {
        return {error:true}
        
    }
}

