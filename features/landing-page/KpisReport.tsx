"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Users, CheckCircle, Globe, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const DashboardKPIs = () => {
  const { data: kpis, isLoading } = useApiQuery<{
    data: {
      totalTutors: number;
      totalStudent: number;
      activeTutors: number;
      totalSubjects: number;
      successRate: number;
      totalCountries: number;
    };
  }>(["get-kpis"], "/api/shared/get-kpis-data");

  const stats = [
    {
      title: "Total Tutors",
      value: kpis?.data.totalTutors || 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Students",
      value: kpis?.data.totalStudent || 0,
      icon: GraduationCap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Expert Subjects",
      value: kpis?.data.totalSubjects || 0,
      icon: BookOpen,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Global Reach",
      value: kpis?.data.totalCountries || 0,
      icon: Globe,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Success Rate",
      value: `${kpis?.data.successRate || 0}%`,
      icon: TrendingUp,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <section className="py-12 bg-zinc-50/50 max-w-7xl mx-auto dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-10 space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">
            Platform Metrics
          </h2>
          <h3 className="text-3xl font-black tracking-tight uppercase dark:text-white">
            Real-time Impact
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="relative group overflow-hidden border-none bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[32px] p-6">
                {/* Background Decor */}
                <div className={cn(
                  "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity",
                  stat.bg
                )} />

                <div className="flex flex-col space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                    stat.bg
                  )}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500 transition-colors">
                      {stat.title}
                    </p>
                    {isLoading ? (
                      <div className="h-8 w-16 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" />
                    ) : (
                      <p className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                        {stat.value}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={cn(
                  "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500",
                  stat.bg.replace('/10', '') // Uses the solid version of the color
                )} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardKPIs;