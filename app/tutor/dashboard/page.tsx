"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, Clock, Star, CheckCircle2, 
  Plus, Trash2, TrendingUp, LayoutDashboard, Loader2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns"; // npm install date-fns
import { getTutorDashboardData } from "@/features/tutor/services";

// --- Types based on your API Output ---
interface DashboardData {
  profile: {
    name: string;
    totalSessions: number;
    avgRating: number;
    totalReviews: number;
  };
  upcomingSessions: any[]; 
  availability: any[];
  recentFeedback: {
    comment: string;
    studentName: string;
  } | null;
}

export default function TutorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulation: Fetch data from your Controller/Server Action


  if (isLoading) return <DashboardSkeleton />;

  const stats = [
    { label: "Total Students", value: data?.profile.totalSessions || 0, icon: Users, color: "text-blue-600" },
    { label: "Active Bookings", value: data?.upcomingSessions.length || 0, icon: Calendar, color: "text-indigo-600" },
    { label: "Avg. Rating", value: data?.profile.avgRating || 0, icon: Star, color: "text-yellow-500" },
    { label: "Total Reviews", value: data?.profile.totalReviews || 0, icon: Clock, color: "text-emerald-600" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-zinc-50/50 dark:bg-transparent min-h-screen">
      
      {/* 1. Header & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" /> Tutor Hub
          </h1>
          <p className="text-zinc-500 text-sm italic font-medium">
            Welcome back, {data?.profile.name}! Here is what's happening today.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg">
          <Plus size={18} className="mr-2" /> New Availability
        </Button>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card className="border-none shadow-sm dark:bg-zinc-900/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-white dark:bg-zinc-800 ${stat.color} shadow-sm`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        
        {/* 3. Upcoming Sessions */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-none rounded-2xl dark:bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              <CardDescription>View and manage your student bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.upcomingSessions.length === 0 ? (
                <div className="text-center py-10 text-zinc-400 text-sm">No confirmed sessions found.</div>
              ) : (
                data?.upcomingSessions.map((session, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 transition-colors">
                    {/* Session Item UI as before but dynamic */}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

       
      </div>
    </div>
  );
}

// --- Skeleton Component ---
const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
    <div className="h-12 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-10" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
      <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
    </div>
  </div>
);