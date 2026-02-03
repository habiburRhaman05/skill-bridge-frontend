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
