import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/features/auth/services";
import CreateAvaliablity from "@/features/tutor/components/SlotCreate";
import { format } from "date-fns";
import { Timer, Trash2 } from "lucide-react";

export default async function AvailabilityPage() {
  const userData = await getProfile();
  const slots = userData?.user?.data?.tutorProfile.availability;

  return (
    <div className="bg-[#FDFDFD] dark:bg-[#0c0c0f] min-h-screen px-4 py-8 md:p-16 text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
      <div className="max-w-2xl mx-auto space-y-10 md:space-y-16">
        
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-semibold">Availability</h1>
            <p className="text-zinc-400 text-sm font-medium italic">Your upcoming teaching windows</p>
          </div>
          <div className="w-full sm:w-auto">
            <CreateAvaliablity />
          </div>
        </header>

        <div className="space-y-6 md:space-y-8 relative">
          {slots?.length > 0 ? (
            slots.map((slot: {
              date: Date,
              startTime: string;
              id: string;
              endTime: string
            }) => (
              <div key={slot.id} className="relative group">
                <div className="flex items-center gap-4 md:gap-10">
                  
                  <div className="flex flex-col items-center min-w-[45px] md:min-w-[50px] shrink-0">
                    <span className="text-[10px] md:text-[11px] font-black uppercase text-indigo-500 tracking-widest">
                      {format(new Date(slot.date), "MMM")}
                    </span>
                    <span className="text-2xl md:text-3xl font-light leading-none">
                      {format(new Date(slot.date), "dd")}
                    </span>
                  </div>

                  <Card className="flex-1 bg-white dark:bg-zinc-900/40 border-zinc-100 dark:border-zinc-800/50 shadow-sm rounded-[24px] md:rounded-3xl overflow-hidden group-hover:shadow-md transition-shadow">
                    <CardContent className="p-4 md:p-6 flex items-center justify-between gap-4">
                      <div className="space-y-1.5 md:space-y-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-base md:text-lg font-bold">{slot.startTime}</span>
                          <div className="w-3 md:w-4 h-[2px] bg-zinc-200 dark:bg-zinc-800" />
                          <span className="text-base md:text-lg font-bold">{slot.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Timer size={12} className="shrink-0" />
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Bookable session</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 md:h-10 md:w-10 rounded-full text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 md:py-20 text-center text-zinc-300 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[32px] md:rounded-[40px]">
              <p className="text-sm font-medium">No slots scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}