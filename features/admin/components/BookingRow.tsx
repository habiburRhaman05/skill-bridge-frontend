import { Badge } from "@/components/ui/badge";
import { getAllBookingsByAdmin } from "@/features/admin/services";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    ArrowUpRight,
    Calendar, Clock,
    CreditCard,
    Users,
    Video
} from "lucide-react";
import Link from "next/link";

const BookingRow = async ({session}:{session:any}) => {




  
  return  <tr key={session.id} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all">
                  {/* Tutor Info */}
                
                  <td className="p-6">
                    <Link href={`/tutors/${session.tutor?.id}`}>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {session.tutor?.user.name[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-zinc-950 rounded-full" title="Tutor Online" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {session.tutor?.user.name}
                        </p>
                        <p className="text-xs text-indigo-500 font-bold tracking-tight uppercase">
                          {session.tutor?.subjects?.[0]}
                        </p>
                      </div>
                    </div>
                 </Link>
                  </td>

                  {/* Student Flow */}
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
                        <img src={session.student?.profileAvater} className="w-full h-full object-cover" alt="Student" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold flex items-center gap-1">
                          {session.student?.name} <ArrowUpRight size={12} className="text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium truncate max-w-[120px]">
                          {session.student?.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Timing */}
                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                        <Calendar size={14} className="text-zinc-400" />
                        {format(new Date(session.dateTime), "MMM dd, yyyy")}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-tighter">
                        <Clock size={14} />
                        {session.availability?.startTime} - {session.availability?.endTime}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-6 text-center">
                    <Badge variant="outline" className={cn(
                      "rounded-xl font-black text-[10px] border-none px-4 py-1.5 uppercase tracking-widest",
                      session.status === "COMPLETED" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10",
                      session.status === "PENDING" && "bg-amber-50 text-amber-600 dark:bg-amber-500/10",
                      session.status === "CANCELLED" && "bg-rose-50 text-rose-600 dark:bg-rose-500/10"
                    )}>
                      {session.status}
                    </Badge>
                  </td>

                  {/* Revenue */}
                  <td className="p-6">
                    <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                      <span className="text-zinc-400 font-medium text-xs font-mono">৳</span>
                      <span className="text-lg tracking-tighter">{session.tutor?.hourlyRate}</span>
                    </div>
                  </td>

                </tr>
};

export default BookingRow;