"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  MapPin, 
  Camera, 
  Heart, 
  Save, 
  Mail, 
  Github, 
  Globe,
  Plus,
  X
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // বা আপনার পছন্দের toast library

export default function StudentProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hobbies, setHobbies] = useState(["Coding", "Reading", "Traveling"]);
  const [newHobby, setNewHobby] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby)) {
      setHobbies([...hobbies, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const removeHobby = (hobby: string) => {
    setHobbies(hobbies.filter((h) => h !== hobby));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header & Avatar Section */}
      <div className="relative h-22  w-full   mb-16">
        <div className="  left-8 flex items-end gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 md:h-32 md:h-32  border-white dark:border-zinc-950 shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-2xl">TP</AvatarFallback>
            </Avatar>
            <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white h-6 w-6" />
            </button>
          </div>
          <div className="mb-4 hidden sm:block">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tanvir Parvez</h1>
            <p className="text-zinc-500 text-sm font-medium">Student • Joined Oct 2025</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your basic details and location.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Tanvir Parvez" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input id="location" className="pl-9" defaultValue="Dhaka, Bangladesh" placeholder="City, Country" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us a little about yourself..." 
                  className="min-h-[120px] resize-none"
                  defaultValue="I am a passionate learner looking for mentors in Web Development and UI/UX Design."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Hobbies & Interests</CardTitle>
              <CardDescription>What do you love to do in your free time?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {hobbies.map((hobby) => (
                  <Badge 
                    key={hobby} 
                    variant="secondary" 
                    className="pl-3 pr-1 py-1 gap-1 group bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-none"
                  >
                    {hobby}
                    <button onClick={() => removeHobby(hobby)} className="hover:text-red-500 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a hobby (e.g. Photography)" 
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddHobby()}
                />
                <Button variant="outline" size="icon" onClick={handleAddHobby}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Social & Action */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input className="pl-9" placeholder="github.com/username" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input className="pl-9" placeholder="yourportfolio.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
            <Button variant="outline" className="w-full">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Skeleton Loader ---
function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-pulse">
      <Skeleton className="h-32 md:h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}