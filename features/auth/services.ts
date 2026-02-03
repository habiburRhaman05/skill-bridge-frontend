"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;

/* =========================
   GET CURRENT USER PROFILE
========================= */
export async function getProfile() {
  const cookieStore = cookies(); // ❌ NO await
  const cookieHeader = cookieStore.toString(); // ✅ string

  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Cookie: cookieHeader, // 🔥 manual forward
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

/* =========================
   LOGOUT USER
========================= */
export async function logoutUser() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Cookie: cookieHeader, // 🔥 required
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}
