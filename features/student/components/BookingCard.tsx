"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Booking } from "./types";
import { StatusBadge } from "./StatusBadge";

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="p-5 flex gap-4">
          <Avatar>
            <AvatarImage src={booking.avatar} />
            <AvatarFallback>{booking.tutorName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-semibold">{booking.tutorName}</h3>
              <span>{booking.amount}</span>
            </div>
            <p className="text-sm">{booking.subject}</p>

            <div className="flex gap-4 text-xs mt-2">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{booking.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{booking.time}</span>
              <StatusBadge status={booking.status} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button size="sm" variant="outline">Details</Button>
            {booking.status === "confirmed" && (
              <Button size="sm">Reschedule</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
