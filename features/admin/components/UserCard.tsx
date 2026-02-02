"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TableCell } from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  UserCircle, Eye, GraduationCap, User, Loader2, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserStatus } from "../services";
import axios from "axios";
import { useRefetchQueries } from "@/lib/react-query";

const UserCard = ({ user }: { user: {
  id:string;
  name:string;
  role:string;
  createdAt:string;
  status:string;
  email:string;
} }) => {


  const {refetchQueries} = useRefetchQueries()

const [status,setStatus] = useState(user.status)
  const updateStatusMutation = useMutation({
    mutationFn:(payload:{
      userId:string;
      body:{
        status:string
      }
    })=> axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${payload.userId}/status`,payload.body,{
      withCredentials:true
    }),
    onSuccess:(res)=>{
      refetchQueries("fetch-users")

       setStatus(res.data.data.status)
      toast.success(res.data.message)
    }
  })
  

  const handleStatusChange = async(val: string) => {
     await updateStatusMutation.mutateAsync({
     userId:user.id,
     body:{
      status:val
     }
     })
  };

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group border-zinc-50 dark:border-zinc-900 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/40 transition-colors"
    >
      <TableCell className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <UserCircle size={24} />
          </div>
          <div>
            <p className="font-black text-zinc-900 dark:text-zinc-100 text-base leading-tight">{user.name}</p>
            <p className="text-xs text-zinc-400 font-bold tracking-tight mt-0.5">{user.email}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "p-2 rounded-xl",
            user.role === "Tutor" ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600"
          )}>
            {user.role === "Tutor" ? <GraduationCap size={16} /> : <User size={16} />}
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{user.role}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="relative flex items-center">
          <Select 
            defaultValue={status} 
            disabled={updateStatusMutation.isPending}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className={cn(
              "w-40 h-10 rounded-xl border-none font-black text-[10px] uppercase tracking-widest transition-all shadow-sm",
              user.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600",
              updateStatusMutation.isSuccess && "bg-emerald-500 text-white" // Flash green on success
            )}>
              {updateStatusMutation.isPending ?
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Syncing...</span>
                </div> : <SelectValue/>
              }
            </SelectTrigger>
            
            <SelectContent className="rounded-2xl border-zinc-100 dark:border-zinc-800 p-1.5 shadow-2xl">
              <SelectItem value="ACTIVE" className="rounded-xl focus:bg-emerald-50 dark:focus:bg-emerald-500/10 text-emerald-600 font-black text-[10px] tracking-widest">
                AUTHORIZED
              </SelectItem>
              <SelectItem value="BANNED" className="rounded-xl focus:bg-rose-50 dark:focus:bg-rose-500/10 text-rose-600 font-black text-[10px] tracking-widest">
                RESTRICTED
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TableCell>

      <TableCell className="px-8 text-right">
        <Button 
          variant="secondary" 
          className="rounded-xl font-black text-[10px] uppercase tracking-[0.1em] h-10 px-5 gap-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          <Eye size={14} strokeWidth={3} /> View {user.role}
        </Button>
      </TableCell>
    </motion.tr>
  );
};

export default UserCard;