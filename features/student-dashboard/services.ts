"use server"
import { cookies } from "next/headers";
import { updateProfilePayload } from "./types";
import { revalidatePath } from "next/cache";


export  async function getToken() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");

    if (!token) return null;

    return token.value
  };

export   async function getDashboardStats() {
    const token = await getToken()
    if (!token) return null;

    const res = await fetch(
      `${process.env.API_URL}/api/student/dashboard/stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) return null;

    return res.json();
  };
 export async function getStudentBookings() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");

    if (!token) return null;
 console.log("token",token);
 
    try {
          const res = await fetch(
      `${process.env.API_URL}/api/booking`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return res.json();
    } catch (error) {
        console.log("error",error);
        
    }

  };


 export  async function  updateProfile (formData:updateProfilePayload){
   try {
    console.log("start update profile");
    
     const cookieStore = cookies();
  const token =  (await cookieStore).get("token")?.value;

  const res = await fetch(`${process.env.API_URL}/api/student/profile`, {
    method:"PUT", // or POST depending on your API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const result = await res.json();



  // Refresh the Next.js cache
  revalidatePath("/dashboard/profile");
  return result;
   } catch (error) {
    console.log("error",error);
    
    return {error:"somethink went wrong"}
   }
  }

export const updateAvatar = async (file: File) => {
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

export const changePassword = async (data: any) => {
  const cookieStore = cookies();
  const token =  (await cookieStore).get("token")?.value;
  const response = await fetch(`${process.env.API_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to update password");
  return result;
};
export const createBooking = async (data: any) => {

   const token = await getToken()
  const response = await fetch(`${process.env.API_URL}/api/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to create booking");
  revalidatePath(`/tutors/${data.tutorId}`)
  return result;
};
export const getBookingDetails = async (bookingId:string) => {
try {
   const token = await getToken()
  const response = await fetch(`${process.env.API_URL}/api/booking/${bookingId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const result = await response.json();
  // if (!response.ok) throw new Error(result.message || "Failed to fetch booking details");
  return result;
} catch (error) {
  console.log("error",error);
  
}
};
export const createReview = async (payload:any) => {
try {
   const token = await getToken()
  const response = await fetch(`${process.env.API_URL}/api/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      
    },
    body:JSON.stringify(payload)
  });

  const result = await response.json();
  // if (!response.ok) throw new Error(result.message || "Failed to fetch booking details");
  revalidatePath(`/dashboard/bookings/${payload.bookingId}`)
  return result;
} catch (error) {
  console.log("error",error);
}
};
