

import { getProfile } from "@/features/auth/services";
import DashboardContent from "@/features/student-dashboard/components/DashboardContent";


export default async function StudentOverview() {
 
  const userData = await getProfile();

  const propsData ={
    name: userData?.user.data.name,
    id: userData?.user.data.id,
  }

  return <DashboardContent data={
   propsData
  }/>
}

