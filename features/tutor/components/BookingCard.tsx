"use client";

import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, Clock, Star, 
  User, CheckCircle2, XCircle, 
  Loader2 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudentBooking } from "@/features/tutor/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSessionStatus } from "../services";
import { toast } from "sonner";

// Helper for date formatting
const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
};

interface BookingCardProps {
  session: StudentBooking;

}

export function BookingCard({ session }: BookingCardProps) {
    const queryClient = useQueryClient();

  const sessionStatusMutation = useMutation({
    mutationFn: updateSessionStatus,
    onSuccess: (res) => {
      toast.success(`Session marked as ${res.data.status.toLowerCase()}`);
      queryClient.invalidateQueries({ queryKey: ["tutor-bookings"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update session status");
    }
  });

  const handleSessionStatus = async (tutorId: string, sessionId: string, status: string) => {
    const payload = {
      body: { tutorId, status },
      sessionId
    };
    await sessionStatusMutation.mutateAsync(payload);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-zinc-100 dark:border-zinc-800/50 overflow-hidden hover:shadow-md transition-all rounded-2xl bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Identity Section */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              {session.tutor.user.profileAvater ? (
                <img 
                  src={session.tutor.user.profileAvater} 
                  alt={session.tutor.user.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-200">
                  <User size={20} />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50">{session.tutor.user.name}</h3>
              <div className="flex flex-wrap gap-1.5 mt-1">
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
              <CalendarIcon size={14} className="text-zinc-400" />
              <span>{formatDate(session.availability.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-zinc-400" />
              <span>{session.availability.startTime} - {session.availability.endTime}</span>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-none pt-4 md:pt-0">
            {session.status === "CONFIRMED" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl text-xs font-bold border-red-100 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                  onClick={() => handleSessionStatus(session.tutor.id, session.id, "CANCELLED")}
                  disabled={sessionStatusMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  onClick={() => handleSessionStatus(session.tutor.id, session.id, "COMPLETED")}
                  disabled={sessionStatusMutation.isPending}
                >
                  {sessionStatusMutation.isPending ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 mr-2" />
                  )}
                  Complete
                </Button>
              </div>
            )}

            {session.review && (
              <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-100 dark:border-yellow-500/20">
                <Star size={12} className="fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-black text-yellow-700 dark:text-yellow-500">
                  {session.review.rating.toFixed(1)}
                </span>
              </div>
            )}
            
            <StatusBadge status={session.status} />
          </div>
        </div>

        {/* Review Comment */}
        {session.review?.comment && (
          <div className="px-6 pb-5 md:ml-16">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
              "{session.review.comment}"
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: StudentBooking["status"] }) {
  const configs = {
    CONFIRMED: { styles: "bg-blue-50 text-blue-600 dark:bg-blue-500/10", icon: Clock },
    COMPLETED: { styles: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10", icon: CheckCircle2 },
    CANCELLED: { styles: "bg-red-50 text-red-600 dark:bg-red-500/10", icon: XCircle },
    PENDING: { styles: "bg-amber-50 text-amber-600 dark:bg-amber-500/10", icon: Clock },
  };

  const config = configs[status as keyof typeof configs] || configs.PENDING;
  const { styles, icon: Icon } = config;

  return (
    <Badge className={cn(styles, "border-none rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-none")}>
      <Icon size={12} strokeWidth={3} /> {status}
    </Badge>
  );
}