"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import EmptyState from "@/features/tutor/components/EmptyState";
import TutorCard from "@/features/tutor/components/TutorCard";
import TutorCardSkeleton from "@/features/tutor/components/TutorCardSkelection";
import { Category, TutorListItem } from "@/features/tutor/types";
import { useApiQuery } from "@/hooks/useApiQuery";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Search, SlidersHorizontal, Star
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";




function BrowseTutorsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


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

  const selectedCategoryData = useMemo(() => 
    categories.find(c => c.id === currentCategory), 
  [categories, currentCategory]);

  const queryString = searchParams.toString();
  const { data: tutorResponse, isLoading } = useApiQuery<{ data: TutorListItem[] }>(
    ["tutors", queryString],
    `/api/tutors?${queryString}`
  );
  const tutors = tutorResponse?.data || [];

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

            {/* Quick Subject Filter */}
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
            <TutorCardSkeleton key="skeleton" />
          ) : tutors.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tutors.map((t) => <TutorCard key={t.id} tutor={t} />)}
            </motion.div>
          ) : (
            <EmptyState onReset={() => updateFilters({ q: null, category: null, subject: null, minPrice: null, maxPrice: null, rating: null })} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Default Export with Suspense Wrapper ---
export default function BrowseTutorsPage() {
  return (
    <Suspense fallback={<TutorCardSkeleton />}>
      <BrowseTutorsContent />
    </Suspense>
  );
}

// --- Filter Modal restored to original UI ---
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

// --- REST OF UI COMPONENTS (UNTOUCHED) ---

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





