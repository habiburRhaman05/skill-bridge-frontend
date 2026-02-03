import Header from '@/components/layout/Header';
import { DashboardSidebar } from '@/components/layout/SideBar';
import { getProfile } from '@/features/auth/services';
import { redirect } from 'next/navigation';
import React from 'react'

const StudentDashboardLayout = async({children}:{
    children:React.ReactNode
}) => {
   const res = await getProfile();
console.log(res)

  return (
    <main className='w-full '>
        {JSON.stringify(res)}
    <div className=' w-full flex'>
        hi mr 
    </div>
    </main>
  )
}

export default StudentDashboardLayout
