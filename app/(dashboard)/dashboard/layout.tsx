import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/layout/SideBar';
import { getProfile } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import React from 'react'

const StudentDashboardLayout = async({children}:{
    children:React.ReactNode
}) => {
   const userData = await getProfile();


  //  if(!userData){
  //   redirect("/sign-in")
  //  }
  //  if(userData?.user.data.role !== "STUDENT"){
  //   redirect("/")
  //  }

  return (
    <main className='w-full '>
      {userData?.cookies}
      dashbaord
{/* <Header/> */}
    {/* <div className=' w-full flex'>
  <DashboardSidebar
      userRole={userData.user.data.role}
      />
        <div className=' w-full'>
          {children}
        </div>
    </div> */}
    </main>
  )
}

export default StudentDashboardLayout