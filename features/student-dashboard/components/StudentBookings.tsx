"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { BookingCard } from "./BookingCard";
import { BookingSkeleton } from "./BookingSkeleton";
import { EmptyState } from "./EmptyState";
import { Booking } from "../types";


const DUMMY_BOOKINGS: Booking[] = [
  { id: "1", tutorName: "Dr. Sarah Johnson", subject: "Quantum Physics", date: "2026-02-15", time: "10:00 AM", status: "confirmed", avatar: "https://i.pravatar.cc/150?u=1", amount: "$45" },
  { id: "2", tutorName: "Prof. Alan Turing", subject: "Cryptography", date: "2026-01-10", time: "02:30 PM", status: "completed", avatar: "https://i.pravatar.cc/150?u=2", amount: "$60" },
  { id: "3", tutorName: "Maria Garcia", subject: "Spanish Language", date: "2026-02-20", time: "05:00 PM", status: "confirmed", avatar: "https://i.pravatar.cc/150?u=3", amount: "$30" },
  { id: "4", tutorName: "James Wilson", subject: "Web Development", date: "2025-12-05", time: "11:00 AM", status: "cancelled", avatar: "https://i.pravatar.cc/150?u=4", amount: "$50" },
];

export default function StudentBookings({data}:{data:any}) {
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const filtered = DUMMY_BOOKINGS
    .filter(b => filterStatus === "all" || b.status === filterStatus)
    .sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === "latest" ? db - da : da - db;
    });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-sm text-zinc-500">Manage and track sessions</p>
        </div>
      </div>

      <AnimatePresence>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <BookingSkeleton key={i} />)
          : data.length
          ? data.map((b:any) => <BookingCard key={b.id} booking={b} />)
          : <EmptyState />
        }
      </AnimatePresence>
  
    </div>
  );
}
