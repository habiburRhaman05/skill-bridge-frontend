

import { Button } from "@/components/ui/button";
import LatestSessionWidget from "@/features/admin/components/LatestSessionWidget";
import LatestUsersWidget from "@/features/admin/components/LatestUsersWidget";
import SessionWidgetSkelection from "@/features/admin/components/SessionWidgetSkelection";
import StatusOverview from "@/features/admin/components/StatusOverview";
import StatusOverviewSkeleton from "@/features/admin/components/StatusOverviewSkeleton";
import UserWidgetSkelection from "@/features/admin/components/UserWidgetSkelection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity, ArrowUpRight,
  Bell,
  Command,
  CreditCard,
  Sparkles,
  Users, Zap
} from "lucide-react";
import { Suspense } from "react";


const OverviewPage = () => {


  return (
    <div className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto transition-colors duration-500">
      
      {/* --- MINIMALIST HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Command size={12} />
            <span>Management Console</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Overview
          </h1>
        </div>
        
      
      </header>

      {/* --- REFINED KPI GRID --- */}
   <Suspense fallback={<StatusOverviewSkeleton/>}>
     <StatusOverview />
   </Suspense>
{/* --- RECENT ACTIVITY WIDGETS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LATEST USERS */}
    <Suspense fallback={<UserWidgetSkelection/>}>
       <LatestUsersWidget/>

    </Suspense>
        {/* LATEST SESSIONS */}
            <Suspense fallback={<SessionWidgetSkelection/>}>
           <LatestSessionWidget/>


    </Suspense>
      </div>
     
    </div>
  );
};

export default OverviewPage;