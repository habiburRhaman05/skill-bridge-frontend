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
export const updateUserStatus = async (payload:{userId:string,body:{status:string}})=>{
    const token = await getToken();

    
  try {
          const res = await fetch(
      `${process.env.API_URL}/api/admin/users/${payload.userId}/status`,
      {
        method:"POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(payload.body)
      }
    );
    return res.json();
    } catch (error) {
        console.log("error",error);
        
    }
}

export const getAllBookingsByAdmin = async ()=>{
    const token = await getToken();
  try {
          const res = await fetch(
      `${process.env.API_URL}/api/admin/bookings`,
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