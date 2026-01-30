"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  TrendingUp,
  LayoutDashboard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TutorDashboard() {
  // Mock Data for Assignment Presentation
  const [availability, setAvailability] = useState([
    { id: 1, day: "Monday", time: "10:00 AM - 12:00 PM" },
    { id: 2, day: "Wednesday", time: "02:00 PM - 04:00 PM" },
  ]);

  const stats = [
    { label: "Total Students", value: "24", icon: Users, color: "text-blue-600" },
    { label: "Active Bookings", value: "8", icon: Calendar, color: "text-indigo-600" },
    { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-yellow-500" },
    { label: "Hours Taught", value: "128", icon: Clock, color: "text-emerald-600" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-zinc-50/50 dark:bg-transparent min-h-screen">
      
      {/* 1. Header & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" /> Tutor Hub
          </h1>
          <p className="text-zinc-500 text-sm">Welcome back! Here is what's happening with your sessions today.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20">
          <Plus size={18} className="mr-2" /> New Availability
        </Button>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-none shadow-sm dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. Upcoming Sessions (Center-Left) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-none rounded-2xl dark:bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              <CardDescription>View and manage your student bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((session) => (
                <div key={session} className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 uppercase">
                      JS
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Jane Smith</h4>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <TrendingUp size={12} /> Mathematics • 1 hour
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">Tomorrow, 10:00 AM</p>
                    <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] mt-1">Confirmed</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                    <CheckCircle2 size={18} />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 4. Availability Management (Right) */}
        <div className="space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-none rounded-2xl dark:bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Availability</CardTitle>
              <CardDescription>Your public booking slots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {availability.map((slot) => (
                <div key={slot.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex justify-between items-center group">
                  <div>
                    <p className="text-sm font-bold">{slot.day}</p>
                    <p className="text-xs text-zinc-500">{slot.time}</p>
                  </div>
                  <button className="text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-zinc-300 dark:border-zinc-700 h-10 rounded-xl text-xs">
                Add New Time Slot
              </Button>
            </CardContent>
          </Card>

          {/* 5. Recent Reviews Snippet */}
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-none rounded-2xl dark:bg-zinc-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-xs italic text-zinc-500 border-l-2 border-indigo-500 pl-3 py-1">
                  "The session was very helpful, explained complex topics easily!"
                  <span className="block mt-1 font-bold not-italic text-zinc-900 dark:text-zinc-200">- Alex R.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}