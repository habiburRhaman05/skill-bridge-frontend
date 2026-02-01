"use client";

import { AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { StudentBooking } from "@/features/tutor/types";
import { updateSessionStatus } from "../services";
import { BookingCard } from "./BookingCard";

export function SessionList({ sessions }: { sessions: StudentBooking[] }) {
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
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sessions.map((session) => (
          <BookingCard 
            key={session.id}
            session={session}
            onUpdateStatus={handleSessionStatus}
            isPending={sessionStatusMutation.isPending}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}