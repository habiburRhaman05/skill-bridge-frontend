"use server";

import { headers } from "next/headers";

const API_URL = process.env.API_URL!;

/* =========================
   GET CURRENT USER PROFILE
========================= */
export async function getProfile() {
  const incomingHeaders = headers(); // ✅ sync, NO await

  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: incomingHeaders, // 🔥 forwards Cookie header
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

/* =========================
   LOGOUT USER
========================= */
export async function logoutUser() {
  const incomingHeaders = headers(); // ✅ same pattern

  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    headers: incomingHeaders, // 🔥 cookie forwarded
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}
