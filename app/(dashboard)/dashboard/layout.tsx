import { getProfile } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import React from 'react'

const StudentDashboardLayout = async({children}:{
    children:React.ReactNode
}) => {
   const {user} = await getProfile();
 console.log(user);
 
   if(!user || user.error){
    redirect("/sign-in")
   }
   if(user.role !== "STUDENT"){
    redirect("/")
   }

  return (
    <div>
      
        {children}
    </div>
  )
}

export default StudentDashboardLayout