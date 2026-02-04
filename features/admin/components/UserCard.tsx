"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TableCell } from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  UserCircle, GraduationCap, User, Loader2, ShieldCheck, ShieldAlert, Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserStatus } from "../services";

const UserCard = ({ user }: { user: {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  status: string;
  email: string;
} }) => {
  const [status, setStatus] = useState(user.status);
  
  const updateStatusMutation = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: (res) => {
      setStatus(res.data.status);
      toast.success("User status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    }
  });

  const handleStatusChange = async (val: string) => {
    await updateStatusMutation.mutateAsync({
      userId: user.id,
      body: { status: val }
    });
  };

  const isBanned = status === "BANNED";

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "group transition-all duration-300",
        "border-b border-zinc-100/50 dark:border-zinc-800/50",
        "hover:bg-zinc-50/50 dark:hover:bg-white/[0.02]",
        isBanned && "opacity-60 grayscale-[0.5]"
      )}
    >
      {/* USER IDENTITY */}
      <TableCell className="py-5 pl-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500",
              "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900",
              "ring-1 ring-zinc-200 dark:ring-zinc-700 group-hover:ring-primary/50"
            )}>
              <UserCircle className="w-6 h-6 text-zinc-500" />
            </div>
            {status === "ACTIVE" && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
              {user.name}
            </span>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Mail className="w-3 h-3" />
              <span className="text-xs font-medium uppercase tracking-wider opacity-70">{user.email}</span>
            </div>
          </div>
        </div>
      </TableCell>

      {/* ROLE BADGE */}
      <TableCell>
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset",
          user.role === "Tutor" 
            ? "bg-indigo-50/50 text-indigo-600 ring-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400" 
            : "bg-zinc-50/50 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400"
        )}>
          {user.role === "Tutor" ? <GraduationCap size={12} /> : <User size={12} />}
          {user.role}
        </div>
      </TableCell>

      {/* STATUS SELECTOR */}
      <TableCell className="pr-6">
        <div className="flex items-center justify-end">
          <Select 
            defaultValue={status} 
            disabled={updateStatusMutation.isPending}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className={cn(
              "h-9 w-36 rounded-lg border-zinc-200 dark:border-zinc-800 transition-all focus:ring-2",
              "text-[11px] font-bold tracking-widest uppercase bg-transparent",
              status === "ACTIVE" 
                ? "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-400/10" 
                : "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
            )}>
              {updateStatusMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>UPDATING</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {status === "ACTIVE" ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                  <SelectValue />
                </div>
              )}
            </SelectTrigger>
            
            <SelectContent align="end" className="min-w-[160px] rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-md">
              <SelectItem value="ACTIVE" className="cursor-pointer focus:bg-emerald-50 dark:focus:bg-emerald-500/10 focus:text-emerald-600 text-[11px] font-bold tracking-widest py-2.5">
                <div className="flex items-center gap-2 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" /> AUTHORIZED
                </div>
              </SelectItem>
              <SelectItem value="BANNED" className="cursor-pointer focus:bg-rose-50 dark:focus:bg-rose-500/10 focus:text-rose-600 text-[11px] font-bold tracking-widest py-2.5">
                <div className="flex items-center gap-2 uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" /> RESTRICTED
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TableCell>
    </motion.tr>
  );
};

export default UserCard;