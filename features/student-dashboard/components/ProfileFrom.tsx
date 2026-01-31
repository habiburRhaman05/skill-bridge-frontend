"use client";

import React, { useState, useMemo, useRef } from "react";
import { Mail, X, Info, ImagePlus, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

import { updateProfile, updateAvatar } from "../services";
import { cn } from "@/lib/utils";

interface UserProps {
  userData: {
    name: string;
    email: string;
    profileAvater: string;
  };
}

export default function StudentProfileForm({ userData }: UserProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- State ---
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    profileAvater: userData?.profileAvater || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Mutations ---
  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Avatar updated");
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
    },
    onError: () => toast.error("Upload failed"),
  });

  // --- Logic ---
  const isDirty = useMemo(() => formData.name !== userData.name, [formData, userData]);

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

  const handleSaveDetails = () => {
    if (isDirty) profileMutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        className="hidden" 
        accept="image/*" 
      />

      {/* 1. Avatar Update Modal */}
      <Dialog open={isModalOpen} onOpenChange={(val) => !avatarMutation.isPending && setIsModalOpen(val)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-sm rounded-[2rem]">
          <DialogHeader>
            <DialogTitle>New Profile Picture</DialogTitle>
            <DialogDescription>Look good? Confirm to save changes.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <Avatar className="h-40 w-40 border-4 border-indigo-600/50 shadow-xl">
              <AvatarImage src={tempPreview || ""} className="object-cover" />
            </Avatar>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="rounded-xl border-zinc-800" 
              onClick={() => setIsModalOpen(false)} 
              disabled={avatarMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => avatarMutation.mutate(selectedFile!)} 
              disabled={avatarMutation.isPending} 
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              {avatarMutation.isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Hero Profile Section */}
      <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
        <div 
          className="relative group cursor-pointer" 
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar className="h-32 w-32 border-4 border-zinc-950 shadow-2xl transition-transform group-hover:scale-105">
            <AvatarImage src={userData.profileAvater} className="object-cover" />
            <AvatarFallback className="text-3xl bg-indigo-600 text-white">
              {userData.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <ImagePlus className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 mb-2">
            Student Account
          </Badge>
          <h1 className="text-3xl font-bold text-white tracking-tight">{userData.name}</h1>
          <div className="flex items-center gap-2 text-zinc-500 justify-center md:justify-start">
            <Mail size={14} />
            <span className="text-sm">{userData.email}</span>
          </div>
        </div>
      </div>

      {/* 3. Settings Form */}
      <Card className="bg-zinc-950 border-zinc-900 rounded-[2rem] overflow-hidden">
        <CardHeader className="border-b border-zinc-900/50 bg-zinc-900/20 p-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Info size={20} className="text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <p className="text-sm text-zinc-500">Update your public profile name.</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-2 max-w-md">
            <Label className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Display Name
            </Label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
              className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-xl focus:ring-indigo-600" 
            />
          </div>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex items-center justify-between border-t border-zinc-900/50 bg-zinc-900/10 mt-6">
          <p className="text-xs text-zinc-600">
            {isDirty ? "You have unsaved changes" : "Your profile is up to date"}
          </p>
          <Button 
            onClick={handleSaveDetails} 
            disabled={!isDirty || profileMutation.isPending} 
            className={cn(
              "px-8 h-11 rounded-xl font-semibold transition-all",
              isDirty ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-500"
            )}
          >
            {profileMutation.isPending ? <Loader2 className="animate-spin" /> : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}