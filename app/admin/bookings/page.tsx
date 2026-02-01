"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MoreVertical, CreditCard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SESSIONS = [
  { id: "SEC-902", student: "Arif Ahmed", tutor: "Jessica S.", subject: "HSC Physics", status: "Live", price: "$45", time: "10:00 AM - 11:30 AM" },
  { id: "SEC-903", student: "Sarah Chen", tutor: "Tanvir H.", subject: "React.js", status: "Upcoming", price: "$60", time: "02:00 PM - 03:30 PM" },
  { id: "SEC-904", student: "Zayan Malik", tutor: "Emily R.", subject: "IELTS Prep", status: "Completed", price: "$35", time: "Yesterday" },
];

const SessionManager = () => {
  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter">Bookings</h1>
          <p className="text-zinc-500 font-medium">Monitor live and scheduled sessions.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 rounded-[24px] border border-zinc-100 dark:border-zinc-800">
           <div className="flex -space-x-3 px-2">
              {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200" />)}
           </div>
           <p className="text-xs font-bold pr-4">12 Sessions currently live</p>
        </div>
      </header>

      <div className="bg-white dark:bg-zinc-950 rounded-[44px] border border-zinc-100 dark:border-zinc-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-50 dark:border-zinc-900">
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Session / ID</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Participants</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Revenue</th>
                <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900">
              {SESSIONS.map((session) => (
                <tr key={session.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        session.status === "Live" ? "bg-red-500/10 text-red-500 animate-pulse" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
                      )}>
                        <Video size={18} />
                      </div>
                      <div>
                        <p className="font-black text-sm">{session.subject}</p>
                        <p className="text-[10px] font-bold text-zinc-400">{session.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold">{session.student}</div>
                      <ChevronRight size={14} className="text-zinc-300" />
                      <div className="text-sm font-bold text-indigo-500">{session.tutor}</div>
                    </div>
                    <p className="text-[10px] font-bold text-zinc-400 mt-1 flex items-center gap-1">
                      <Clock size={10} /> {session.time}
                    </p>
                  </td>
                  <td className="p-6">
                    <Badge className={cn(
                      "rounded-lg font-black text-[10px] border-none px-3 py-1",
                      session.status === "Live" && "bg-red-500 text-white shadow-lg shadow-red-500/40",
                      session.status === "Upcoming" && "bg-amber-100 text-amber-600 dark:bg-amber-500/10",
                      session.status === "Completed" && "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10"
                    )}>
                      {session.status}
                    </Badge>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 font-black text-sm">
                      <CreditCard size={14} className="text-zinc-400" />
                      {session.price}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors">
                      <MoreVertical size={18} className="text-zinc-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default SessionManager