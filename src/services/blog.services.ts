"use server";

import { httpRequest } from "@/config/axios/axios";
import { cookies } from "next/headers";


export const getAllBlogs = async (url:string) => {
    const cookieStore = await cookies()
    const result = await httpRequest.get(url, {
        headers: {
            "cookie": cookieStore.toString()
        }
    });

    return result.data

}
export const getBlogDetails = async (id) => {
    const cookieStore = await cookies()
    const result = await httpRequest.get(`/blog/${id}`, {
        headers: {
            "cookie": cookieStore.toString()
        }
    });

    return result.data

}
export const createBlog = async (payload) => {
    const cookieStore = await cookies()
    const result = await httpRequest.post("/blog", payload, {
        headers: {
            "cookie": cookieStore.toString()
        }
    });
    console.log(result);
    
    return result.data
}

export const deleteBlog = async (blogId) => {
    const cookieStore = await cookies()
    const result = await httpRequest.delete(`/blog/${blogId}`, {
        headers: {
            "cookie": cookieStore.toString()
        }
    });
    return result.data
}


