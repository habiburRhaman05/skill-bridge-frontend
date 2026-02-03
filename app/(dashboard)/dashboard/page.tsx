

import { getProfile } from "@/features/auth/services";
import DashboardContent from "@/features/student-dashboard/components/DashboardContent";


export default async function StudentOverview() {
 
  const res = await getProfile();
  


  return <div>
   {JSON.stringify(res)}
  </div>
}

