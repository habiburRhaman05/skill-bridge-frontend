// "use client";

// // ... (previous imports remain the same)

// export function BookingDetailsClient({ booking }: { booking: StudentBooking }) {
//   // Parsing date correctly for countdown logic
//   const sessionDate = new Date(`${booking.availability.date}T${booking.availability.startTime}`);
//   const isUpcoming = isAfter(sessionDate, new Date());
  
//   // Logic to enable "Join Meeting" only 5 mins before or during the session
//   const canJoin = isUpcoming && formatDistanceToNow(sessionDate).includes("minute");

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }} 
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-8"
//     >
//       {/* --- HERO HEADER --- */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-10">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full px-4 border-none font-bold">
//               ID: {booking.id.slice(0, 8).toUpperCase()}
//             </Badge>
//             <span className="text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em]">
//               Booked {format(new Date(booking.createdAt), "MMM dd")}
//             </span>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-zinc-50">
//             Session <span className="text-indigo-600">Brief</span>
//           </h1>
//         </div>
        
//         <div className="text-right">
//           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
//             {isUpcoming ? "Starts In" : "Status"}
//           </p>
//           <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-2xl shadow-indigo-500/10 border border-zinc-100 dark:border-zinc-800">
//             <Timer className={cn("w-6 h-6", isUpcoming ? "text-indigo-500 animate-pulse" : "text-zinc-400")} />
//             <span className="text-2xl font-black tabular-nums tracking-tighter">
//               {isUpcoming ? formatDistanceToNow(sessionDate) : "Completed"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="rounded-[48px] border-none bg-white dark:bg-zinc-900 shadow-2xl p-8 md:p-12 relative overflow-hidden">
//             {/* Background Decorative Element */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
//             <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
//               {/* Tutor Profile */}
//               <div className="flex flex-col items-center text-center space-y-4 group">
//                 <div className="w-32 h-32 rounded-[40px] overflow-hidden ring-8 ring-indigo-50 dark:ring-indigo-900/20 transition-transform group-hover:scale-105 duration-500">
//                   <img src={booking.tutor.user.profileAvater || ""} alt="Tutor" className="w-full h-full object-cover" />
//                 </div>
//                 <div>
//                   <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-1">Expert Tutor</h3>
//                   <p className="text-2xl font-black italic tracking-tight">{booking.tutor.user.name}</p>
//                 </div>
//               </div>

//               {/* Connecting Icon */}
//               <div className="p-4 bg-zinc-900 dark:bg-zinc-50 rounded-full shadow-xl">
//                 <ArrowRight className="text-white dark:text-black" size={24} />
//               </div>

//               {/* Student Visual */}
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="w-32 h-32 rounded-[40px] bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border-4 border-dashed border-zinc-200 dark:border-zinc-700">
//                   <CheckCircle2 className="text-zinc-300" size={48} />
//                 </div>
//                 <div>
//                   <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-1">Student</h3>
//                   <p className="text-2xl font-black italic tracking-tight text-zinc-400">Reserved</p>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats Grid */}
//             <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { label: "Rate", value: `$${booking.tutor.hourlyRate}` },
//                 { label: "Category", value: booking.tutor.category },
//                 { label: "Subject", value: booking.tutor.subjects[0] },
//                 { label: "Status", value: booking.status },
//               ].map((item) => (
//                 <div key={item.label} className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-[28px] border border-transparent hover:border-indigo-500/20 transition-colors">
//                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{item.label}</p>
//                   <p className="font-black text-sm uppercase">{item.value}</p>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Review Logic */}
//           {booking.review && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//               <Card className="rounded-[40px] border-none bg-indigo-600 p-10 text-white shadow-2xl shadow-indigo-500/30">
//                 <div className="flex flex-col md:flex-row gap-6 items-start">
//                   <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
//                     <Star className="fill-white text-white" size={28} />
//                   </div>
//                   <div className="space-y-4">
//                     <p className="text-2xl font-medium italic leading-tight tracking-tight">
//                       "{booking.review.comment}"
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <div className="flex gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} size={16} className={cn(i < booking.review!.rating ? "fill-yellow-400 text-yellow-400" : "fill-white/20 text-white/20")} />
//                         ))}
//                       </div>
//                       <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Session Rating</span>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           )}
//         </div>

//         {/* Sidebar Logistics */}
//         <div className="space-y-6">
//           <Card className="rounded-[48px] border-none bg-white dark:bg-zinc-900 shadow-2xl p-8 md:p-10 space-y-10">
//             <div className="space-y-8">
//               <div className="flex gap-5">
//                 <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center shrink-0">
//                   <Calendar className="text-indigo-600" size={28} />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Calendar Date</p>
//                   <p className="text-xl font-black">{format(new Date(booking.availability.date), "EEEE")}</p>
//                   <p className="text-zinc-500 font-bold">{format(new Date(booking.availability.date), "MMMM do, yyyy")}</p>
//                 </div>
//               </div>

//               <div className="flex gap-5">
//                 <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
//                   <Clock className="text-emerald-600" size={28} />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Time Slot</p>
//                   <p className="text-xl font-black">{booking.availability.startTime} — {booking.availability.endTime}</p>
//                   <p className="text-zinc-500 font-bold italic text-xs">Full 60-Minute Intensive</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-700">
//                <div className="flex gap-3">
//                   <ShieldCheck className="text-indigo-500 shrink-0" size={20} />
//                   <p className="text-[11px] font-bold text-zinc-500 leading-snug uppercase tracking-tighter">
//                     Escrow Protected: Funds will be released to the tutor 24h after completion.
//                   </p>
//                </div>
//             </div>
//           </Card>

//           <button 
//             disabled={!isUpcoming}
//             className={cn(
//               "w-full h-20 rounded-[32px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95 text-sm",
//               isUpcoming 
//                 ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black hover:shadow-indigo-500/20" 
//                 : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
//             )}
//           >
//             {isUpcoming ? "Enter Digital Classroom" : "Session Expired"}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }