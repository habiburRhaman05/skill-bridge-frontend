
import { 
  Users, Calendar, Clock, Star, CheckCircle2, 
  Plus, Trash2, TrendingUp, LayoutDashboard, Loader2, 
  MoreHorizontal,
  Video
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTutorDashboardData } from "@/features/tutor/services";
import { getProfile } from "@/features/auth/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

export default async function TutorDashboard() {

  const {data} = await getTutorDashboardData()
 

  const stats = [
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
            <LayoutDashboard className="text-indigo-600" /> Welcome back, {data?.profile.name}
          </h1>
          <p className="text-zinc-500 text-sm italic font-medium">
            !dashboard overview.Here is what's happening today.
          </p>
        </div>
     
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i}>
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
          </div>
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
                data?.upcomingSessions.map((session:any, idx:number) => {
               return <SessionCard key={idx} session={session}/>
                })
              )}
            </CardContent>
          </Card>
        </div>

       
      </div>
    </div>
  );
}

const SessionCard = ({session}:{session:any})=>{
  const sessionDate = new Date(session.dateTime);
  return          <div 
     key={session.id}
      className="group relative flex flex-col gap-4 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 rounded-xl border-2 border-white dark:border-zinc-800 shadow-sm">
              <AvatarImage src={session.student.profileAvater} alt={session.student.name} className="object-cover" />
              <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">
                {session.student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shadow-sm" />
          </div>
          <div>
            <h4 className="font-black text-sm tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
              {session.student.name}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <Badge variant="secondary" className="h-5 px-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-none rounded-md">
                {session.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400">
          <Calendar size={14} className="text-indigo-500" />
          <span className="text-xs font-bold">
            {sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400">
          <Clock size={14} className="text-indigo-500" />
          <span className="text-xs font-bold">
            {sessionDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <Button 
        size="sm" 
        className="w-full h-11 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98]"
      >
        <Video className="mr-2" size={14} />
        Join Session
      </Button>
    </div>
}