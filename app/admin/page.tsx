"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, CalendarCheck, Layers, TrendingUp, 
  ArrowUpRight, Activity, Zap, CreditCard 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "Active Tutors", value: "482", trend: "+5.2%", icon: Zap, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "Active Students", value: "2,103", trend: "+12.1%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Monthly Revenue", value: "$42,850", trend: "+18.4%", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Booking Rate", value: "88%", trend: "+2.1%", icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" },
];

 const OverviewPage = () => {
  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter">Dashboard</h1>
          <p className="text-zinc-500 font-medium">Global platform performance for Jan 2026</p>
        </div>
        <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl">
          <button className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-xl text-xs font-black shadow-sm">Real-time</button>
          <button className="px-4 py-2 text-zinc-400 text-xs font-black">Past 30 Days</button>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white dark:bg-zinc-950 p-7 rounded-[40px] border border-zinc-100 dark:border-zinc-900 hover:border-indigo-500/30 transition-all"
          >
            <div className={cn(stat.bg, stat.color, "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110")}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-3xl font-black">{stat.value}</h3>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center mb-1">
                {stat.trend} <ArrowUpRight size={10} className="ml-0.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-[44px] border border-zinc-100 dark:border-zinc-900 p-8 min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black">Revenue Analytics</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"/> Bookings
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-zinc-300"/> Subscriptions
               </div>
            </div>
          </div>
          {/* Simulated Chart Bars */}
          <div className="flex items-end justify-between h-64 gap-2 pt-10">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 55, 100].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                className="w-full bg-indigo-600 rounded-t-xl hover:bg-indigo-400 transition-colors relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   ${h}k
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="bg-indigo-600 rounded-[44px] p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black leading-tight">System<br/>Notifications</h3>
            <p className="text-indigo-200 text-sm mt-2 font-medium">3 Pending tutor verifications</p>
          </div>
          <div className="space-y-4">
             <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
                <p className="text-xs font-black uppercase text-indigo-200">Server Load</p>
                <div className="h-1.5 w-full bg-white/20 rounded-full mt-2 overflow-hidden">
                   <div className="h-full w-[12%] bg-white rounded-full"/>
                </div>
             </div>
             <Button className="w-full h-14 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black">Review Tutors</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverviewPage