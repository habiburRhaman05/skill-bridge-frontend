"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { addAvailabilityPayload, updateTutorProfilePayload } from "./types";

/**
 * Helper to get all cookies as a string for the fetch header
 */
async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export const tutorOnboardingHandler = async (payload: unknown) => {
  try {
    const cookieString = await getCookieHeader();

    const response = await fetch(`${process.env.API_URL}/api/tutor/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString, // Sending token via cookie header
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to complete onboarding");
    return result;
  } catch (error: any) {
    console.error("tutorOnboardingHandler error:", error);
    return { error: error.message || "Something went wrong" };
  }
};

export async function updateTutorProfile(formData: updateTutorProfilePayload | unknown) {
  try {
    const cookieString = await getCookieHeader();

    const res = await fetch(`${process.env.API_URL}/api/tutor/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    revalidatePath("/tutor/dashboard/profile");
    return result;
  } catch (error) {
    console.error("updateTutorProfile error:", error);
    return { error: "Something went wrong" };
  }
}



export const getAllSession = async () => {
  try {
    const cookieString = await getCookieHeader();

    const response = await fetch(`${process.env.API_URL}/api/tutor/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to get sessions");
    return result;
  } catch (error) {
    console.error("getAllSession error:", error);
    return [];
  }
};

export const addAvailability = async (payload: addAvailabilityPayload) => {
  try {
    const cookieString = await getCookieHeader();

    const response = await fetch(`${process.env.API_URL}/api/tutor/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    revalidatePath("/tutor/dashboard/availability");
    return result;
  } catch (error) {
    console.error("addAvailability error:", error);
    return { error: "Failed to update availability" };
  }
};

export const getAllAvailability = async () => {
  try {
    const cookieString = await getCookieHeader();

    const response = await fetch(`${process.env.API_URL}/api/tutor/availability`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("getAllAvailability error:", error);
    return [];
  }
};

export async function getTutorReviews(tutorId: string) {
  try {
    const cookieString = await getCookieHeader();
    const response = await fetch(`${process.env.API_URL}/api/review/${tutorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.error("getTutorReviews error:", error);
    return { success: false, message: "Server connection failed" };
  }
}

export async function getTutorDashboardData() {
  try {
    const cookieString = await getCookieHeader();
    const response = await fetch(`${process.env.API_URL}/api/tutor/get-dashboard-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.error("getTutorDashboardData error:", error);
    return { success: false, message: "Server connection failed" };
  }
}

export async function updateSessionStatus(payload: any) {
  try {
    const cookieString = await getCookieHeader();
    const response = await fetch(`${process.env.API_URL}/api/tutor/sessions/${payload.sessionId}/finish-session`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieString,
      },
      body: JSON.stringify(payload.body),
    });

    const result = await response.json();
    revalidatePath("/tutor/dashboard/sessions");
    return result;
  } catch (error) {
    console.error("updateSessionStatus error:", error);
    return { success: false, message: "Server connection failed" };
  }
}