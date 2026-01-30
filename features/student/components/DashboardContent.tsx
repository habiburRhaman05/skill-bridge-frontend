
import { motion } from "framer-motion";
import { Suspense } from "react";



import LatestReviews from "./LatestReviews";
import StudentStats, { StudentStatsSkelection } from "./StudentStats";
import UpCommingSessions, { UpCommingSessionsSkelection } from "./UpCommingSessions";
import UserWelcome from "./UserWelcome";



export default function DashboardContent({data}:{data:{name:string}}) {
  
  return (
    <div 
      className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto"
    >
 
<UserWelcome 
name={data.name}
/>
    <Suspense fallback={<StudentStatsSkelection/>}>
        <StudentStats  />

    </Suspense>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Booking Card */}
    <Suspense fallback={<UpCommingSessionsSkelection/>}>
   <UpCommingSessions/>
    </Suspense>

        {/* Review Card */}

        <Suspense fallback={<UpCommingSessionsSkelection/>}>
    <LatestReviews/>
    </Suspense>
      </div>
    </div>
  );
}