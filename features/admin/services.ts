"use server";

import { revalidatePath } from "next/cache";
import { getToken } from "../student-dashboard/services";

/**
 * Admin services updated to use the 'cookie' header for authentication.
 */

export const getAllUsersByAdmin = async () => {
  try {
    const cookieString = await getToken(); // Returns cookieStore.toString()
    if (!cookieString) throw new Error("Unauthorized: No cookies found");

    const res = await fetch(`${process.env.API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString, // Changed from Authorization to cookie
      },
      next: { revalidate: 0 },
    });

    return await res.json();
  } catch (error) {
    console.error("getAllUsersByAdmin error:", error);
    return { error: "Could not retrieve users list" };
  }
};

export const updateUserStatus = async (payload: { userId: string; body: { status: string } }) => {
  try {
    const cookieString = await getToken();
    if (!cookieString) throw new Error("Unauthorized: No cookies found");

    const res = await fetch(
      `${process.env.API_URL}/api/admin/users/${payload.userId}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieString, // Changed from Authorization to cookie
        },
        body: JSON.stringify(payload.body),
      }
    );

    const result = await res.json();
    
    // Revalidate the users list so the admin sees the status change immediately
    revalidatePath("/admin/dashboard/users");
    
    return result;
  } catch (error) {
    console.error("updateUserStatus error:", error);
    return { error: "Failed to update user status" };
  }
};

export const getAllBookingsByAdmin = async () => {
  try {
    const cookieString = await getToken();
    if (!cookieString) throw new Error("Unauthorized: No cookies found");

    const res = await fetch(`${process.env.API_URL}/api/admin/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString, // Changed from Authorization to cookie
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    return await res.json();
  } catch (error) {
    console.error("getAllBookingsByAdmin error:", error);
    return { error: "Could not retrieve bookings list" };
  }
};