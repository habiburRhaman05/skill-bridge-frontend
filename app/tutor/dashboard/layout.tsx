import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/layout/SideBar';
import { getProfile } from '@/features/auth/services';
import TutorOnboarding from '@/features/tutor/components/TutorOnboarding';
import { redirect } from 'next/navigation';
import React from 'react'

const TutorDashbaordLayout = async({children}:{
    children:React.ReactNode
}) => {
   const userData = await getProfile();



   if(!userData){
    redirect("/sign-in")
   }
   if(userData.user.data.role !== "TUTOR"){
    redirect("/")
   }


  return (
    <main className='w-full '>
      
<Header/>
    <div className=' w-full flex'>
  <DashboardSidebar
      userRole={userData.user.data.role}
      />

        <div className=' w-full'>
          {userData.user.data.tutorProfile ? children : <TutorOnboarding/>}
        </div>
    </div>
    </main>
  )
}

export default TutorDashbaordLayout