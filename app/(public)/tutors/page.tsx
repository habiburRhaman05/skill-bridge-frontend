"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Star, BookOpen, 
  ArrowRight, FilterX, ChevronDown, GraduationCap,
  RefreshCcw, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// --- Types based on your Actual JSON Output ---
interface TutorProfile {
  hourlyRate: number;
  subjects: string[];
  category: string;
}

interface TutorListItem {
  id: string;
  name: string;
  email: string;
  profileAvater: string | null;
  role: string;
  status: string;
  createdAt: string;
  tutorProfile: TutorProfile;
}

export default function BrowseTutorsPage() {
  const [tutors, setTutors] = useState<TutorListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default");

  // --- API Fetching ---
  const fetchTutors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/tutors");
      const json = await response.json();

      if (json.success) {
        setTutors(json.data);
      } else {
        setError(json.message || "Failed to fetch tutors.");
      }
    } catch (err) {
      setError("Backend server is not reachable. Please check if http://localhost:5000 is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  // --- Search & Sorting Logic ---
  const filteredTutors = useMemo(() => {
    let result = [...tutors];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tutor => 
        tutor.name.toLowerCase().includes(query) ||
        tutor.tutorProfile.subjects.some(s => s.toLowerCase().includes(query)) ||
        tutor.tutorProfile.category.toLowerCase().includes(query)
      );
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.tutorProfile.hourlyRate - b.tutorProfile.hourlyRate);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.tutorProfile.hourlyRate - a.tutorProfile.hourlyRate);
    }

    return result;
  }, [searchQuery, tutors, sortBy]);

  if (error) return <ErrorState message={error} retry={fetchTutors} />;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 pb-20">
      
      {/* 1. Header & Filters Section */}
      <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tighter md:text-4xl">Browse Tutors</h1>
              <p className="text-zinc-500 font-medium italic text-sm">
                {isLoading ? "Fetching data..." : `Showing ${filteredTutors.length} verified educators`}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <Input 
                  placeholder="Search by tutor name or subject..." 
                  className="pl-12 h-14 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl focus-visible:ring-indigo-500 text-base shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <FilterDropdown 
                   label={sortBy} 
                   setLabel={setSortBy} 
                   options={["Default", "Price: Low to High", "Price: High to Low"]} 
                   icon={<SlidersHorizontal size={16}/>} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Grid View */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <TutorGridSkeleton key="skeleton" />
          ) : filteredTutors.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </motion.div>
          ) : (
            <EmptyState onReset={() => setSearchQuery("")} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Sub-Components ---

const TutorCard = ({ tutor }: { tutor: TutorListItem }) => (
  <motion.div 
    layout
    whileHover={{ y: -6 }}
    className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center font-black text-indigo-600 text-2xl uppercase shadow-inner">
          {tutor.name.charAt(0)}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Hourly Rate</p>
          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            {tutor.tutorProfile.hourlyRate} <span className="text-xs font-bold">BDT</span>
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-black tracking-tight">{tutor.name}</h3>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-1.5 py-0 h-5">
            <Star className="fill-emerald-600 mr-1" size={10}/> <span className="text-[10px]">New</span>
          </Badge>
        </div>
        
        <p className="text-xs font-bold text-zinc-500 flex items-center gap-1.5 uppercase tracking-wide">
          <GraduationCap size={15} className="text-indigo-500" /> {tutor.tutorProfile.category}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4 min-h-[80px] content-start">
          {tutor.tutorProfile.subjects.slice(0, 5).map((s, idx) => (
            <Badge key={idx} variant="secondary" className="rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold py-1 px-2 border-none">
              {s}
            </Badge>
          ))}
          {tutor.tutorProfile.subjects.length > 5 && (
            <Badge variant="outline" className="text-[10px] border-dashed">+{tutor.tutorProfile.subjects.length - 5} More</Badge>
          )}
        </div>
      </div>
    </div>

    <Link href={`/tutors/${tutor.id}`} className="block mt-4">
      <Button className="w-full bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 rounded-xl font-bold h-12 group transition-all">
        View Full Profile <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
      </Button>
    </Link>
  </motion.div>
);

const FilterDropdown = ({ label, setLabel, options, icon }: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="h-14 rounded-2xl px-6 border-zinc-200 dark:border-zinc-800 font-bold bg-white dark:bg-zinc-900 shadow-sm shrink-0">
        <span className="mr-2 text-indigo-500">{icon}</span> {label} <ChevronDown className="ml-2 opacity-40" size={16}/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="rounded-xl p-2 min-w-[200px] shadow-xl border-zinc-100 dark:border-zinc-800">
      {options.map((opt: string) => (
        <DropdownMenuItem 
          key={opt} 
          onClick={() => setLabel(opt)} 
          className="rounded-lg font-bold text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          {opt}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const TutorGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} className="h-[380px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] animate-pulse p-6">
        <div className="flex justify-between mb-8">
          <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-800 rounded ml-auto" />
            <div className="h-6 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-1/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
            <div className="h-8 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl mt-4" />
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ message, retry }: { message: string, retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-[#09090b]">
    <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-red-100 dark:border-red-900/30 text-center shadow-xl">
      <div className="h-16 w-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="text-red-500" size={32} />
      </div>
      <h2 className="text-xl font-black mb-2">Something went wrong</h2>
      <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{message}</p>
      <Button onClick={retry} className="bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-xl px-8 font-bold">
        <RefreshCcw size={16} className="mr-2" /> Try Again
      </Button>
    </div>
  </div>
);

const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="h-20 w-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
      <FilterX className="text-indigo-500" size={40} />
    </div>
    <h3 className="text-2xl font-black tracking-tight">No Tutors Matched</h3>
    <p className="text-zinc-500 font-medium max-w-xs mt-2">Try changing your search terms or clearing filters to see more results.</p>
    <Button variant="link" onClick={onReset} className="mt-4 text-indigo-600 font-black">Clear Search</Button>
  </div>
);