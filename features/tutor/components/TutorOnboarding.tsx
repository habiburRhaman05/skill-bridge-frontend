"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { 
  Sparkles, Loader2, ArrowRight, DollarSign, 
  Check, X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { tutorOnboardingHandler } from "../services";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApiQuery";


const onboardingSchema = z.object({
  hourlyRate: z.number().min(10, "Minimum rate is $10").max(500, "Maximum rate is $500"),
  category: z.string().min(1, "Please select a category"),
  categoryId: z.string().min(1, "Please select a category id"),
  // Now validates an array of strings
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
});



const TutorOnboarding = () => {
  const router  = useRouter()
  const handleOnboarding = useMutation({
    mutationFn: tutorOnboardingHandler,
    onSuccess: (res) => {
      console.log(res);
      toast.success(res.message || "Profile completed successfully");
   router.push("/tutor/dashboard/profile")
    },
    onError: () => toast.error("Failed to completing profile")
  });

  const {data:categories,isLoading,isSuccess} = useApiQuery<{
    data:{
      id:string,
      name:string,
      subjects:string[]
    }[]
  }>(["fetch-categories"],"/api/shared/categories",{
    staleTime:60000,
  })

  const form = useForm({
    defaultValues: {
      hourlyRate: 10,
      category: "",
      subjects: [] as string[],
      bio: "",
      categoryId:""
    },
    validators: {
      onChange: onboardingSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      
      await handleOnboarding.mutateAsync(value);
      router.push("/tutor/dashboard")
    },
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white/60 dark:bg-[#050505]/90 backdrop-blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[54px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-zinc-100 dark:border-zinc-800 p-8 md:p-14 overflow-y-auto max-h-[90vh]"
        >
          <div className="text-center mb-10 space-y-3">
            <div className="mx-auto w-14 h-14 bg-indigo-600 rounded-[22px] flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-4">
              <Sparkles size={28} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Tutor Setup</h2>
            <p className="text-zinc-500 font-medium text-sm italic">Select all subjects you are qualified to teach</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <form.Field name="category">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Teaching Category</Label>
                    <Select onValueChange={(val) => {
                      field.handleChange(val.split("+")[0]);
                      form.setFieldValue("subjects", []); // Reset subjects when category changes
                     form.setFieldValue("categoryId", val.split("+")[1]); 
                    }}
                    disabled={isLoading || !isSuccess}
                    >
                      <SelectTrigger className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-none px-6 font-bold">
                        <SelectValue placeholder="Sector" />
                      </SelectTrigger>
                      <SelectContent className="z-[120]">
                        {categories?.data.map(cat => <SelectItem 
                        
                        key={cat.id} value={`${cat.name}+${cat.id}`} className="font-bold">{cat.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              {/* Rate */}
              <form.Field name="hourlyRate">
                {(field) => (
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">HourlyRate ($/hr)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-none pl-12 font-bold" />
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Multiple Subjects Selection */}
            <form.Field name="subjects">
              {(field) => (
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Select Subjects</Label>
                  {!form.getFieldValue("category") ? (
                    <div className="p-8 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[28px] text-center text-zinc-400 text-sm font-medium">
                      Please select a category first
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {categories?.data.find(c => c.name === form.getFieldValue("category"))?.subjects.map(sub => {
                        const isSelected = field.state.value.includes(sub);
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              const next = isSelected 
                                ? field.state.value.filter(s => s !== sub)
                                : [...field.state.value, sub];
                              field.handleChange(next);
                            }}
                            className={cn(
                              "px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2",
                              isSelected 
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200"
                            )}
                          >
                            {sub}
                            {isSelected && <Check size={14} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {field.state.meta.errors && <p className="text-[10px] text-red-500 font-bold ml-2">{field.state.meta.errors.map(e => e?.message)}</p>}
                </div>
              )}
            </form.Field>

            {/* Bio */}
            <form.Field name="bio">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Bio</Label>
                  <Textarea 
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Tell us about your background..." 
                    className="min-h-[120px] rounded-[28px] bg-zinc-50 dark:bg-zinc-900 border-none p-6 font-semibold leading-relaxed transition-all"
                  />
                  {field.state.meta.errors && <p className="text-[10px] text-red-500 font-bold ml-2">{field.state.meta.errors.map(e => e?.message)}</p>}
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button 
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full h-18 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[32px] font-black text-xl py-8 transition-all active:scale-95 shadow-2xl shadow-indigo-500/20"
                >
                  {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : "Complete Profile"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TutorOnboarding;