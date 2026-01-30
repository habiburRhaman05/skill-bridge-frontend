"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Save, Mail, Plus, X, Sparkles, Info, ImagePlus, Loader2 
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, updateAvatar } from "../services";

interface UserProps {
  userData: {
    name: string;
    email: string;
    profileAvater: string;
  };
}

export default function StudentProfileForm({ userData }: UserProps) {
  const queryClient = useQueryClient();
  
  // States
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    profileAvater: userData?.profileAvater || ""
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Mutation for Text Data
  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile details synced!");
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
    },
    onError: (err: any) => toast.error(err.message)
  });

  // 2. Mutation for Photo (FormData)
  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (res) => {
        console.log("res",res);
        
    //   setFormData(prev => ({ ...prev, profileAvater: res.data.profileAvater }));
      setIsModalOpen(false);
      toast.success("Photo uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
    },
    onError: () => toast.error("Photo upload failed")
  });

  // Dirty Check: Compare current form with initial prop data
  const isDirty = useMemo(() => {
    return formData.name !== userData.name;
  }, [formData, userData]);

  // Image Handlers
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPreview(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmImageUpdate = async () => {
    if (selectedFile) {
      await avatarMutation.mutateAsync(selectedFile);
    }
  };

  const handleSaveDetails = () => {
    if (isDirty) profileMutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept="image/*" />

      {/* Avatar Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={(val) => !avatarMutation.isPending && setIsModalOpen(val)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Profile Picture</DialogTitle>
            <DialogDescription className="text-zinc-500">Would you like to set this as your new avatar?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <Avatar className="h-44 w-44 border-4 border-indigo-600 shadow-[0_0_40px_rgba(79,70,229,0.2)]">
              <AvatarImage src={tempPreview || ""} />
            </Avatar>
          </div>
          <DialogFooter className="flex gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={avatarMutation.isPending}>Cancel</Button>
            <Button onClick={confirmImageUpdate} disabled={avatarMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 min-w-[120px]">
              {avatarMutation.isPending ? <Loader2 className="animate-spin" /> : "Update Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 to-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Avatar className="h-36 w-36 border-4 border-zinc-950 shadow-2xl transition-all group-hover:scale-105 group-hover:brightness-75">
            <AvatarImage src={formData.profileAvater} />
            <AvatarFallback className="text-3xl bg-indigo-600">{formData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <ImagePlus className="text-white w-10 h-10 drop-shadow-lg" />
          </div>
        </div>

        <div className="text-center md:text-left space-y-2">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4">Active Scholar</Badge>
          <h1 className="text-4xl font-black text-white">{formData.name}</h1>
          <div className="flex items-center gap-2 text-zinc-400 justify-center md:justify-start">
            <Mail size={16} className="text-indigo-500" />
            <span>{userData?.email}</span>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-zinc-900/50 border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-xl"><Info className="text-indigo-500" /></div>
              <CardTitle className="text-white">Account Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-3">
              <Label className="text-zinc-500 font-bold uppercase tracking-tighter text-[10px]">Full Display Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                className="bg-black/40 border-white/5 text-white h-12 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all" 
              />
            </div>
          </CardContent>
          <CardFooter className="p-8 pt-0 flex justify-between items-center">
            <span className="text-xs text-zinc-500">{isDirty ? "Unsaved changes" : "System synced"}</span>
            <Button 
              onClick={handleSaveDetails} 
              disabled={!isDirty || profileMutation.isPending} 
              className={`px-10 h-12 rounded-xl font-bold transition-all ${isDirty ? 'bg-indigo-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'bg-zinc-800'}`}
            >
              {profileMutation.isPending ? <Loader2 className="animate-spin" /> : "Save Details"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}