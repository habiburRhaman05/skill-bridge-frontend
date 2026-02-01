import BookingClientView from "@/features/student-dashboard/components/booking-client-view";
import { getBookingDetails } from "@/features/student-dashboard/services";


export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  // Fetch data on the server
  const booking = await getBookingDetails(id);
console.log(booking);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-medium text-zinc-500">Booking not found</h1>
      </div>
    );
  }

  // Pass server data to the client component
  return <BookingClientView booking={booking} />;
}