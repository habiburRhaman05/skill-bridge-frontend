"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
  
export const getProfile = async ():Promise<{user:{data:any},cookies:string} | null> => {
 const cookieStore = await cookies();
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
export const updateAvatar = async (formData: FormData) => {
  try {
  
    const cookieString = await getCookies();

    const response = await fetch(`${process.env.API_URL}/api/auth/profile/change-avater`, {
      method: "PUT",
      headers: {
        cookie: cookieString,
      },
      body: formData,
    });

    const result = await response.json();
    revalidatePath("/tutor/dashboard/profile");
    revalidatePath("/dashboard/profile");
    return result;
  } catch (error) {
    console.error("updateTutorAvatar error:", error);
    return { error: "Failed to update avatar" };
  }
};