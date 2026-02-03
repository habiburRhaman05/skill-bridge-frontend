import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/layout/SideBar';
import { getProfile } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import React from 'react'

const StudentDashboardLayout = async({children}:{
    children:React.ReactNode
}) => {
   const res = await getProfile();

   // if(!user || user.error){
   //  redirect("/sign-in")
   // }
   // if(res.data.role !== "STUDENT"){
   //  redirect("/")
   // }

  return (
    <main className='w-full '>
        {JSON.stringify(res.data)}
<Header/>
    <div className=' w-full flex'>
  {/* <DashboardSidebar
      userRole={res.data.role}
      /> */}
        <div className=' w-full'>
          {children}
        </div>
    </div>
    </main>
  )
}

export default StudentDashboardLayout
