

import { cn } from '@/lib/utils'
import { ArrowUpRight, CreditCard, LucideIcon, Users, Zap } from 'lucide-react'
import { Activity } from 'react';
import { getDashboardOverviewStars } from '../services';
const StatusOverview = async() => {
    const {data} =await getDashboardOverviewStars();

const STATS = [
  { label: "Active Tutors", value: data?.activeTutors, trend: "+5.2%", icon: Zap, color: "text-indigo-600" },
  { label: "Active Students", value: data?.activeStudents, trend: "+12.1%", icon: Users, color: "text-blue-600" },
  { label: "Monthly Revenue", value:data?.monthlyRevenue, trend: "+18.4%", icon: CreditCard, color: "text-emerald-600" },
  { label: "Booking Rate", value:data?.bookingRate, trend: "+2.1%", icon: Activity, color: "text-rose-600" },
];
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => {
              const Icon:any = stat.icon;
          return <div
          key={i}
            className="group p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 transition-colors group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black", stat.color)}>
               <Icon size={18}/>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                {stat.trend} <ArrowUpRight size={10} />
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{stat.value}</h3>
          </div>
        })}
      </div>
  )
}

export default StatusOverview