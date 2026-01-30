

import { getProfile } from "@/features/auth/services";
import DashboardContent from "@/features/student/components/DashboardContent";


export default async function StudentOverview() {
 
  const {user} = await getProfile();

  return <DashboardContent data={user.data}/>
}

