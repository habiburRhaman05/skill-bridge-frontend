import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card,CardAction,CardContent,CardFooter,CardHeader,CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const UpCommingSessions = async () => {

    await new Promise((res)=> setTimeout(res,2000))
  return (
   
         <Card className="lg:col-span-4 shadow-sm border-zinc-200/60 dark:border-zinc-800/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" /> Upcoming Session
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/bookings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" /> Advanced React Patterns
                </p>
              </div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none">
                Confirmed
              </Badge>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none">
              Join Zoom Meeting
            </Button>
          </CardContent>
        </Card>
  
  )
}

export default UpCommingSessions

export const UpCommingSessionsSkelection = ()=>{
  return     <Skeleton className="h-64 lg:col-span-4" />
    
}