"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { signInPayloadType } from "./types";
import { httpRequest } from "@/config/axios/axios";
import { setTokenInCookies } from "@/lib/token";
import { deleteCookie } from "@/lib/cookie";
  
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
console.log(user);

 
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

export const handleLogin = async (loginPayload: signInPayloadType) => {
  try {
    const res = await httpRequest.post("/auth/login", loginPayload);
    console.log(res.data);

    const { accessToken, refreshToken, sessionToken, user, message } = res.data.data;

    await setTokenInCookies("accessToken", accessToken, 60 * 60);
    await setTokenInCookies("better-auth.session_token", sessionToken, 60 * 60);
    await setTokenInCookies("refreshToken", refreshToken, 120 * 60);
    //  redirect("/dashboard")
    return {
      success: true,
      message: message,
      user
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.response.data.message || error.message || "Failed to Login"
    }
  }
}
export const handleLogout = async () => {
  try {
    const cookieStore = await cookies()
    const res = await httpRequest.get("/auth/logout", {
      headers: {
        "cookie": cookieStore.toString()
      }
    });
    if (res.data.success) {
      await deleteCookie("accessToken")
      await deleteCookie("refreshToken")
      await deleteCookie("better-auth.session_token")

      return {
        success: true,
        message: res.data.message,

      }
    }
  } catch (error: any) {
    // console.log(error.response);
    return {
      success: false,
      message: error.response.data.message || error.message || "Failed to Login"
    }

  }
}
