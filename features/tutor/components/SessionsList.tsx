"use client";

import { AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { StudentBooking } from "@/features/tutor/types";
import { updateSessionStatus } from "../services";
import { BookingCard } from "./BookingCard";
import { EmptyState } from "@/features/student-dashboard/components/EmptyState";

export function SessionList({ sessions }: { sessions: StudentBooking[] }) {


  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sessions.length > 0 ? sessions.map((session) => (
          <BookingCard 
            key={session.id}
            session={session}
          
          />
        )):<EmptyState/>}
      </AnimatePresence>
    </div>
  );
}