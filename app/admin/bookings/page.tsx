import BookingRow from "@/features/admin/components/BookingRow";
import { getAllBookingsByAdmin } from "@/features/admin/services";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Users,
  Video
} from "lucide-react";

const SessionManager = async () => {
  const { data } = await getAllBookingsByAdmin();

  // Quick Stats Calculation (Demo logic)
  const stats = [
    { label: "Total Bookings", value: data?.length || 0, icon: Video, color: "text-blue-500" },
    { label: "Revenue", value: `৳${data?.reduce((acc: any, curr: any) => acc + curr.tutor.hourlyRate, 0)}`, icon: CreditCard, color: "text-emerald-500" },
    { label: "Active Students", value: new Set(data?.map((d: any) => d.studentId)).size, icon: Users, color: "text-indigo-500" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header & Stats Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Bookings
          </h1>
          <p className="text-zinc-500 font-medium">Platform-wide session management.</p>
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 rounded-[24px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center", stat.color)}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{stat.label}</p>
                <p className="text-xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    

      {/* Main Table Container */}
      <div className="bg-white dark:bg-zinc-950 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/20">
                <th className="px-8 py-5 text-[11px] font-black uppercase text-zinc-400 tracking-widest text-left">Tutor Details</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-zinc-400 tracking-widest text-left">Learner</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-zinc-400 tracking-widest text-left">Schedule</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-zinc-400 tracking-widest text-center">Current Status</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-zinc-400 tracking-widest text-right">Revenue</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-zinc-400 tracking-widest text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {data?.map((session: any) => (
                <BookingRow session={session} key={session.id}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;