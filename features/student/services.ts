import { cookies } from "next/headers";

export const studentService = {
 async getToken() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");

    if (!token) return null;

    return token.value;
  },

  async getDashboardStats() {
    const token = this.getToken();
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
  },
};
