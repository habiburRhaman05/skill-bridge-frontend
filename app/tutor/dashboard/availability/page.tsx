
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/features/auth/services";
import CreateAvaliablity from "@/features/tutor/components/SlotCreate";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion"
import { Timer, Trash2 } from "lucide-react";



export default async function AvailabilityPage() {

  const {user} = await getProfile()

const slots = user?.data?.tutorProfile.availability

  return (
    <div className=" bg-[#FDFDFD] dark:bg-[#0c0c0f]  md:p-16 text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
      <div className="max-w-2xl mx-auto space-y-16">
        
        {/* Simple Header */}
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold">Availability</h1>
            <p className="text-zinc-400 text-sm font-medium italic">Your upcoming teaching windows</p>
          </div>
          <CreateAvaliablity/>
        </header>
        {/* List of Slots */}
        <div className="space-y-8 relative">
         
            {slots?.length > 0 ? (
              slots.map((slot:{
                date:Date,
                startTime:string;
                id:string;
                endTime:string
              }) => (
                <div 
                  key={slot.id} 

                  className="relative group"
                >
               
                  <div className="flex items-center gap-6 md:gap-10">
                  
                    <div className="flex flex-col items-center min-w-[50px]">
                      <span className="text-[11px] font-black uppercase text-indigo-500">{format(slot.date, "MMM")}</span>
                      <span className="text-3xl font-light leading-none">{format(slot.date, "dd")}</span>
                    </div>

                  
                    <Card className="flex-1 bg-white dark:bg-zinc-900/40 border-zinc-100 dark:border-zinc-800/50 shadow-sm rounded-3xl overflow-hidden group-hover:shadow-md transition-shadow">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold">{slot.startTime}</span>
                            <div className="w-4 h-[2px] bg-zinc-200 dark:bg-zinc-800" />
                            <span className="text-lg font-bold">{slot.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                             <Timer size={13} />
                             <span className="text-[10px] font-bold uppercase tracking-wider">Bookable session</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                         
                          className="rounded-full text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-zinc-300 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[40px]">
                <p className="text-sm font-medium">No slots scheduled</p>
              </div>
            )}
        
        </div>
      </div>
  
    </div>
  );
}