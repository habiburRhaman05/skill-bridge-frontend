

import { getProfile } from "@/features/auth/services";
import DashboardContent from "@/features/student-dashboard/components/DashboardContent";


export default async function StudentOverview() {
 
  const {user} = await getProfile();
  
  const propsData ={
    name: user.data.name,
  }

  return <DashboardContent data={
   propsData
  }/>
}

