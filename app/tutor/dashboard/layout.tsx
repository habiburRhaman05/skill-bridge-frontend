import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/layout/SideBar';
import { getProfile } from '@/features/auth/services';
import TutorOnboarding from '@/features/tutor/components/TutorOnboarding';
import { redirect } from 'next/navigation';
import React from 'react'

const TutorDashbaordLayout = async({children}:{
    children:React.ReactNode
}) => {
   const {user} = await getProfile();
console.log("tutor ",user);


   if(!user || user.error){
    redirect("/sign-in")
   }
   if(user.data.role !== "TUTOR"){
    redirect("/")
   }


  return (
    <main className='w-full '>
      
<Header/>
    <div className=' w-full flex'>
  <DashboardSidebar
      userRole={user.data.role}
      />

        <div className=' w-full'>
          {user.data.tutorProfile ? children : <TutorOnboarding/>}
        </div>
    </div>
    </main>
  )
}

export default TutorDashbaordLayout