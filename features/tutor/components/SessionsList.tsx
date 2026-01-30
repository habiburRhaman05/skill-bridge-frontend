"use client";

import { AnimatePresence, motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, Clock, Star, MoreVertical, 
  User, CheckCircle2, XCircle 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StudentBooking } from "@/features/tutor/types";

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(dateStr));
};

export function SessionList({ sessions }: { sessions: StudentBooking[] }) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-zinc-100 dark:border-zinc-800/50 overflow-hidden hover:shadow-md transition-all rounded-2xl bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Identity Section */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {session.tutor.user.profileAvater ? (
                      <img 
                        src={session.tutor.user.profileAvater} 
                        alt={session.tutor.user.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-50">{session.tutor.user.name}</h3>
                    <div className="flex gap-1.5 mt-1">
                      {session.tutor.subjects.slice(0, 2).map((sub) => (
                        <span key={sub} className="text-[10px] text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-tighter">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date/Time Section */}
                <div className="flex flex-row md:flex-col lg:flex-row gap-4 md:gap-1 lg:gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} />
                    <span>{formatDate(session.availability.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{session.availability.startTime} - {session.availability.endTime}</span>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-none pt-4 md:pt-0">
                  {session.review && (
                    <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-100 dark:border-yellow-500/20">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-black text-yellow-700 dark:text-yellow-500">{session.review.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <StatusBadge status={session.status} />
                </div>
              </div>

              {/* Review Comment */}
              {session.review?.comment && (
                <div className="px-6 pb-5 md:ml-16">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl">
                    "{session.review.comment}"
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status }: { status: StudentBooking["status"] }) {
  const configs = {
    CONFIRMED: { styles: "bg-blue-50 text-blue-600 dark:bg-blue-500/10", icon: Clock },
    COMPLETED: { styles: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10", icon: CheckCircle2 },
    CANCELLED: { styles: "bg-red-50 text-red-600 dark:bg-red-500/10", icon: XCircle },
  };
  const { styles, icon: Icon } = configs[status];
  return (
    <Badge className={cn(styles, "border-none rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5")}>
      <Icon size={12} strokeWidth={3} /> {status}
    </Badge>
  );
}