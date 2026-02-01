"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Star, FilterX, 
  GraduationCap, RefreshCcw, AlertCircle,
  X, Check, ArrowRight, BookOpen
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useApiQuery } from "@/hooks/useApiQuery";

// --- Types ---
interface Category {
  id: string;
  name: string;
  subjects: string[];
}

interface TutorListItem {
  id: string;
  name: string;
  email: string;
  profileAvater: string | null;
  role: string;
  status: string;
  createdAt: string;
  tutorProfile: {
    hourlyRate: number;
    subjects: string[];
    category: string;
  };
}

export default function BrowseTutorsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- URL State Sync ---
  const currentCategory = searchParams.get("category") || "All";
  const currentSubject = searchParams.get("subject") || "";
  const currentSearch = searchParams.get("q") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "10000";
  const minRating = searchParams.get("rating") || "0";

  // --- API Queries ---
  const { data: catResponse } = useApiQuery<{ data: Category[] }>(
    ["fetch-categories"], 
    "/api/shared/categories"
  );
  const categories = catResponse?.data || [];

  // Find the selected category object to get its subjects
  const selectedCategoryData = useMemo(() => 
    categories.find(c => c.id === currentCategory), 
  [categories, currentCategory]);

  const queryString = searchParams.toString();
  const { data: tutorResponse, isLoading } = useApiQuery<{ data: TutorListItem[] }>(
    ["tutors", queryString],
    `/api/tutors?${queryString}`
  );
  const tutors = tutorResponse?.data || [];

  // --- Helper to update URL ---
  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "All" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] pb-20">
      <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
          <h1 className="text-3xl font-black tracking-tighter mb-6">Find your Perfect Tutor</h1>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <Input 
                  placeholder="Search name or subject..." 
                  className="pl-12 h-14 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl"
                  defaultValue={currentSearch}
                  onKeyDown={(e) => e.key === 'Enter' && updateFilters({ q: e.currentTarget.value })}
                />
              </div>
              <FilterModal 
                currentFilters={{ minPrice, maxPrice, minRating, subject: currentSubject }} 
                availableSubjects={selectedCategoryData?.subjects || []}
                onApply={(filters: any) => updateFilters(filters)} 
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <CategoryBadge 
                label="All" 
                active={currentCategory === "All"} 
                onClick={() => updateFilters({ category: null, subject: null })} 
              />
              {categories.map((cat) => (
                <CategoryBadge 
                  key={cat.id} 
                  label={cat.name} 
                  active={currentCategory === cat.id} 
                  onClick={() => updateFilters({ category: cat.id, subject: null })} 
                />
              ))}
            </div>

            {/* New: Quick Subject Filter (Visible when category is selected) */}
            <AnimatePresence>
              {selectedCategoryData && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-t border-zinc-100 dark:border-zinc-800 pt-3"
                >
                  <span className="text-[10px] font-black uppercase text-zinc-400 self-center mr-2 tracking-widest flex items-center gap-1">
                    <BookOpen size={12}/> Subjects:
                  </span>
                  {selectedCategoryData.subjects.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => updateFilters({ subject: currentSubject === sub ? null : sub })}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                        currentSubject === sub 
                        ? "bg-indigo-600 border-indigo-600 text-white" 
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-transparent hover:bg-zinc-200"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <TutorGridSkeleton key="skeleton" />
          ) : tutors.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tutors.map((t) => <TutorCard key={t.id} tutor={t} />)}
            </motion.div>
          ) : (
            <EmptyState onReset={() => router.push(pathname)} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Filter Modal Updated ---

const FilterModal = ({ currentFilters, availableSubjects, onApply }: any) => {
  const [price, setPrice] = useState([Number(currentFilters.minPrice), Number(currentFilters.maxPrice)]);
  const [rating, setRating] = useState(Number(currentFilters.minRating));
  const [selectedSubject, setSelectedSubject] = useState(currentFilters.subject);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-14 rounded-2xl px-6 border-zinc-200 dark:border-zinc-800 font-bold relative">
          <SlidersHorizontal size={18} className="mr-2 text-indigo-500" /> Filters
          {(currentFilters.subject || currentFilters.minRating !== "0") && (
             <span className="absolute -top-1 -right-1 h-3 w-3 bg-indigo-600 rounded-full border-2 border-white dark:border-zinc-950" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[32px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Refine Search</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-6">
          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex justify-between font-bold text-sm">
              <label>Hourly Rate (BDT)</label>
              <span className="text-indigo-600">{price[0]} - {price[1]}</span>
            </div>
            <Slider 
              step={100} min={0} max={10000} 
              value={price} onValueChange={setPrice}
              className="py-4"
            />
          </div>

          {/* New: Subjects inside Modal */}
          {availableSubjects.length > 0 && (
            <div className="space-y-4">
              <label className="font-bold text-sm">Filter by Subject</label>
              <div className="flex flex-wrap gap-2">
                {availableSubjects.map((sub: string) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(selectedSubject === sub ? "" : sub)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border-2 ${
                      selectedSubject === sub 
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" 
                      : "border-zinc-100 dark:border-zinc-800 text-zinc-400"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="space-y-4">
            <label className="font-bold text-sm">Minimum Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                    rating >= star ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-zinc-100 dark:border-zinc-800"
                  }`}
                >
                  {star} <Star size={14} className="inline ml-1 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            className="w-full h-12 rounded-xl bg-indigo-600 font-bold"
            onClick={() => onApply({ 
              minPrice: price[0].toString(), 
              maxPrice: price[1].toString(), 
              rating: rating.toString(),
              subject: selectedSubject
            })}
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- Reused Shared Components ---
const CategoryBadge = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
      active 
      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-indigo-400"
    }`}
  >
    {label}
  </button>
);

const TutorCard = ({ tutor }: { tutor: TutorListItem }) => (
  <motion.div 
    layout
    whileHover={{ y: -6 }}
    className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center font-black text-indigo-600 text-2xl uppercase shadow-inner overflow-hidden">
          {tutor.profileAvater ? (
            <img src={tutor.profileAvater} className="w-full h-full object-cover" alt={tutor.name} />
          ) : (
            tutor.name.charAt(0)
          )}
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

// Skeletons, Empty states... (same as your provided code)
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