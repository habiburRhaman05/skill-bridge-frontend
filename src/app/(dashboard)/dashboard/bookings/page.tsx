

import StudentBookings from "@/features/student-dashboard/components/StudentBookings";
import { getStudentBookings } from "@/features/student-dashboard/services";


export default async function StudentBookingsPage() {

  const {data} = await getStudentBookings();

  return <StudentBookings data={data} />;
}

