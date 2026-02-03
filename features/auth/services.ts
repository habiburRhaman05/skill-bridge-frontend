"use server"
import { cookies } from "next/headers";
  
export const getProfile = async ():Promise<{user:{data:any},cookies:string} | null> => {
 const cookieStore = await cookies();

      console.log(cookieStore.toString());
  const res = await fetch(`${process.env.API_URL}/api/auth/me`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
      credentials: "include",
  });

  if (!res.ok) return null;
  const user = await res.json()

 
  return {user,cookies:cookieStore.toString()}
};
export const getCookies = async ():Promise<string> => {
 const cookieStore = await cookies();


 
  return cookieStore.toString()
};
export const logoutUser = async ()=>{
  
 const cookieStore = await cookies();

    try {
        const res = await fetch(`${process.env.API_URL}/api/auth/logout`,{
            credentials:"include",
            headers: {
      cookie: cookieStore.toString(),
    },
        });
        const data = await res.json()
        
        return data
    } catch (error) {
        return {error:true}
        
    }
}
