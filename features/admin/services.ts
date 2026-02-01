import { getToken } from "../student-dashboard/services"

export const getAllUsersByAdmin = async ()=>{
    const token = await getToken();
  try {
          const res = await fetch(
      `${process.env.API_URL}/api/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
    } catch (error) {
        console.log("error",error);
        
    }
}
