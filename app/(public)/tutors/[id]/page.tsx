import { getProfile } from '@/features/auth/services';
import PublicTutorProfile from '@/features/public-pages/TutorProfileDetails'
import React from 'react'

const page =async ({params}:{params:{id:string}}) => {
  const {id} = await params;
const userData = await getProfile();

``
  const res = await fetch(`${process.env.API_URL}/api/tutors/${id}`);
  const {data} = await res.json();
  const userInfo = {
   role:userData?.user?.data?.role || "GUEST",
        id:userData?.user?.data?.id || "NULL" 
  }
  
  return (
    <div>
    
      
      <PublicTutorProfile data={data}  student={
     userInfo
      }/>
    </div>
  )
}

export default page