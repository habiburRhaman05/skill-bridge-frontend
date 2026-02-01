"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, SearchX, RefreshCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTutorReviews } from "@/features/tutor/services";

// --- Types ---
interface APIReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  bookingId: string;
  student: {
    name: string;
    profileAvater: string | null;
  };
}

const ReviewPage = () => {
  const [reviews, setReviews] = useState<APIReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- API Fetching ---
useEffect(() => {
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
const result = await getTutorReviews("3e77cee9-818f-4c3b-baf3-8cf6f801a8c9");

setReviews(result.data)
setIsLoading(false)
   
    } catch (err) {
      setError("Server is unreachable. Make sure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchReviews();
}, []);

  if (error) return <ErrorState message={error} />;

  return <ReviewDashboard apiData={reviews} isLoading={isLoading} />;
};

// --- Main Dashboard Component ---
const ReviewDashboard = ({ apiData, isLoading }: { apiData: APIReview[], isLoading: boolean }) => {
  const [filterRating, setFilterRating] = useState("all");

  const filteredData = useMemo(() => {
    let result = [...apiData];
    if (filterRating !== "all") {
      result = result.filter(r => r.rating === parseInt(filterRating));
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filterRating, apiData]);

  const averageRating = useMemo(() => {
    if (apiData.length === 0) return "0.0";
    return (apiData.reduce((acc, curr) => acc + curr.rating, 0) / apiData.length).toFixed(1);
  }, [apiData]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] p-6 md:p-12 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter">Reviews</h1>
            <p className="text-zinc-500 font-medium italic">Your impact on students, quantified.</p>
          </div>
          
          <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] shadow-sm">
             <div className="px-8 py-4 border-r border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-[10px] font-black text-zinc-400 uppercase">Avg Rating</p>
                <p className="text-2xl font-black">{averageRating} <span className="text-yellow-500 text-lg">★</span></p>
             </div>
             <div className="px-8 py-4 text-center">
                <p className="text-[10px] font-black text-zinc-400 uppercase">Total</p>
                <p className="text-2xl font-black">{apiData.length}</p>
             </div>
          </div>
        </header>
   

        {/* Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingSkeleton key="skeleton" />
            ) : filteredData.length > 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6">
                {filteredData.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </motion.div>
            ) : (
              <EmptyState key="empty" onClear={() => setFilterRating("all")} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ReviewCard = ({ review }: { review: APIReview }) => {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <motion.div layout className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 flex gap-6">
      <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-600 shrink-0">
        {review.student.name.charAt(0)}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg">{review.student.name}</h3>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={cn(i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200")} />
            ))}
          </div>
        </div>
        <p className="text-zinc-500 text-sm italic">"{review.comment}"</p>
        <div className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase font-bold tracking-wider">
          <Calendar size={12} /> {date}
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
    <p className="text-zinc-400 font-medium">Fetching your reviews...</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center text-center p-6">
    <div className="space-y-4">
      <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-full inline-block text-red-500">
        <SearchX size={40} />
      </div>
      <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
      <p className="text-zinc-500">{message}</p>
      <Button onClick={() => window.location.reload()} className="bg-zinc-900 dark:bg-white dark:text-black">Try Again</Button>
    </div>
  </div>
);

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="text-center py-20">
    <SearchX size={48} className="mx-auto text-zinc-300 mb-4" />
    <h3 className="text-xl font-bold">No reviews matching filters</h3>
    <Button variant="link" onClick={onClear} className="text-indigo-500 font-bold">Clear Filters</Button>
  </div>
);

export default ReviewPage;