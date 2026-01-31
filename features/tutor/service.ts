"use server"

import { revalidatePath } from "next/cache";
import { getToken } from "../student-dashboard/services";
import { cookies } from "next/headers";
import {  addAvailabilityPayload, updateTutorProfilePayload } from "./types";



export const tutorOnboardingHandler = async (paylaod:unknown)=>{

           const token = await getToken()
        if (!token) return null;
    const response = await fetch(`${process.env.API_URL}/api/tutor/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paylaod),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update password");
  return result;

}

 export  async function  updateTutorProfile (formData:updateTutorProfilePayload){
   try {
  const token = await getToken()
        if (!token) return null;
console.log("paylaod",formData);

  const res = await fetch(`${process.env.API_URL}/api/tutor/profile`, {
    method:"PUT", // or POST depending on your API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const result = await res.json();

console.log("res",result);


  // Refresh the Next.js cache
  revalidatePath("/tutor/dashboard/profile");
  return result;
   } catch (error) {
    console.log("error",error);
    
    return {error:"somethink went wrong"}
   }
  }

export const updateTutorAvatar = async (file: File) => {
try {
    const formData = new FormData();
  formData.append("profileAvatar", file);
  const cookieStore = cookies();
  const token =  (await cookieStore).get("token")?.value;
console.log("fromdata",formData);

  const response = await fetch(`${process.env.API_URL}/api/student/profile/avater-change`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
     // Browser automatically sets Content-Type to multipart/form-data
  });

  
  return response.json();
} catch (error) {
  console.log("erro",error);
  
}
};



export const getAllSession = async ()=>{

           const token = await getToken()
        if (!token) return null;
    const response = await fetch(`${process.env.API_URL}/api/tutor/sessions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to get sessions ");
  return result;

}
export const addAvailability = async (payload:addAvailabilityPayload)=>{


  try {
              const token = await getToken()
        if (!token) return null;
    const response = await fetch(`${process.env.API_URL}/api/tutor/availability`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),

  });

  const result = await response.json();
  // if (!response.ok) throw new Error(result.message || "Failed to create  time slot ");

  revalidatePath("/tutor/dashboard/availability")
  return result;
  } catch (error) {
    console.log("error",error);
    
  }
 
}
export const getAllAvailability = async ()=>{


            const token = await getToken()
        if (!token) return null;
    const response = await fetch(`${process.env.API_URL}/api/tutor/availability`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to fetching time slot ");
  return result;
 

}

export async function getTutorReviews(tutorId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`http://localhost:5000/api/review/${tutorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // কুকি থেকে টোকেন নিয়ে হেডার হিসেবে পাঠানো হচ্ছে
        "Authorization": `Bearer ${token}`,
      },
      // সার্ভার টু সার্ভার ফেচিংয়ে ক্যাশিং কন্ট্রোল
      cache: "no-store", 
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Server connection failed" };
  }
}
export async function getTutorDashboardData(tutorId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    const response = await fetch(`http://localhost:5000/api/tutor/dashboard-data/${tutorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // কুকি থেকে টোকেন নিয়ে হেডার হিসেবে পাঠানো হচ্ছে
        "Authorization": `Bearer ${token}`,
      },
      // সার্ভার টু সার্ভার ফেচিংয়ে ক্যাশিং কন্ট্রোল
      cache: "no-store", 
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Server connection failed" };
  }
}