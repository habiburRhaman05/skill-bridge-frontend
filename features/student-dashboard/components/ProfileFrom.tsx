"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ImagePlus, Loader2,
  Mail,
  MapPin, Phone,
  Save,
  User,
  X
} from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { cn } from "@/lib/utils";
import { updateProfile } from "../services";
import { updateAvatar } from "@/features/auth/services";
import { useRefetchQueries } from "@/lib/react-query";

interface UserProps {
  userData: {
    name: string;
    email: string;
    profileAvater: string;
    // Added fields assuming they might exist or will be handled by the same profile mutation
    phone?: string;
    location?: string;
    hobbies?: string[];
  };
}

export default function StudentProfileForm({ userData }: UserProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1. State Management ---
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
    hobbies: userData?.hobbies || [],
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [profileAvatar, setProfileAvater] = useState<string | null>(userData.profileAvater);
  const [isModalOpen, setIsModalOpen] = useState(false);
const {refetchQueries} = useRefetchQueries()
  // --- 2. Mutations ---
  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (res) => {
  
      
      setProfileAvater(res?.data?.profileAvater)
      setIsModalOpen(false);
      setTempPreview(null);
  
      toast.success(res.message);
         refetchQueries("user-profile")
    },
    onError: (err) => {
      console.log(err);
      
      toast.error("Upload failed")
    },
  });

  // --- 3. Logic & Validation ---
  const isDirty = useMemo(() => {
    return (
      formData.name !== userData.name ||
      formData.phone !== (userData.phone || "") ||
      formData.location !== (userData.location || "") ||
      JSON.stringify(formData.hobbies) !== JSON.stringify(userData.hobbies || [])
    );
  }, [formData, userData]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempPreview(reader.result as string);
      setIsModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleAvaterUpload = async ()=>{
  if (!selectedFile) return;

  const filename = `${userData.name}-profileAvatar`;

  const formData = new FormData();

  formData.append("file", selectedFile, filename);

  formData.append("title", "Profile Avatar");
  formData.append("description", "User profile picture");
  console.log(formData);
  
  await avatarMutation.mutateAsync(formData)
    
  }

  const handleSaveDetails = () => {
  
    if (isDirty) profileMutation.mutate({
      name:formData.name
    });
  };

  const toggleHobby = (hobby: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby) 
        ? prev.hobbies.filter(h => h !== hobby) 
        : [...prev.hobbies, hobby]
    }));
  };

  const addHobby = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && hobbyInput.trim()) {
      e.preventDefault();
      if (!formData.hobbies.includes(hobbyInput.trim())) {
        toggleHobby(hobbyInput.trim());
      }
      setHobbyInput("");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-[#09090b] p-4 md:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Hidden File Input */}
        <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept="image/*" />

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-4 py-1.5 bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-black text-[10px] tracking-widest">
              STUDENT PROFILE
            </Badge>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Account Settings</h1>
          </div>
          <Button 
            onClick={handleSaveDetails} 
            disabled={!isDirty || profileMutation.isPending} 
            className={cn(
              "h-14 px-10 rounded-2xl font-black transition-all active:scale-95 shadow-xl",
              isDirty ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
            )}
          >
            {profileMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
            Save Changes
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Visual Identity */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="rounded-[40px] border-none bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
              <CardContent className="p-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div 
                    className="w-40 h-40 rounded-[48px] overflow-hidden ring-8 ring-zinc-50 dark:ring-zinc-800 shadow-inner cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={profileAvatar!} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-indigo-600 text-white font-black">
                        {userData.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImagePlus className="text-white w-8 h-8" />
                    </div>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-90 transition-all"
                  >
                    <ImagePlus size={20} />
                  </button>
                </div>
                <h2 className="text-2xl font-black tracking-tight">{userData.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-zinc-400 font-bold text-xs">
                  <Mail size={12} className="text-indigo-500" /> {userData.email}
                </div>
              </CardContent>
            </Card>

          
          </aside>

          {/* Main Form Area */}
          <main className="lg:col-span-8 space-y-8">
            <Card className="rounded-[40px] border-none bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-xl">
              <div className="space-y-10">
                
                {/* Section: Basic Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Personal Details</h3>
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <Input 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none pl-12 font-bold focus-visible:ring-2 focus-visible:ring-indigo-500" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <Input 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          placeholder="+880 1XXX-XXXXXX"
                          className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none pl-12 font-bold focus-visible:ring-2 focus-visible:ring-indigo-500" 
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section: Location & Background */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Address & Background</h3>
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Current Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <Input 
                        value={formData.location} 
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g. Dhaka, Bangladesh"
                        className="h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none pl-12 font-bold focus-visible:ring-2 focus-visible:ring-indigo-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Interests & Hobbies</Label>
                    <div className="flex flex-wrap gap-2 min-h-[60px] p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/50">
                      <AnimatePresence mode="popLayout">
                        {formData.hobbies.map(hobby => (
                          <motion.div key={hobby} layout initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}}>
                            <Badge className="pl-4 pr-2 py-2 rounded-xl bg-indigo-600 text-white border-none text-[10px] font-black uppercase tracking-wider">
                              {hobby} 
                              <button onClick={() => toggleHobby(hobby)} className="ml-2 p-1 hover:bg-white/20 rounded-md transition-colors">
                                <X size={12} />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <input 
                        value={hobbyInput}
                        onChange={(e) => setHobbyInput(e.target.value)}
                        onKeyDown={addHobby}
                        placeholder="Add hobby and press Enter..."
                        className="flex-1 min-w-[150px] bg-transparent border-none focus:outline-none text-sm font-bold text-zinc-600 placeholder:text-zinc-400"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </Card>
          </main>
        </div>
      </div>

      {/* --- Avatar Confirmation Modal --- */}
      <Dialog open={isModalOpen} onOpenChange={(val) => !avatarMutation.isPending && setIsModalOpen(val)}>
        <DialogContent className="rounded-[40px] border-none bg-white dark:bg-zinc-950 p-10 shadow-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center font-black uppercase tracking-tighter text-2xl">New Avatar</DialogTitle>
            <DialogDescription className="text-center font-bold text-zinc-500">Confirm your professional identity update.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-44 h-44 rounded-[56px] overflow-hidden ring-8 ring-indigo-50 dark:ring-indigo-900/20 shadow-2xl mb-6">
            {isModalOpen &&  <img src={tempPreview || ""} className="w-full h-full object-cover" alt="Preview" />}
            </div>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-3">
            <Button variant="ghost" className="rounded-2xl font-bold h-12" onClick={() => setIsModalOpen(false)} disabled={avatarMutation.isPending}>
              Cancel
            </Button>
            <Button className="rounded-2xl font-black bg-indigo-600 text-white h-12" onClick={handleAvaterUpload} disabled={avatarMutation.isPending}>
              {avatarMutation.isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}