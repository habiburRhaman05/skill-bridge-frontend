"use server";

import { httpRequest } from "@/config/axios/axios";
import { cookies } from "next/headers";

export const getPaymentDetails = async (id:string) =>{

    const cookieStore = await cookies();
    const result = await httpRequest.get(`/payment/${id}`,{
        headers:{
            "cookie":cookieStore.toString()
        }
    })
    return result.data
}
export const getUserPaymentHistory = async (userId:string) =>{

    const cookieStore = await cookies();
    const result = await httpRequest.get(`/payment/user/${userId}/transactions`,{
        headers:{
            "cookie":cookieStore.toString()
        }
    })
    return result.data
}