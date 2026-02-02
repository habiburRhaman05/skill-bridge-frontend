"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, ShieldCheck, 
  Star, CheckCircle2, ChevronLeft, X, MessageSquare 
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReview } from "../services";

export default function BookingClientView({ booking }: { booking: any }) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: (res) => {
      toast.success("Review submitted successfully");
      setIsReviewOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to submit review");
    }
  });

  const tutor = booking.data.tutorProfile || booking.data.availability?.tutor;
  const student = booking.data.student;
  const review = booking.data.review;
  const sessionDate = new Date(booking.data.dateTime);

  const handleCreateReview = async () => {
    if (rating === 0) return toast.error("Please select a rating");
    
    const payload = {
      rating,
      comment,
      bookingId: booking.data.id,
      studentId: student.id,
      tutorId: booking.data.tutorId,
    };
    await reviewMutation.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased">
      <header className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Booking Details</h1>
          </div>
        </div>
        <Badge className="rounded-full px-4 py-1 font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-none uppercase text-[10px] tracking-widest">
          {booking.data.status}
        </Badge>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            {/* Status Section */}
            <section className="space-y-2">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 size={14} /> Session {booking.data.status?.toLowerCase()}
              </p>
              <h2 className="text-4xl font-medium tracking-tight">Session Overview</h2>
            </section>

            {/* Tutor Card */}
            <Card className="p-8 border-zinc-100 dark:border-zinc-900 shadow-none bg-zinc-50/50 dark:bg-zinc-900/20 rounded-3xl border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    {tutor?.profileAvater ? (
                      <img src={tutor.profileAvater} alt="Tutor" className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-xl font-bold text-zinc-400">{tutor?.category?.[0] || 'T'}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{tutor?.name}</p>
                    <p className="text-xs text-zinc-500 tracking-tight">{tutor?.category}</p>
                  </div>
                </div>
                <div className="p-4">
                  -
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
              
                      <img src={student.profileAvater} alt="Student" className="object-cover w-full h-full" />
                    
                   
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{student?.name}</p>
                    <p className="text-xs text-zinc-500 tracking-tight">{student?.location || "Dhaka,Bangladesh"}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Existing Review Display */}
            {review && (
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare size={18} className="text-indigo-500" /> Your Review
                </h3>
                <Card className="p-6 border-zinc-100 dark:border-zinc-900 rounded-3xl bg-white dark:bg-zinc-900/40">
                  <div className="flex items-start gap-4">
                    <img 
                      src={student?.profileAvater || "https://avatar.vercel.sh/student"} 
                      className="w-10 h-10 rounded-full object-cover border border-zinc-100 dark:border-zinc-800" 
                      alt={student?.name}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold">{student?.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={cn(i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-800")} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
                        "{review.comment || "No written feedback provided."}"
                      </p>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                <Calendar className="text-zinc-400 mb-3" size={18} />
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Date</p>
                <p className="text-sm font-medium">{format(sessionDate, "PPP")}</p>
              </div>
              <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                <Clock className="text-zinc-400 mb-3" size={18} />
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Window</p>
                <p className="text-sm font-medium">{booking.data.availability?.startTime} - {booking.data.availability?.endTime}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-4">
              <Card className="p-8 border-zinc-100 dark:border-zinc-900 shadow-none rounded-3xl border space-y-6 bg-white dark:bg-zinc-950">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 font-medium">Hourly Rate</p>
                  <p className="text-3xl font-semibold tracking-tighter">৳{tutor?.hourlyRate || 0}</p>
                </div>
                
         
                  {booking.data.status === "COMPLETED" && !review && (
                          <div className="pt-4 border-t border-zinc-50 dark:border-zinc-900 space-y-4">
                 
 <Button 
                      onClick={() => setIsReviewOpen(true)}
                      className="w-full h-14 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/20"
                    >
                      <Star className="mr-2 fill-white" size={18} /> Leave a Review
                    </Button>
                  {/* Show button ONLY if status is completed AND there is no existing review */}
                </div>
                  )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsReviewOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[32px] p-8 shadow-2xl border border-zinc-100 dark:border-zinc-800"
            >
              <button onClick={() => setIsReviewOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X size={20} />
              </button>
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold">Rate session</h3>
                  <p className="text-sm text-zinc-500">How was your experience with the tutor?</p>
                </div>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="transition-transform active:scale-90">
                      <Star size={36} className={cn("transition-all", rating >= star ? "fill-yellow-400 text-yellow-400 scale-110" : "text-zinc-200 dark:text-zinc-700")} />
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <textarea 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Describe your learning experience..." 
                    className="w-full h-32 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all" 
                  />
                  <Button 
                    disabled={reviewMutation.isPending}
                    className="w-full h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold" 
                    onClick={handleCreateReview}
                  >
                    {reviewMutation.isPending ? "Submitting..." : "Post Review"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}