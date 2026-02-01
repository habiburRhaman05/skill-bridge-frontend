"use client";

import {
  Camera, Loader2, Mail, Save, X, Plus, Check, ChevronDown, Search
} from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { tutorProfileType } from "../types";
import { toast } from "sonner";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useMutation } from "@tanstack/react-query";
import { updateTutorAvatar, updateTutorProfile } from "../services";

export default function TutorProfilePage({ tutor }: { tutor: tutorProfileType }) {
  // --- 1. Fetch Categories ---
  const { data: categoriesData, isLoading: isCatsLoading } = useApiQuery<{
    data: { id: string, name: string, subjects: string[] }[]
  }>(["fetch-categories"], "/api/shared/categories", {
    staleTime: 60000,
  });

  const categories = categoriesData?.data || [];

  // --- 2. State Management ---
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialData = useMemo(() => ({
    name: tutor.name || "",
    bio: tutor.tutorProfile.bio || "",
   
    categoryId: tutor.tutorProfile.categoryId || "",
    category: tutor.tutorProfile.category || "",
    subjects: tutor.tutorProfile.subjects || [],
    hourlyRate: tutor.tutorProfile.hourlyRate || 0,
  }), [tutor]);

  const [profile, setProfile] = useState(initialData);

  // --- 3. Logic & Validation ---
  const isDirty = useMemo(() => {
    return JSON.stringify(profile) !== JSON.stringify(initialData);
  }, [profile, initialData]);

  // Find subjects available for the currently selected category
  const availableSubjects = useMemo(() => {
    const selectedCat = categories.find(c => c.id === profile.categoryId);
    return selectedCat ? selectedCat.subjects : [];
  }, [profile.categoryId, categories]);

  const toggleSubject = (sub: string) => {
    setProfile(prev => {
      const exists = prev.subjects.includes(sub);
      return {
        ...prev,
        subjects: exists 
          ? prev.subjects.filter(s => s !== sub) 
          : [...prev.subjects, sub]
      };
    });
  };

    const profileMutation = useMutation({
    mutationFn: updateTutorProfile,
    onSuccess: () => {
      toast.success("Profile details updated!");
    },
    onError: (err: any) => toast.error(err.message)
  });
const avatarMutation = useMutation({
    mutationFn: updateTutorAvatar,
    onSuccess: (res) => {
      setPreviewImage(null);
      toast.success("Photo uploaded successfully!");
    },
    onError: () => toast.error("Photo upload failed")
  });


  // --- 4. API Actions ---
  const handleSave = async () => {
    if (!isDirty) return;
   
   const {name,...others} = profile
    const paylaod = {
        user:{
            name:profile.name
        },
        ...others
    }
 
    await profileMutation.mutateAsync(paylaod)
    
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

   await avatarMutation.mutateAsync(selectedFile)
 
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-background p-4 md:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 bg-white dark:bg-zinc-900 text-zinc-500 font-bold text-[10px]">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              TUTOR ACCOUNT
            </Badge>
            <h1 className=" md:text-3xl font-black t uppercase">Manage Profile</h1>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={profileMutation.isPending || !isDirty}
            className={cn(
              "h-14 px-10 rounded-2xl font-black transition-all active:scale-95 shadow-xl",
              isDirty ? "bg-blue-800 text-white " : "bg-zinc-600 dark:bg-zinc-800 text-zinc-400"
            )}
          >
            {profileMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            Save Changes
          </Button>
        </header>

        <div className="flex flex-col gap-8">
          {/* Avatar Section */}
          <aside className="lg:col-span-4">
            <Card className="rounded-[40px] border-none bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
              <CardContent className="p-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-[48px] overflow-hidden ring-8 ring-zinc-50 dark:ring-zinc-800 shadow-inner">
                    <img src={tutor.profileAvater} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-90 transition-all"
                  >
                    <Camera size={20} />
                  </button>
                  <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { setSelectedFile(f); setPreviewImage(URL.createObjectURL(f)); }
                  }} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{profile.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-zinc-400 font-bold text-xs  ">
                  <Mail size={12} /> {tutor.email}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Form */}
          <main className="lg:col-span-8 space-y-8">
            <Card className="rounded-[40px] border-none bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-xl">
              <div className="space-y-10">
                
                {/* Personal Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Legal Name</Label>
                    <Input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none px-6 font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hourly Rate ($)</Label>
                    <Input type="number" value={profile.hourlyRate} onChange={e => setProfile({...profile, hourlyRate:parseInt( e.target.value)})} className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none px-6 font-bold" />
                  </div>
                </section>

                {/* Category & Subjects Section */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Academic Niche</h3>
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Broad Category</Label>
                      <Select 
                        value={profile.categoryId} 
                        onValueChange={val => setProfile({...profile, categoryId: val, subjects: []})}
                      >
                        <SelectTrigger className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none px-6 font-bold capitalize">
                          <SelectValue placeholder={isCatsLoading ? "Loading..." : "Choose Category"} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-none shadow-2xl">
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id} className="rounded-xl font-bold py-3">{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Selected Subjects</Label>
                      <div className="flex flex-wrap gap-2 min-h-[50px] p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50">
                        <AnimatePresence mode="popLayout">
                          {profile.subjects.length > 0 ? profile.subjects.map(sub => (
                            <motion.div key={sub} layout initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}}>
                              <Badge className="pl-3 pr-1 py-1.5 rounded-xl bg-indigo-600 text-white border-none text-[10px] font-black uppercase tracking-wider">
                                {sub} <button onClick={() => toggleSubject(sub)} className="ml-2 p-1 hover:bg-white/20 rounded-md"><X size={12} /></button>
                              </Badge>
                            </motion.div>
                          )) : (
                            <p className="text-xs font-bold text-zinc-400 italic">No subjects selected...</p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Subject Selection Grid */}
                      {profile.categoryId && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                          {availableSubjects.map(sub => (
                            <button
                              key={sub}
                              onClick={() => toggleSubject(sub)}
                              className={cn(
                                "p-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border-2 text-left",
                                profile.subjects.includes(sub) 
                                  ? "border-indigo-600 bg-indigo-600/5 text-indigo-600" 
                                  : "border-transparent bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-100"
                              )}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Bio Narrative</Label>
                  <Textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="min-h-[180px] rounded-[32px] bg-zinc-50 dark:bg-zinc-800 border-none p-8 font-bold leading-relaxed" />
                </section>
              </div>
            </Card>
          </main>
        </div>
      </div>

      {/* --- Avatar Modal --- */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="rounded-[40px] border-none bg-white dark:bg-zinc-950 p-10 shadow-3xl max-w-sm">
          <DialogHeader><DialogTitle className="text-center font-black uppercase tracking-tighter text-2xl">Confirm Avatar</DialogTitle></DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-44 h-44 rounded-[56px] overflow-hidden ring-8 ring-indigo-50 dark:ring-indigo-900/20 shadow-2xl mb-6">
              <img src={previewImage!} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-bold text-zinc-400 text-center uppercase tracking-widest">Update your professional visual identity?</p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="ghost" className="flex-1 rounded-2xl font-bold" onClick={() => setPreviewImage(null)}>Cancel</Button>
            <Button className="flex-1 rounded-2xl font-black bg-indigo-600 text-white" onClick={confirmUpload} disabled={isUploading}>
              {avatarMutation.isPending ? <Loader2 className="animate-spin" /> : "Verify"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}