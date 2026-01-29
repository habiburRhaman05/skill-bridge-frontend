import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/layout/SideBar';
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
   if(user.data.role !== "STUDENT"){
    redirect("/")
   }

  return (
    <main className='min-w-full max-w-7xl mx-auto'>
<Header/>
    <div className='flex'>
  <DashboardSidebar
      userRole={user.data.role}
      />
        <div className='p-4'>
          {children}
        </div>
    </div>
    </main>
  )
}

export default StudentDashboardLayout