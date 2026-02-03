

"use server";

import { headers } from "next/headers";

const API_URL = process.env.API_URL;

// ✅ Get current user profile
export const getProfile = async () => {
  try {
    const incomingHeaders = await headers(); // forwards all headers including cookies

    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: incomingHeaders,
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to get profile:", error);
    return null;
  }
};

// ✅ Logout user
export const logoutUser = async () => {
  try {
    const incomingHeaders = await headers();

    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: incomingHeaders,
      cache: "no-store",
    });

    if (!res.ok) return { error: true };
    return await res.json();
  } catch (error) {
    console.error("Logout failed:", error);
    return { error: true };
  }
};
