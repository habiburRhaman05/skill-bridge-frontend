"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Filter, Calendar, TrendingUp, 
  ChevronLeft, ChevronRight, SearchX, 
  SortAsc, RefreshCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Types ---
interface Review {
  id: number;
  student: string;
  rating: number;
  date: string;
  subject: string;
  comment: string;
  avatar: string;
}

// --- Mock Data ---
const ALL_REVIEWS: Review[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  student: ["Arif Ahmed", "Sarah Chen", "Zayan Malik", "Emily Rose", "Tanvir Hasan"][i % 5],
  rating: [5, 5, 4, 3, 5][i % 5],
  date: `2024-03-${20 - i > 0 ? 20 - i : "01"}`,
  subject: ["Next.js Mastery", "Physics (HSC)", "UI/UX Design", "Business English", "Calculus"][i % 5],
  comment: "A really productive session. The concepts were explained clearly and the pace was perfect for my learning style.",
  avatar: "S",
}));

const ITEMS_PER_PAGE = 5;

const ReviewDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    let result = [...ALL_REVIEWS];
    if (filterRating !== "all") {
      result = result.filter(r => r.rating === parseInt(filterRating));
    }
    if (sortBy === "newest") result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sortBy === "highest") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [filterRating, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedReviews = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] p-6 md:p-12 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter">Reviews</h1>
            <p className="text-zinc-500 font-medium italic">Your impact on students, quantified.</p>
          </div>
          
          <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] overflow-hidden shadow-sm">
             <div className="px-8 py-4 border-r border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-[10px] font-black uppercase text-zinc-400">Rating</p>
                <p className="text-2xl font-black">4.9 <span className="text-yellow-500 text-lg">★</span></p>
             </div>
             <div className="px-8 py-4 text-center">
                <p className="text-[10px] font-black uppercase text-zinc-400">Sessions</p>
                <p className="text-2xl font-black">{ALL_REVIEWS.length}</p>
             </div>
          </div>
        </header>

     

        {/* Main Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingSkeleton key="skeleton" />
            ) : paginatedReviews.length > 0 ? (
              <motion.div 
                key="list" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="grid gap-6"
              >
                {paginatedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </motion.div>
            ) : (
              <EmptyState key="empty" onClear={() => { setFilterRating("all"); setSortBy("newest"); }} />
            )}
          </AnimatePresence>
        </div>

     
      </div>
    </div>
  );
};

// --- Subcomponents ---

const ReviewCard = ({ review }: { review: Review }) => (
  <motion.div 
    layout
    className="group bg-white dark:bg-card p-6 md:p-8 rounded-[38px] border border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row gap-6 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
  >
    <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-black text-indigo-500 shrink-0">
      {review.avatar}
    </div>
    <div className="flex-1 space-y-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h3 className="text-xl font-black tracking-tight">{review.student}</h3>
          <Badge className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-none font-bold mt-1">
            {review.subject}
          </Badge>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={cn(i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-800")} />
          ))}
        </div>
      </div>
      <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed italic">"{review.comment}"</p>
      <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest pt-2">
        <Calendar size={12} /> {review.date}
      </div>
    </div>
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="grid gap-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="h-44 bg-white dark:bg-zinc-950 rounded-[38px] border border-zinc-100 dark:border-zinc-900 p-8 flex gap-6"
      >
        <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="flex-1 space-y-4">
          <div className="h-6 w-1/3 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
          <div className="h-4 w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-lg animate-pulse" />
          <div className="h-4 w-2/3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg animate-pulse" />
        </div>
      </motion.div>
    ))}
  </div>
);

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-[30px] flex items-center justify-center mb-6">
      <SearchX size={40} className="text-zinc-400" />
    </div>
    <h3 className="text-2xl font-black">No feedback yet</h3>
    <p className="text-zinc-500 max-w-[280px] mt-2 font-medium">We couldn't find any reviews matching your current filters.</p>
    <Button onClick={onClear} variant="link" className="mt-4 text-indigo-600 font-bold flex items-center gap-2">
      <RefreshCcw size={14} /> Clear All Filters
    </Button>
  </motion.div>
);

export default ReviewDashboard;